import "./lib/util/jquery-global.js"
import "materialize-css";

import "./lib/components/river-app.js"
// import { Map as LeafletMap, Icon, Marker } from "leaflet";
// import { vectorBasemapLayer } from "esri-leaflet-vector";


document.addEventListener('DOMContentLoaded', function() {
  console.log("dom ready");
  // this.apiKey = "AAPK3dfaa40a13c0404983142c26b566596ammsJLVROPRkVaZnrwj6bYIrYdi4FEikx7NZpYg7f5M9XlV2RFL6PgxMA_56IceHv";
  // this.map = new LeafletMap(this.querySelector('#map'), {
  //   minZoom: 2
  // });

  // this.map.setView([41.55,-85.8], 10);

  // this.map.on('layeradd', () => console.log('layer add'));


  // this.basemaps = {}
  // this.basemaps['Topographic'] = vectorBasemapLayer("ArcGIS:Topographic", {
  //   apiKey: this.apiKey
  // })

  // this.basemaps['Imagery'] = vectorBasemapLayer("ArcGIS:Imagery", {
  //   apiKey: this.apiKey
  // });

  // this.basemaps['Topographic'].addTo(this.map);

});

