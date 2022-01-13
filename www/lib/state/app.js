import { LitState, stateVar } from 'lit-element-state';

class AppState extends LitState {
  @stateVar() showTable = true;
  @stateVar() showDataSelect = true;
  @stateVar() showTimeseries = false;

  @stateVar() selectedSeries = 'ph';
  @stateVar() selectedSites = [];

  @stateVar() viewportWidth = window.innerWidth;
  @stateVar() viewportHeight = window.innerHeight;

  constructor() {
    super();

    window.addEventListener('resize', () => this.updateViewportSize());
  }

  updateViewportSize() {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    console.log(this.viewportWidth, this.viewportHeight);
  }

  toggleSiteSelection(siteId) {
    console.log('select site', siteId);
    let sites = _(this.selectedSites);
    if(sites.includes(siteId)) {
      this.selectedSites = sites.pull(siteId).clone();
    } else {
      this.selectedSites = sites.concat(siteId).clone();
    }

    console.log('selectedSites: ', this.selectedSites);
  }


  siteIsSelected(siteId) {
    return _(this.selectedSites).includes(siteId);
  }

  clearSelection() {
    this.selectedSites = [];
  }
}

export const app = new AppState();

window.app = app;
