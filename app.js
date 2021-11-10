// const svg = d3.select("#dataviz")
// svg.append("circle")
//     .attr("cx", 0).attr("cy", 0).attr("r", 40).style("fill", "blue");


// var x = d3.scaleLinear()
//     .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
//     .range([0, 400]);       // This is the corresponding value I want in Pixel

// // Show the axis that corresponds to this scale
// svg.call(d3.axisBottom(x));




const legendSvg = Legend(d3.scaleSequential([6, 8], d3.interpolatePRGn), {
  title: "pH",
  width: 264,
  marginLeft: 18,
  marginRight: 18
});

$('#dataviz').append(legendSvg);


registerButtonClick('physical');
registerButtonClick('biological');
registerButtonClick('chemical');

registerSourceSelect('turbidity', 'Turbidity', 'green');
registerSourceSelect('ecoli', 'Escherichi', 'yellow');
registerSourceSelect('nitrate', 'Nitrate_Ni', 'purple');
registerSourceSelect('ph', 'pH', 'purple');

$('#chemical').click();
$('#ph').click();


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
OBJECTID: 9
Object_ID: 9
Sampling_P: "4/23/14 - 3/25/15"
SymbolID: null
Temp: 10.68
Total_Diss: 357
Total_Phos: 0.25
Total_Susp: 12.92
Turbidity: 9.17
Water_Body: "Carrol Creek"
pH: 7.85
*/