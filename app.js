<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8' />
<title>Update a choropleth layer by zoom level</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.5.0/mapbox-gl.css' rel='stylesheet' />
<style>
body { margin:0; padding:0; }
#map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
 
<style>
 
.legend {
background-color: #fff;
border-radius: 3px;
bottom: 30px;
box-shadow: 0 1px 2px rgba(0,0,0,0.10);
font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
padding: 10px;
position: absolute;
right: 10px;
z-index: 1;
}
 
.legend h4 {
margin: 0 0 10px;
}
 
.legend div span {
border-radius: 50%;
display: inline-block;
height: 10px;
margin-right: 5px;
width: 10px;
}
 
 #Menu {
border-radius: 10px;
position: fixed;
height: auto;
font-family: arial;
margin: 5px;
padding: 10px;
z-index: 40;
background: #D3D3D3;
color: #444;
width: auto;
left: 65px;
top: 15px;
-moz-box-shadow: 0 0 10px #888;
 -webkit-box-shadow: 0 0 10px #888;
box-shadow: 0 0 10px #888;
border-color: #212223;
border-width: 2px;
border-style: solid;
}
 

 
</style>
 
<div id='map'></div>

<div id='Menu'>
  <strong>Mobile Provider:</strong>
  <select id="ProviderSelect"></select><br><br> 
    <strong>Technology:</strong>
    <select id="TechnologySelect"><option id="val" >Select a Technology</option></select><br><br> 
  <strong>Speed:</strong>
  <select id="SpeedSelect"></select><br><br>  
  
<button id="filterButton">Get Mobile Coverage Area</button>
<button id="resetButton">Reset</button>
  
</div>

 
 
 
<script>
mapboxgl.accessToken = 'pk.eyJ1IjoiZmNjIiwiYSI6InBiaGMyLU0ifQ.LOmVYpUCFv2yWpbvxDdQNg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: [-81.103, 35.581],
minZoom: 3,
zoom: 10
});
 
var zoomThreshold = 4;


// Get DOM Objects 
var filterButton = document.getElementById('filterButton')
var resetButton = document.getElementById('resetButton')


// Create Filter Button Action
filterButton.addEventListener('click', function(e){
if (ProviderSelect.selectedIndex == 0 && TechnologySelect.selectedIndex == 0 && SpeedSelect.selectedIndex == 0){
map.setFilter('CarolinaWest');
}
else if (SpeedSelect.selectedIndex != 0){
map.setFilter('CarolinaWest', ['==', 'MINUP', Number(SpeedSelect.value)]);
  }
else if (TechnologySelect.selectedIndex != 0){
map.setFilter('CarolinaWest', ['==', 'TECHNOLOGY', Number(TechnologySelect.value)]);
  }
  
});


// Create Reset Button Action
resetButton.addEventListener('click', function(e){
map.setFilter('CarolinaWest');
ProviderSelect.selectedIndex=0;
TechnologySelect.selectedIndex=0;
SpeedSelect.selectedIndex=0;
});



// Add Values to Dropdowns
 //Add Values to Provider Downdown
var ProviderSelect = document.getElementById("ProviderSelect");
var ProviderList = {
    'null' : 'Select a Provider...',
    'Carolina West' : 'Carolina West',
    'Verizon' : 'Verizon',
    'Sprint < 400'  : 'Sprint',
    'T-Mobile'  : 'T-Mobile'
}
for(index in ProviderList) {
    ProviderSelect.options[ProviderSelect.options.length] = new Option(ProviderList[index], index);
} 
 
//Add Values to Technology Downdown
var TechnologySelect = document.getElementById("TechnologySelect")

var TechnologyList = {
    80 : 'WCDMA/UMTS/HSPA',
    81 : 'HSPA+',
    82 : 'EVDO/EVDO Rev A',
    83 : 'LTE',
    84 : 'WiMAX',
    85 : 'CDMA',
    86 : 'GSM',
    87 : 'Analog',
    88 : 'Other'
}
for(index in TechnologyList) {
    TechnologySelect.options[TechnologySelect.options.length] = new Option(TechnologyList[index], index);
}  

 //Add Values to Speed Downdown
var SpeedSelect = document.getElementById("SpeedSelect");
var SpeedList = {
    'null' : 'Select a Speed...',
    0.2 : '0.2',
    0.05 : '0.05'
}
for (index in SpeedList) {
    SpeedSelect.options[SpeedSelect.options.length] = new Option(SpeedList[index], index);
}  


 
map.on('load', function() {
 
map.addSource('CarolinaWest', {
'type': 'vector',
'url': 'mapbox://fcc.39ptq2xg'
});
 
map.addLayer({
'id': 'CarolinaWest',
'source': 'CarolinaWest',
'source-layer': 'CarolinaWest_All-c17pch',
'type': 'fill',
'paint': {
'fill-color': '#f99',
'fill-opacity': 0.4,
'fill-outline-color': 'rgba(255, 0, 0, 1)'
},
}); 


 
// Create Popup Window
map.on('click', 'CarolinaWest', function (e) {
new mapboxgl.Popup()
.setLngLat(e.lngLat)
.setHTML("<h4>Provider:</h4>" + e.features[0].properties.DBA + "<br>" 
         + e.features[0].properties.TECHNOLOGY + "<br>" 
         + e.features[0].properties.MINUP + "<br>" 
         + e.features[0].properties.MINDOWN + "<br>" 
)

.addTo(map);
});
 

});
 
 
 

</script>
 
</body>
</html>
