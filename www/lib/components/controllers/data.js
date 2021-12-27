import { FeatureLayer, Query } from "esri-leaflet";

export class DataController {
  historic = {}
  usgs = {}

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  async load() {
    this.loadUSGS();
    this.loadHistoric();
  }

  failure(message) {
    this.host.loading.failure(message);
  }

  async loadUSGS() {
    const stationIds = '04096405,04096515,04097500,040975299,04097540,04099000,04100500,04101000,04101500,04101535,04101800,04102500,04099750'
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${stationIds}&parameterCd=00060,00065&siteStatus=all`;
  
    // fetch
    const rawData = await fetch(url).catch(() => {this.failure(`Failed to load: ${url}`);});
    this.usgs = await rawData.json();
    this.host.loading.loadedUSGS = true;
    
    console.log(this.usgs);
  }

  async loadHistoric() {
    const featureService = "https://services1.arcgis.com/fe2kKd3pQJKqve16/arcgis/rest/services/HistoricMonitoringSites/FeatureServer/0";

    let query = new Query({
      url: featureService
    }).run((error, featureCollection, response) => {
      if(error) {
        this.failure(`Failed to load: ${featureService}\n${JSON.stringify(error)}`)
      } else {
        this.historic = featureCollection;
        this.host.loading.loadedHistoric = true;
        console.log(this.historic);
      }
    });
  }
}
