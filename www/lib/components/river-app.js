import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import './map.js'
import './data-select.js'
import './table.js'
import './timeseries.js'

@customElement('river-app')
class RiverApp extends LitElement {
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
}


