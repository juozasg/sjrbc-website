import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';


@customElement('river-data-select-source')
class RiverDataSelectSource extends LitElement {
  @property() sourceId;
  @state() category;

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.sourceId = "datainfo";
    this.category = "datainfo";
  }

  firstUpdated() {
    var elems = this.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {constrainWidth: false});
    this._notifyDataSelectChange()
  }

  dataSourceClicked(e) {
    console.log(e.target);
    console.log(e.currentTarget);
  }

  classActive(category) {
    if(category == this.category) {
      return "active";
    } else {
      return "";
    }
  }

  sourceSelect(e) {
    this.sourceId = e.target.id;
    if(this.sourceId == "datainfo") {
        this.category = "datainfo";
    } else {
      this.category = e.target.closest("ul").id;
    }

    this._notifyDataSelectChange();
  }

  async _notifyDataSelectChange() {
    await this.updateComplete;
    this.dispatchEvent(new CustomEvent('river:data-select.change', {bubbles: true}));
  }

  render() {
    return html`
      <button class="btn waves-effect waves-light ${this.classActive('datainfo')}" class="active" @click="${this.sourceSelect}" id="datainfo">Data Info</button>

      <a class="btn dropdown-trigger ${this.classActive('gage')}" data-target="gage">Gage<i class="material-icons right">arrow_drop_down</i></a>
      <ul id="gage" class="dropdown-content">
        <li><a @click="${this.sourceSelect}" id="flow">Flow (cu ft/s)</a></li>
        <li><a @click="${this.sourceSelect}" id="height">Height (ft)</a></li>
      </ul>

      <a class="btn dropdown-trigger ${this.classActive('env')} " data-target="env">Environmental<i class="material-icons right">arrow_drop_down</i></a>
      <ul id="env" class="dropdown-content">
        <li><a @click="${this.sourceSelect}" id="turbidity">Turbidity</a></li>
        <li><a @click="${this.sourceSelect}" id="temp">Temperature</a></li>

        <li class="divider" tabindex="-1"></li>

        <li><a @click="${this.sourceSelect}" id="ecoli">E. Coli</a></li>

        <li class="divider" tabindex="-1"></li>

        <li><a @click="${this.sourceSelect}" id="nitrate">Nitrate</a></li>
        <li><a @click="${this.sourceSelect}" id="ph">pH</a></li>
      </ul>
    `;
  }
}

