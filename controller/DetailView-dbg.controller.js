sap.ui.define(
  ["./BaseController"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
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
    });
  }
);
