import { LitState, stateVar } from 'lit-element-state';

class AppState extends LitState {
    @stateVar() showTable = false;
    @stateVar() showDataSelect = true;
    @stateVar() showTimeseries = false;

    @stateVar() selectedSeries = 'datainfo';
    @stateVar() selectedSites = [];
}

export const app = new AppState();

window.app = app;
