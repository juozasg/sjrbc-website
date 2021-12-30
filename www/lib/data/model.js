// import Plotly from 'plotl'
import * as df from 'data-forge';
//import { readFile, Series, DataFrame } from 'data-forge';

// date parsing
// EST: new Date(Date.parse('2007-11-11 12:00-05:00'))
// EDT: new Date(Date.parse('2007-11-11 12:00-04:00'))

import tzAbbr from 'timezone-abbr-offsets';

import {safeID} from '../util/data-helpers.js'

window.tzAbbr = tzAbbr;

window.df = df;

export class Model {
  constructor() {
    window.model = this;
    // { siteID => {name,lat,lon,feature,df}}
    this.sites = {}
  }


  /* ['SiteName', 'SiteID', 'Lat', 'Lon', 'Feature', 'Height_ft, 'Flow_cfs'] */
  async processUSGS(data) {
    console.log('process usgs');
    console.log(data);

    let dframe = new df.DataFrame({});

    data.value.timeSeries.forEach(ts => {
      let columns = {}

      const siteCode = ts.sourceInfo.siteCode[0].value;
      columns.SiteID = `usgs-${siteCode}`;

      const feature = {};
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
      columns.Feature = feature;

      columns.Lat = loc.latitude;
      columns.Lon = loc.longitude;
  

      columns.SiteName = ts.sourceInfo.siteName;
      // TODO: TimeSeries
      // stations[siteCode]['properties']['LastMeasurement'] = 0;

      if(ts.variable.variableCode[0].value == '00060') {
        // Streamflow cft/s
        columns.Flow_cfs = ts.values[0].value[0].value;
      } else if (ts.variable.variableCode[0].value == '00065') {
        // Gage height, ft
        columns.Height_ft = ts.values[0].value[0].value;
      }

      dframe = dframe.merge();
    });

    // console.log(dframe.toString());
    this.data = this.data.merge(dframe);
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

    this.printStatistics();
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
      console.log(`${name} [${series.min()}, ${series.max()}]   AVG: ${series.median()} MEDIAN: ${series.median()}`);
    }

    // window.allSeries = allSeries;
  }
}