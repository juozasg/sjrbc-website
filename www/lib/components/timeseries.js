import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('river-timeseries')
class RiverTimeseries extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <div id="timeseries" class="card">
    <h3>This is timeseries</h3>
    </div>
    `;
  }
}