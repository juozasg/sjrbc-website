globalThis.App = {}

// App.featureLayer.eachFeature((t, e) => {clg(t.feature.properties)})
// name = $('#ph').text()
App.vars = {
  ph: {
    field: 'pH', 
    scale: d3.scaleSequential([6, 8], d3.interpolatePRGn)
  },
  turbidity: {
    field: 'Turbidity', 
    scale: d3.scaleSequential([0, 50], d3.interpolateBlues)
  },
  ecoli: {
    field: 'Escherichi', 
    scale: d3.scaleSequential([0, 2000], d3.interpolateOranges)
  },
  nitrate: {
    field: 'Nitrate_Ni', 
    scale: d3.scaleSequential([0, 5], d3.interpolateRdPu)
  }
}

async function initApp() {
  const legendSvg = Legend(App.vars.ph.scale, {
    title: "pH",
    width: 264,
    marginLeft: 18,
    marginRight: 18
  });
  
  $('#dataviz').append(legendSvg);
  
  
  await loadMapData();

  clg(App.features);
  // App.featureLayer.on('load', () => { 
    // App.featureLayer.eachFeature((t, e) => {clg(t.feature)});
  // });
  
  
  registerCategory('physical');
  registerCategory('biological');
  registerCategory('chemical');


  for (const [key, value] of Object.entries(App.vars)) {
    registerDataVariable(key);
  }
  

  $('#chemical').click();
  $('#turbidity').click();
}

$(document).ready(() => { initApp(); })






/*
BOD: 19.64
BOD__mg_l: 1.63
Chlorides: 11.32
Conductivi: 682.4
Dissolved: 8.66
Escherichi: 54.17
Flow_cfs: 10.608
Lat: 41.32088
Location: "Bridge on CR 300W, 0.3 mi S of US33, Noble Co."
Long: -85.48046
Nitrate_Ni: 3.32
Temp: 10.68
Total_Diss: 357
Total_Phos: 0.25
Total_Susp: 12.92
Turbidity: 9.17
Water_Body: "Carrol Creek"
pH: 7.85
*/