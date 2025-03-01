sap.ui.define([
    "sap/m/Button"
], function(Button){
    return Button.extend("sap.training.exc.control.HoverButton",{
        metadata:{
            properties:{
                "allowHover":{
                    type: "boolean",
                    defaultValue: false
                },
                "hoverText": {
                    type: "string"
                }
            },
            events:{
                "hover": {}
            }
        },
        onmouseover: function(evt){
            if (this.getAllowHover()){
                this.fireHover();
            }
        },
        renderer: {}
    });
});