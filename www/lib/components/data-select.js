import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {HideReflowsController} from './controllers/hide-reflows.js'

import './data-select/source.js';
import './data-select/temporal.js';
import './data-select/legend.js';

@customElement('river-data-select')
class RiverDataSelect extends LitElement {
  hideReflows = new HideReflowsController(this);

  @query('river-data-select-source') sourceSelect;
  @query('river-data-select-temporal') temporalSelect;
  @query('river-data-select-legend') legend;


  @property() sourceId;
  @property({type: Object}) fromDate; // Date object
  @property({type: Object}) toDate;

  constructor() {
    super();
    this.addEventListener('river:data-select.change', this._handleDataSelectChanged);
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.hideReflows.slideDown();
  }

  _handleDataSelectChanged(e) {
    this.sourceId = this.sourceSelect.sourceId;
    this.fromDate = this.temporalSelect.fromDate;
    this.toDate = this.temporalSelect.toDate;

    this.legend.sourceId = this.sourceId;
    this.map.sourceId = this.sourceId;
  }

  render() {
    return html`

    <div class="card data-select">
      <river-data-select-source></river-data-select-source>
      <river-data-select-temporal></river-data-select-temporal>
      <river-data-select-legend></river-data-select-legend>
    </div>
    `;
  }
}

