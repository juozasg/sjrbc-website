function scaleToStyle(scale) {
  return (feature) => ({
    color: "orange",
    stroke: false,
    fillOpacity: 0.9,
    radius: p.properties.Nitrate_Ni
  });
}

function clg(o) {
  console.log(o);
}

function registerButtonClick(item) {
  
  $(`#${item}`).click(() => {
    $('.data-selector').hide()
    $(`#${item}-selector`).css('display', 'flex');

    $('.category-selector button').removeClass('active');
    $(`button#${item}`).addClass('active');
  })
}

function registerSourceSelect(button_id, property, color) {
  const button = $(`#${button_id}`);
  button.click((e) => {
    $('.data-selector button').removeClass('active');
    button.addClass('active');
    window.sites.setStyle((p) => {
      return { color: color,
      stroke: false,
      fillOpacity: 0.9,
      radius: p.properties[property]/ 100}
    });
  })
}

