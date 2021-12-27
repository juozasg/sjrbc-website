import {LitElement, html} from 'lit'; 
import {customElement, queryAll, property} from 'lit/decorators.js';

@customElement('river-loading')
class RiverLoading extends LitElement {
  @property({attribute: false}) modal; 
  @property() loadedUSGS;
  @property() loadedHistoric;
  @property() failures;

  @queryAll('.modal') modalEls;


  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.modal = M.Modal.init(this.modalEls, {})[0];
    this.modal.open();
  }

  failure(e) {
    this.failures += (e.message + "\n");
  }

  constructor() {
    super();
    this.failures = '';
    this.loadedUSGS = false;
    this.loadedHistoric = false;
    window.ld = this;
  }

  render() {
    let usgs;
    let historic;

    if (this.loadedUSGS) {
      usgs = html`
        <h5>USGS Data Loaded</h5>
        <div class="progress">
          <div style="width: 100%" class="determinate"></div>
        </div>
      `;
    } else {
      usgs = html`
      <h5>USGS Data</h5>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    `;
    }


    if (this.loadedHistoric) {
      historic = html`
        <h5>Historic Monitoring Data Loaded</h5>
        <div class="progress">
          <div style="width: 100%" class="determinate"></div>
        </div>
      `;
    } else {
      historic = html`
      <h5>Historic Monitoring Data</h5>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    `;
    }


    return html`
      <div id="modal-loading" class="modal">
        <div class="modal-content">
          <h4>Loading...</h4>
          <div id="datalist">
            ${usgs}
            ${historic}
            <pre style="overflow: auto" class="pink-text text-darken-2">${this.failures}</pre>
          </div>
        </div>
        <div class="modal-footer">
          <a class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    `;
  }

  updated() {
    if(this.loadedHistoric == true && this.loadedUSGS == true) {
      this.modal.close();
    }
  }
}