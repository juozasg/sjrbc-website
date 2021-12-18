import {LitElement, html} from 'lit'; 
import {customElement} from 'lit/decorators.js';

@customElement('river-map')
class RiverMap extends LitElement {
  render() {
    return html`
    <div id="map"></div>
    `;
  }
}
