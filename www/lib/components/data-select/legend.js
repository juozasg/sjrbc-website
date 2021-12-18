import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('river-data-select-legend')
class RiverDataSelectLegend extends LitElement {

  // no Shadow DOM
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
  }

  dataSourceClicked(e) {
    console.log(e.target);
    console.log(e.currentTarget);
  }

  render() {
    return html`
      <div id="legendviz" height=200 width=264></div>
    `;
  }
}

