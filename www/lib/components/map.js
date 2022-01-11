import {LitElement, html} from 'lit'; 
import {customElement, property, query} from 'lit/decorators.js';
import {observeState, stateRecorder} from 'lit-element-state';

import 'leaflet/dist/leaflet.css';

import {Map as LeafletMap, Icon, Marker, Control, GeoJSON} from "leaflet";
import {vectorBasemapLayer} from "esri-leaflet-vector";

import * as d3 from "d3";

import './loading.js'

import {DataController} from './controllers/data.js'

import {scales} from "../data/definitions.js";
import {radiusRange} from '../data/enums.js';

import {model} from  "../data/model.js";
import {app} from '../state/app.js';


@customElement('river-map')
class RiverMap extends observeState(LitElement) {
  @query('river-loading') loading;

  apiKey = "AAPK3dfaa40a13c0404983142c26b566596ammsJLVROPRkVaZnrwj6bYIrYdi4FEikx7NZpYg7f5M9XlV2RFL6PgxMA_56IceHv";
  data = new DataController(this);
  
  createRenderRoot() {
    return this;
  }

  updated() {
    // source parameters changed. update the style
    if(this.featureLayer) {
      this.updateSymbology();
    }
  }

  updateSymbology() {
    this.featureLayer.setStyle((feature) => {
      let value = model.getValue(feature.id, app.selectedSeries);
      if(!value) {
        return {fillOpacity:0, stroke: false};
      }

      let color, radius;

      if(app.selectedSeries == 'datainfo') {
        let frequency = value.frequency;
        let daysSince = value.lastObservation;
        
        let colorScale = scales[app.selectedSeries];
        color = colorScale(daysSince);

        // Y..RT -> 0..1
        const frequencyUnit = _.indexOf(['Y', 'M', 'W', 'D', 'RT'], frequency) / 4.0;
        radius = d3.scaleLinear().clamp(true).range(radiusRange)(frequencyUnit);
      } else {

        let colorScale = scales[app.selectedSeries];
        color = colorScale(value);

        let radiusScale = colorScale.copy().clamp(true).range(radiusRange);
        radius = radiusScale(value);
      }

      return {
        fillColor: color,
        stroke: true,
        color: 'black',
        weight: 2,
        fillOpacity: 0.9,
        radius: radius
      }
    });
  }

  render() {
    stateRecorder.recordRead(app, 'selectedSeries');
    return html`
    <river-loading></river-loading>

    <div id="map"></div>
    `;
  }

  firstUpdated() {
    this.map = new LeafletMap(this.querySelector('#map'), {
      minZoom: 2,
      zoomControl: false
    });

    this.map.setView([41.55,-85.8], 10);

    this.loadBasemaps();
    this.data.load();
    this.basemaps['Topographic'].addTo(this.map);

    this.controlZoom = new Control.Zoom({position: 'topright'});
    this.controlLayers = new Control.Layers(this.basemaps);

    this.controlLayers.addTo(this.map);
    this.controlZoom.addTo(this.map);
  }

  loadBasemaps() {
    this.basemaps = {}
    this.basemaps['Topographic'] = vectorBasemapLayer("ArcGIS:Topographic", {
      apiKey: this.apiKey
    })

    this.basemaps['Imagery'] = vectorBasemapLayer("ArcGIS:Imagery", {
      apiKey: this.apiKey
    });

  }

  modelToLayers() {
    this.featureCollection = model.siteFeatureCollection();

    this.featureLayer = new GeoJSON(this.featureCollection,{
      pointToLayer: (p, latlng) => {
        return L.circleMarker(latlng).on('click', () => {
          console.log(p);
          console.log(model.sites[p.id]);
        });
      }
    }).addTo(this.map);

    this.controlLayers.addOverlay(this.featureLayer, "Sites");

    this.updated();
  }
}
