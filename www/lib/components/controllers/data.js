import { FeatureLayer, Query } from "esri-leaflet";

import {model} from  "../../data/model.js";

import strftime from "../../util/strftime.js"


export class DataController {
  elkhart = {}
  usgs = {}

  constructor(host) {
    this.host = host;
    host.addController(this);
  }

  async load() {
    const loaders = []
    loaders.push(
      this.loadUSGSSites()
        .then(d => model.processUSGSSites(d))
        .then(() => this.loadUSGSSiteData())
        .then(d => model.processUSGSSiteData(d))
        .then(() => this.host.loading.loadedUSGS = true)
        // .then(() => model.printStatistics())
        .catch(e => this.host.loading.failure(e)));

    loaders.push(
      this.loadElkhart()
      .then(d => model.processElkhart(d))
      .then(() => this.host.loading.loadedElkhart = true)
      .catch(e => this.host.loading.failure(e)));

    Promise.all(loaders).then(() => this.host.modelToLayers());
  }

  async loadUSGSSites() {
    const huc8 = '04050001';
    // const stationIds = '04096405,04096515,04097500,040975299,04097540,04099000,04100500,04101000,04101500,04101535,04101800,04102500,04099750';
    const stationIds = '04096405';//,04096515,04097500,040975299,04097540,04099000,04100500,04101000,04101500,04101535,04101800,04102500,04099750';
    //const annualUrl = 'https://waterdata.usgs.gov/nwis/annual?referred_module=sw&amp;site_no=04096405&amp;por_04096405_70388=891343,00060,70388,1963,2022&amp;year_type=W&amp;format=rdb&amp;date_format=YYYY-MM-DD&amp;rdb_compression=value&amp;submitted_form=parameter_selection_list';
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${stationIds}&siteStatus=all`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(e => {throw new Error(`Failed to load: ${url}\nbecause ${e.message}`)})  
  }

  async loadUSGSSiteData() {
    // const huc8 = '04050001';
    // const stationIds = '04096405,04096515,04097500,040975299,04097540,04099000,04100500,04101000,04101500,04101535,04101800,04102500,04099750';
    const stationIds = '04096405';
    //const annualUrl = 'https://waterdata.usgs.gov/nwis/annual?referred_module=sw&amp;site_no=04096405&amp;por_04096405_70388=891343,00060,70388,1963,2022&amp;year_type=W&amp;format=rdb&amp;date_format=YYYY-MM-DD&amp;rdb_compression=value&amp;submitted_form=parameter_selection_list';
    const startDate = '2021-12-30';
    const endDate = strftime('%F', new Date(Date.now()));

    const url = `https://waterservices.usgs.gov/nwis/iv/?format=rdb&sites=${stationIds}&parameterCd=00060,00065&siteStatus=all&startDT=${startDate}&endDT=${endDate}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.text()
      })
      .catch(e => {throw new Error(`Failed to load: ${url}\nbecause ${e.message}`)})
  }

  async loadElkhart() {
    // const featureService = "https://services1.arcgis.com/fe2kKd3pQJKqve16/arcgis/rest/services/HistoricMonitoringSites/FeatureServer/0";
    const featureService = "https://services1.arcgis.com/fe2kKd3pQJKqve16/arcgis/rest/services/ElkhartTest1/FeatureServer/0";

    return new Promise((resolve, reject) => {
      new Query({
        url: featureService,
        // limit: 5
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
