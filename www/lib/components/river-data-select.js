import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {HideReflowsController} from './controllers/hide-reflows.js'

@customElement('river-data-select')
class RiverDataSelect extends LitElement {
  hideReflows = new HideReflowsController(this);

  // no Shadow DOM
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.hideReflows.slideDown();

    var elems = this.querySelectorAll('.dropdown-trigger');
    console.log(elems);
    M.Dropdown.init(elems, {constrainWidth: false});
  }

  render() {
    return html`
      <div class="card data-select">
        <div id="filters">

          <button class="btn waves-effect waves-light active" id="datainfo">Data Info</button>

          <a class="btn dropdown-trigger">Gage<i class="material-icons right">arrow_drop_down</i></a>
          <ul id="gage" class="dropdown-content">
            <li><a id="flow">Flow (cu ft/s)</a></li>
            <li><a id="height">Height (ft)</a></li>
          </ul>

          <a class="btn dropdown-trigger">Environmental<i class="material-icons right">arrow_drop_down</i></a>
          <ul id="env" class="dropdown-content">
            <li><a id="turbidity">Turbidity</a></li>
            <li><a id="temp">Temperature</a></li>

            <li class="divider" tabindex="-1"></li>

            <li><a id="ecoli">E. Coli</a></li>

            <li class="divider" tabindex="-1"></li>

            <li><a id="nitrate">Nitrate</a></li>
            <li><a id="ph">pH</a></li>
          </ul>
        </div>

        <div id="legendviz" height=200 width=264></div>
      </div>
    `;
  }
}
// customElements.define('river-data-select', RiverDataSelect);

