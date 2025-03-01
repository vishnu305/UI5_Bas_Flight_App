sap.ui.define(["sap/m/Text","sap/ui/core/mvc/XMLView","sap/ui/core/ComponentContainer"], function (Text,XMLView,ComponentContainer) {
    "use strict";
  
    // new Text({ text: "Hello World 2" }).placeAt("content");

    // XMLView.create({
    //     id:"App",
    //     viewName: "sap.training.exc.view.App"
    // }).then(function(oView){
    //     oView.placeAt("content");
    // });

    var oContainer = new ComponentContainer({
        id: "container",
        name: "sap.training.exc",
        manifest: true,
        async: true,
        settings: {
          id: "sap.training.exc"
        }
    });
    oContainer.placeAt("content");
  
  });