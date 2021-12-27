import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import * as d3 from "d3";
window.d3 = d3;

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import {measurementScaleLegend} from  '../../legend/scale.js';
import {measurementRadiusLegend, samplingFrequencyRadiusLegend} from  '../../legend/radius.js';

@customElement('river-data-select-legend')
class RiverDataSelectLegend extends LitElement {
  @property() sourceId;
  @query('#legend') legendContainer;

  // no Shadow DOM
  createRenderRoot() {
    return this;
  }

  renderLegend() {
    this.legendContainer.replaceChildren();
    if(this.sourceId == undefined) {
      return;
    }

    let colorScale;
    if(this.sourceId == 'datainfo') {
      // 90 to 0 days last measurement currency
      colorScale = d3.scaleSequential([90, 0], d3.interpolateMagma);
    } else {
      colorScale = d3.scaleSequential([0, 5000], d3.interpolateBuPu);
    }

    const averageColor = colorScale.copy().domain([0, 1])(0.5);

    // COLOR SCALE
    let scaleLegend = measurementScaleLegend(colorScale)
    this.legendContainer.appendChild(scaleLegend);

    // let label;
    if(this.sourceId == 'datainfo') {
      let label = document.createElement('h6');
      label.innerText = 'Days since last observation';
      label.setAttribute('class', 'datainfo-color-label');
      this.legendContainer.appendChild(label);
    }

    
    // RADIUS SCALE
    let radiusLegend;
    label = document.createElement('h6');

    if(this.sourceId == 'datainfo') {
      // data density is ordinal data [Y,M,...,RT] or [0,1,...,4]
      radiusLegend = samplingFrequencyRadiusLegend(colorScale);      
      label.innerText = 'Site sampling frequency';
    } else {
      radiusLegend = measurementRadiusLegend(colorScale);
      label.innerText = this.sourceId;
    }

    this.legendContainer.appendChild(radiusLegend);
    this.legendContainer.appendChild(label);
  }

  sourceChanged(sourceId) {
    this.sourceId = sourceId;

    // architect the whole legend thing to be good and work with data
  }


  render() {
    console.log(' render');
    return html`
      <div id="legend"></div>
    `;
  }

  updated() {
    this.renderLegend();

    tippy('#legend .tippy', {
      zIndex: 10001
    });
  }
}

