//Relevant activities: day 3 activity 1 advanced, day 1 activity 9.

// Assemble API query URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson" //1+ earthquakes in the last month


//helper functions:
// color fxn
function getColor(mag){
  switch(true) {
    case mag >= 5:
      // code block
      return "#FF0000";
    case mag >= 4:
      // code block
      return "#ff6600"; 
    case mag >= 3:
      // code block
      return "#FFCC00"; 
    case mag >= 2:
      // code block
      return "#ccff00"; 
    case mag >= 1:
      // code block
      return "#66ff00"; 
    default:
      // code block
      return "#00FF00"; 
  }
}
  // size fxn
function getRad(mag){
  return mag === 0 ? 1 : mag*2;
};

function getStyle(quake){
  return {
    stroke: false,
    fillOpacity: 0.75,
    color: getColor(quake.properties.mag),
    radius: getRad(quake.properties.mag)
  };
};

d3.json(queryUrl, response => {
  console.log(response)
  createFeatures(response.features);
});

function createFeatures(data) {

  quakes = L.geoJSON(data, {
    pointToLayer: function(data,latlng) {
      return L.circleMarker(latlng, getStyle(data))
    },
    onEachFeature: function(feature,layer){
      layer.bindPopup("<h3><hr><p>"+new Date(feature.properties.time)+"</p><p>" +feature.properties.place+"</p>")
    }
  });


  createMap(quakes);
};

function createMap(quakes) {
   // Define satellite, grayscale and outdoor map layers
   var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    // tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var grayscalemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    // tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    // tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });

   // Define a baseMaps object to hold our base layer
   var baseMaps = {
    "Satellite Map": satellitemap,
    "Grayscale Map": grayscalemap,
    "Outdoor Map": outdoormap
  };
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: quakes,
  };
  // put mymap here
  var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [satellitemap,quakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);

  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "legend"),
        labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
        // mags = [0,1, 2, 3, 4, 5];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < labels.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(i) + '"></i> ' +
            labels[i] +  '<br>';
    }
    return div;
  };
  // legend colors won't show up still - color visible under elements when inspected
  legend.addTo(myMap);

};






