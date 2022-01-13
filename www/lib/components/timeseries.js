import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {observeState} from 'lit-element-state';

import {app} from '../state/app.js';

@customElement('river-timeseries')
class RiverTimeseries extends observeState(LitElement) {
  createRenderRoot() {
    return this;
  }

  render() {
    const height = document.getElementsByTagName('river-data-select')[0].height;
    const style = `width: 100%; height: ${height}px;`

    return html`
    <div id="timeseries" class="card" style="${style}">
    <h3>This is timeseries</h3>
    </div>
    `;
  }
}