/*
chlorides [0, 501.87]   AVG: 22.8 MEDIAN: 22.8
do [0.31, 60]   AVG: 6.7 MEDIAN: 6.7
ecoli [0, 210000]   AVG: 132 MEDIAN: 132
flow [56.8, 6120]  AVG:412 MEDIAN:412
height [2.93, 21.25]  AVG:5.11 MEDIAN:5.11
nitrates [0, 184.49]   AVG: 1.2 MEDIAN: 1.2
ph [5.58, 12.4]   AVG: 8.04 MEDIAN: 8.04
phosphorus [0, 26.3]   AVG: 0.222 MEDIAN: 0.222
spc [2, 2141]   AVG: 509 MEDIAN: 509
tds [351, 700]   AVG: 583 MEDIAN: 583
temp [3.5, 34.1]   AVG: 20.1 MEDIAN: 20.1
tss [0, 408]   AVG: 5.5 MEDIAN: 5.5

raining [NaN, NaN]   AVG: 0 MEDIAN: 0
wet [0, 1]   AVG: 0 MEDIAN: 0
*/

import * as d3 from "d3";

let interpolateBuYlRd = (x) => {
  return d3.interpolateRdYlBu(Math.abs(x - 1.0));
}

const scales = {
  chlorides: d3.scaleSequential([0, 600], d3.interpolateGreens),
  datainfo: d3.scaleSequential([365, 0], d3.interpolateMagma),
  do: d3.scaleSequential([0, 100], d3.interpolateGreens),
  ecoli: d3.scaleSequential([0, 1000], d3.interpolateYlOrBr),
 
  flow: d3.scaleSequential([0, 8000], d3.interpolateGnBu),
  height: d3.scaleSequential([0, 30], d3.interpolateBlues),
  nitrates: d3.scaleSequential([0, 200], d3.interpolatePurples),
  ph: d3.scaleSequential([5.5, 12.5], d3.interpolateTurbo),
 
  phosphorus: d3.scaleSequential([0, 30], d3.interpolateInferno),
  spc: d3.scaleSequential([0, 2500], d3.interpolateReds),
  tds: d3.scaleSequential([0, 800], d3.interpolatePuRd),
  temp: d3.scaleSequential([0, 35], interpolateBuYlRd),
  tss: d3.scaleSequential([0, 500], d3.interpolateRdPu)
}


const labels = {
  chlorides: "Chlorides",
  // datainfo: "Chlorides",
  do: "Dissolved Oxygen",
  ecoli: "E. Coli",
 
  flow: "Flow (cu ft/s)",
  height: "Height (ft)",
  nitrates: "Nitrates",
  ph: "pH",
 
  phosphorus: "Phosphorus",
  spc: "Specific Conductance",
  tds: "Total Dissolved Solids",
  temp: "Temperature (C)",
  tss: "Total Suspended Solid"
}


export {scales, labels};
