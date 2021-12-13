import "./jquery-global.js"
import "./stimulus.js"

import "materialize-css";

import "esri-leaflet"

import * as d3 from "d3"


import "./d3-legend.js"
import {clg} from "./util.js"

import Map from "leaflet"


document.addEventListener('DOMContentLoaded', function() {
  console.log("dom ready");
  $('#ui').css('display', 'flex');


  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {constrainWidth: false});

  var elems = document.querySelectorAll('.modal');
  var modal = M.Modal.init(elems, {})[0];

});