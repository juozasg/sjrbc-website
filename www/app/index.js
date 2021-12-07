import "./jquery-global.js"

import "materialize-css";
import Map from "leaflet"
import "esri-leaflet"
import * as d3 from "d3"
import "./d3-legend.js"
import {clg} from "./util.js"

clg("high");
clg(d3);


document.addEventListener('DOMContentLoaded', function() {
  console.log("dom ready");
});