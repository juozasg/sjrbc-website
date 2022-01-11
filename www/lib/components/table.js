import {LitElement, html} from 'lit'; 
import {customElement, queryAll, property} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


import {observeState} from 'lit-element-state';

import * as d3 from "d3";


import {app} from '../state/app.js';
import {model} from '../data/model.js';

import {labels} from "../data/definitions.js";



@customElement('river-table')
class RiverTable extends observeState(LitElement) {
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    // this.modal = M.Modal.init(this.modalEls, {})[0];
  }

  render() {
    let table = "";

    if(app.selectedSites.length > 0) {
      for (key in labels) {
        var name = labels[key];
    
        let values = []
        for(i in app.selectedSites) {
          let site = app.selectedSites[i];
          let val = model.getValue(site, key);
          if(val) {
            values.push(val);
          }
        }

        let mean = d3.mean(values);
        
        if(mean) {
          let tr = "<tr>";
          tr += "<td>" + name + "</td>";
          tr += "<td>" + mean.toString() + "</td></tr>";
      
          table += tr;
        }
      }
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

  // render() {
  //   return html`
  //     <div id="modal-table" class="modal">
  //       <div class="modal-content">
  //         <h4>Modal</h4>
  //         <table class="highlight">
  //           <tbody></tbody>
  //         </table>
  //       </div>
  //       <div class="modal-footer">
  //         <a class="modal-close waves-effect waves-green btn-flat">Close</a>
  //       </div>
  //     </div>
  //   `;
  // }
}