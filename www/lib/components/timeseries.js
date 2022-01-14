import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {observeState} from 'lit-element-state';

import {app} from '../state/app.js';

import Plotly from 'plotly.js-dist'


@customElement('river-timeseries')
class RiverTimeseries extends observeState(LitElement) {
  createRenderRoot() {
    return this;
  }


  firstUpdated() {
    // manually observe
    app.addObserver(() => this.updatePlotly(), ['leftTimeseries', 'rightTimeseries']);
    app.addObserver(() => this.requestUpdate(), ['showDataSelect', 'viewportWidth']);
  }

  updated() {
    this.updatePlotly();
  }

  updatePlotly() {
    let selectorOptions = {
      buttons: [{
          step: 'month',
          stepmode: 'backward',
          count: 1,
          label: '1m'
      }, {
          step: 'month',
          stepmode: 'backward',
          count: 6,
          label: '6m'
      }, {
          step: 'year',
          stepmode: 'todate',
          count: 1,
          label: 'YTD'
      }, {
          step: 'year',
          stepmode: 'backward',
          count: 1,
          label: '1y'
      }, {
          step: 'all',
      }],
    };

    let data = this.prepData({});
    let layout = {
        title: 'Time series with range slider and selectors',
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        },
        width: this.width - 2,
        height: this.height - 2
    };

    // console.log(layout);

    let config = {responsive: true}

    Plotly.react('plotly', data, layout, config);

  }


  prepData(rawData) {
    var x = [0, 1, 2, 3];
    var y = [10, 20, 11, 42];

    // rawData.forEach(function(datum, i) {

    //     x.push(new Date(datum[xField]));
    //     y.push(datum[yField]);
    // });

    return [{
        mode: 'lines',
        x: x,
        y: y
    }];
  }



  render() {
    let ds = document.getElementsByTagName('river-data-select')[0]
    this.height = ds.height;
    this.width = app.viewportWidth;
    if(app.showDataSelect) {
      this.width = this.width - ds.width - 4;
    }
    const style = `width: ${this.width}px; height: ${this.height}px;`

    return html`
    <div id="timeseries" class="card" style="${style}">
      <div id="plotly"></div>
      <!-- <h5>Select sites and click <- or -> to add</h5> -->
    </div>
    `;
  }
}