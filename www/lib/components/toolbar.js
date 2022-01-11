import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

import {observeState} from 'lit-element-state';


import {labels} from "../data/definitions.js";
import {model} from "../data/model.js";
import {app} from '../state/app.js';

@customElement('river-toolbar')
class RiverToolbar extends observeState(LitElement) {
  @property() sourceId;
  @property({type: Array}) selectedSiteIds;


  constructor() {
    super();


    this.sourceId = 'datainfo';
    this.selectedSiteIds = [];
  }

  createRenderRoot() {
    return this;
  }


  // toggle(prop) {
  //   app[prop] = !app[prop];
  //   // this._notifyComponentVisibilityChange();
  //   console.log(app);
  // }


  // async _notifyComponentVisibilityChange() {
  //   // await this.updateComplete;
  //   // this.dispatchEvent(new CustomEvent('river:componentVisibility.change', {bubbles: true}));
  // }

  // firstUpdated() {
  //   this._notifyComponentVisibilityChange();
  // }


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

    const variableText = this.sourceId == 'datainfo' ? '' : ` &mdash; ${labels[this.sourceId]}`
    return html`
    <div id="toolbar-container">
      <div id="toolbar" class="card">
        <span @click="${() => alert('TODO: help and instructions')}"
          class="material-icons">help_outline</span>

        <span @click="${() => app.showTable = !app.showTable}"
          ?active=${app.showTable} class="material-icons">view_list</span>

        <span @click="${() => app.showDataSelect = !app.showDataSelect}"
          ?active=${app.showDataSelect} class="material-icons">filter_list</span>

        <span @click="${() => app.showTimeseries = !app.showTimeseries}"
          ?active=${app.showTimeseries} class="material-icons">timeline</span>

        <span id="status">
          <span class="text">${sitesSelectedText}${unsafeHTML(variableText)}</span>
          <span ?show=${app.selectedSeries != 'datainfo' && app.selectedSites.length > 0} class="add-to-left-right">
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