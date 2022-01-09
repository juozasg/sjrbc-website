import {LitElement, html} from 'lit';
import {customElement, queryAll, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import {labels} from "../data/definitions.js";
import {model} from "../data/model.js";
import {unsafeHTML} from 'lit/directives/unsafe-html.js';


@customElement('river-toolbar')
class RiverToolbar extends LitElement {
  @property() showHelp;
  @property() showTable;
  @property() showDataSelect;
  @property() showTimeseries;
  @property() sourceId;
  @property({type: Array}) selectedSiteIds;


  constructor() {
    super();
    this.showHelp = false;
    this.showTable = false;
    this.showDataSelect = true;
    this.showTimeseries = false;

    this.sourceId = 'datainfo';
    this.selectedSiteIds = [];
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
    // TODO: someday fix this with nested flexbox or grid or such
    const ratio = window.visualViewport.width < 400 ? 18 : 15;
    const textWidth = parseInt(window.visualViewport.width / ratio);
    let sitesSelectedText = 'No sites selected';

    if(this.selectedSiteIds.length == 1) {
      sitesSelectedText = model.sites[this.selectedSiteIds[0]].siteName;
    } else if(this.selectedSiteIds.length > 1) {
      sitesSelectedText = `${this.selectedSiteIds.length} sites selected`;
    }

    sitesSelectedText = sitesSelectedText.slice(0, textWidth);
    console.log(textWidth);

    const variableText = this.sourceId == 'datainfo' ? '' : ` &mdash; ${labels[this.sourceId]}`
    return html`
    <div id="toolbar-container">
      <div id="toolbar" class="card">
        <span @click="${() => alert('TODO: help and instructions')}"
          class="material-icons">help_outline</span>

        <span @click="${() => this.toggle('showTable')}"
          ?active=${this.showTable} class="material-icons">view_list</span>

        <span @click="${() => this.toggle('showDataSelect')}"
          ?active=${this.showDataSelect} class="material-icons">filter_list</span>

        <span @click="${() => this.toggle('showTimeseries')}"
          ?active=${this.showTimeseries} class="material-icons">timeline</span>

        <span id="status">
          <span class="text">${sitesSelectedText}${unsafeHTML(variableText)}</span>
          <span ?show=${this.sourceId != 'datainfo' && this.selectedSiteIds.length > 0} class="add-to-left-right">
            <span class="material-icons add-to-left">arrow_left</span>
            <span class="material-icons timeline-hint">timeline</span>
            <span class="material-icons add-to-right">arrow_right</span>
          <span>
        </span>
      </div>
    </div>
    `;
  }
}