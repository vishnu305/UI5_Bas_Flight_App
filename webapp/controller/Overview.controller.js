sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/core/syncStyleClass","sap/ui/model/json/JSONModel"
    ,"sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/Sorter","sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, syncStyleClass, JSONModel, Filter, FilterOperator, Sorter, MessageToast) {
        "use strict";

        return Controller.extend("sap.training.exc.controller.Overview", {
            onInit: function() {
              var oModel = new JSONModel();
              this.getView().setModel(oModel, "customer");
            },
            onSavePrevious: function () {
              if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                  name: "sap.training.exc.view.Dialog"
                }).then(function (oDialog) {
                  syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
                  return oDialog;
                }.bind(this));
              }
              this.pDialog.then(function (oDialog) {
                oDialog.open();
              });
              },
            onCloseDialog: function () {
              this.byId("dialog").close();
            },
            onCustomerChange: function (oEvent) {
              var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
              this.byId("bookingTable").setBindingContext(oBindingContext);
            },
            onFilterCustomers: function (oEvent) {
              //build filter array
              var aFilter = [];
              var sQuery = oEvent.getParameter("query");
              if (sQuery && sQuery.length > 0) {
                aFilter.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
              }
              //filter binding
              var oTable = this.byId("customerTable");
              var oBinding = oTable.getBinding("items");
              oBinding.filter(aFilter);
            },
            onSortCustomers: function () {
              var oSorter = new Sorter("City",true);
              var aSorter = [];
              aSorter.push(oSorter);

              var oTable = this.byId("customerTable");
              var oBinding = oTable.getBinding("items");
              oBinding.sort(aSorter);

            },
            onSave: function () {
              var oModelData = this.getView().getModel("customer").getData();
              var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

              if (oModelData.Discount === undefined) { oModelData.Discount = 0; }

              this.byId("customerTable").getBinding("items").create({
                "Form": oModelData.Form,
                "CustomerName": oModelData.CustomerName,
                "Discount": oModelData.Discount + "",
                "Street": oModelData.Street,
                "PostCode": oModelData.PostCode,
                "City": oModelData.City,
                "Country": oModelData.Country,
                "Email": oModelData.Email,
                "Telephone": oModelData.Telephone
              }).created().then(function () {
                MessageToast.show(oResourceBundle.getText("customerCreatedMessage"));
              });
            },
            onNavToDetails: function (oEvent) {
              var oItem = oEvent.getSource();
              var oRouter = this.getOwnerComponent().getRouter();
            
            
              oRouter.navTo("detail", {
                customerId: oItem.getBindingContext().getPath().substring("/UX_Customer".length)
              });
            },
            onHover: function (evt){             
              var sText = this.getOwnerComponent().getModel("i18n").getProperty("msgSeatsAv");
              MessageToast.show(evt.getSource().getHoverText() + " " + sText, {duration: 1000}); 
            }

        });
    });
