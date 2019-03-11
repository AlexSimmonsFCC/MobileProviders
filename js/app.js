

var app = {};
require([
  "esri/map", "esri/tasks/query",
  "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer",
  "esri/tasks/ClassBreaksDefinition", "esri/tasks/AlgorithmicColorRamp",
  "esri/tasks/GenerateRendererParameters", "esri/tasks/GenerateRendererTask",
  "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
  "esri/dijit/PopupTemplate", "esri/dijit/Legend",
  "dojo/parser", "dojo/_base/array", "esri/Color",
  "dojo/dom", "dojo/dom-construct", "dojo/number",
  "dojo/data/ItemFileReadStore", "dijit/form/FilteringSelect", "esri/tasks/QueryTask","esri/renderers/ClassBreaksRenderer","esri/geometry/scaleUtils",
  "esri/layers/layer", "esri/dijit/Search",
  "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
  "dojo/domReady!"

], function (
  Map, Query,
  ArcGISTiledMapServiceLayer, FeatureLayer,
  ClassBreaksDefinition, AlgorithmicColorRamp,
  GenerateRendererParameters, GenerateRendererTask,
  SimpleLineSymbol, SimpleFillSymbol,
  PopupTemplate, Legend,
  parser, arrayUtils, Color,
  dom, domConstruct, number,
  ItemFileReadStore, FilteringSelect, QueryTask, ClassBreaksRenderer, scaleUtils, layer, Search
) {

  parser.parse();
  app.fields = {
    "C_TotLatPo": "Latino Population",
    "C_TotLat_1": "Percent Latino Population",
    "C_TotPop": "County Population",
    "IncomeHH": "Household Income",
    "PopDensity": "Population Density",
    "TtoV": "T-Mobile To Verizon",
    "LatPop": "Latino Population"
  };
  
  app.map = new Map("map", {
    center: [-95.3, 38.397],
    zoom: 5,
    slider: true
  });
  
  // Instantiate Basemaps
   var basemap = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer");
   app.map.addLayer(basemap);
   var ref = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer");
   app.map.addLayer(ref);

  // Instantiate Layers
  app.TestSwitch = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/2016_Counties/FeatureServer/0";
  app.TestSwitch2 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/2016_Counties/FeatureServer/0";
  app.TestSwitch3 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/2016_Counties/FeatureServer/0";
  app.TestSwitch4 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/2016_Tracts/FeatureServer/0";
  app.TestSwitch5 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/2016_Tracts/FeatureServer/0";
  app.TestSwitch6 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/2016_Tracts/FeatureServer/0";
  app.TestSwitch7 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/2016_Tracts/FeatureServer/0";
  app.TestSwitch8 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/2016_Counties/FeatureServer/0";
  app.outFields = ["C_TotLatPo", "C_TotLat_1","C_TotPop","IncomeHH","PopDensity", "Geography", "MaxAvgWeig","urban_pct"];
  app.outFields2 = ["C_TotLatPo", "LatPct","IncomeHH","MaxAvgWeig", "tractjoin", "urban_pct"];

  app.popupTemplate = new PopupTemplate({
    title: "{Geography}",
    fieldInfos: [ 
            { fieldName: "C_TotPop", visible: true, label: "County Population: " },
            { fieldName: "C_TotLatPo", visible: true, label: "County Hispanic Population: " },
            { fieldName: "C_TotLat_1", visible: true, label: "County Percent Latino (%): " },
            { fieldName: "urban_pct", visible: true, label: "Population Density:", format: { places: 2 } },
            { fieldName: "MaxAvgWeig", visible: true, label: "County Broandspeed (Mbp/s): ", format: { places: 2 }}],
    showAttachments: true,
  });

  

   app.popupTemplate2 = new PopupTemplate({
    title: "{Geography}",
    fieldInfos: [ 
            { fieldName: "tractjoin", visible: true, label: "Tract ID: " },
            { fieldName: "C_TotLatPo", visible: true, label: "Tract Latino Population: " },
            { fieldName: "LatPct", visible: true, label: "Tract Percent Latino (%): " },
            { fieldName: "urban_pct", visible: true, label: "Tract Population Density", format: { places: 2 }  },
            { fieldName: "MaxAvgWeig", visible: true, label: "Tract Broandspeed (Mbp/s): " }],
  showAttachments: true,
  });
  
  
  
  
  
  
  
  // Create Feature Layers
  app.map.on("load", function () {

      app.TestSwitch = new FeatureLayer(app.TestSwitch, {
      "id": "TestSwitch",
      "infoTemplate": app.popupTemplate,
      "outFields": app.outFields,
      "opacity": 0.8,
      maxScale: 1155581.108577
      } )
    
      app.TestSwitch2 = new FeatureLayer(app.TestSwitch2, {
      "id": "TestSwitch2",
      "infoTemplate": app.popupTemplate,
      "outFields": app.outFields,
      "opacity": 0.8,
      maxScale: 1155581.108577
      } )
    
      app.TestSwitch3 = new FeatureLayer(app.TestSwitch3, {
      "id": "TestSwitch3",
      "infoTemplate": app.popupTemplate,
      "outFields": app.outFields,
      "opacity": 0.8,
      maxScale: 1155581.108577
      } )
    
    
      app.TestSwitch8 = new FeatureLayer(app.TestSwitch8, {
      "id": "TestSwitch8",
      "infoTemplate": app.popupTemplate,
      "outFields": app.outFields,
      "opacity": 0.8,
      maxScale: 1155581.108577
      } )
     
      app.TestSwitch4 = new FeatureLayer(app.TestSwitch4, {
      "id": "TestSwitch4",
      "infoTemplate": app.popupTemplate2,
      "outFields": app.outFields2,
      "opacity": 0.8,
      minScale: 577790.554289
      } )
     
      app.TestSwitch5 = new FeatureLayer(app.TestSwitch5, {
      "id": "TestSwitch5",
      "infoTemplate": app.popupTemplate2,
      "outFields": app.outFields2,
      "opacity": 0.8,
      minScale: 577790.554289
      } )
      
      app.TestSwitch6 = new FeatureLayer(app.TestSwitch6, {
      "id": "TestSwitch6",
      "infoTemplate": app.popupTemplate2,
      "outFields": app.outFields2,
      "opacity": 0.8,
      minScale: 577790.554289
      } )
     
     
      app.TestSwitch7 = new FeatureLayer(app.TestSwitch7, {
      "id": "TestSwitch7",
      "infoTemplate": app.popupTemplate2,
      "outFields": app.outFields2,
      "opacity": 0.8,
      minScale: 577790.554289
      } )
     
     
     
     
     

    // Get DOM elements
   
     var Button1 = document.getElementById('B1');
     var Button2 = document.getElementById('B2');
     var Button3 = document.getElementById('B3');
     var Button4 = document.getElementById('B4');
     var filterButton = document.getElementById('filterButton');
     var resetButton = document.getElementById('resetButton');
     var HispPopDp = document.getElementById("HispPop");
     var BroadbandDp = document.getElementById("BroadbandSpeed");
     var IncomeDp = document.getElementById("Income");
     var PopDensityDp = document.getElementById("PopDensity");


    //Add Layers to Map

    app.map.addLayer(app.TestSwitch);
    app.map.addLayer(app.TestSwitch4);


    //Set Default Colors
    app.defaultFrom = Color.fromHex("#FFFF80");
    app.defaultTo = Color.fromHex("#6B0000");
    
    
    
   //Add Options to Dropdown Select List 
   var HispanicPopulationFilter = {
    '>= 0' : 'Any',
    '< 2000' : '< 2000',
    '> 2000 AND "C_TotLatPo" < 11000' : '2,001 - 11,000',
    '> 11001 AND "C_TotLatPo" < 23000'  : '11,001 - 23,000',
    '> 23001 AND "C_TotLatPo" < 65000'  : '23,001 - 65,000',
    '> 65001 AND "C_TotLatPo" < 500000'  : '65,001 - 500,000',
    '> 500000 AND "C_TotLatPo" < 5000000'  : '500,000 - 5,000,000',
}

  var HispanicPopulationFilterTract = {
    '>= 0' : 'Any',
    '< 400' : '< 400',
    '> 401 AND "C_TotLatPo" < 800' : '401 - 800',
    '> 801 AND "C_TotLatPo" < 1701'  : '801 - 1,701',
    '> 1702 AND "C_TotLatPo" < 2800'  : '1,702 - 2,800',
    '> 2801 AND "C_TotLatPo" < 4100'  : '2,801 - 4,100',
    '> 4101 AND "C_TotLatPo" < 6101'  : '4,101 - 6,101',
    '> 6101 AND "C_TotLatPo" < 14100'  : '6,101 - 14,100',
}




   var BroadbandSpeedFilter = {
    '>= 0' : 'Any',
    '> 0 AND "MaxAvgWeig" < 100' : 'Limited Access',
    '> 101 AND "MaxAvgWeig" < 250' : 'Typical Household',
    '> 251 AND "MaxAvgWeig" < 400'  : 'Specialized Uses',
    '> 401 AND "MaxAvgWeig" < 1000'  : 'Business Broadband',

}


var PopDensityFilter = {
    '>= 0' : 'Any',
    ' = 0' : 'Rural',
    '> 0 AND "urban_pct" < .4' : 'Suburban',
    ' > .8' : 'Urban',
}

var IncomeFilter = {
    '>= 0' : 'Any',
    '> 0 AND "LatPct" < 3.3' : '0% - 3.3%',
    '> 3.4 AND "LatPct" < 7' : '3.4% - 7%',
    '> 7.1 AND "LatPct" < 12'  : '7.1% - 12%',
    '> 12.1 AND "LatPct" < 20'  : '12.1% - 20%',
    '> 20.1 AND "LatPct" < 24'  : '20.1% - 24%',
    '> 24.1 AND "LatPct" < 32'  : '24.1% - 32%',
    '> 32.1 AND "LatPct" < 45'  : '32.1% - 45%',
    '> 45.1 AND "LatPct" < 55'  : '45.1% - 55%',
    '> 55.1 AND "LatPct" < 70'  : '55.1% - 70%',
    '> 70.1 AND "LatPct" < 100'  : '70.1% - 100%',
}





   // Put Options into the Select Object
   var HispPopSelect = document.getElementById("HispPop");
   for(index in HispanicPopulationFilter) {
    HispPopSelect.options[HispPopSelect.options.length] = new Option(HispanicPopulationFilter[index], index);
   }
   
   var BroadbandSpeedSelect = document.getElementById("BroadbandSpeed");
   for(index in BroadbandSpeedFilter) {
    BroadbandSpeedSelect.options[BroadbandSpeedSelect.options.length] = new Option(BroadbandSpeedFilter[index], index);
   }
   
   var IncomeSelect = document.getElementById("Income");
   for(index in IncomeFilter) {
    IncomeSelect.options[IncomeSelect.options.length] = new Option(IncomeFilter[index], index);
   }
   
    var PopDensitySelect = document.getElementById("PopDensity");
   for(index in PopDensityFilter) {
    PopDensitySelect.options[PopDensitySelect.options.length] = new Option(PopDensityFilter[index], index);
   }
   
   


    function setDefinitionExp(HispPopValue, BroadbandSpeedValue, IncomeValue, PopDensityValue) {
      console.log("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      app.TestSwitch.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      app.TestSwitch2.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      app.TestSwitch3.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      app.TestSwitch8.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      
      console.log("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      app.TestSwitch4.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      app.TestSwitch5.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      app.TestSwitch6.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
      app.TestSwitch7.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct" + " " + IncomeValue + " " + "AND" + " " + "urban_pct" + " " + PopDensityValue);
    }
    
    

    
    filterButton.addEventListener('click', function() {setDefinitionExp(HispPopDp.value, BroadbandDp.value, IncomeDp.value, PopDensityDp.value );
        app.TestSwitch.refresh();
        app.TestSwitch2.refresh();
        app.TestSwitch3.refresh();
        app.TestSwitch4.refresh();
        app.TestSwitch5.refresh();
        app.TestSwitch6.refresh();
        app.TestSwitch7.refresh();
        app.TestSwitch8.refresh();
    });
    

    resetButton.addEventListener('click', function(){
      app.TestSwitch.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0 AND urban_pct >= 0");
      app.TestSwitch2.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0 AND urban_pct >= 0");
      app.TestSwitch3.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0 AND urban_pct >= 0");
      app.TestSwitch4.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0 AND urban_pct >= 0");
      app.TestSwitch5.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0 AND urban_pct >= 0");
      app.TestSwitch6.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0 AND urban_pct >= 0");
      app.TestSwitch7.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0 AND urban_pct >= 0");
      app.TestSwitch8.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0 AND urban_pct >= 0");
      
      app.TestSwitch.refresh();
      app.TestSwitch2.refresh();
      app.TestSwitch3.refresh();
      app.TestSwitch4.refresh();
      app.TestSwitch5.refresh();
      app.TestSwitch6.refresh();
      app.TestSwitch7.refresh();
      app.TestSwitch8.refresh();
      HispPopDp.selectedIndex=0;
      BroadbandDp.selectedIndex=0;
      IncomeDp.selectedIndex=0;
      PopDensityDp.selectedIndex=0;
         }); 




    
    // Add Button Events to Change Layers
    
    // Hispanic Poulation Button
     Button1.addEventListener('click', function(e){
     app.outFields = ["C_TotLatPo"];
     app.map.removeLayer(app.TestSwitch2);
     app.map.removeLayer(app.TestSwitch3)
     app.map.removeLayer(app.TestSwitch5)
     app.map.removeLayer(app.TestSwitch6)
     app.map.removeLayer(app.TestSwitch7)

     app.map.addLayer(app.TestSwitch);
     app.map.addLayer(app.TestSwitch4);
     app.legend.refresh();
     app.TestSwitch.refresh();

     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
 
     var classDef = new ClassBreaksRenderer(symbol, "C_TotLatPo");
     classDef.addBreak({minValue: 0, maxValue: 2000, label: "0 - 2,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)"))});
     classDef.addBreak({minValue: 2001, maxValue: 11000, label: "2,000 - 2,001", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)"))});
     classDef.addBreak({minValue: 11001, maxValue: 23000, label: "11,001 - 23,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)"))});
     classDef.addBreak({minValue: 23001, maxValue: 65000, label: "23,001 - 65,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)"))});
     classDef.addBreak({minValue: 65001, maxValue: 500000, label: "65,001 - 500,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)"))});
     classDef.addBreak({minValue:500001, maxValue: 5000000, label: "500,000 - 5,000,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)"))});
     classDef.defaultLabel = null;
     classDef.defaultSymbol = null;

     app.TestSwitch.setRenderer(classDef);
     app.TestSwitch.redraw();
/*      createLegend(app.map, app.TestSwitch4); */
  
     app.map.on("extent-change", function(e) {
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch.visibleAtMapScale;
     if (CountyLayerVisible == true && Button1.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch;
     app.legend.refresh()}
     else if (Button1.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch4;
     app.legend.refresh()};
     });
     
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch.visibleAtMapScale;
     if (CountyLayerVisible == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch;
     app.legend.refresh()}
     else {
     app.legend.layerInfos[0].layer = app.TestSwitch4;
     app.legend.refresh()};
     

     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));

     var classDef2 = new ClassBreaksRenderer(symbol2, "C_TotLatPo");
     classDef2.addBreak(0, 400, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)")));
     classDef2.addBreak(401, 800, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)")));
     classDef2.addBreak({minValue: 801, maxValue: 1700,  label: "801 - 1,701", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)"))});
     classDef2.addBreak({minValue: 1701, maxValue: 2800, label: "1,701 - 2,800", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)"))});
     classDef2.addBreak({minValue: 2801, maxValue: 4100, label: "2,801 - 4,100", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)"))});
     classDef2.addBreak({minValue: 4101, maxValue: 6100, label: "4,101 - 6,100", symbol:  new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)"))});
     classDef2.addBreak({minValue: 6101, maxValue: 14000,label: "6,101 - 14,100", symbol:   new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)"))});

     classDef2.defaultLabel = null;
     classDef2.defaultSymbol = null;
     
     app.TestSwitch4.setRenderer(classDef2);
     app.TestSwitch4.redraw();

     });
   
  
  
  
     // Broadband Speed Button
     Button2.addEventListener('click', function(e){
     app.outFields = ["MaxAvgWeig"];
     app.map.removeLayer(app.TestSwitch);
     app.map.removeLayer(app.TestSwitch3);
     app.map.removeLayer(app.TestSwitch4);
     app.map.removeLayer(app.TestSwitch7);

     app.map.addLayer(app.TestSwitch2);
     app.map.addLayer(app.TestSwitch5);
     app.legend.refresh();
     app.TestSwitch2.refresh();

     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
 
     var classDef = new ClassBreaksRenderer(symbol, "MaxAvgWeig");
     classDef.addBreak(0, 100, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(79,79,79)")));
     classDef.addBreak(101, 250, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(87,125,69)")));
     classDef.addBreak(251, 400, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(87,173,50)")));
     classDef.addBreak(401, 1000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(76,230,0)")));
     classDef.defaultLabel = null;
     classDef.defaultSymbol = null;

     app.TestSwitch2.setRenderer(classDef);
     app.TestSwitch2.redraw();
   
     app.map.on("extent-change", function(e) {
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch2.visibleAtMapScale;
     if (CountyLayerVisible == true && Button2.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch2;
     app.legend.refresh()}
     else if (Button2.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch5;
     app.legend.refresh()};
     });
     
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch2.visibleAtMapScale;
     if (CountyLayerVisible == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch2;
     app.legend.refresh()}
     else {
     app.legend.layerInfos[0].layer = app.TestSwitch5;
     app.legend.refresh()};


   
     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));

     var classDef2 = new ClassBreaksRenderer(symbol2, "MaxAvgWeig");
     classDef2.addBreak(0, 100, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(79,79,79)")));
     classDef2.addBreak(101, 250, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(87,125,69)")));
     classDef2.addBreak(251, 400, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(87,173,50)")));
     classDef2.addBreak(401, 1000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(76,230,0)")));

     classDef2.defaultLabel = null;
     classDef2.defaultSymbol = null;
     
     app.TestSwitch5.setRenderer(classDef2);
     app.TestSwitch5.redraw();
    });
  
  
  
    
    // Add Hispanic Population Percent Button
     Button3.addEventListener('click', function(e){
     app.outFields = ["LatPct","C_TotLat_1"];
     app.map.removeLayer(app.TestSwitch2);
     app.map.removeLayer(app.TestSwitch);
     app.map.removeLayer(app.TestSwitch4);
     app.map.removeLayer(app.TestSwitch5);
     app.map.removeLayer(app.TestSwitch7);
     
     app.map.addLayer(app.TestSwitch3);
     app.map.addLayer(app.TestSwitch6);
     app.legend.refresh();
     app.TestSwitch3.refresh();
     app.TestSwitch6.refresh();

     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
 
     var classDef = new ClassBreaksRenderer(symbol, "C_TotLat_1");
     classDef.addBreak(0, 3.3, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(240,240,240)")));
     classDef.addBreak(3.4, 7, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(230,217,200)")));
     classDef.addBreak(7.1, 12, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(232,207,174)")));
     classDef.addBreak(12.1, 20, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(235,199,150)")));
     classDef.addBreak(20.1, 24, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(237,192,128)")));
     classDef.addBreak(24.1, 32, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(77,143,191)")));
     classDef.addBreak(32.1, 45, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(67,126,168)")));
     classDef.addBreak(45.1, 55, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(58,109,145)")));
     classDef.addBreak(55.1, 70, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(49,92,122)")));
     classDef.addBreak(70.1, 100, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(41,77,102)")));
     classDef.defaultLabel = null;
     classDef.defaultSymbol = null;

     app.TestSwitch3.setRenderer(classDef);
     app.TestSwitch3.redraw();
   
     app.map.on("extent-change", function(e) {
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch3.visibleAtMapScale;
     if (CountyLayerVisible == true && Button3.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch3;
     app.legend.refresh()}
     else if (Button3.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch6;
     app.legend.refresh()};
     });
     
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch3.visibleAtMapScale;
     if (CountyLayerVisible == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch3;
     app.legend.refresh()}
     else {
     app.legend.layerInfos[0].layer = app.TestSwitch6;
     app.legend.refresh()};


   
     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));

     var classDef2 = new ClassBreaksRenderer(symbol2, "LatPct");
     classDef2.addBreak(0, 3.3, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(240,240,240)")));
     classDef2.addBreak(3.4, 7, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(230,217,200)")));
     classDef2.addBreak(7.1, 12, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(232,207,174)")));
     classDef2.addBreak(12.1, 20, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(235,199,150)")));
     classDef2.addBreak(20.1, 24, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(237,192,128)")));
     classDef2.addBreak(24.1, 32, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(77,143,191)")));
     classDef2.addBreak(32.1, 45, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(67,126,168)")));
     classDef2.addBreak(45.1, 55, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(58,109,145)")));
     classDef2.addBreak(55.1, 70, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(49,92,122)")));
     classDef2.addBreak(70.1, 100, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(41,77,102)")));
     classDef2.defaultLabel = null;
     classDef.defaultSymbol = null;
     
     app.TestSwitch6.setRenderer(classDef2);
     app.TestSwitch6.redraw();
 
     });
    
    
    
    
    // Add Population Density Button
     Button4.addEventListener('click', function(e){
     app.outFields = ["urban_pct"];
     app.map.removeLayer(app.TestSwitch2);
     app.map.removeLayer(app.TestSwitch);
     app.map.removeLayer(app.TestSwitch4);
     app.map.removeLayer(app.TestSwitch5);
     app.map.removeLayer(app.TestSwitch3);
     app.map.removeLayer(app.TestSwitch6);
     
     
     app.map.addLayer(app.TestSwitch7);
     app.map.addLayer(app.TestSwitch8);
     app.legend.refresh();
     app.TestSwitch7.refresh();
     app.TestSwitch8.refresh();

     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
 
     var classDef = new ClassBreaksRenderer(symbol, "urban_pct");
     classDef.addBreak({minValue: 0, maxValue: .4, label: "Rural", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,235,214)"))});
     classDef.addBreak({minValue: .41, maxValue: .8, label: "Suburban", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(224,132,101)"))});
     classDef.addBreak({minValue: .81, maxValue: 1, label: "Urban", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(196,10,10)"))});
     classDef.defaultLabel = null;
     classDef.defaultSymbol = null;

     app.TestSwitch8.setRenderer(classDef);
     app.TestSwitch8.redraw();
   
     app.map.on("extent-change", function(e) {
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch8.visibleAtMapScale;
     if (CountyLayerVisible == true && Button4.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch8;
     app.legend.refresh()}
     else if (Button4.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch7;
     app.legend.refresh()};
     });
     
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch8.visibleAtMapScale;
     if (CountyLayerVisible == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch8;
     app.legend.refresh()}
     else {
     app.legend.layerInfos[0].layer = app.TestSwitch7;
     app.legend.refresh()};


   
     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));

     var classDef2 = new ClassBreaksRenderer(symbol, "urban_pct");
     classDef2.addBreak({minValue: 0, maxValue: .4, label: "Rural", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,235,214)"))});
     classDef2.addBreak({minValue: .41, maxValue: .8, label: "Suburban", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(224,132,101)"))});
     classDef2.addBreak({minValue: .81, maxValue: 1, label: "Urban", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(196,10,10)"))});
     classDef2.defaultLabel = null;
     classDef2.defaultSymbol = null;
     
     app.TestSwitch7.setRenderer(classDef2);
     app.TestSwitch7.redraw();
 
     });
    
    
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Hide/Show Tract and County HIspanic Popultion Select
    var HispPopTractLayerVisible = app.TestSwitch4.visibleAtMapScale;
    var HispPctPopTractLayerVisible = app.TestSwitch5.visibleAtMapScale;
    var BBTractLayerVisible = app.TestSwitch6.visibleAtMapScale;
   app.map.on("extent-change", function(e) {
   console.log(app.TestSwitch4.visibleAtMapScale);
   if  (HispPopTractLayerVisible == true){
    document.getElementById("resetButton").style.visibility = "hidden"
    HispPopDp.style.display = "none"
    }});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //Render County Hispanic Population Layer on Page Load
     
     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
         
     var classDef = new ClassBreaksRenderer(symbol, "C_TotLatPo");
     classDef.addBreak({minValue: 0, maxValue: 2000, label: "0 - 2,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)"))});
     classDef.addBreak({minValue: 2001, maxValue: 11000, label: "2,000 - 2,001", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)"))});
     classDef.addBreak({minValue: 11001, maxValue: 23000, label: "11,001 - 23,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)"))});
     classDef.addBreak({minValue: 23001, maxValue: 65000, label: "23,001 - 65,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)"))});
     classDef.addBreak({minValue: 65001, maxValue: 500000, label: "65,001 - 500,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)"))});
     classDef.addBreak({minValue:500001, maxValue: 5000000, label: "500,000 - 5,000,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)"))});
     

     
     classDef.defaultLabel = null;
     classDef.defaultSymbol = null;

  
     app.TestSwitch.setRenderer(classDef);
     app.TestSwitch.redraw();


     app.map.on("extent-change", function(e) {
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch.visibleAtMapScale;
     if  (CountyLayerVisible == true && Button1.checked == true)  {
     app.legend.layerInfos[0].layer = app.TestSwitch;
     app.legend.refresh()}
     else if (Button1.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch4;
     app.legend.refresh()}
     });
      

     var legendDiv = domConstruct.create("div", {
     id: "legendDiv"
     }, dom.byId("legendWrapper")); 
           
     app.legend = new Legend({
     map: app.map,
     layerInfos: [{
     layer: app.TestSwitch,
     title: " "
     }]
     }, legendDiv);
     app.legend.startup();   


    
     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));
 
     var classDef2 = new ClassBreaksRenderer(symbol2, "C_TotLatPo");
     classDef2.addBreak(0, 400, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)")));
     classDef2.addBreak(401, 800, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)")));
     classDef2.addBreak({minValue: 801, maxValue: 1700,  label: "801 - 1,701", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)"))});
     classDef2.addBreak({minValue: 1701, maxValue: 2800, label: "1,701 - 2,800", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)"))});
     classDef2.addBreak({minValue: 2801, maxValue: 4100, label: "2,801 - 4,100", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)"))});
     classDef2.addBreak({minValue: 4101, maxValue: 6100, label: "4,101 - 6,100", symbol:  new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)"))});
     classDef2.addBreak({minValue: 6101, maxValue: 14000,label: "6,101 - 14,100", symbol:   new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)"))});

     classDef2.defaultLabel = null;
     classDef2.defaultSymbol = null;
     app.TestSwitch4.setRenderer(classDef2);
     app.TestSwitch4.redraw();

      });
    });
    
  
  
