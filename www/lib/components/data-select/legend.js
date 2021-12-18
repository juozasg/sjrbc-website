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

    //TODO: 
    // lookup min/max values from real data (with time range? - fake it for now )
    // create scales and render them
    // architect the whole legend thing to be good and work with data
  }

  render() {
    console.log('legend render');
    return html`
      <div id="legendviz" height=200 width=264></div>
      selected source ${this.sourceId}
    `;
  }
}

