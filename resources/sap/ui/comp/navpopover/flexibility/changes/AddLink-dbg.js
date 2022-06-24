/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */

sap.ui.define([
	"sap/ui/thirdparty/jquery", "sap/base/Log"
], function(jQuery, Log) {
	"use strict";

	/**
	 * Change handler for adding a smart form group element (representing a field).
	 *
	 * @constructor
	 * @private
	 * @since 1.44.0
	 * @alias sap.ui.comp.navpopover.flexibility.changes.AddLink
	 */
	var AddLink = {};

	/**
	 * Adds a smart form group element incl. a value control.
	 *
	 * @param {sap.ui.fl.Change} oChange
	 * @param {sap.ui.comp.navpopover.NavigationContainer} oNavigationContainer
	 * @param {object} mPropertyBag
	 * @private
	 */
	AddLink.applyChange = function(oChange, oNavigationContainer, mPropertyBag) {
		var oChangeContent = oChange.getContent();
		if (jQuery.isEmptyObject(oChangeContent)) {
			Log.error("Change does not contain sufficient information to be applied");
			return false;
		}

		var aAvailableAction = oNavigationContainer.getAvailableActions().filter(function(oLinkData) {
			return oLinkData.getKey() === oChangeContent.key;
		});
		if (aAvailableAction.length !== 1) {
			Log.error("Item with key " + oChangeContent.key + " not found in the availableAction aggregation");
			return false;
		}

		// Update the value of 'availableActions' aggregation
		mPropertyBag.modifier.setProperty(aAvailableAction[0], "visibleChangedByUser", oChange.getLayer() === "USER");
		mPropertyBag.modifier.setProperty(aAvailableAction[0], "visible", oChangeContent.visible);
		return true;
	};

	/**
	 * Completes the change by adding change handler specific content
	 *
	 * @param {sap.ui.fl.Change} oChange Change wrapper object to be completed
	 * @param {object} oSpecificChangeInfo
	 * @param {object} mPropertyBag
	 * @private
	 */
	AddLink.completeChangeContent = function(oChange, oSpecificChangeInfo, mPropertyBag) {
		if (jQuery.isEmptyObject(oSpecificChangeInfo.content)) {
			throw new Error("oSpecificChangeInfo.content should be filled");
		}
		if (!oSpecificChangeInfo.content.key) {
			throw new Error("In oSpecificChangeInfo.content.key attribute is required");
		}
		if (oSpecificChangeInfo.content.visible !== true) {
			throw new Error("In oSpecificChangeInfo.content.select attribute should be 'true'");
		}

		oChange.setContent(oSpecificChangeInfo.content);
	};

	AddLink.revertChange = function() {
		// This function is only to complete new required method of every change handler
		// So NavigationPopover can use new generic reset for control from flex API
		// AddLink does not need to be reverted, that always covered by another RemoveLink
		return true;
	};

	return AddLink;
},
/* bExport= */true);
