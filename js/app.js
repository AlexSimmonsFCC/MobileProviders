

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
  "esri/layers/layer",
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
  ItemFileReadStore, FilteringSelect, QueryTask, ClassBreaksRenderer, scaleUtils, layer
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
    zoom: 6,
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
  app.outFields = ["C_TotLatPo", "C_TotLat_1","C_TotPop","IncomeHH","PopDensity", "Geography", "MaxAvgWeig"];
  app.outFields2 = ["C_TotLatPo", "LatPct","IncomeHH","MaxAvgWeig", "tractjoin"];

  app.popupTemplate = new PopupTemplate({
    title: "{Geography}",
    fieldInfos: [ 
            { fieldName: "C_TotPop", visible: true, label: "County Population: " },
            { fieldName: "C_TotLatPo", visible: true, label: "County Hispanic Population: " },
            { fieldName: "C_TotLat_1", visible: true, label: "County Percent Latino (%): " },
            { fieldName: "IncomeHH", visible: true, label: "2016 Household Income: " },
            { fieldName: "MaxAvgWeig", visible: true, label: "County Broandspeed (Mbp/s): ", format: { places: 2 }}],
    showAttachments: true,
  });

  

   app.popupTemplate2 = new PopupTemplate({
    title: "{Geography}",
    fieldInfos: [ 
            { fieldName: "tractjoin", visible: true, label: "Tract ID: " },
            { fieldName: "C_TotLatPo", visible: true, label: "Tract Latino Population: " },
            { fieldName: "LatPct", visible: true, label: "Tract Percent Latino (%): " },
            { fieldName: "MedianHHIn", visible: true, label: "2016 Household Income: " },
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
     
     

       // Declare DOM elements and set Button Actions
   
     var Button1 = document.getElementById('B1');
     var Button2 = document.getElementById('B2');
     var Button3 = document.getElementById('B3');
     var filterButton = document.getElementById('filterButton');
     var resetButton = document.getElementById('resetButton');
     var HispPopDp = document.getElementById("HispPop");
     var BroadbandDp = document.getElementById("BroadbandSpeed");
     var IncomeDp = document.getElementById("Income");


    //Add Layers to Map

    app.map.addLayer(app.TestSwitch);
    app.map.addLayer(app.TestSwitch4);


    //Set Default Colors
    app.defaultFrom = Color.fromHex("#FFFF80");
    app.defaultTo = Color.fromHex("#6B0000");
    
    
    
    //Add Options to Dropdown Select List 
   
   var HispanicPopulationFilter = {
    '>= 0' : 'Any',
    '< 200' : '< 200',
    '> 200 AND "C_TotLatPo" < 1500' : '200 - 1,500',
    '> 1500 AND "C_TotLatPo" < 10000'  : '1,500 - 10,000',
    '> 10000'  : '> 10,000'
}

   var BroadbandSpeedFilter = {
    '>= 0' : 'Any',
    '< 50' : '< 50',
    '> 50 AND "MaxAvgWeig" < 200' : '50 - 200',
    '> 200 AND "MaxAvgWeig" < 400'  : '200 - 400',
    '> 400 AND "MaxAvgWeig" < 800'  : '400 - 800',
    '> 800'  : '> 800'
}


var IncomeFilter = {
    '>= 0' : 'Any',
    '< 3200' : '< $3,000',
    '> 3200 AND "IncomeHH" < 7000' : '$3,200 - $7,000',
    '> 7000 AND "IncomeHH" < 1500'  : '$7,000 - $15,000',
    '> 15000 AND "IncomeHH" < 35000'  : '$15,000 - $35,000',
    '> 35000'  : '> $35,000'
}





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
   
   
   

    

    function setDefinitionExp(HispPopValue, BroadbandSpeedValue, IncomeValue) {
      console.log("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "IncomeHH" + " " + IncomeValue);
      app.TestSwitch.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "IncomeHH" + " " + IncomeValue);
      app.TestSwitch2.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "IncomeHH" + " " + IncomeValue);
      app.TestSwitch3.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "IncomeHH" + " " + IncomeValue);
      
      console.log("LatPop" + " " + HispPopValue + " " + "AND" + " " +  "W_Avg" + " " + BroadbandSpeedValue + " " + "AND" + " " + "MedianHHIn" + " " + IncomeValue);
      app.TestSwitch4.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "IncomeHH" + " " + IncomeValue);
      app.TestSwitch5.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "IncomeHH" + " " + IncomeValue);
      app.TestSwitch6.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "IncomeHH" + " " + IncomeValue);
    }
    

    
    filterButton.addEventListener('click', function(){
        setDefinitionExp(HispPopDp.value, BroadbandDp.value, IncomeDp.value);
        app.TestSwitch.refresh();
        app.TestSwitch2.refresh();
        app.TestSwitch3.refresh();
        app.TestSwitch4.refresh();
        app.TestSwitch5.refresh();
        app.TestSwitch6.refresh();
    });
    

    resetButton.addEventListener('click', function(){
      app.TestSwitch.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0");
      app.TestSwitch2.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0");
      app.TestSwitch3.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0");
      app.TestSwitch4.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0");
      app.TestSwitch5.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0");
      app.TestSwitch6.setDefinitionExpression("C_TotLatPo >= 0 AND MaxAvgWeig >= 0 AND IncomeHH >= 0");
      
      app.TestSwitch.refresh();
      app.TestSwitch2.refresh();
      app.TestSwitch3.refresh();
      app.TestSwitch4.refresh();
      app.TestSwitch5.refresh();
      app.TestSwitch6.refresh();
      HispPopDp.selectedIndex=0;
      BroadbandDp.selectedIndex=0;
      IncomeDp.selectedIndex=0;
         }); 




    
    // Add Button Events to Change Layers
    
    
     Button1.addEventListener('click', function(e){
      app.outFields = ["C_TotLatPo"];
      app.map.removeLayer(app.TestSwitch2);
      app.map.removeLayer(app.TestSwitch3)
      app.map.removeLayer(app.TestSwitch5)
      app.map.removeLayer(app.TestSwitch6)


     app.map.addLayer(app.TestSwitch);
     app.map.addLayer(app.TestSwitch4);
     app.TestSwitch.refresh();

   
    var symbol = new SimpleFillSymbol();
    symbol.setColor(new Color([150, 150, 150, 0.5]));
 
     var classDef = new ClassBreaksRenderer(symbol, "C_TotLatPo");
     classDef.addBreak(0, 765, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)")));
     classDef.addBreak(766, 1680, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)")));
     classDef.addBreak(1681, 2812, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)")));
     classDef.addBreak(2813, 4159, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)")));
     classDef.addBreak(4160, 6122, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)")));
     classDef.addBreak(6123, 13492, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)")));

  
     app.TestSwitch4.setRenderer(classDef);
     app.TestSwitch4.redraw();
     createLegend(app.map, app.TestSwitch4);
  

   function createLegend(map, fl ) {

     if (app.hasOwnProperty("legend")) {
       app.legend2.destroy();
       domConstruct.destroy(dojo.byId("legendDiv"));
     }
    
     var legendDiv = domConstruct.create("div", {
      id: "legendDiv"
     }, dom.byId("legendWrapper"));

     app.legend = new Legend({
       map: map,
       layerInfos: [{
         layer: fl,
         title: " "
       }]
     }, legendDiv);
     app.legend.startup();
   }
   
 
 
     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));
 
     var classDef2 = new ClassBreaksRenderer(symbol2, "C_TotLatPo");
     classDef2.addBreak(0, 765, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)")));
     classDef2.addBreak(766, 1680, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)")));
     classDef2.addBreak(1681, 2812, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)")));
     classDef2.addBreak(2813, 4159, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)")));
     classDef2.addBreak(4160, 6122, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)")));
     classDef2.addBreak(6123, 13492, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)")));

  
     app.TestSwitch4.setRenderer(classDef2);
     app.TestSwitch4.redraw();
     createLegend(app.map, app.TestSwitch4);
  

/*    function createLegend2(map, fl ) {
    
     if (app.hasOwnProperty("legend2")) {
       app.legend2.destroy();
       domConstruct.destroy(dojo.byId("legendDiv2"));
     }
    
     var legendDiv2 = domConstruct.create("div", {
      id: "legendDiv2"
     }, dom.byId("legendWrapper"));
    
     app.legend2 = new Legend({
       map: map,
       layerInfos: [{
         layer: fl,
         title: " "
       }]
     }, legendDiv2);
     app.legend2.startup();
       } */

 
     });
   
  
  
  

Button2.addEventListener('click', function(e){
     app.outFields = ["MaxAvgWeig"];
     app.outFields2 = ["W_Avg"];
     
     app.map.removeLayer(app.TestSwitch);
     app.map.removeLayer(app.TestSwitch3);
     app.map.removeLayer(app.TestSwitch4);

      
     app.map.addLayer(app.TestSwitch2);
     app.map.addLayer(app.TestSwitch5);
     app.defaultFrom = Color.fromHex("#070707");
     app.defaultTo = Color.fromHex("#076cc4");
     createRenderer("MaxAvgWeig");
     createRenderer("W_Avg");
   

     function createRenderer(field) {
     app.sfs = new SimpleFillSymbol(
     SimpleFillSymbol.STYLE_SOLID,
     new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID,
     new Color([0, 0, 0]),
     0.5),)};
 
     var classDef = new ClassBreaksDefinition();
     classDef.classificationField = "MaxAvgWeig";
     classDef.classificationMethod = "quantile";
     classDef.breakCount = 5;      
     classDef.baseSymbol = app.sfs;

     var colorRamp = new AlgorithmicColorRamp();
     colorRamp.fromColor = app.defaultFrom;
     colorRamp.toColor = app.defaultTo;
     colorRamp.algorithm = "hsv"; 
     classDef.colorRamp = colorRamp;
       
     var params = new GenerateRendererParameters();
     params.classificationDefinition = classDef;
    
       
     var generateRenderer = new GenerateRendererTask(app.TestSwitch2);
     generateRenderer.execute(params, applyRenderer);
     console.log(params)
       
     function applyRenderer(renderer) {
     console.log(renderer);  
     app.TestSwitch2.setRenderer(renderer);
     app.TestSwitch2.redraw();
     createLegend(app.map, app.TestSwitch2)};
   
  
   function createLegend(map, fl ) {

     if (app.hasOwnProperty("legend")) {
       app.legend.destroy();
       domConstruct.destroy(dojo.byId("legendDiv"));
     }
    
     var legendDiv = domConstruct.create("div", {
      id: "legendDiv"
     }, dom.byId("legendWrapper"));

     app.legend = new Legend({
       map: map,
       layerInfos: [{
         layer: fl,
         title: " "
       }]
     }, legendDiv);
     app.legend.startup();
   }
 
 
 
 
     createRenderer2("MaxAvgWeig");
   
     function createRenderer2(field) {
     app.sfs2 = new SimpleFillSymbol(
     SimpleFillSymbol.STYLE_SOLID,
     new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID,
     new Color([0, 0, 0]),
     0.5),)};
 
     var classDef2 = new ClassBreaksDefinition();
     classDef2.classificationField = "MaxAvgWeig";
     classDef2.classificationMethod = "quantile";
     classDef2.breakCount = 5;      
     classDef2.baseSymbol = app.sfs2;
     classDef2.colorRamp = colorRamp;

     var params2 = new GenerateRendererParameters();
     params2.classificationDefinition = classDef2;
    
       
     var generateRenderer2 = new GenerateRendererTask(app.TestSwitch5);
     generateRenderer2.execute(params2, applyRenderer2);
     console.log(params2)
       
     function applyRenderer2(renderer2) {
     console.log(renderer2);  
     app.TestSwitch5.setRenderer(renderer2);
     app.TestSwitch5.redraw();
     createLegend2(app.map, app.TestSwitch5)};
   
  
   function createLegend2(map, fl ) {

     if (app.hasOwnProperty("legend2")) {
       app.legend2.destroy();
       domConstruct.destroy(dojo.byId("legendDiv2"));
     }
    
     var legendDiv2 = domConstruct.create("div", {
      id: "legendDiv2"
     }, dom.byId("legendWrapper"));

     app.legend2 = new Legend({
       map: map,
       layerInfos: [{
         layer: fl,
         title: " "
       }]
     }, legendDiv2);
     app.legend2.startup();
   }
 

     });
  
  
  
    
    
      Button3.addEventListener('click', function(e){
      app.outFields = ["IncomeHH"];
      app.outFields2 = ["IncomeHH"];
      app.map.removeLayer(app.TestSwitch2);
      app.map.removeLayer(app.TestSwitch);
      app.map.removeLayer(app.TestSwitch5);

    
      
     app.map.addLayer(app.TestSwitch3);
     app.map.addLayer(app.TestSwitch6);
     app.defaultFrom = Color.fromHex("#cbcdd6");
     app.defaultTo = Color.fromHex("#16214f");
     createRenderer("IncomeHH");
   

     function createRenderer(field) {
     app.sfs = new SimpleFillSymbol(
     SimpleFillSymbol.STYLE_SOLID,
     new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID,
     new Color([0, 0, 0]),
     0.5),)};
 
     var classDef = new ClassBreaksDefinition();
     classDef.classificationField = "IncomeHH";
     classDef.classificationMethod = "quantile";
     classDef.breakCount = 5;      
     classDef.baseSymbol = app.sfs;

     var colorRamp = new AlgorithmicColorRamp();
     colorRamp.fromColor = app.defaultFrom;
     colorRamp.toColor = app.defaultTo;
     colorRamp.algorithm = "hsv"; 
     classDef.colorRamp = colorRamp;
       
     var params = new GenerateRendererParameters();
     params.classificationDefinition = classDef;
    
       
     var generateRenderer = new GenerateRendererTask(app.TestSwitch3);
     generateRenderer.execute(params, applyRenderer);
     console.log(params)
       
     function applyRenderer(renderer) {
     console.log(renderer);  
     app.TestSwitch3.setRenderer(renderer);
     app.TestSwitch3.redraw();
     createLegend(app.map, app.TestSwitch3)};
   
  
   function createLegend(map, fl ) {

     if (app.hasOwnProperty("legend")) {
       app.legend.destroy();
       domConstruct.destroy(dojo.byId("legendDiv"));
     }
    
     var legendDiv = domConstruct.create("div", {
      id: "legendDiv"
     }, dom.byId("legendWrapper"));

     app.legend = new Legend({
       map: map,
       layerInfos: [{
         layer: fl,
         title: " "
       }]
     }, legendDiv);
     app.legend.startup();
   }
 
 
 
 createRenderer2("IncomeHH");
   
     function createRenderer2(field) {
     app.sfs2 = new SimpleFillSymbol(
     SimpleFillSymbol.STYLE_SOLID,
     new SimpleLineSymbol(
      SimpleLineSymbol.STYLE_SOLID,
     new Color([0, 0, 0]),
     0.5),)};
 
     var classDef2 = new ClassBreaksDefinition();
     classDef2.classificationField = "IncomeHH";
     classDef2.classificationMethod = "quantile";
     classDef2.breakCount = 10;      
     classDef2.baseSymbol = app.sfs2;
     classDef2.colorRamp = colorRamp;

     var params2 = new GenerateRendererParameters();
     params2.classificationDefinition = classDef2;
    
       
     var generateRenderer2 = new GenerateRendererTask(app.TestSwitch6);
     generateRenderer2.execute(params2, applyRenderer2);
     console.log(params2)
       
     function applyRenderer2(renderer2) {
     console.log(renderer2);  
     app.TestSwitch6.setRenderer(renderer2);
     app.TestSwitch6.redraw();
     createLegend2(app.map, app.TestSwitch6)};
   
  
   function createLegend2(map, fl ) {

     if (app.hasOwnProperty("legend2")) {
       app.legend2.destroy();
       domConstruct.destroy(dojo.byId("legendDiv2"));
     }
    
     var legendDiv2 = domConstruct.create("div", {
      id: "legendDiv2"
     }, dom.byId("legendWrapper"));

     app.legend2 = new Legend({
       map: map,
       layerInfos: [{
         layer: fl,
         title: " "
       }]
     }, legendDiv2);
     app.legend2.startup();
   }
 

 
 
     });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //Render County Hispanic Population Layer on Page Load
     
             var symbol = new SimpleFillSymbol();
             symbol.setColor(new Color([150, 150, 150, 0.5]));
         
             var classDef = new ClassBreaksRenderer(symbol, "C_TotLatPo");
             classDef.addBreak(0, 2000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)")));
             classDef.addBreak(2001, 11000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)")));
             classDef.addBreak(11001, 23000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)")));
             classDef.addBreak(23001, 65000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)")));
             classDef.addBreak(65001, 500000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)")));
             classDef.addBreak(500001, 5000000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)")));
             classDef.defaultLabel = null;
             classDef.defaultSymbol = null;
        
          
             app.TestSwitch.setRenderer(classDef);
             app.TestSwitch.redraw();



        app.map.on("extent-change", function(e) {
        var currentScale = app.map.getScale();
        var CountyLayerVisible = app.TestSwitch.visibleAtMapScale;
        if (CountyLayerVisible == true) {
        app.legend.layerInfos[0].layer = app.TestSwitch;
        app.legend.refresh()}
        else {
        app.legend.layerInfos[0].layer = app.TestSwitch4;
        app.legend.refresh()};
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
     classDef2.addBreak(0, 2000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)")));
     classDef2.addBreak(2001, 11000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)")));
     classDef2.addBreak(11001, 23000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)")));
     classDef2.addBreak(23001, 65000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)")));
     classDef2.addBreak(65001, 500000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)")));
     classDef2.addBreak(500001, 5000000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)")));

     classDef2.defaultLabel = null;
     classDef2.defaultSymbol = null;
     app.TestSwitch4.setRenderer(classDef2);
     app.TestSwitch4.redraw();



      });
    });
    
  
  
