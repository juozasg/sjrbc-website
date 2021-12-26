import * as d3 from "d3";

export function measurementScaleLegend(colorScale) {
    
  const svg = d3.create("svg")
    .attr("height", 50)
    // .attr("style", "border: 1px solid green;")
    .style("overflow", "visible")
    .style("display", "block");


    const dataUrl = colorGradientDataUrl(colorScale)

    let x0 = 10;
    svg.append("image")
      .attr("x", x0)
      .attr("y", 0)
      .attr("width", 280)
      .attr("height", 20)
      .attr("preserveAspectRatio", "none")
      .attr("href", dataUrl);


    svg.append("text")
      .attr("x", x0)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text("90");

    return svg.node();
}


function colorGradientDataUrl(colorScale) {
  let n = 256;

  colorScale = colorScale.copy().domain([0,1]);

  const canvas = document.createElement("canvas");
  canvas.width = n;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  for (let i = 0; i < n; ++i) {
    context.fillStyle = colorScale(i / (n - 1));
    context.fillRect(i, 0, 1, 1);
  }

  return canvas.toDataURL();
}