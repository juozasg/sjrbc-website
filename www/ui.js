const radiusRange = [5, 20]

function scaleToStyle(variable) {
  return (feature) => {
    const v = App.vars[variable];
    let val = feature.properties[v.prop];
    if(variable == "datainfo" && val === undefined) {
      val = 30;
    }

    const color = v.scale(val);
    const radius = v.scale.copy().range(radiusRange)(val)

    return {
      fillColor: color,
      stroke: true,
      color: 'black',
      weight: 2,
      fillOpacity: 0.9,
      radius: radius
    }
  }
}

function hideStyle() {
  return (feature) => {
    return {fillOpacity:0, stroke: false};
  }
}

function buildRadiusLegend(variable) {
  const width = 228;
  const x0 = 18;
  const height = 60;
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible")
    .style("display", "block");

    const v = App.vars[variable];
    const scaleColor = v.scale.copy().domain([0, 1]);
    const scaleRadius = scaleColor.copy().range(radiusRange);

    [10, 50, 95, 150, 208].forEach((x, i) => {
      let v = x/228;
      let r = scaleRadius(v);
      let cx = x0 + x;
      svg.append("circle")
      .attr("cx", cx)
      .attr("cy", 30)
      .attr("r", r)
      .attr("fill", scaleColor(v))
      .attr("stroke", "black")
      .attr("stroke-width", "2");
    });

    return svg.node();
}

function replaceLegend(variable) {
  $('svg.legend').remove();

  const label = App.vars[variable].label || $(`button#${variable}`).text();
  const legendSvg = Legend(App.vars[variable].scale, {
    title: label,
    width: 264,
    marginLeft: 18,
    marginRight: 18,
    ticks: 7
  });

  legendSvg.setAttribute('class', 'legend');
  $('#legendviz').append(legendSvg);

  // radius legend
  const rLegendSvg = buildRadiusLegend(variable);
  rLegendSvg.setAttribute('class', 'legend');
  $('#legendviz').append(rLegendSvg);
}

function registerCategory(item) {
  $(`#${item}`).click(() => {
    $('.data-selector').hide()
    $(`#${item}-selector`).css('display', 'flex');

    $('.category-selector button').removeClass('active');
    $(`button#${item}`).addClass('active');
  })
}

function registerDataVariable(variable) {
  const button = $(`#${variable}`);
  button.click((e) => {
    $('#filters *').removeClass('active');
    button.addClass('active');
    // button.parents('active');

    if(variable == 'datainfo') {
      App.featureLayer.setStyle(scaleToStyle(variable));
      App.usgsFeatureLayer.setStyle(scaleToStyle(variable));
    } else if(App.vars[variable].usgs) {
        App.usgsFeatureLayer.setStyle(scaleToStyle(variable));
        App.featureLayer.setStyle(hideStyle());
    } else {
      App.featureLayer.setStyle(scaleToStyle(variable));
      App.usgsFeatureLayer.setStyle(hideStyle());
    }

    replaceLegend(variable);
  })
}

