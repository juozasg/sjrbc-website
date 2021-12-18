import {LitElement, html} from 'lit'; 
import {customElement, queryAll, property} from 'lit/decorators.js';

@customElement('river-table')
class RiverTable extends LitElement {
  @property({attribute: false}) modal; 
  @queryAll('#modal') _modalNodeList;
  
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.modal = M.Modal.init(this._modalNodeList, {})[0];
    // this.modal.open();
  }

  render() {
    return html`
      <div id="modal" class="modal">
        <div class="modal-content">
          <h4>Modal</h4>
          <table class="highlight">
            <tbody></tbody>
          </table>
        </div>
        <div class="modal-footer">
          <a class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    `;
  }
}