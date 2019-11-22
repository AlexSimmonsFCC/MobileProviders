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
