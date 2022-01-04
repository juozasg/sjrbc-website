import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import * as d3 from "d3";
window.d3 = d3;

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


import {scales, labels} from "../../data/definitions.js";

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

    let colorScale = scales[this.sourceId];

    // COLOR SCALE
    let scaleLegend = measurementScaleLegend(colorScale)
    this.legendContainer.appendChild(scaleLegend);

    let label;
    if(this.sourceId == 'datainfo') {
      label = document.createElement('h6');
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
      label.innerText = labels[this.sourceId];
    }

    this.legendContainer.appendChild(radiusLegend);
    this.legendContainer.appendChild(label);
  }

  sourceChanged(sourceId) {
    this.sourceId = sourceId;
  }


  render() {
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

