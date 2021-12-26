import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import * as d3 from "d3";
window.d3 = d3;

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


import {measurementRadiusLegend, dataDensityRadiusLegend} from  '../../legend/radius.js';

@customElement('river-data-select-legend')
class RiverDataSelectLegend extends LitElement {
  @property() sourceId;
  @query('#legend') legendContainer;


  // [min, max] pixels
  radiusRange = [5, 20];

  // no Shadow DOM
  createRenderRoot() {
    return this;
  }


  // replaceLegend(variable) {
  //   $('svg.legend').remove();

  //   const label = this.sourceId;
  //   const legendSvg = Legend(App.vars[variable].scale, {
  //     title: label,
  //     width: 264,
  //     marginLeft: 18,
  //     marginRight: 18,
  //     ticks: 7
  //   });

  //   legendSvg.setAttribute('class', 'legend');
  //   $('#legendviz').append(legendSvg);

  //   // radius legend
  //   const rLegendSvg = buildRadiusLegend(variable);
  //   rLegendSvg.setAttribute('class', 'legend');
  //   $('#legendviz').append(rLegendSvg);
  // }

  renderLegend() {
    this.legendContainer.replaceChildren();

    // 90 to 0 days last measurement currency
    let colorScale = d3.scaleSequential([90, 0], d3.interpolateCividis);
    const averageColor = colorScale.copy().domain([0, 1])(0.5);

    // 1 montly reading to 2976 readings (15 mins for 31 days)
    let radiusLegend = dataDensityRadiusLegend(averageColor, d3.scaleLinear().range([5, 20]));
    this.legendContainer.appendChild(radiusLegend);

    let label = document.createElement('h6');
    label.innerText = 'Site sampling frequency';
    this.legendContainer.appendChild(label);
  }

  sourceChanged(sourceId) {
    this.sourceId = sourceId;

    // architect the whole legend thing to be good and work with data
  }


  render() {
    console.log('legend render');
    return html`
      <div id="legend"></div>
    `;
  }

  updated() {
    this.renderLegend();

    tippy('.tippy', {
      zIndex: 10001
    });
    // var elems = this.querySelectorAll('.tooltipped');
    // var instances = M.Tooltip.init(elems, {position: 'top'});
  }
}

