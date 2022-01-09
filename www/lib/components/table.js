import {LitElement, html} from 'lit'; 
import {customElement, queryAll, property} from 'lit/decorators.js';

@customElement('river-table')
class RiverTable extends LitElement {
  @property({attribute: false}) modal; 
  @queryAll('.modal') modalEls;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    // this.modal = M.Modal.init(this.modalEls, {})[0];
  }

  render() {
    return html`
      <div id="table" class="card">
      <h3>Here goes data table</h3>
      </div>
    `;
  }

  // render() {
  //   return html`
  //     <div id="modal-table" class="modal">
  //       <div class="modal-content">
  //         <h4>Modal</h4>
  //         <table class="highlight">
  //           <tbody></tbody>
  //         </table>
  //       </div>
  //       <div class="modal-footer">
  //         <a class="modal-close waves-effect waves-green btn-flat">Close</a>
  //       </div>
  //     </div>
  //   `;
  // }
}