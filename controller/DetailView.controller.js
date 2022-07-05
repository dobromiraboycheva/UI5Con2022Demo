sap.ui.define(["./BaseController","sap/m/MessageToast"],function(e,t){"use strict";return e.extend("smart.controls.demo.controller.DetailView",{onInit:function(){const e=this.getRouter();e.getRoute("detail").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:function(e){const t=`/${window.decodeURIComponent(e.getParameter("arguments").detailPath)}`,i=this.getView();i.bindElement(t)},handleEditToggled:function(e){var t=this.getView().byId(e),i=this.getView().byId("footerBar");if(t.getEditable()){i.setVisible(true)}else{i.setVisible(false)}},handleEditToggledEurope:function(){this.handleEditToggled("smartFormEurope")},handleEditToggledAmerica:function(){this.handleEditToggled("smartFormAmerica")},handleEditToggledAsia:function(){this.handleEditToggled("smartFormAsia")},handleSaveButtonPress:function(){var e="Saved";t.show(e);var i=this.getView().byId("smartFormEurope"),a=this.getView().byId("smartFormAmerica"),s=this.getView().byId("smartFormAsia");i.setEditable(false);a.setEditable(false);s.setEditable(false)}})});