import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {HideReflowsController} from './controllers/hide-reflows.js'

import './data-select/source.js';
import './data-select/date-range.js';
import './data-select/legend.js';

@customElement('river-data-select')
class RiverDataSelect extends LitElement {
  hideReflows = new HideReflowsController(this);

  @query('river-data-select-source') sourceSelect;

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
    console.log(this.sourceSelect);
  }

  _handleDataSelectChanged(e) {
    this.sourceId = this.sourceSelect.sourceId;
  }

  render() {
    console.log("data-select render");
    return html`

    <div class="card data-select">
      <river-data-select-source></river-data-select-source>

      selected source ${this.sourceId}

    </div>
    `;
  }
}

