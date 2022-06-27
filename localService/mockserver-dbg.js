sap.ui.define(
  ["sap/ui/core/util/MockServer", "sap/base/util/UriParameters"],
  /**
   * @param {typeof sap.ui.core.util.MockServer} MockServer
   * @param {typeof sap.base.util.UriParameters} UriParameters
   */
  function (MockServer, UriParameters) {
    "use strict";

    return {
      /**
       * Initializes the mock server.
       * You can configure the delay with the URL parameter "serverDelay".
       * The local mock data in this folder is returned instead of the real data for testing.
       * @public
       */
      init: function () {
        // create
        const oUriParamaters = UriParameters.fromQuery(window.location.search);
        const oMockServer = new MockServer({
          rootUri: "/",
        });

        MockServer.config({
          autoRespondAfter: oUriParamaters.get("serverDelay") || 0,
        });

        // simulate against the metadata and mock data
        oMockServer.simulate("localService/mockdata/metadata.xml", {
          sMockdataBaseUrl: "localService/mockdata",
          aEntitySetsNames: ["ZSALESREPORT", "ProductCodeVH", "UoMVH", "SAP__UnitsOfMeasure", "CurrencyCodeVH", "SAP__Currencies", "ClockInTimezoneEuropeVH", "ClockInTimezoneAmericaVH", "ClockInTimezoneAsiaVH"],
        });

        // start
        oMockServer.start();
      },
    };
  }
);
