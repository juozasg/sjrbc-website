import {LitElement, html} from 'lit'; 
import {customElement, query} from 'lit/decorators.js';

import 'leaflet/dist/leaflet.css';

import { Map as LeafletMap, Icon, Marker, Control } from "leaflet";
import { vectorBasemapLayer } from "esri-leaflet-vector";

import './loading.js'

import {DataController} from './controllers/data.js'


@customElement('river-map')
class RiverMap extends LitElement {
  @query('river-loading') loading;

  apiKey = "AAPK3dfaa40a13c0404983142c26b566596ammsJLVROPRkVaZnrwj6bYIrYdi4FEikx7NZpYg7f5M9XlV2RFL6PgxMA_56IceHv";
  data = new DataController(this);
  
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div id="map"></div>
    <river-loading></river-loading>
    `;
  }

  firstUpdated() {
    this.map = new LeafletMap(this.querySelector('#map'), {
      minZoom: 2
    });

    this.map.setView([41.55,-85.8], 10);

    //this.map.on('layeradd', () => console.log('layer add'));

    this.loadBasemaps();
    this.data.load();
    this.basemaps['Topographic'].addTo(this.map);
    this.layersControl = new Control.Layers(this.basemaps);
    this.layersControl.addTo(this.map);


    window.rm = this;
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
}
