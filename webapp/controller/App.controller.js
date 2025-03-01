sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],function (Controller,MessageBox,MessageToast){
    "use strict";
    return Controller.extend("sap.training.exc.controller.App",{
        onInit: function () {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
          },
        onSayHello: function (){
            // MessageBox.information("Hello World");
            // var sMsg = oBundle.getText("helloVishnu");
            MessageToast.show("Hello Vishnu!");
        }
    });

});