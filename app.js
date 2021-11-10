globalThis.App = {}

function clg(o) {
  console.log(o);
}

// featureMinMaxInt('pH') = [7, 9]
function featureMinMaxInt(prop) {
  const vals = App.features.map((f) => f.properties[prop]);
  const min = Math.min(0, Math.floor(d3.min(vals)));
  return [min, Math.ceil(d3.max(vals))];
}

function featureMinMax(prop) {
  const vals = App.features.map((f) => f.properties[prop]);
  return [d3.min(vals), d3.max(vals)];
}

function initVars() {
  // make sure the pH scale never starts at anything larger than 6
  const phmm = featureMinMax('pH');
  const phmin = Math.min(6.5, phmm[0]);
  const phmax = phmm[1];

  App.vars = {
    ph: {
      prop: 'pH',
      scale: d3.scaleDiverging([phmin, 7, phmax], d3.interpolatePRGn)
    },
    turbidity: {
      prop: 'Turbidity',
      label: 'Turbidity (NTU)',
      scale: d3.scaleSequential(featureMinMaxInt('Turbidity'), d3.interpolateBlues)
    },
    ecoli: {
      prop: 'Escherichi',
      label: 'Escherichia coli',
      scale: d3.scaleSequential(featureMinMaxInt('Escherichi'), d3.interpolateOranges)
    },
    nitrate: {
      prop: 'Nitrate_Ni',
      scale: d3.scaleSequential(featureMinMaxInt('Nitrate_Ni'), d3.interpolateRdPu)
    }
  }
}

async function initApp() {
  await loadMapData();

  initVars();

  registerCategory('physical');
  registerCategory('biological');
  registerCategory('chemical');

  for (const [key, value] of Object.entries(App.vars)) {
    registerDataVariable(key);
  }

  $('#physical').click();
  $('#turbidity').click();

  // show display after things load to make it look nicer
  $('#ui').css('display', 'flex');
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