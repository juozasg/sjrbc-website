import {LitElement, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';

import './toolbar.js'
import './map.js'
import './data-select.js'
import './table.js'
import './timeseries.js'

@customElement('river-app')
class RiverApp extends LitElement {

  @query('river-toolbar') toolbar;
  @query('river-table') table;
  @query('river-timeseries') timeseries;
  @query('river-data-select') dataSelect;

  @query('river-data-select-source') sourceSelect;
  @query('river-data-select-legend') legend;

  @query('river-map') map;


  // no Shadow DOM for Materialize CSS
  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.addEventListener('river:sourceId.change', this._handleSourceIdChange);
    this.addEventListener('river:siteSelection.change', this._handleSiteSelectionChange);
    this.addEventListener('river:componentVisibility.change', this._handleComponentVisibilityChange);

    this.showTable = false;
    this.showDataSelect = false;
    this.showTimeseries = false;
  }

  _handleSourceIdChange(e) {
    const sourceId = this.sourceSelect.sourceId;

    this.legend.sourceId = sourceId;
    this.map.sourceId = sourceId;
    this.toolbar.sourceId = sourceId;
  }

  _handleSiteSelectionChange(e) {
    const selectedSiteId = this.map.selectedSiteId;

    this.toolbar.selectedSiteId = selectedSiteId;
  }

  _handleComponentVisibilityChange(e) {
    this.showTable = this.toolbar.showTable;
    this.showDataSelect = this.toolbar.showDataSelect;
    this.showTimeseries = this.toolbar.showTimeseries;

    this.requestUpdate();
  }

  render() {
    return html`
      <main>
        <river-map></river-map>
        <river-toolbar></river-toolbar>
        <div class="ui-layout">
          <div class="ui-top">
            <river-table style="display: ${this.showTable ? 'block' : 'none'}"></river-table>
          </div>
          <div class="ui-bottom">
            <river-data-select class="ui-bottom-left" style="display: ${this.showDataSelect ? 'block' : 'none'}"></river-data-select>
            <river-timeseries class="ui-bottom-right" style="display: ${this.showTimeseries ? 'block' : 'none'}"></river-timeseries>
          </div>
        </div>
      </main>
    `;
  }
}


