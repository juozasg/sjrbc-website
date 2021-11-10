// initialize remote app data: map, layer and features list
// returns a promise
function loadMapData() {
  const featureService = "https://services1.arcgis.com/fe2kKd3pQJKqve16/arcgis/rest/services/HistoricMonitoringSites/FeatureServer/0";
  const apiKey = "AAPK3dfaa40a13c0404983142c26b566596ammsJLVROPRkVaZnrwj6bYIrYdi4FEikx7NZpYg7f5M9XlV2RFL6PgxMA_56IceHv";
  const basemapEnum = "ArcGIS:Topographic";

  App.map = L.map("map", {
    minZoom: 2
  }).setView([41.55,-85.8], 10);

  L.esri.Vector.vectorBasemapLayer(basemapEnum, {
    apiKey: apiKey
  }).addTo(App.map);

  App.featureLayer = L.esri.featureLayer({
    url: featureService,
    pointToLayer: (p, latlng) => {
      return L.circleMarker(latlng);
    }
  }).addTo(App.map);


  return new Promise((resolve) => {
    App.featureLayer.on('load', () => {
      App.features = [];
      App.featureLayer.eachFeature((t) => {App.features.push(t.feature)});
      resolve();
    });
  });
}