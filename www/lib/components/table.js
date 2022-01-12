import {LitElement, html} from 'lit'; 
import {customElement, queryAll, property} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


import {observeState} from 'lit-element-state';

import * as d3 from "d3";


import {app} from '../state/app.js';
import {model} from '../data/model.js';

import {labels, formatValue} from "../data/definitions.js";


@customElement('river-table')
class RiverTable extends observeState(LitElement) {
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
  }

  render() {
    let table = "";

    if(app.selectedSites.length > 0) {
      table = "<table class='highlight'>";
      table += '<thead><tr><th>Variable</th>';
      if(app.selectedSites.length > 1) {
        table += '<th>Last value (mean)<th>';
      } else {
        table += '<th>Last value<th>';
      }

      table += '</tr></thead>'
      for(series in labels) {
        var name = labels[series];
    
        let values = []
        for(i in app.selectedSites) {
          let site = app.selectedSites[i];
          let val = model.getValue(site, series);
          if(val) {
            values.push(val);
          }
        }

        let mean = d3.mean(values);
        
        if(mean) {
          let tr = "<tr>";
          tr += "<td>" + name + "</td>";
          tr += "<td>" + formatValue(series, mean) + "</td></tr>";
      
          table += tr;
        }
      }
      table += "</table>";
    }

    return html`
      <div id="table" class="card">
      <h5>Site Summary</h5>
        <ul>
          ${_(app.selectedSites).map((site) => html`<li><b>${model.sites[site].siteName}</b></li>`)}
        </ul>
        ${unsafeHTML(table)}
      </div>
    `;
  }
}