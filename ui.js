function clg(o) {
  console.log(o);
}


// scaleToStyle('ph')
function scaleToStyle(variable) {
  return (feature) => {
    const v = App.vars[variable];
    const val = feature.properties[v.prop];
    const color = v.scale(val);
    const radius = d3.scaleLinear().domain(v.scale.domain()).range([5, 20])(val);

    
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
  })
}

