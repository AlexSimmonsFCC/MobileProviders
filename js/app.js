var app = {};
require([
  "esri/map", 
  "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer", "esri/layers/VectorTileLayer",
  "esri/tasks/ClassBreaksDefinition", "esri/tasks/AlgorithmicColorRamp",
  "esri/tasks/GenerateRendererParameters", "esri/tasks/GenerateRendererTask", "esri/geometry/Extent",
  "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
  "esri/dijit/PopupTemplate", "esri/dijit/Legend","esri/toolbars/draw",
  "dojo/parser", "dojo/_base/array", "esri/Color","esri/tasks/query", "esri/tasks/QueryTask",
  "dojo/dom", "dojo/dom-construct", "dojo/number","dojo/on",
  "dojo/data/ItemFileReadStore", "dijit/form/FilteringSelect",
  "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
  "dojo/domReady!"

], function (
  Map, 
  ArcGISTiledMapServiceLayer, FeatureLayer, VectorTileLayer,
  ClassBreaksDefinition, AlgorithmicColorRamp,
  GenerateRendererParameters, GenerateRendererTask, Extent,
  SimpleLineSymbol, SimpleFillSymbol,
  PopupTemplate, Legend,  Draw,
  parser, arrayUtils, Color, Query, QueryTask,
  dom, domConstruct, number, on,
  ItemFileReadStore, FilteringSelect,
) 

{


  parser.parse();
  
  GetStatesButton = document.getElementById("GetMobileProviders");

// Put States in State Select List 
  var StatesList = {
    'Alabama' : 'Alabama',
    'Florida' : 'Florida'
}
  
  
   var StateSelect = document.getElementById("States");
   for(index in StatesList) {StateSelect.options[StateSelect.options.length] = new Option(StatesList[index], index);}
   
   
   
   function setQuery() {
   var query = new esri.tasks.Query();
   //query.returnDistinctValues = true;
   query.outFields = ['DBA'];
   query.orderByFields = ['DBA'];
   query.where = '1=1';
   app.floridaURL = 'https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/FloridaTest/FeatureServer/0';
   queryTask = new QueryTask(app.floridaURL);
   queryTask.execute(query, handleResults, errorHandler);
   }
    
    
   function handleResults (results) {
   console.log('Florida is displayed.')
   innerHTML = '';
   results.features.forEach(function(feature){
   innerHTML += `${feature.attributes['DBA']} <p>`;
   })
   document.getElementById("ProviderList").innerHTML= innerHTML;
   } 
 
 
   function errorHandler(err) {
   console.log('Oops, error: ');
   }
 
 
 
    GetStatesButton.addEventListener('click', function(e) {
    
    if  (document.getElementById("States").value == "Florida"){
    app.map.addLayers(FL);
    var FL_Extent = new Extent(-91.96655273435127, 22.976095304422746, -70.87280273435688, 32.38691978780339);
    app.map.setExtent(FL_Extent);
    setQuery();
   
   }
    
    
    
    
     });
  
  
  
  
  
  
  
  
  
  
 

  app.map = new Map("map", {
    center: [-95.3, 38.397],
    zoom: 5,
    slider: false
  });
  var basemap = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer");
  app.map.addLayer(basemap);
  var ref = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer");
  app.map.addLayer(ref);

  // various info for the feature layer
 // app.Counties = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/Counties/FeatureServer/0";
 // app.States = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/States/FeatureServer/0";
 // app.VerizonVTL = new VectorTileLayer("https://tiles.arcgis.com/tiles/YnOQrIGdN9JGtBh4/arcgis/rest/services/Verizon/VectorTileServer");
  app.VerizonFL = new FeatureLayer("https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/FloridaTest/FeatureServer/0");
//  app.TMobileVTL = new VectorTileLayer("https://tiles.arcgis.com/tiles/YnOQrIGdN9JGtBh4/arcgis/rest/services/TMobile/VectorTileServer");




  app.outFields = ["DBA"];
  app.currentAttribute = "DBA";
  app.popupTemplate = new PopupTemplate({
    title: "Title",
    fieldInfos: [{
      "fieldName": app.currentAttribute,
      "label": "FIPS Code:",
      "visible": true,
      "format": {
        places: 0,
        digitSeparator: false
      }
    }],
    showAttachments: true
  });


//Create Fill Color For Selection Window 
var fieldsSelectionSymbol =
   new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
   new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
   new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.5]));


  // create a feature layer 
  // wait for map to load so the map's extent is available

/*     app.Counties = new FeatureLayer(app.Counties, {
      "id": "Counties",
      "infoTemplate": app.popupTemplate,
      "outFields": app.outFields,
      "opacity": 0.8,
      "mode": FeatureLayer.MODE_ONDEMAND
    })
    
    app.States = new FeatureLayer(app.States, {
      "id": "States",
      "infoTemplate": app.popupTemplate,
      "outFields": app.outFields,
      "opacity": 0.8,
      "mode": FeatureLayer.MODE_ONDEMAND
    }) */
    
    
    var FL = [app.VerizonFL]
    

   //  app.map.addLayer(app.States);
     

































/* var selectionToolbar;

function initSelectToolbar (event) {
          selectionToolbar = new Draw(event.map);
          var selectQuery = new Query();

          on(selectionToolbar, "DrawEnd", function (geometry) {
            selectionToolbar.deactivate();
            selectQuery.geometry = geometry;
            featureLayer.selectFeatures(selectQuery,
              FeatureLayer.SELECTION_NEW);
          });
        }

on(dom.byId("SelectCounties"), "click", function () {
          selectionToolbar.activate(Draw.EXTENT);
        }); */
        



























   
}   );
   
   
   
   
   
   
   
   
   
   
   
   
