import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import './river-map.js'
import './river-data-select.js'
import './river-table.js'
import './river-timeseries.js'

@customElement('river-app')
class RiverApp extends LitElement {

  // no Shadow DOM for Materialize CSS Modal
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


