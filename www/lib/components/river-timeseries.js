import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('river-timeseries')
class RiverTimeseries extends LitElement {
  render() {
    return html`
    <div id="timeseries"></div>
    `;
  }
}