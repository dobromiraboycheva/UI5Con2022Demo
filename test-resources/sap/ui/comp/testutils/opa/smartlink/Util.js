/*
* ! ${copyright}
*/
sap.ui.define([], function () {
	"use strict";

	var oCompBundle = sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");

	var oMdcBundle = sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");

	var Util = {

		texts: {
			moreLinks: oCompBundle.getText("POPOVER_DEFINE_LINKS"),
            p13nPopoverTitle: oCompBundle.getText("POPOVER_SELECTION_TITLE"),
            ok: oCompBundle.getText("FORM_PERS_DIALOG_OK"),
            reset: oMdcBundle.getText("p13nDialog.RESET")
		},

		icons: {
			decline: "sap-icon://decline",
			group: "sap-icon://group-2",
			expandGroup: "sap-icon://slim-arrow-right"
		}

	};

	return Util;
});
