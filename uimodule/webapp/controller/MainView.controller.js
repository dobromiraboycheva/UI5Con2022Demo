sap.ui.define(
  ["./BaseController"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("smart.controls.demo.controller.MainView", {
      onInit: function () {
        // Get control references
        this._oSmartFilterBar = this.getView().byId("smartFilterBar");
        this._oStatusText = this.getView().byId("statusText");
      },

      onSFBinitialized: function () {
      },

      onBeforeExport: function (oEvt) {
        const mExcelSettings = oEvt.getParameter("exportSettings");
        if (mExcelSettings.url) {
          return;
        }
        mExcelSettings.worker = false;
      },

      onAssignedFiltersChanged: function () {
        if (this._oStatusText && this._oSmartFilterBar) {
          const sText = this._oSmartFilterBar.retrieveFiltersWithValuesAsText();

          this._oStatusText.setText(sText);
        }
      },

      onDetailNavigationPress: function (oEvent) {
        const oItem = oEvent.getSource();
        this.navTo("detail", {
          detailPath: window.encodeURIComponent(oItem.getBindingContext().getPath().substr(1)),
        });
      },
    });
  }
);
