
// scaleToStyle('ph')

const radiusRange = [5, 20]

function linearDomain(variable) {
  const v = App.vars[variable];
  // [min, max] for continuous scale
  // [min, center, max] for divergent scales like ph
  // linearDomain = [min, max]
  const domain = v.scale.domain();
  const linearDomain = [domain[0], domain.slice(-1)[0]];

  return linearDomain;
}

function scaleToStyle(variable) {
  return (feature) => {
    const v = App.vars[variable];
    const val = feature.properties[v.prop];
    const color = v.scale(val);
    const radius = d3.scaleLinear().domain(linearDomain(variable)).range(radiusRange)(val);

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

function replaceLegend(variable) {
  $('svg.legend').remove();

  const label = App.vars[variable].label || $(`button#${variable}`).text();
  const legendSvg = Legend(App.vars[variable].scale, {
    title: label,
    width: 264,
    marginLeft: 18,
    marginRight: 18
  });
  legendSvg.setAttribute('class', 'legend');

  $('#legendviz').append(legendSvg);
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
    $('.data-selector button').removeClass('active');
    button.addClass('active');
    App.featureLayer.setStyle(scaleToStyle(variable));
    replaceLegend(variable);
  })
}

