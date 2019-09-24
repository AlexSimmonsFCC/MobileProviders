
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
  "esri/layers/layer", "esri/dijit/Search","esri/dijit/FeatureTable", "esri/geometry/webMercatorUtils",
 "dojo/_base/lang", "esri/tasks/StatisticDefinition","esri/geometry/Extent","esri/dijit/HomeButton",
  "dijit/TitlePane","esri/renderers/UniqueValueRenderer","esri/dijit/Search",
  
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
  ItemFileReadStore, FilteringSelect, QueryTask, ClassBreaksRenderer, scaleUtils, layer, Search,
  FeatureTable, webMercatorUtils, lang, StatisticDefinition,Extent, HomeButton, TitlePane, UniqueValueRenderer, Search
) {

  parser.parse();
  app.fields = {
    "C_TotLatPo": "Latino Population",
    "LatPct": "Percent Latino Population",
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
  
  var home = new HomeButton({
  map: app.map
  }, "HomeButton");
  home.startup();
  
  
           var search = new Search({
            map: app.map
         }, "search");
         search.startup();

  
  
  // Instantiate Basemaps
   var basemap = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer");
   app.map.addLayer(basemap);
   var ref = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer");
   app.map.addLayer(ref);

  // Instantiate Layers
  app.TestSwitch =  "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/Counties/FeatureServer/0";
  app.TestSwitch2 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/Counties/FeatureServer/0";
  app.TestSwitch3 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/Counties/FeatureServer/0";
  app.TestSwitch4 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/BGs/FeatureServer/0";
  app.TestSwitch5 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/BGs/FeatureServer/0";
  app.TestSwitch6 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/BGs/FeatureServer/0";
  app.TestSwitch7 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/BGs/FeatureServer/0";
  app.TestSwitch8 = "https://services.arcgis.com/YnOQrIGdN9JGtBh4/arcgis/rest/services/Counties/FeatureServer/0";
  app.outFields = ["C_TotLatPo", "LatPct","C_TotPop","IncomeHH","PopDensity", "Geography", "MaxAvgWeig","urban_pct"];
  app.outFields2 = ["C_TotLatPo", "LatPct","IncomeHH","MaxAvgWeig", "tractjoin", "urban_pct", "CNTYNAME", "tracta"];

  app.popupTemplate = new PopupTemplate({
    title: "{Geography}",
    fieldInfos: [ 
            { fieldName: "C_TotPop", visible: true, label: "County Population: " },
            { fieldName: "C_TotLatPo", visible: true, label: "County Hispanic Population: " },
            { fieldName: "LatPct", visible: true, label: "County Percent Latino (%): ", format: { places: 2 } },
            { fieldName: "urban_pct", visible: true, label: "Population Density:", format: { places: 2 } },
            { fieldName: "MaxAvgWeig", visible: true, label: "County Broandspeed (Mbp/s): ", format: { places: 2 }}],
    showAttachments: true,
  });

  

   app.popupTemplate2 = new PopupTemplate({
    title: "Tract {tracta} in {CNTYNAME}",
    fieldInfos: [ 
            { fieldName: "tractjoin", visible: true, label: "Full Tract ID: " },
            { fieldName: "C_TotLatPo", visible: true, label: "Tract Latino Population: " },
            { fieldName: "LatPct", visible: true, label: "Tract Percent Latino (%): ", format: { places: 2 } },
            { fieldName: "urban_pct", visible: true, label: "Tract Population Density", format: { places: 2 }  },
            { fieldName: "MaxAvgWeig", visible: true, label: "Tract Broandspeed (Mbp/s): " }],
  showAttachments: true,
  });
  

  
  // Create Feature Layers
  
  app.map.on("load", function (e) {
  

 app.TestSwitch = new FeatureLayer(app.TestSwitch, {
      "id": "TestSwitch",
      mode: FeatureLayer.MODE_ONDEMAND,
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
     var TableSwitch = document.getElementById('TableSwitch');
     var filterButton = document.getElementById('filterButton');
     var resetButton = document.getElementById('resetButton');
     var HispPopDp = document.getElementById("HispPop");
     var BroadbandDp = document.getElementById("BroadbandSpeed");
     var IncomeDp = document.getElementById("Income");
     var PopDensityDp = document.getElementById("PopDensity");
     var CountiesDisplayed = document.getElementById("Summary");
     var PercentFrom = document.getElementById('PercentFrom');
     var PercentTo = document.getElementById('PercentTo');



    //Add Layers to Map

    app.map.addLayer(app.TestSwitch);
    app.map.addLayer(app.TestSwitch4);


    //Set Default Colors
    app.defaultFrom = Color.fromHex("#FFFF80");
    app.defaultTo = Color.fromHex("#6B0000");
    
    
    
   //Add Options to Dropdown Select List 
   var HispanicPopulationFilter = {
    '>= 0' : 'Any',
    '> 0 AND "C_TotLatPo" < 1000' : '0 - 1000',
    '> 1001 AND "C_TotLatPo" < 10000'  : '1001 - 10,000',
    '> 10001 AND "C_TotLatPo" < 50001'  : '10,001 - 50,000',
    '> 50001 AND "C_TotLatPo" < 250000'  : '50,001 - 250,000',
    '> 250000'  : '> 250,000',
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
    '> 0 AND "MaxAvgWeig" < 100' : 'Limited Access (0-100)',
    '> 101 AND "MaxAvgWeig" < 250' : 'Typical Household (101-250)',
    '> 251 AND "MaxAvgWeig" < 400'  : 'Specialized Uses (251-400) ',
    '> 401 AND "MaxAvgWeig" < 1000'  : 'Business Broadband (401-1000)',

}


var PopDensityFilter = {
    ' >= 0' : 'Any',
    ' = 3': 'Rural',
    ' = 2' : 'Suburban',
    ' = 1': 'Urban'
}

var IncomeFilter = {
    '>= 0' : 'Any',
    '> 0 AND "LatPct" < 25' : '0% - 25%',
    '> 26 AND "LatPct" < 50' : '25% - 50%',
    '> 27 AND "LatPct" < 75'  : '51% - 75%',
    '> 76 AND "LatPct" < 100'  : '76% - 100%',

}



var ZoomToList = {
  'Calexico':'Calexico, CA',
  'New York City, NY':'New York City, NY',
  'Chicago, IL':'Chicago, IL',
  'Los Los Angeles, CA':'Los Angeles, CA',
  'Washington, D.C.':'Washington, D.C.',
  'Houston':'Houston, TX',
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
   
/*    var IncomeSelect = document.getElementById("Income");
   for(index in IncomeFilter) {
    IncomeSelect.options[IncomeSelect.options.length] = new Option(IncomeFilter[index], index);
   } */
   
    var PopDensitySelect = document.getElementById("PopDensity");
   for(index in PopDensityFilter) {
    PopDensitySelect.options[PopDensitySelect.options.length] = new Option(PopDensityFilter[index], index);
   }
   
   
    var ZoomToSelect = document.getElementById("Locations");
   for(index in ZoomToList) {
    ZoomToSelect.options[ZoomToSelect.options.length] = new Option(ZoomToList[index], index);
   }
   
   
/*     var PercentFromValue = document.getElementById('PercentFrom').value;
    var PercentToValue = document.getElementById('PercentTo').value; */
  


    function setDefinitionExp(HispPopValue, BroadbandSpeedValue, PercentFrom, PercentTo, PopDensityValue) {
    
    var PercentFromValue = document.getElementById('PercentFrom').value;
    var PercentToValue = document.getElementById('PercentTo').value;

    
            console.log("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue + " AND " + "RUCC2" + PopDensityValue);
      app.TestSwitch.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue + " AND " + "RUCC2" + PopDensityValue);
       app.TestSwitch2.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue + " AND " + "RUCC2" + PopDensityValue);
      app.TestSwitch3.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue + " AND " + "RUCC2" + PopDensityValue);
      app.TestSwitch8.setDefinitionExpression("C_TotLatPo" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue + " AND " + "RUCC2" + PopDensityValue);
     
      console.log("C_TotLat_1" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue + " AND " + "RUCC2" + PopDensityValue)
      app.TestSwitch4.setDefinitionExpression("C_TotLat_1" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue);
      app.TestSwitch5.setDefinitionExpression("C_TotLat_1" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue);
      app.TestSwitch6.setDefinitionExpression("C_TotLat_1" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue);
      app.TestSwitch7.setDefinitionExpression("C_TotLat_1" + " " + HispPopValue + " " + "AND" + " " +  "MaxAvgWeig" + " " + BroadbandSpeedValue + " " + "AND" + " " + "LatPct >=" + " " + PercentFromValue + " " + "AND " + "LatPct <=" + PercentToValue);
        } 
    
    
    
    ZoomTo.addEventListener('click', function(e) {
    
    if  (document.getElementById("Locations").value == "Calexico"){
    var calexico = new Extent(-115.54, 32.70, -115.44, 32.67);
    app.map.setExtent(calexico)}; 
    });
    
    if  (document.getElementById("Locations").value == "New York City, NY"){
    var NYC = new Extent(-74.12, 40.82, -73.79, 40.68);
    app.map.setExtent(NYC)};
    
    
    
    
    
     app.map.on("extent-change", function(e) {
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch.visibleAtMapScale;
     if (CountyLayerVisible == true && Button1.checked == true) {
     document.getElementById("feedback3").style.top = "619px";
     app.legend.layerInfos[0].layer = app.TestSwitch;
     app.legend.refresh()}
     else if (Button1.checked == true) {
     document.getElementById("feedback3").style.top = "650px";
     console.log('hello2')
     app.legend.layerInfos[0].layer = app.TestSwitch4;
     app.legend.refresh()};
     });

    
    filterButton.addEventListener('click', function() {setDefinitionExp(HispPopDp.value, BroadbandDp.value, PercentFrom, PercentTo, PopDensityDp.value );
        app.TestSwitch.refresh();
        app.TestSwitch2.refresh();
        app.TestSwitch3.refresh();
        app.TestSwitch4.refresh();
        app.TestSwitch5.refresh();
        app.TestSwitch6.refresh();
        app.TestSwitch7.refresh();
        app.TestSwitch8.refresh();
        var HispPopLoadLayerVisible = app.TestSwitch.visibleAtMapScale;
        var HispPopLayerVisible = app.TestSwitch.visibleAtMapScale;
        var HispPopPctLayerVisible = app.TestSwitch3.visibleAtMapScale;
        var BroadbandSpeedLayer = app.TestSwitch2.visibleAtMapScale;
        var PopDensityLayerVisible = app.TestSwitch8.visibleAtMapScale;
        
        
        var queryCount = new Query();
        var C_queryPopSum = new Query();
        var C_queryLatPopSum = new Query();
        var C_queryAvgBroadbandSpeed = new Query();
        var C_TotPopDef = new StatisticDefinition();
        var C_LatTotPopDef = new StatisticDefinition();
        var C_AvgBroadbandSpeedDef = new StatisticDefinition();
        C_LatTotPopDef.statisticType = "sum";
        C_LatTotPopDef.onStatisticField = 'C_TotLatPo';
        C_LatTotPopDef.outStatisticFieldName = "CountyTotLatPop";
        
        
     var T_queryPopSum = new Query();
     var T_queryLatPopSum = new Query();
     var T_queryAvgBroadbandSpeed = new Query();
     var T_TotPopDef = new StatisticDefinition();
     var T_LatTotPopDef = new StatisticDefinition();
     var T_AvgBroadbandSpeedDef = new StatisticDefinition();

     T_TotPopDef.statisticType = "sum";
     T_TotPopDef.onStatisticField = 'T_TotPop';
     T_TotPopDef.outStatisticFieldName = "TotPop";
     T_LatTotPopDef.statisticType = "sum";
     T_LatTotPopDef.onStatisticField = 'T_TotLatPo';
     T_LatTotPopDef.outStatisticFieldName = "CountyTotLatPop";
     T_queryLatPopSum.geometry = app.map.extent;  
     T_queryLatPopSum.where = '1=1';
     T_queryLatPopSum.spatialRelationship = T_queryLatPopSum.SPATIAL_REL_CONTAINS
     T_queryLatPopSum.outStatistics = [T_LatTotPopDef];
     T_queryPopSum.geometry = e.extent;  
     T_queryPopSum.where = '1=1';
     T_queryPopSum.spatialRelationship = T_queryPopSum.SPATIAL_REL_CONTAINS
     T_queryPopSum.outStatistics = [T_TotPopDef];
     
     T_AvgBroadbandSpeedDef.statisticType = "avg";
     T_AvgBroadbandSpeedDef.onStatisticField = "MaxAvgWeig";
     T_AvgBroadbandSpeedDef.outStatisticFieldName = "CountyAvgBroadbandSpeed";
     T_queryAvgBroadbandSpeed.geometry = app.map.extent;
     T_queryAvgBroadbandSpeed.where = '1=1';
     T_queryAvgBroadbandSpeed.spatialRelationship = Query.SPATIAL_REL_CONTAINS
     T_queryAvgBroadbandSpeed.outStatistics = [T_AvgBroadbandSpeedDef];
        
        
        
        C_TotPopDef.statisticType = "sum";
        C_TotPopDef.onStatisticField = 'C_TotPop';
        C_TotPopDef.outStatisticFieldName = "TotPop";
        queryCount.geometry = app.map.extent;  
        queryCount.where = '1=1';
        queryCount.spatialRelationship = Query.SPATIAL_REL_CONTAINS;
        C_queryPopSum.geometry = app.map.extent;  
        C_queryPopSum.where = '1=1';
        C_queryPopSum.spatialRelationship = Query.SPATIAL_REL_CONTAINS
        C_queryPopSum.outStatistics = [C_TotPopDef];
        C_queryLatPopSum.geometry = app.map.extent;  
        C_queryLatPopSum.where = '1=1';
        C_queryLatPopSum.spatialRelationship = Query.SPATIAL_REL_CONTAINS
        C_queryLatPopSum.outStatistics = [C_LatTotPopDef];
        C_queryAvgBroadbandSpeed.geometry = app.map.extent;  
        C_queryAvgBroadbandSpeed.where = '1=1';
        C_queryAvgBroadbandSpeed.spatialRelationship = Query.SPATIAL_REL_CONTAINS
        C_queryAvgBroadbandSpeed.outStatistics = [C_AvgBroadbandSpeedDef];
        C_AvgBroadbandSpeedDef.statisticType = "avg";
        C_AvgBroadbandSpeedDef.onStatisticField = "MaxAvgWeig";
        C_AvgBroadbandSpeedDef.outStatisticFieldName = "CountyAvgBroadbandSpeed";
        
        
        

        
        function getAverageBroadbandSpeed(results3){
        var stats = results3.features[0].attributes;
        document.getElementById("SummaryText4").innerHTML = "<strong>Average Broadband Speed: </strong>" +  "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + stats.CountyAvgBroadbandSpeed.toFixed(2) + " Mbp/s" + "</span>";
};

        
        if (HispPopLoadLayerVisible == true && Button1.checked == true){
        app.TestSwitch.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
     document.getElementById("SummaryText").innerHTML = "<strong> Counties Displayed: </strong>"  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds.length).toLocaleString('en')  + "</span>" }));
/*         app.TestSwitch.queryFeatures(C_queryPopSum, getStats);
         */        app.TestSwitch.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch.queryFeatures(C_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }
        else if (HispPopLoadLayerVisible == false && Button1.checked == true) {         
        app.TestSwitch4.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
       document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"}));
/*         app.TestSwitch4.queryFeatures(C_queryPopSum, getStats);
         */        app.TestSwitch4.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch4.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }     
        
        if (HispPopPctLayerVisible == true && Button3.checked == true){
        app.TestSwitch3.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
             document.getElementById("SummaryText").innerHTML = "<strong> Counties Displayed: </strong>"  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds.length).toLocaleString('en')  + "</span>" }));
/*         app.TestSwitch3.queryFeatures(C_queryPopSum, getStats);
         */        app.TestSwitch3.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch3.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }
        else if (HispPopPctLayerVisible == false && Button3.checked == true) {         
        app.TestSwitch6.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
        document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"}));
/*         app.TestSwitch6.queryFeatures(C_queryPopSum, getStats);
         */        app.TestSwitch6.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch6.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        } 
       
        if (BroadbandSpeedLayer == true && Button2.checked == true){
        app.TestSwitch2.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
             document.getElementById("SummaryText").innerHTML = "<strong> Counties Displayed: </strong>"  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds.length).toLocaleString('en')  + "</span>" }));
/*         app.TestSwitch2.queryFeatures(C_queryPopSum, getStats);
         */        app.TestSwitch2.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch2.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }
        else if (BroadbandSpeedLayer == false && Button2.checked == true) {         
        app.TestSwitch5.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
        document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"}));
/*         app.TestSwitch5.queryFeatures(C_queryPopSum, getStats);
         */        app.TestSwitch5.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch5.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        } 
       
        if (PopDensityLayerVisible == true && Button4.checked == true){
        app.TestSwitch8.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
             document.getElementById("SummaryText").innerHTML = "<strong> Counties Displayed: </strong>"  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds.length).toLocaleString('en')  + "</span>" }));
/*         app.TestSwitch8.queryFeatures(C_queryPopSum, getStats);
         */        app.TestSwitch8.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch8.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }
        else if (PopDensityLayerVisible == false && Button4.checked == true) {         
        app.TestSwitch7.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
        document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"}));
/*         app.TestSwitch7.queryFeatures(C_queryPopSum, getStats);
         */        app.TestSwitch7.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch7.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        } 
 
       },
      );
    

      resetButton.addEventListener('click', function(){
        var HispPopLoadLayerVisible = app.TestSwitch.visibleAtMapScale;
        var HispPopLayerVisible = app.TestSwitch.visibleAtMapScale;
        var HispPopPctLayerVisible = app.TestSwitch3.visibleAtMapScale;
        var BroadbandSpeedLayer = app.TestSwitch2.visibleAtMapScale;
        var PopDensityLayerVisible = app.TestSwitch8.visibleAtMapScale;
        
        document.getElementById('PercentFrom').value = '0';
        document.getElementById('PercentTo').value = '100';
      
      
      
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
      PopDensityDp.selectedIndex=0;

        var queryCount = new Query();
        var C_queryPopSum = new Query();
        var C_queryLatPopSum = new Query();
        var C_queryAvgBroadbandSpeed = new Query();
        var C_TotPopDef = new StatisticDefinition();
        var C_LatTotPopDef = new StatisticDefinition();
        var C_AvgBroadbandSpeedDef = new StatisticDefinition();
        C_LatTotPopDef.statisticType = "sum";
        C_LatTotPopDef.onStatisticField = 'C_TotLatPo';
        C_LatTotPopDef.outStatisticFieldName = "CountyTotLatPop";
        
        
        
        C_TotPopDef.statisticType = "sum";
        C_TotPopDef.onStatisticField = 'C_TotPop';
        C_TotPopDef.outStatisticFieldName = "TotPop";
        queryCount.geometry = app.map.extent;  
        queryCount.where = '1=1';
        queryCount.spatialRelationship = Query.SPATIAL_REL_CONTAINS;
        C_queryPopSum.geometry = app.map.extent;  
        C_queryPopSum.where = '1=1';
        C_queryPopSum.spatialRelationship = Query.SPATIAL_REL_CONTAINS
        C_queryPopSum.outStatistics = [C_TotPopDef];
        C_queryLatPopSum.geometry = app.map.extent;  
        C_queryLatPopSum.where = '1=1';
        C_queryLatPopSum.spatialRelationship = Query.SPATIAL_REL_CONTAINS
        C_queryLatPopSum.outStatistics = [C_LatTotPopDef];
        C_queryAvgBroadbandSpeed.geometry = app.map.extent;  
        C_queryAvgBroadbandSpeed.where = '1=1';
        C_queryAvgBroadbandSpeed.spatialRelationship = Query.SPATIAL_REL_CONTAINS
        C_queryAvgBroadbandSpeed.outStatistics = [C_AvgBroadbandSpeedDef];
        C_AvgBroadbandSpeedDef.statisticType = "avg";
        C_AvgBroadbandSpeedDef.onStatisticField = "MaxAvgWeig";
        C_AvgBroadbandSpeedDef.outStatisticFieldName = "CountyAvgBroadbandSpeed";
        
        var T_queryPopSum = new Query();
     var T_queryLatPopSum = new Query();
     var T_queryAvgBroadbandSpeed = new Query();
     var T_TotPopDef = new StatisticDefinition();
     var T_LatTotPopDef = new StatisticDefinition();
     var T_AvgBroadbandSpeedDef = new StatisticDefinition();

    T_TotPopDef.statisticType = "sum";
     T_TotPopDef.onStatisticField = 'T_TotPop';
     T_TotPopDef.outStatisticFieldName = "TotPop";
     T_LatTotPopDef.statisticType = "sum";
     T_LatTotPopDef.onStatisticField = 'T_TotLatPo';
     T_LatTotPopDef.outStatisticFieldName = "CountyTotLatPop";
     T_queryLatPopSum.geometry = app.map.extent;  
     T_queryLatPopSum.where = '1=1';
     T_queryLatPopSum.spatialRelationship = T_queryLatPopSum.SPATIAL_REL_CONTAINS
     T_queryLatPopSum.outStatistics = [T_LatTotPopDef];
     T_queryPopSum.geometry = e.extent;  
     T_queryPopSum.where = '1=1';
     T_queryPopSum.spatialRelationship = T_queryPopSum.SPATIAL_REL_CONTAINS
     T_queryPopSum.outStatistics = [T_TotPopDef];
     
     T_AvgBroadbandSpeedDef.statisticType = "avg";
     T_AvgBroadbandSpeedDef.onStatisticField = "MaxAvgWeig";
     T_AvgBroadbandSpeedDef.outStatisticFieldName = "CountyAvgBroadbandSpeed";
     T_queryAvgBroadbandSpeed.geometry = app.map.extent;
     T_queryAvgBroadbandSpeed.where = '1=1';
     T_queryAvgBroadbandSpeed.spatialRelationship = Query.SPATIAL_REL_CONTAINS
     T_queryAvgBroadbandSpeed.outStatistics = [T_AvgBroadbandSpeedDef];
        
        
        function getAverageBroadbandSpeed(results3){
        var stats = results3.features[0].attributes;
        document.getElementById("SummaryText4").innerHTML = "<strong>Average Broadband Speed: </strong>" +  "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + stats.CountyAvgBroadbandSpeed.toFixed(2)+ " Mbp/s" + "</span>";};


        
        if (HispPopLoadLayerVisible == true && Button1.checked == true){
        app.TestSwitch.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
     document.getElementById("SummaryText").innerHTML = "<strong> Counties Displayed: </strong>"  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds.length).toLocaleString('en')  + "</span>" }));
        app.TestSwitch.queryFeatures(C_queryPopSum);
        app.TestSwitch.queryFeatures(C_queryLatPopSum);
        app.TestSwitch.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }
        else if (HispPopLoadLayerVisible == false && Button1.checked == true) {         
        app.TestSwitch4.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
        document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"}));
        app.TestSwitch4.queryFeatures(C_queryPopSum, getStats);
        app.TestSwitch4.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch4.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }     
        
        if (HispPopPctLayerVisible == true && Button3.checked == true){
        app.TestSwitch3.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
     document.getElementById("SummaryText").innerHTML = "<strong> Counties Displayed: </strong>"  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds.length).toLocaleString('en')  + "</span>" }));
        app.TestSwitch3.queryFeatures(C_queryPopSum, getStats);
        app.TestSwitch3.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch3.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }
        else if (HispPopPctLayerVisible == false && Button3.checked == true) {         
        app.TestSwitch6.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
        document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"}));
        app.TestSwitch6.queryFeatures(C_queryPopSum, getStats);
        app.TestSwitch6.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch6.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        } 
       
        if (BroadbandSpeedLayer == true && Button2.checked == true){
        app.TestSwitch2.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
     document.getElementById("SummaryText").innerHTML = "<strong> Counties Displayed: </strong>"  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds.length).toLocaleString('en')  + "</span>" }));
        app.TestSwitch2.queryFeatures(C_queryPopSum, getStats);
        app.TestSwitch2.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch2.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }
        else if (BroadbandSpeedLayer == false && Button2.checked == true) {         
        app.TestSwitch5.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
        document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"}));
        app.TestSwitch5.queryFeatures(C_queryPopSum, getStats);
        app.TestSwitch5.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch5.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        } 
       
        if (PopDensityLayerVisible == true && Button4.checked == true){
        app.TestSwitch8.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
        document.getElementById("SummaryText").innerHTML = "<strong>Counties Displayed:</strong>"  + objectIds.length}));
        app.TestSwitch8.queryFeatures(C_queryPopSum, getStats);
        app.TestSwitch8.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch8.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        }
        else if (PopDensityLayerVisible == false && Button4.checked == true) {         
        app.TestSwitch7.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
        document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"}));
        app.TestSwitch7.queryFeatures(C_queryPopSum, getStats);
        app.TestSwitch7.queryFeatures(C_queryLatPopSum, getTotalLatinoPopulation);
        app.TestSwitch7.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
        } 
 
       },
      );




    
    // Add Button Events to Change Layers
    
    // Hispanic Poulation Button
     Button1.addEventListener('click', function(e){
     
     document.getElementById("feedback3").style.top = "619px";
     
     app.outFields = ["C_TotLatPo"];
     app.map.removeLayer(app.TestSwitch2);
     app.map.removeLayer(app.TestSwitch3)
     app.map.removeLayer(app.TestSwitch5)
     app.map.removeLayer(app.TestSwitch6)
     app.map.removeLayer(app.TestSwitch7)
     app.map.removeLayer(app.TestSwitch8)

     app.map.addLayer(app.TestSwitch);
     app.map.addLayer(app.TestSwitch4);
     app.legend.refresh();
     app.TestSwitch.refresh();

     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
 
     var classDef = new ClassBreaksRenderer(symbol, "C_TotLatPo");
     classDef.addBreak({minValue: 0, maxValue: 2000, label: "0 - 2,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)"))});
     classDef.addBreak({minValue: 2001, maxValue: 11000, label: "2,001 - 11,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)"))});
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
     if (CountyLayerVisible == true && Button1.checked == true) {
     document.getElementById("feedback3").style.top = "619px";
     app.legend.layerInfos[0].layer = app.TestSwitch;
     app.legend.refresh()}
     else if (Button1.checked == true) {
     document.getElementById("feedback3").style.top = "650px";
     console.log('hello2')
     app.legend.layerInfos[0].layer = app.TestSwitch4;
     app.legend.refresh()};
     });
     

     

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
     
     
      document.getElementById("feedback3").style.top = "560px";
           

     // Remove Unwanted Layers
     app.outFields = ["MaxAvgWeig"];
     app.map.removeLayer(app.TestSwitch);
     app.map.removeLayer(app.TestSwitch3);
     app.map.removeLayer(app.TestSwitch4);
     app.map.removeLayer(app.TestSwitch7);
     app.map.removeLayer(app.TestSwitch8);

    // Add Residres Layers and Refresh Them
     app.map.addLayer(app.TestSwitch2);
     app.map.addLayer(app.TestSwitch5);
     app.legend.refresh();
     app.TestSwitch2.refresh();

    // Add Fill Symbol and Color It for Counties
     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
    
    // Set Break Values and Color Values for Counties 
     var classDef = new ClassBreaksRenderer(symbol, "MaxAvgWeig");
     classDef.addBreak(0, 100, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(79,79,79)")));
     classDef.addBreak(101, 250, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(87,125,69)")));
     classDef.addBreak(251, 400, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(87,173,50)")));
     classDef.addBreak(401, 1000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(76,230,0)")));
     classDef.defaultLabel = null;
     classDef.defaultSymbol = null;

    // Apply Breaks and Color Values to the Renderer and Apply the Renderer to the Layer
     app.TestSwitch2.setRenderer(classDef);
     app.TestSwitch2.redraw();
   
    // Change the Legend and Summary Statistics When Counties/Tracts are Displayed
     app.map.on("extent-change", function(e) {

     var CountyLayerVisible = app.TestSwitch2.visibleAtMapScale;

     if  (CountyLayerVisible == true && Button2.checked == true){
     app.legend.layerInfos[0].layer = app.TestSwitch2;
     app.legend.refresh(); }
     
     else if (CountyLayerVisible == false && Button2.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch5;
     app.legend.refresh()};
   
     });
     
     // Change the Legend to Counties or Tracts on Button Click Event
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch2.visibleAtMapScale;
     if (CountyLayerVisible == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch2;
     app.legend.refresh()}
     else {
     app.legend.layerInfos[0].layer = app.TestSwitch5;
     app.legend.refresh()};

    // Create Fill Symbol and Color it for Tracts
     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));

   // Set Break Values and Color Values for Tracts 
     var classDef2 = new ClassBreaksRenderer(symbol2, "MaxAvgWeig");
     classDef2.addBreak(0, 100, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(79,79,79)")));
     classDef2.addBreak(101, 250, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(87,125,69)")));
     classDef2.addBreak(251, 400, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(87,173,50)")));
     classDef2.addBreak(401, 1000, new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(76,230,0)")));

   // Set Default Values to Null. This prevents 'others' from auto-rendering as a null category
     classDef2.defaultLabel = null;
     classDef2.defaultSymbol = null;
     
   //Apply colors to renderer, apply renderer to layer, refersh layer.  
     app.TestSwitch5.setRenderer(classDef2);
     app.TestSwitch5.redraw();

    });
  
  
  
    
      // Hispanic Population Percent  Button
     Button3.addEventListener('click', function(e){
     
     document.getElementById("feedback3").style.top = "740px";

     // Remove Unwanted Layers
     app.outFields = ["LatPct","LatPct"];
     app.map.removeLayer(app.TestSwitch2);
     app.map.removeLayer(app.TestSwitch);
     app.map.removeLayer(app.TestSwitch4);
     app.map.removeLayer(app.TestSwitch5);
     app.map.removeLayer(app.TestSwitch7);

    // Add Residres Layers and Refresh Them
     app.map.addLayer(app.TestSwitch3);
     app.map.addLayer(app.TestSwitch6);
     app.legend.refresh();
     app.TestSwitch3.refresh();
     app.TestSwitch6.refresh();

    // Add Fill Symbol and Color It for Counties
     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
    
    // Set Break Values and Color Values for Counties 
     var classDef = new ClassBreaksRenderer(symbol, "LatPct");
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

    // Apply Breaks and Color Values to the Renderer and Apply the Renderer to the Layer
     app.TestSwitch3.setRenderer(classDef);
     app.TestSwitch3.redraw();
   
    // Change the Legend and Summary Statistics When Counties/Tracts are Displayed
     app.map.on("extent-change", function(e) {
     

     var CountyLayerVisible = app.TestSwitch3.visibleAtMapScale;
     

     if  (CountyLayerVisible == true && Button3.checked == true){
     app.legend.layerInfos[0].layer = app.TestSwitch3;
     app.legend.refresh(); }   
     else if (CountyLayerVisible == false && Button3.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch6;
     app.legend.refresh()};
   
     });
     
     // Change the Legend to Counties or Tracts on Button Click Event
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch3.visibleAtMapScale;
     if (CountyLayerVisible == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch3;
     app.legend.refresh()}
     else {
     app.legend.layerInfos[0].layer = app.TestSwitch6;
     app.legend.refresh()};

    // Create Fill Symbol and Color it for Tracts
     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));

   // Set Break Values and Color Values for Tracts 
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
     classDef.defaultSymbol = null;;

   // Set Default Values to Null. This prevents 'others' from auto-rendering as a null category
     classDef2.defaultLabel = null;
     classDef2.defaultSymbol = null;
     
   //Apply colors to renderer, apply renderer to layer, refersh layer.  
     app.TestSwitch6.setRenderer(classDef2);
     app.TestSwitch6.redraw();
 
    });
    
    
    
    
     //  Population Density Button Speed Button
     Button4.addEventListener('click', function(e){
     
     document.getElementById("feedback3").style.top = "510px";
     
     app.outFields.push('RUCC')
     app.outFields.push('RUCA')


     // Remove Unwanted Layers
     app.map.removeLayer(app.TestSwitch2);
     app.map.removeLayer(app.TestSwitch);
     app.map.removeLayer(app.TestSwitch4);
     app.map.removeLayer(app.TestSwitch5);
     app.map.removeLayer(app.TestSwitch3);
     app.map.removeLayer(app.TestSwitch6);

    // Add Desired Layers and Refresh Them

     
     app.map.addLayer(app.TestSwitch7);
     app.map.addLayer(app.TestSwitch8);
     app.legend.refresh();
     app.TestSwitch7.refresh();
     app.TestSwitch8.refresh(); 

     
     var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
     new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
     new Color([255,0,0]), 2),new Color([255,255,0,0.25])
  );
    

    
    // Set Break Values and Color Values for Counties 
     var classDef = new UniqueValueRenderer(symbol, "RUCC");
     classDef.addValue("Rural", new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,235,214)")));
     classDef.addValue("Suburban", new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(224,132,101)")));
     classDef.addValue("Urban", new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(196,10,10)")));

     
     classDef.defaultLabel = null;
     classDef.defaultSymbol = null; 


    // Apply Breaks and Color Values to the Renderer and Apply the Renderer to the Layer
     app.TestSwitch8.setRenderer(classDef);
     app.TestSwitch8.redraw();
   
    // Change the Legend and Summary Statistics When Counties/Tracts are Displayed
     app.map.on("extent-change", function(e) {
     app.outFields.push('RUCA')
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch8.visibleAtMapScale;
     if  (CountyLayerVisible == true && Button4.checked == true){
     app.legend.layerInfos[0].layer = app.TestSwitch8;
     app.legend.refresh();
     }
     else if (CountyLayerVisible == false && Button4.checked == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch7;
     app.legend.refresh()
    };
   
     });
     
     // Change the Legend to Counties or Tracts on Button Click Event
     var currentScale = app.map.getScale();
     var CountyLayerVisible = app.TestSwitch8.visibleAtMapScale;
     if (CountyLayerVisible == true) {
     app.legend.layerInfos[0].layer = app.TestSwitch8;
     app.legend.refresh()}
     else {
     app.map.addLayer(app.TestSwitch7);
     app.legend.layerInfos[0].layer = app.TestSwitch7;
     app.legend.refresh()};

    // Create Fill Symbol and Color it for Tracts
     var symbol2 = new SimpleFillSymbol();
     symbol2.setColor(new Color([150, 150, 150, 0.5]));

   // Set Break Values and Color Values for Tracts 
     var classDef2 = new UniqueValueRenderer(symbol, "RUCA");
     classDef2.defaultLabel = null;
     classDef2.defaultSymbol = null;

    classDef2.addValue({value: "3",symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,235,214)")),label: "Rural"});
    classDef2.addValue({value: "2",symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(224,132,101)")),label: "Suburban"});
    classDef2.addValue({value: "1",symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(196,10,10)")),label: "Urban"});



   //Apply colors to renderer, apply renderer to layer, refersh layer.  
     app.TestSwitch7.setRenderer(classDef2);
     app.TestSwitch7.redraw();
     console.log(app.TestSwitch7)
    });

    
    //Render County Hispanic Population Layer on Page Load
     
     var symbol = new SimpleFillSymbol();
     symbol.setColor(new Color([150, 150, 150, 0.5]));
         
     var classDef = new ClassBreaksRenderer(symbol, "C_TotLatPo");
     classDef.addBreak({minValue: 0, maxValue: 2000, label: "0 - 2,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(255,255,128)"))});
     classDef.addBreak({minValue: 2001, maxValue: 11000, label: "2,001 - 11,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(252,221,93)"))});
     classDef.addBreak({minValue: 11001, maxValue: 23000, label: "11,001 - 23,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(247,186,62)"))});
     classDef.addBreak({minValue: 23001, maxValue: 65000, label: "23,001 - 65,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(214,133,34)"))});
     classDef.addBreak({minValue: 65001, maxValue: 500000, label: "65,001 - 500,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(158,68,16)"))});
     classDef.addBreak({minValue:500001, maxValue: 5000000, label: "500,000 - 5,000,000", symbol: new SimpleFillSymbol().setColor(new Color.fromRgb("rgb(107,6,1)"))});
     

     
     classDef.defaultLabel = null;
     classDef.defaultSymbol = null;

  
     app.TestSwitch.setRenderer(classDef);
     app.TestSwitch.redraw();

      

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
     
     

         
        
    // Create Queries for Summary Statistics
     var queryCount = new Query();
     var C_queryPopSum = new Query();
     var C_queryLatPopSum = new Query();
     var C_queryAvgBroadbandSpeed = new Query();
     var C_TotPopDef = new StatisticDefinition();
     var C_LatTotPopDef = new StatisticDefinition();
     var C_AvgBroadbandSpeedDef = new StatisticDefinition();
     
     var T_queryPopSum = new Query();
     var T_queryLatPopSum = new Query();
     var T_queryAvgBroadbandSpeed = new Query();
     var T_TotPopDef = new StatisticDefinition();
     var T_LatTotPopDef = new StatisticDefinition();
     var T_AvgBroadbandSpeedDef = new StatisticDefinition();
         
     C_TotPopDef.statisticType = "sum";
     C_TotPopDef.onStatisticField = 'C_TotPop - C_TotLatPo';
     C_TotPopDef.outStatisticFieldName = "TotPop";
     C_LatTotPopDef.statisticType = "sum";
     C_LatTotPopDef.onStatisticField = 'C_TotLatPo';
     C_LatTotPopDef.outStatisticFieldName = "CountyTotLatPop"; 
     C_AvgBroadbandSpeedDef.statisticType = "avg";
     C_AvgBroadbandSpeedDef.onStatisticField = "MaxAvgWeig";
     C_AvgBroadbandSpeedDef.outStatisticFieldName = "CountyAvgBroadbandSpeed";
     C_queryLatPopSum.geometry = app.map.extent;  
     C_queryLatPopSum.where = '1=1';
     C_queryLatPopSum.spatialRelationship = C_queryLatPopSum.SPATIAL_REL_CONTAINS
     C_queryLatPopSum.outStatistics = [C_TotPopDef, C_LatTotPopDef];
     C_queryPopSum.geometry = app.map.extent;  
     C_queryPopSum.where = '1=1';
     C_queryPopSum.spatialRelationship = C_queryPopSum.SPATIAL_REL_CONTAINS
     C_queryPopSum.outStatistics = [C_TotPopDef];
     C_queryAvgBroadbandSpeed.geometry = app.map.extent;  
     C_queryAvgBroadbandSpeed.where = '1=1';
     C_queryAvgBroadbandSpeed.spatialRelationship = Query.SPATIAL_REL_CONTAINS
     C_queryAvgBroadbandSpeed.outStatistics = [C_AvgBroadbandSpeedDef];
     queryCount.geometry = e.extent;  
     queryCount.where = '1=1';
     queryCount.spatialRelationship = Query.SPATIAL_REL_CONTAINS;


         myFeatureTable = new FeatureTable({  
         featureLayer : app.TestSwitch,  
         editable: true, 
         map : app.map, 
         fieldInfos: [
         {name: 'C_TotLatPo', alias: 'County Latino Population', editable: 'false'},
         {name: 'LatPct', alias: 'County Percent Hispanic', editable: 'false'},
         {name: 'C_TotPop', alias: 'County Population', editable: 'false'},
         {name: 'Geography', alias: 'County Name', editable: 'false'},
         {name: 'IncomeHH', alias: 'Median Household Income', editable: 'false'},
         {name: 'PopDensity', alias: 'Population Density', editable: 'false'},
         {name: 'MaxAvgWeig', alias: 'Mean Broadband Speed', editable: 'false'},
         {name: 'urban_pct', alias: 'County Urban Percet', editable: 'false'},
         ],
         showFeatureCount: false,
         menuFunctions: [
         {label: 'Export to CSV', callback: customExportCSV}
         ]}, "Table2");  
          myFeatureTable.startup();



    document.getElementById("Table2").style.display = "none"; 
      





         function customExportCSV(evt){
          var data = myFeatureTable.dataStore.data
          
          var csv = convertArrayOfObjectsToCSV({
             data: data 
          });
          
          if (!csv.match(/^data:text\/csv/i)) {
              csv = 'data:text/csv;charset=utf-8,' + csv;
          }

            var encodedUri = encodeURI(csv);
            var link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download',"Exportdata.csv");
            link.click();
        }
          
        function convertArrayOfObjectsToCSV(value){
            var result, ctr, keys, columnDelimiter, lineDelimiter, data;
            
            data = Array.from(new Set(value.data)).filter(d => d).map(d => d.attributes) || null;
            if (!data || !data.length) {
                return null;
            }
            
            columnDelimiter = value.columnDelimiter || ',';
            lineDelimiter = value.lineDelimiter || '\n';
            
            keys = Object.keys(data[1]);
            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;
            
            data.forEach(function(item) {
                ctr = 0;
                keys.forEach(function(key) {
                    if (ctr > 0) 
                        result += columnDelimiter;
                        result += item[key];
                        ctr++;
                });
                result += lineDelimiter;
            });
      
            return result;
        }  



         // Execute Statistics Query against TestSwitch and call results into HTML Display
             
         var DataArray = [];
             
         function getTotalPopulation(results){};
         app.TestSwitch.queryFeatures(C_queryPopSum).then(function(e){
         getTotalPopulation(e.features[0].attributes);
         })

              
         function getTotalLatinoPopulation(results2){};
         app.TestSwitch.queryFeatures(C_queryLatPopSum).then(function(e){
         getTotalLatinoPopulation;
 })
      
         
         function getAverageBroadbandSpeed(results3){
         var stats = results3.features[0].attributes;
         document.getElementById("SummaryText4").innerHTML = "<strong>Average Broadband Speed: </strong>" +  stats.CountyAvgBroadbandSpeed.toFixed(2) + " Mbps/s";
         } 
         app.TestSwitch.queryFeatures(C_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
       

         app.TestSwitch.queryIds(queryCount,  function(objectIds) {  
         document.getElementById("SummaryText").innerHTML = "<strong>Counties Displayed: </strong>" + objectIds.length; 
         myFeatureTable.filterRecordsByIds(objectIds);
    /*      myFeatureTable.refresh();  */
                }); 
                
   

     
     // Do all of the above for if/else statement for counties and tracts
     // Change Legend for Counties and Tracts
     app.map.on("extent-change", function(e) {
     

     
     var query = new Query();
     query.geometry = e.extent;  
     query.where = '1=1';
     query.spatialRelationship = Query.SPATIAL_REL_CONTAINS;
     
     var TableData = [];
     
     app.TestSwitch.queryIds(query,  function(objectIds) {
     myFeatureTable.filterRecordsByIds(objectIds);
     var SelectedRows = myFeatureTable.getRowDataById(objectIds);
     TableData.push(SelectedRows);
 /*     myFeatureTable.refresh(); */
     });

     var queryCount = new Query();
     var C_queryPopSum = new Query();
     var C_queryLatPopSum = new Query();
     var C_queryAvgBroadbandSpeed = new Query();
     var C_queryPopDensity = new Query();
     var C_TotPopDef = new StatisticDefinition();
     var C_LatTotPopDef = new StatisticDefinition();
     var C_AvgBroadbandSpeedDef = new StatisticDefinition();
     var C_RuralDef = new StatisticDefinition();
     var C_SuburbanDef = new StatisticDefinition();
     var C_UrbanDef = new StatisticDefinition();
     
     var T_queryPopSum = new Query();
     var T_queryLatPopSum = new Query();
     var T_queryAvgBroadbandSpeed = new Query();
     var T_TotPopDef = new StatisticDefinition();
     var T_LatTotPopDef = new StatisticDefinition();
     var T_AvgBroadbandSpeedDef = new StatisticDefinition();
   
     
     var currentScale = app.map.getScale();
     
     var HispPopLoadLayerVisible = app.TestSwitch.visibleAtMapScale;
     var HispPopLayerVisible = app.TestSwitch.visibleAtMapScale;
     var HispPopPctLayerVisible = app.TestSwitch3.visibleAtMapScale;
     var BroadbandSpeedLayer = app.TestSwitch2.visibleAtMapScale;
     var PopDensityLayerVisible = app.TestSwitch8.visibleAtMapScale;
     
     
     function getStats(results){};

     function getTotalLatinoPopulation(results2){};
     
     function getRuralCount(results4) {};
     

     
     
     function getAverageBroadbandSpeed(results3){
     var stats = results3.features[0].attributes;
     document.getElementById("SummaryText4").innerHTML = "<strong>Average Broadband Speed: </strong>" +  "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + stats.CountyAvgBroadbandSpeed.toFixed(2) + " Mbp/s" + "</span>";
     return stats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
     
   /*  "<span style='font-weight:bold; font-size:100%; color:red'>" + stats.CountyAvgBroadbandSpeed.toFixed(2) +  " %</span> of the votes separate the two candidates"; */
     
   if  ((HispPopLoadLayerVisible == true && Button1.checked == true) || 
          (HispPopLayerVisible == true && Button1.checked == true) || 
          (HispPopPctLayerVisible == true && Button3.checked == true) ||
          (BroadbandSpeedLayer == true && Button2.checked == true) ||
          (PopDensityLayerVisible == true && Button4.checked == true) 
          ) {
          
     C_TotPopDef.statisticType = "sum";
     C_TotPopDef.onStatisticField = 'C_TotPop - C_TotLatPo';
     C_TotPopDef.outStatisticFieldName = "TotPop";
     
     C_RuralDef.statisticType = "sum";
     C_RuralDef.onStatisticField = 'RUCC_R';
     C_RuralDef.outStatisticFieldName = "RuralCount";
     C_SuburbanDef.statisticType = "sum";
     C_SuburbanDef.onStatisticField = 'RUCC_S';
     C_SuburbanDef.outStatisticFieldName = "SuburbanCount";
     C_UrbanDef.statisticType = "sum";
     C_UrbanDef.onStatisticField = 'RUCC_U';
     C_UrbanDef.outStatisticFieldName = "UrbanCount";
     C_queryPopDensity.geometry = app.map.extent;  
     C_queryPopDensity.where = '1=1';
     C_queryPopDensity.spatialRelationship = C_queryLatPopSum.SPATIAL_REL_CONTAINS
     C_queryPopDensity.outStatistics = [C_RuralDef, C_SuburbanDef, C_UrbanDef];

     
     
     
     
     C_LatTotPopDef.statisticType = "sum";
     C_LatTotPopDef.onStatisticField = 'C_TotLatPo';
     C_LatTotPopDef.outStatisticFieldName = "CountyTotLatPop"; 
     C_AvgBroadbandSpeedDef.statisticType = "avg";
     C_AvgBroadbandSpeedDef.onStatisticField = "MaxAvgWeig";
     C_AvgBroadbandSpeedDef.outStatisticFieldName = "CountyAvgBroadbandSpeed";
     C_queryLatPopSum.geometry = app.map.extent;  
     C_queryLatPopSum.where = '1=1';
     C_queryLatPopSum.spatialRelationship = C_queryLatPopSum.SPATIAL_REL_CONTAINS
     C_queryLatPopSum.outStatistics = [C_TotPopDef, C_LatTotPopDef];
     C_queryPopSum.geometry = app.map.extent;  
     C_queryPopSum.where = '1=1';
     C_queryPopSum.spatialRelationship = C_queryPopSum.SPATIAL_REL_CONTAINS
     C_queryPopSum.outStatistics = [C_TotPopDef];
     C_queryAvgBroadbandSpeed.geometry = app.map.extent;  
     C_queryAvgBroadbandSpeed.where = '1=1';
     C_queryAvgBroadbandSpeed.spatialRelationship = Query.SPATIAL_REL_CONTAINS
     C_queryAvgBroadbandSpeed.outStatistics = [C_AvgBroadbandSpeedDef];

     app.legend.layerInfos[0].layer = app.TestSwitch;
     app.legend.refresh();
     queryCount.geometry = e.extent;  
     queryCount.where = '1=1';
     queryCount.spatialRelationship = Query.SPATIAL_REL_CONTAINS; 

    
         app.TestSwitch.queryFeatures(C_queryPopDensity).then(function(e){
         getRuralCount;
         console.log(e.features[0].attributes.RuralCount)
         console.log(e.features[0].attributes.SuburbanCount)
         CanvasJS.addColorSet("PopulationDensity",
                [
                "#ffebd6",
                "#e08465",
                "#c40a0a",
                ]);
         var chart2 = new CanvasJS.Chart("PieChart2", {
         animationEnabled: true,
         backgroundColor: "transparent",
         colorSet: "PopulationDensity",
         title: {
         text: ""
         },
         data: [{
         type: "pie",
         indexLabel: "{name}",
         legendText: "",
         startAngle: 240,
         yValueFormatString: "##0\"\"",
         dataPoints: [
         {y: e.features[0].attributes.RuralCount, name: "Rural Counties"},
         {y: e.features[0].attributes.SuburbanCount, name: "Suburban Counties"},
         {y: e.features[0].attributes.UrbanCount, name: "Urban Population"}
         ]}]});
         chart2.render()
         }); 
    
    
     
      app.TestSwitch.queryFeatures(C_queryLatPopSum).then(function(e){
         console.log(e.features[0].attributes.CountyTotLatPop)
         console.log(e.features[0].attributes.TotPop)
         getTotalLatinoPopulation;
          CanvasJS.addColorSet("HispanicPopulation",
                [
                "#425782",
                "#848587"
                ]);
         var chart = new CanvasJS.Chart("PieChart1", {
         animationEnabled: true,
         backgroundColor: "transparent",
         colorSet: "HispanicPopulation",
         title: {
         text: ""
         },
        legend: {
         maxWidth: 350,
         itemWidth: 120},
         data: [{
         type: "pie",
         indexLabel: "{name}",
         legendText: "",
         startAngle: 240,
         yValueFormatString: "##0\"\"",
         dataPoints: [
         {y: e.features[0].attributes.CountyTotLatPop, name: "Hispanic Population"},
         {y: e.features[0].attributes.TotPop, name: "Non-Hispanic Population"}
         ]}]});
         chart.render();}) 
     
     
     
     app.TestSwitch.queryFeatures(C_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
     
     app.TestSwitch.queryIds(queryCount, lang.hitch(this, function(objectIds) {  
     document.getElementById("SummaryText").innerHTML = "<strong> Counties Displayed: </strong>"  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds.length).toLocaleString('en')  + "</span>" }));
     
     
     
     app.TestSwitch.queryFeatures(C_queryPopSum, getStats);

    }
     

else if ((HispPopLoadLayerVisible == false && Button1.checked == true) || 
          (HispPopLayerVisible == false && Button1.checked == true) || 
          (HispPopPctLayerVisible == false && Button3.checked == true) ||
          (BroadbandSpeedLayer == false && Button2.checked == true) ||
          (PopDensityLayerVisible == false && Button4.checked == true) 
          ){
          
     T_TotPopDef.statisticType = "sum";
     T_TotPopDef.onStatisticField = 'T_TotPop';
     T_TotPopDef.outStatisticFieldName = "TotPop";
     T_LatTotPopDef.statisticType = "sum";
     T_LatTotPopDef.onStatisticField = 'T_TotLatPo';
     T_LatTotPopDef.outStatisticFieldName = "CountyTotLatPop";
     T_queryLatPopSum.geometry = app.map.extent;  
     T_queryLatPopSum.where = '1=1';
     T_queryLatPopSum.spatialRelationship = T_queryLatPopSum.SPATIAL_REL_CONTAINS
     T_queryLatPopSum.outStatistics = [T_LatTotPopDef];
     T_queryPopSum.geometry = e.extent;  
     T_queryPopSum.where = '1=1';
     T_queryPopSum.spatialRelationship = T_queryPopSum.SPATIAL_REL_CONTAINS
     T_queryPopSum.outStatistics = [T_TotPopDef];
     
     T_AvgBroadbandSpeedDef.statisticType = "avg";
     T_AvgBroadbandSpeedDef.onStatisticField = "MaxAvgWeig";
     T_AvgBroadbandSpeedDef.outStatisticFieldName = "CountyAvgBroadbandSpeed";
     T_queryAvgBroadbandSpeed.geometry = app.map.extent;
     T_queryAvgBroadbandSpeed.where = '1=1';
     T_queryAvgBroadbandSpeed.spatialRelationship = Query.SPATIAL_REL_CONTAINS
     T_queryAvgBroadbandSpeed.outStatistics = [T_AvgBroadbandSpeedDef];
     

 
     app.legend.layerInfos[0].layer = app.TestSwitch4;
     app.legend.refresh()
     queryCount.geometry = e.extent;  
     queryCount.where = '1=1';
     queryCount.spatialRelationship = Query.SPATIAL_REL_CONTAINS;  
     app.TestSwitch4.queryIds(queryCount, lang.hitch(this, function(objectIds2) {  
     document.getElementById("SummaryText").innerHTML = "<strong> Block Groups Displayed: </strong>  "  + "<span style='font-weight:bold; font-size:100%; color:Crimson'>" + (objectIds2.length).toLocaleString('en')  + "</span>"
     
     app.TestSwitch4.queryFeatures(T_queryPopSum, getStats);
     app.TestSwitch4.queryFeatures(T_queryLatPopSum, getTotalLatinoPopulation);
     app.TestSwitch4.queryFeatures(T_queryAvgBroadbandSpeed, getAverageBroadbandSpeed);
             }))};
       
        

         
           
      
       
       });

      });
    });

