mapboxgl.accessToken = 'pk.eyJ1IjoiMzAxMDAwN2wiLCJhIjoiY201d2dhc2d0MGJuODJqcXpkdHNvbzhwNCJ9.-1khN48PLmaCdO5taXQytA';

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/3010007l/cm6z7xfzr01i201pbelq1401i",
  center: [-4.072881, 56.92816],
  zoom: 5.5
});

map.on('load', () => {
  console.log("Map loaded successfully!");
  console.log("Available sources:", map.getStyle().sources); // Debug: Check available sources

  // 🔹 Add Castle Data Source
  map.addSource('CastleData', {
    type: 'vector',
    url: 'mapbox://3010007l.0rhd01oa'
  });

  // 🔹 Add Main Castle Layer
  map.addLayer({
    id: 'CastleLayer',
    type: 'symbol',
    source: 'CastleData',
    'source-layer': 'Castles_DandL_lat_long-7hcfa3', // Ensure this is the correct source-layer name
    layout: {
      'icon-image': 'castle-15',
      'icon-size': 1.5,
      'icon-allow-overlap': true
    }
  });

  

  
  // 🔹 Tab Switching Function
  function openTab(event, tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
  }
  });



   map.on("mousemove", (event) => {
 const dzone = map.queryRenderedFeatures(event.point, {
 layers: ["castles-dandl-lat-long-7hcfa3"]
 });
 document.getElementById("pd").innerHTML = dzone.length
 ? `<h3>${dzone[0].properties.DES_TITLE}</h3><p>Local Authority: 
<strong>${dzone[0].properties.LOCAL_AUTH}</strong></p>`
 : `<p>Hover over a Castle point!</p>`;
});

map.addControl(new mapboxgl.NavigationControl(), "top-left");
 map.addControl(
 new mapboxgl.GeolocateControl({
 positionOptions: {
 enableHighAccuracy: true
 },
 trackUserLocation: true,
 showUserHeading: true
 }),
 "top-left"
);

 const geocoder = new MapboxGeocoder({
 // Initialize the geocoder
 accessToken: mapboxgl.accessToken, // Set the access token
 mapboxgl: mapboxgl, // Set the mapbox-gl instance
 marker: false, // Do not use the default marker style
 placeholder: "Search for places in Scotland", // Placeholder text for the search bar
 proximity: {
 longitude: 56.659405,
 latitude: 4.011213
 } // Coordinates of Glasgow center
});
map.addControl(geocoder, "top-left")