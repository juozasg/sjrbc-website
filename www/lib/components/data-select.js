import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {HideReflowsController} from './controllers/hide-reflows.js'

import './data-select/source.js';
import './data-select/temporal.js';
import './data-select/legend.js';

@customElement('river-data-select')
class RiverDataSelect extends LitElement {
  //hideReflows = new HideReflowsController(this);

  @property() sourceId;
  @property({type: Object}) fromDate; // Date object
  @property({type: Object}) toDate;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    //this.hideReflows.slideDown();
  }

  render() {
    const opacity = this.show ? '1' : '0';
    return html`

    <div class="card" id="data-select">
      <river-data-select-source></river-data-select-source>
      <!-- <river-data-select-temporal></river-data-select-temporal> -->
      <river-data-select-legend></river-data-select-legend>
    </div>
    `;
  }
}

