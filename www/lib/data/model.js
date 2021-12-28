// import Plotly from 'plotl'
import * as df from 'data-forge';
//import { readFile, Series, DataFrame } from 'data-forge';

window.df = df;

export class Model {
  constructor() {
    this.data = new df.DataFrame({
      columnNames: ["SiteName", "SiteID", "Lat", "Lon", 'Feature'],
      rows: []
    }).setIndex('SiteID');;

    window.model = this;
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

      dframe = dframe.merge(new df.DataFrame([columns]).setIndex('SiteID'));
    });

    // console.log(dframe.toString());
    this.data = this.data.merge(dframe);
  }

  /*
  * ['SiteName', 'SiteID', 'Lat', 'Lon', 'Feature', 'Water_Body', 'Sampling_P', 'pH', 'Temp',
  * 'Dissolved', 'BOD__mg_l', 'BOD', 'Chlorides', 'Conductivi', 'Total_Diss', 'Escherichi', 'Nitrate_Ni',
  * 'Total_Phos', 'Turbidity', 'Total_Susp', 'Flow_cfs']
  */
  async processHistoric(data) {
    const rows = [];

    data.features.forEach(feature => {
      // TODO: TimeSeries
      let columns = feature.properties;
      delete feature.properties;

      columns.SiteName = columns.Location;
      delete columns.Location;

      columns.Lon = columns.Long;
      delete columns.Long;

      columns.SiteID = `historic-${columns.Object_ID}`;
      delete columns.Object_ID;
      delete columns.OBJECTID;
      delete columns.SymbolID;

      columns.Feature = feature;
      columns.Feature.id = columns.SiteID;

      rows.push(columns);
    });

    this.data = this.data.merge(new df.DataFrame({values: rows}).setIndex('SiteID'));

    // console.log(this.data.toString());
  }

}