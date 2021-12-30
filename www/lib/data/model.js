// import Plotly from 'plotl'
import * as df from 'data-forge';
//import { readFile, Series, DataFrame } from 'data-forge';

// date parsing
// EST: new Date(Date.parse('2007-11-11 12:00-05:00'))
// EDT: new Date(Date.parse('2007-11-11 12:00-04:00'))

import tzAbbr from 'timezone-abbr-offsets';

import {safeID} from '../util/data-helpers.js'
import {timer} from '../util/debug.js'

import Papa from 'papaparse';

window.tzAbbr = tzAbbr;

window.df = df;

export class Model {
  constructor() {
    window.model = this;
    // { siteID => {name,lat,lon,feature,df}}
    this.sites = {}
  }

  async processUSGSSites(data) {
    console.log('process usgs sites');

    data.value.timeSeries.forEach(ts => {
      let columns = {}

      const siteCode = ts.sourceInfo.siteCode[0].value;
      let siteID = `usgs-${siteCode}`;
      if(!this.sites[siteID]) {
        const feature = {};
        feature.id = siteID;

        const loc = ts.sourceInfo.geoLocation.geogLocation;
        feature.type = 'Feature';
        feature.id = columns.SiteID;
        feature.geometry = {
          type: "Point",
          coordinates: [
              loc.longitude,
              loc.latitude
          ]
        };

        this.sites[siteID] = {
          siteID: siteID,
          siteName: ts.sourceInfo.siteName,
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
          feature: feature,
          df: new df.DataFrame({})
        };
      }
    });

    console.log(this.sites);

  }

  async processUSGSSiteData(data) {
    let t1 = timer('USGS Papa parse')

    let rows = Papa.parse(data, {
      delimiter: "\t",
      comments: "#"
    }).data;

    t1.stop();


    // may not work with all sites
    // each TS_ID section in the RDB data should be parsed separately
    // and columns calculated from the headers
    const agencyCol = 0;
    const siteCol = 1;
    const dateCol = 2;
    const tzCol = 3;
    const flowCol = 4; // "TS_ID_00060"
    const heightCol = 6; // "TS_ID_00065"

    let t2 = timer('USGS build df');
    rows.forEach(row => {
      // some rows have headers
      if(row[agencyCol] != 'USGS') {
        return;
      }

      let siteID = 'usgs-' + row[siteCol];
      if(this.sites[siteID]) {
        let tzOffset = tzAbbr[row[tzCol]];
        let dateStr = row[dateCol] + tzOffset;


        let columns = {
          date: new Date(Date.parse(dateStr)),
          flow: parseFloat(row[flowCol]),
          height: parseFloat(row[heightCol])
        };

        let dframe = new df.DataFrame([columns]).setIndex('date')
        // TODO: optimize as needed
        this.sites[siteID].df = this.sites[siteID].df.concat(dframe);
      }
    });

    t2.stop();
  }


  async processElkhart(data) {
    const columns = {
      raining: "RAINING",// : "NA",
      wet: "WET",//: "1",
      temp: "TEMP",//: 13.6,
      do: "DO",//: 10.1,
      spc: "SPC",//: 346.2,
      ph: "PH",//: 8.33,
      nitrates: "NITRATES",//: 1.19,
      phosphorus: "PHOSPHORUS",//: 0.008,
      chlorides: "CHLORIDES",//: 33.42,
      tds: "TDS",//: 380,
      tss: "TSS",//: 2.14,
      ecoli: "E__COLI",//: 83,
      date: "DATE",//: 1462838400000,
      current: "Current_"//: "Yes"
    }

    data.features.forEach(feature => {
      let props = feature.properties;
      delete feature.properties;

      // "Christiana Creek - CR 4" -> "elkhart-Christiana-Creek-CR-4"
      const siteID = 'elkhart-' + safeID(props.Site_Location_Name);
      if(!this.sites[siteID]) {
        feature.id = siteID;
        let dframe = new df.DataFrame({columnNames: ['date'], rows: []}).setIndex('date');
        this.sites[siteID] = {
          siteID: siteID,
          siteName: props.Site_Location_Name,
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
          feature: feature,
          df: dframe
        };
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
        date: new Date(props["DATE"]),
        current: props["Current_"]
      }

      let dframe = new df.DataFrame([columns]).setIndex('date')
      this.sites[siteID].df = this.sites[siteID].df.merge(dframe);
    });

    // this.printStatistics();
  }

  printStatistics() {
    // get ranges
    let allSeries = {}
    for (const [id, site] of Object.entries(this.sites)) {
      for (const column of site.df.getColumns()) {
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