import * as d3 from "d3";

const radiusTicksXs = [10, 50, 95, 150, 208];

// scale maps variable value domain to radius. ex: [0, 5000.0] -> [5, 20]
export function measurementRadiusLegend(color, radiusScale) {
  // map domain [0,1] to radius
  const radiusUnitScale = radiusScale.copy().domain([0,1]);
  // map domain [0,1] to variable value (observation/measurement)
  const measurementUnitScale = d3.scaleLinear().range(radiusScale.domain())
  
  const svg = d3.create("svg")
    .attr("height", 90)
    .style("display", "block");

  // groups
  const groups = svg.selectAll('circle')
    .data(radiusTicksXs) // cx
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d + 18},30)`)

  // circle with radius
  appendRadiusCircle(groups, color, radiusUnitScale);

  // label
  groups.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 40)
    .text((d, i) => Math.floor(measurementUnitScale(i/4.0)));


  return svg.node();
}

// ex: [0,1] => [5, 20]
export function dataDensityRadiusLegend(color, radiusUnitScale) {
  const longNames = ['Yearly', 'Monthly', 'Weekly', 'Daily', 'Real-time'];
  const names = ['Y', 'M', 'W', 'D', 'RT'];

  console.log(radiusTicksXs);
  
  // data density values: [0, 1, 2, 3, 4, 5]
  const svg = d3.create("svg")
  .attr("height", 80)
  .style("display", "block");

  const groups = svg.selectAll('circle')
    .data([10, 50, 95, 150, 208]) // cx
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d + 36},30)`)
    .attr('class', 'tippy')
    .attr('data-tippy-content', (d,i) => longNames[i]);
  
  // circle with radius
  appendRadiusCircle(groups, color, radiusUnitScale);

  groups.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 40)
    .text((d, i) => names[i]);


  return svg.node();
}


function appendRadiusCircle(sel, color, radiusUnitScale) {
  sel.append("circle")
    .attr("r", (d, i) => radiusUnitScale(i/4.0))
    .attr("fill", color)
    .attr("stroke", "black")
    .attr("stroke-width", "2");

  return sel;
}