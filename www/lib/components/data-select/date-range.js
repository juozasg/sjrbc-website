import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';


@customElement('river-data-select-date-range')
class RiverDataSelectDateRange extends LitElement {

  @property({type: Object}) fromDate; // Date object
  @property({type: Object}) toDate;

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

    `;
  }
}

