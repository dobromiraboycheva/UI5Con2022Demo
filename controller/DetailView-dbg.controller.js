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
        oButton = this.getView().byId("button");

        if (oSmartForm.getEditable()) {
          oButton.setVisible(true);
        } else {
            oButton.setVisible(false);
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
      }
    });
  }
);
