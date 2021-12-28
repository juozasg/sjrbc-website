import { FeatureLayer, Query } from "esri-leaflet";

import {Model} from  "../../data/model.js";

export class DataController {
  historic = {}
  usgs = {}

  constructor(host) {
    this.host = host;
    host.addController(this);
    this.model = new Model();
  }

  async load() {
    const loaders = []
    loaders.push(
      this.loadUSGS()
        .then(d => this.model.processUSGS(d))
        .then(() => this.host.loading.loadedUSGS = true)
        .catch(e => this.host.loading.failure(e)));

    loaders.push(
      this.loadHistoric()
      .then(d => this.model.processHistoric(d))
      .then(() => this.host.loading.loadedHistoric = true)
      .catch(e => this.host.loading.failure(e)));

    Promise.all(loaders).then(() => this.host.modelToLayers(this.model));
  }

  async loadUSGS() {
    const stationIds = '04096405,04096515,04097500,040975299,04097540,04099000,04100500,04101000,04101500,04101535,04101800,04102500,04099750'
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${stationIds}&parameterCd=00060,00065&siteStatus=all`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(e => {throw new Error(`Failed to load: ${url}\nbecause ${e.message}`)})  
  }

  async loadHistoric() {
    const featureService = "https://services1.arcgis.com/fe2kKd3pQJKqve16/arcgis/rest/services/HistoricMonitoringSites/FeatureServer/0";

    return new Promise((resolve, reject) => {
      new Query({
        url: featureService
      }).run((error, featureCollection, response) => {
        if(error) {
          reject(new Error(`Failed to load: ${featureService}\nbecause ${JSON.stringify(error)}`));
        } else {
          resolve(featureCollection);
        }
      });
    });
  }
}
