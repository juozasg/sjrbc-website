
    const svg = d3.select("#dataviz")
    svg.append("circle")
        .attr("cx", 0).attr("cy", 0).attr("r", 40).style("fill", "blue");


    var x = d3.scaleLinear()
        .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, 400]);       // This is the corresponding value I want in Pixel
    
    // Show the axis that corresponds to this scale
    svg.call(d3.axisBottom(x));

    const l = Legend(d3.scaleSequential([6, 8], d3.interpolatePRGn), {
      title: "pH",
      width: 200,
      marginLeft: 32
    });

    $('#data').append(l);

    function clg(o) {
      console.log(o);
    }

    function registerButtonClick(item) {
      
      $(`#${item}`).click(() => {
        $('.data-selector').hide();
        $(`#${item}-selector`).css('display', 'flex');
      })
    }

    function registerSourceSelect(button_id, property, color) {
      $(`#${button_id}`).click(() => {
        window.sites.setStyle((p) => {
          return { color: color,
          stroke: false,
          fillOpacity: 0.9,
          radius: p.properties[property]/ 100}
        });
      })
    }
  
    const featureService = "https://services1.arcgis.com/fe2kKd3pQJKqve16/arcgis/rest/services/HistoricMonitoringSites/FeatureServer/0";

    const apiKey = "AAPK3dfaa40a13c0404983142c26b566596ammsJLVROPRkVaZnrwj6bYIrYdi4FEikx7NZpYg7f5M9XlV2RFL6PgxMA_56IceHv";
    const basemapEnum = "ArcGIS:Topographic";

    const map = L.map("map", {
      minZoom: 2
    }).setView([41.55,-85.8], 10);

    window.map = map;

    L.esri.Vector.vectorBasemapLayer(basemapEnum, {
      apiKey: apiKey
    }).addTo(map);

    const sites = L.esri.featureLayer({
      url: featureService,
      style: (p) => {
        return { color: "orange",
        stroke: false,
        fillOpacity: 0.9,
        radius: p.properties.Nitrate_Ni}
      },
      pointToLayer: (p, latlng) => {
        //clg(p);
        return L.circleMarker(latlng);
      }
    }).addTo(map);

    window.sites = sites;

    registerButtonClick('physical');
    registerButtonClick('biological');
    registerButtonClick('chemical');

    registerSourceSelect('turbidity', 'Turbidity', 'green');
    registerSourceSelect('ecoli', 'Escherichi', 'yellow');
    registerSourceSelect('nitrate', 'Nitrate_Ni', 'purple');