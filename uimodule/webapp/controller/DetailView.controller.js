sap.ui.define(
  ["./BaseController",
  "sap/m/MessageToast"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("smart.controls.demo.controller.DetailView", {
      onInit: function () {
        const oRouter = this.getRouter();
        oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        const sPath = `/${window.decodeURIComponent(oEvent.getParameter("arguments").detailPath)}`,
        oView = this.getView();
        oView.bindElement(sPath);
      },
      handleEditToggled: function (sSmartFormId) {
        var oSmartForm = this.getView().byId(sSmartFormId),
        oFooterBar = this.getView().byId("footerBar");

        if (oSmartForm.getEditable()) {
            oFooterBar.setVisible(true);
        } else {
            oFooterBar.setVisible(false);
        }
      },
      handleEditToggledEurope: function () {
        this.handleEditToggled("smartFormEurope");
      },
      handleEditToggledAmerica: function () {
        this.handleEditToggled("smartFormAmerica");
      },
      handleEditToggledAsia: function () {
        this.handleEditToggled("smartFormAsia");
      },
      handleSaveButtonPress:  function () {
        var sText = "Saved";
        MessageToast.show(sText);
        var oSmartFormEurope = this.getView().byId("smartFormEurope"),
        oSmartFormAmerica = this.getView().byId("smartFormAmerica"),
        oSmartFormAsia = this.getView().byId("smartFormAsia");
        oSmartFormEurope.setEditable(false);
        oSmartFormAmerica.setEditable(false);
        oSmartFormAsia.setEditable(false);
      }
    });
  }
);
