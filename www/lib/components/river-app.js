import {LitElement, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';

import './map.js'
import './data-select.js'
import './table.js'
import './timeseries.js'

@customElement('river-app')
class RiverApp extends LitElement {

  @query('river-data-select') dataSelect;
  @query('river-map') map;


  // no Shadow DOM for Materialize CSS
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <main>
        <river-map></river-map>
        <river-data-select></river-data-select>
        <river-table></river-table>
        <river-timeseries></river-timeseries>
      </main>
    `;
  }

  firstUpdated() {
    this.dataSelect.map = this.map;
  }
}


