
var quakeList = [];

// // Adding tile layer to the map
// var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// });

// Assemble API query URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson" //4.5+ earthquakes in the last week

// Grab the data with d3
d3.json(queryUrl, function(response) {
  console.log(response);
  // loop over response.features 
    // coord: x.geometry.coordinates
    // magnitude = x.properties.mag

    // color fxn
  function getColor(magnitude){
    switch(true) {
      case magnitude >= 5:
        // code block
        return "#4B0082"; //indigo
      case magnitude >= 4:
        // code block
        return "#8B008B"; //darkmagenta
      case magnitude >= 3:
        // code block
        return "#BA55D3"; //mediumorchid
      case magnitude >= 2:
        // code block
        return "#DA70D6"; //orchid
      case magnitude >= 1:
        // code block
        return "#DDA0DD"; //plum
      default:
        // code block
        return "#D8BFD8"; //thistle
    }
  }
    // size fxn
  function getRad(magnitude){
    return magnitude === 0 ? 1 : magnitude*40000;
  };

  function getStyle(quake){
    return {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: getColor(quake.properties.mag),
      radius: getRad(quake.properties.mag)
    };
  };
  

  response.features.forEach(quake => {
    quakeList.push(
      L.circle(quake.geometry.coordinates, getStyle(quake))
    );
  });

  
});
console.log(quakeList);
var earthquakes = L.layerGroup(quakeList);
console.log(earthquakes);

 // add in earthquakes layer here
var myMap = L.map("map", {
  center: [53.8516, -161.2588],
  zoom: 3,
  layers: [earthquakes]
});

layer2 = {
  Earth: earthquakes
}

 L.control.layers(null, layer2, {
   collapsed: false
 }).addTo(myMap);

// Adding tile layer to the map
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


