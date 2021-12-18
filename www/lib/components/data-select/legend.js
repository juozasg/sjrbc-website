import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('river-data-select-legend')
class RiverDataSelectLegend extends LitElement {
  @property() sourceId;

  // no Shadow DOM
  createRenderRoot() {
    return this;
  }

  sourceChanged(sourceId) {
    this.sourceId = sourceId;
  }

  render() {
    console.log('legend render');
    return html`
      <div id="legendviz" height=200 width=264></div>
      selected source ${this.sourceId}
    `;
  }
}

