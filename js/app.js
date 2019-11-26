mapboxgl.accessToken = 'pk.eyJ1IjoiZmNjIiwiYSI6InBiaGMyLU0ifQ.LOmVYpUCFv2yWpbvxDdQNg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
center: [-96.573, 39.397],
minZoom: 3,
zoom: 4
});
 
var zoomThreshold = 4;


// Get DOM Objects 
var filterButton = document.getElementById('filterButton');
var resetButton = document.getElementById('resetButton');

var popup = new mapboxgl.Popup();

// Create Popup Windows
map.on('click', "VerizonWireless",  function (e) {
popup.setLngLat(e.lngLat)
popup.setHTML("<h4>Provider:</h4>" + e.features[0].properties.DBA + "<br>" 
         + e.features[0].properties.TECHNOLOGY + "<br>" 
         + e.features[0].properties.MINUP + "<br>" 
         + e.features[0].properties.MINDOWN + "<br>" 
)
popup.addTo(map);
});

map.on('click', "Carolina West Wireless",  function (e) {
popup.setLngLat(e.lngLat)
popup.setHTML("<h4>Provider:</h4>" + e.features[0].properties.DBA + "<br>" 
         + e.features[0].properties.TECHNOLOGY + "<br>" 
         + e.features[0].properties.MINUP + "<br>" 
         + e.features[0].properties.MINDOWN + "<br>" 
)
popup.addTo(map);
});


// Create Filter Button Action
filterButton.addEventListener('click', function(e){

map.setLayoutProperty(ProviderSelect.value, "visibility", "visible");

 if (ProviderSelect.value == 'Carolina West Wireless'){
 map.flyTo({center: [ -81.357, 35.733], zoom: 7})
}







 if (ProviderSelect.selectedIndex == 0 && TechnologySelect.selectedIndex == 0 && SpeedSelect.selectedIndex == 0){
map.setFilter('CarolinaWest');
}
else if (SpeedSelect.selectedIndex != 0){
map.setFilter(ProviderSelect.value, ['==', 'MINUP', Number(SpeedSelect.value)]);
  }
else if (TechnologySelect.selectedIndex != 0){
map.setFilter(ProviderSelect.value, ['==', 'TECHNOLOGY', Number(TechnologySelect.value)]);
  }
  else if (ProviderSelect.selectedIndex != 0){
 map.setFilter(ProviderSelect.value, ['==', 'DBA', ProviderSelect.value]);
  }  

});



// Create Reset Button Action
resetButton.addEventListener('click', function(e){
map.setLayoutProperty(ProviderSelect.value, "visibility", "none");
ProviderSelect.selectedIndex=0;
TechnologySelect.selectedIndex=0;
SpeedSelect.selectedIndex=0;
popup.remove();
map.flyTo({center: [-96.573, 39.397], zoom: 4})
});



// Add Values to Dropdowns
 //Add Values to Provider Downdown
var ProviderSelect = document.getElementById("ProviderSelect");
var ProviderList = {
    'null' : 'Select a Provider...',
    'Carolina West Wireless' : 'Carolina West Wireless',
    'VerizonWireless' : 'Verizon',
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
'url': 'mapbox://fcc.d2qrpeux'
});

map.addSource('Verizon_EVDO_CELL', {
'type': 'vector',
'url': 'mapbox://fcc.102ha294'
});
 
 map.addLayer({
'id': 'Carolina West Wireless',
'source': 'CarolinaWest',
'source-layer': 'CarolinaWest_All2geojson',
'type': 'fill',
'paint': {
'fill-color': '#348feb',
'fill-opacity': 0.6,
'fill-outline-color': 'rgb(52, 143, 235)'
},
layout: {
      visibility: "none"
    },
}); 

 map.addLayer({
'id': 'VerizonWireless',
'source': 'Verizon_EVDO_CELL',
'source-layer': 'VZW_EVDO_CELL2geojson',
'type': 'fill',
'paint': {
'fill-color': '#ef1d1d',
'fill-opacity': 0.4,
'fill-outline-color': 'rgb(239, 29, 29)'
},
layout: {
      visibility: "none"
    },
});   



}); 
