// import Plotly from 'plotl'
import * as df from 'data-forge';
//import { readFile, Series, DataFrame } from 'data-forge';

// date parsing
// EST: new Date(Date.parse('2007-11-11 12:00-05:00'))
// EDT: new Date(Date.parse('2007-11-11 12:00-04:00'))

import tzAbbr from 'timezone-abbr-offsets';

import {safeID, betweenDays} from '../util/data-helpers.js'
import {timer} from '../util/debug.js'

import Papa from 'papaparse';

window.tzAbbr = tzAbbr;

window.df = df;

export class Model {
  constructor() {
    // { siteId => {name,lat,lon,feature,df}}
    this.sites = {}
  }


  getValue(siteId, seriesId) {
    try {
      if(seriesId == 'datainfo') {
        return this.sites[siteId].datainfo;
      }
      let df = this.sites[siteId].df;
      return df.getSeries(seriesId).bake().last();
    } catch (error) {
      return undefined;
    }
  }

  sitesMeanSeries(seriesId, siteIds) {
    let allSeries = [];
    siteIds.forEach(siteId => {
      let series = this.sites[siteId].df.getSeries(seriesId);
      if(series) {
        allSeries.push(series);
      }
    });

    let merged = df.Series.merge(allSeries);
    let mean = merged.select(vals => _(vals).compact().mean()).bake();

    return mean;
  }

  async processUSGSSites(data) {
    console.log('process usgs sites');

    data.value.timeSeries.forEach(ts => {
      let columns = {}

      const siteCode = ts.sourceInfo.siteCode[0].value;
      let siteId = `usgs-${siteCode}`;
      if(!this.sites[siteId]) {
        const feature = {};
        feature.id = siteId;

        const loc = ts.sourceInfo.geoLocation.geogLocation;
        feature.type = 'Feature';
        feature.geometry = {
          type: "Point",
          coordinates: [
              loc.longitude,
              loc.latitude
          ]
        };

        this.sites[siteId] = {
          dataset: 'usgs',
          siteId: siteId,
          siteName: ts.sourceInfo.siteName,
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
          feature: feature,
          df: new df.DataFrame({}),
          datainfo: {
            frequency: 'RT',
            lastObservation: 0
          }
        };
      }
    });

    // console.log(this.sites);


  }

  async processUSGSSiteData(data) {
    // let t1 = timer('USGS Papa parse')

    let rows = Papa.parse(data, {
      delimiter: "\t",
      comments: "#"
    }).data;

    // t1.stop();

    // TODO: multi-section, multivar parsing
    // may not work with all sites
    // each TS_ID section in the RDB data should be parsed separately
    // and columns calculated from the headers
    // this would allow to include 00010 (water temperature) for those sites
    // which have it
    const agencyCol = 0;
    const siteCol = 1;
    const dateCol = 2;
    const tzCol = 3;
    const flowCol = 4; // "TS_ID_00060"
    const heightCol = 6; // "TS_ID_00065"


    const siteDfCols = {}

    // let t2 = timer('USGS build df');
    rows.forEach(row => {
      // some rows have headers
      if(row[agencyCol] != 'USGS') {
        return;
      }

      let siteId = 'usgs-' + row[siteCol];
      if(this.sites[siteId]) {
        let tzOffset = tzAbbr[row[tzCol]];
        let dateStr = row[dateCol] + tzOffset;

        let columns = {
          date: Date.parse(dateStr),
          flow: parseFloat(row[flowCol]),
          height: parseFloat(row[heightCol])
        };

        if(!siteDfCols[siteId]) {
          siteDfCols[siteId] = [];
        }

        siteDfCols[siteId].push(columns);
      }
    });

    for (const [siteId, dfCols] of Object.entries(siteDfCols)) {
      let dframe = new df.DataFrame(dfCols).setIndex('date')
      this.sites[siteId].df = this.sites[siteId].df.concat(dframe).bake();
    }
    // this.printStatistics();
  }

  initElkhartSite(siteId, siteName, feature) {
    feature.id = siteId;
    let dframe = new df.DataFrame({columnNames: ['date'], rows: []}).setIndex('date');
    this.sites[siteId] = {
      dataset: 'elkhart',
      siteId: siteId,
      siteName: siteName,
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0],
      feature: feature,
      df: dframe,
      datainfo: {
        frequency: 'W',
        lastObservation: 0
      }
    };
  }


  async processElkhart(data) {
    data.features.forEach(feature => {
      let props = feature.properties;
      delete feature.properties;

      // "Christiana Creek - CR 4" -> "elkhart-Christiana-Creek-CR-4"
      const siteId = 'elkhart-' + safeID(props.Site_Location_Name);
      if(!this.sites[siteId]) {
        this.initElkhartSite(siteId, props.Site_Location_Name, feature);
      }

      let columns = {
        raining: props["RAINING"],
        wet: props["WET"] == "1",
        temp: props["TEMP"],
        do: props["DO"],
        spc: props["SPC"],
        ph: props["PH"],
        nitrates: props["NITRATES"],
        phosphorus: props["PHOSPHORUS"],
        chlorides: props["CHLORIDES"],
        tds: props["TDS"],
        tss: props["TSS"],
        ecoli: props["E__COLI"],
        date: parseInt(props["DATE"]),
        current: props["Current_"]
      }

      let dframe = new df.DataFrame([columns]).setIndex('date')
      this.sites[siteId].df = this.sites[siteId].df.concat(dframe).bake();
    });

  }

  sortByDate() {
    let now = new Date(_.now());

    for (const [id, site] of Object.entries(this.sites)) {
      site.df = site.df.orderBy(row => row.date).bake();

      if(site.dataset == 'elkhart') {
        site.datainfo.lastObservation = betweenDays(new Date(site.df.getSeries('date').last()), now);
      }
    }
  }

  // turn all the sites into a geojson feature collection
  siteFeatureCollection() {
    const featureCollection = {
      type: 'FeatureCollection',
      features: _.values(_.mapValues(this.sites, 'feature'))
    };


    return featureCollection;
  }

  printStatistics() {
    // get ranges
    let allSeries = {}
    for (const [id, site] of Object.entries(this.sites)) {

      for (const column of site.df.getColumns()) {
        console.log(column);
        const name = column.name;
        const series = column.series;
        console.log(name);
        if(!allSeries[name]) {
          allSeries[name] = new df.Series();
        }

        allSeries[name] = allSeries[name].concat(series)
      }
    }
    console.log(allSeries);
    for (const [name, series] of Object.entries(allSeries)) {
      console.log(`${name} [${series.min()}, ${series.max()}]  AVG:${series.median()} MEDIAN:${series.median()}`);
    }

    // window.allSeries = allSeries;
  }
}

const model = new Model();
window.model = model;

export {model};
