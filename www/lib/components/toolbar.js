import {LitElement, html} from 'lit';
import {customElement, queryAll, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';


@customElement('river-toolbar')
class RiverToolbar extends LitElement {
  @property() showHelp;
  @property() showTable;
  @property() showDataSelect;
  @property() showTimeseries;

  constructor() {
    super();
    this.showHelp = false;
    this.showTable = false;
    this.showDataSelect = true;
    this.showTimeseries = false;
  }

  createRenderRoot() {
    return this;
  }


  toggle(prop) {
    this[prop] = !this[prop];
    this._notifyComponentVisibilityChange();
  }


  async _notifyComponentVisibilityChange() {
    await this.updateComplete;
    this.dispatchEvent(new CustomEvent('river:componentVisibility.change', {bubbles: true}));
  }

  firstUpdated() {
    this._notifyComponentVisibilityChange();
  }


  render() {
    return html`
    <div id="toolbar" class="card">
      <span @click="${() => this.toggle('showHelp')}"
        ?active=${this.showHelp} class="material-icons">help_outline</span>

      <span @click="${() => this.toggle('showTable')}"
        ?active=${this.showTable} class="material-icons">view_list</span>

      <span @click="${() => this.toggle('showDataSelect')}"
        ?active=${this.showDataSelect} class="material-icons">filter_list</span>

      <span @click="${() => this.toggle('showTimeseries')}"
        ?active=${this.showTimeseries} class="material-icons">timeline</span>

      <span id="status">No site selected</span>
    </div>
    `;
  }
}