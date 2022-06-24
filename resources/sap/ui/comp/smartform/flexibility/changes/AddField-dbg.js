/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */

sap.ui.define([
	"sap/base/Log",
	"sap/ui/fl/changeHandler/Base",
	"sap/ui/core/util/reflection/JsControlTreeModifier",
	"sap/ui/comp/smartform/flexibility/changes/AddFields"
], function(Log,
	Base,
	JsControlTreeModifier,
	AddFields
) {
	"use strict";

	/**
	 * Change handler for adding a smart form group element (representing a field).
	 * @constructor
	 * @alias sap.ui.fl.changeHandler.AddField
	 * @author SAP SE
	 * @version 1.102.1
	 * @experimental Since 1.27.0
	 */
	var AddField = {};

	/**
	 * Adds a smart form group element incl. a value control
	 *
	 * @param {sap.ui.fl.Change} oChange Change wrapper object with instructions to be applied to the control map
	 * @param {sap.ui.comp.smartform.Group|Element} oGroup Group control that matches the change selector for applying the change
	 * @param {object} mPropertyBag - Property bag
	 * @param {sap.ui.core.util.reflection.BaseTreeModifier} mPropertyBag.modifier - Modifier for the controls
	 * @param {sap.ui.core.UIComponent} mPropertyBag.appComponent - Component in which the change should be applied
	 * @param {object} mPropertyBag.view - View object or xml element representing an ui5 view
	 * @return {Promise} Resolves if successfully added
	 * @public
	 */
	AddField.applyChange = function(oChange, oGroup, mPropertyBag) {
		var oChangeDefinition = oChange.getDefinition();

		var fnCheckChangeDefinition = function(oChangeDefinition) {
			var bMandatoryTextsArePresent = oChangeDefinition.texts && oChangeDefinition.texts.fieldLabel && oChangeDefinition.texts.fieldLabel.value;
			var bContentPresent = oChangeDefinition.content;
			var bMandatoryContentPresent = false;

			if (bContentPresent) {
				bMandatoryContentPresent = oChangeDefinition.content.field && (oChangeDefinition.content.field.selector || oChangeDefinition.content.field.id) &&
					oChangeDefinition.content.field.jsType && oChangeDefinition.content.field.value && oChangeDefinition.content.field.valueProperty;
			}

			return  bMandatoryTextsArePresent && bContentPresent && bMandatoryContentPresent;
		};

		var oModifier = mPropertyBag.modifier;
		var oAppComponent = mPropertyBag.appComponent;
		var oView = mPropertyBag.view;


		if (fnCheckChangeDefinition(oChangeDefinition)) {
			var oChangeContent = oChangeDefinition.content;

			var oFieldSelector = oChangeContent.field.selector;
			var sFieldId = oChangeContent.field.id;
			var sLabelText = oChangeDefinition.texts.fieldLabel.value;
			var sJsType = oChangeContent.field.jsType;
			var sPropertyName = oChangeContent.field.valueProperty;
			var oPropertyValue = oChangeContent.field.value;
			var oEntitySet = oChangeContent.field.entitySet;
			var insertIndex = oChangeContent.field.index;

			if (oModifier.bySelector(oFieldSelector || sFieldId, oAppComponent, oView)) {
				return Base.markAsNotApplicable("Control to be created already exists:" + oFieldSelector || sFieldId, true/*async*/);
			}
			return Promise.resolve()
				.then(oModifier.createControl.bind(oModifier, "sap.ui.comp.smartform.GroupElement", oAppComponent, oView, oFieldSelector || sFieldId))
				.then(function (oGroupElement) {
					if (!oFieldSelector) {
						oFieldSelector = oModifier.getSelector(sFieldId, oAppComponent);
					}
					oChange.setRevertData({newFieldSelector: oFieldSelector});

					oModifier.setProperty(oGroupElement, "label", undefined);
					oModifier.setProperty(oGroupElement, "label", sLabelText);

					return Promise.resolve()
						.then(oModifier.insertAggregation.bind(oModifier, oGroup, "groupElements", oGroupElement, insertIndex, oView))
						.then(function () {
							return AddFields.addElementIntoGroupElement(oModifier, oView, oGroupElement, sJsType, sPropertyName, oPropertyValue, oEntitySet, insertIndex, oAppComponent);
						});
				});
		}
		Log.error("Change does not contain sufficient information to be applied: [" + oChangeDefinition.layer + "]" + oChangeDefinition.namespace + "/" + oChangeDefinition.fileName + "." + oChangeDefinition.fileType);
		//however subsequent changes should be applied
		return Promise.resolve();
	};

	/**
	 * Completes the change by adding change handler specific content
	 *
	 * @param {sap.ui.fl.Change} oChange change wrapper object to be completed
	 * @param {object} oSpecificChangeInfo with attributes "fieldLabel", the field label to be included in the change,
	 * 								 "fieldValue", the value for the control that displays the value,
	 * 								 "valueProperty", the control property that holds the field value,
	 * 								 "newControlId", the control ID for the control to be added
	 * 								 and "jsType", the JavaScript control for the field value.
	 * @param {object} mPropertyBag - map of properties
	 * @public
	 */
	AddField.completeChangeContent = function(oChange, oSpecificChangeInfo, mPropertyBag) {
		var oAppComponent = mPropertyBag.appComponent;
		var oChangeDefinition = oChange.getDefinition();

		if (oSpecificChangeInfo.fieldLabel) {
			Base.setTextInChange(oChangeDefinition, "fieldLabel", oSpecificChangeInfo.fieldLabel, "XFLD");
		} else {
			throw new Error("oSpecificChangeInfo.fieldLabel attribute required");
		}
		if (!oChangeDefinition.content) {
			oChangeDefinition.content = {};
		}
		if (!oChangeDefinition.content.field) {
			oChangeDefinition.content.field = {};
		}
		if (oSpecificChangeInfo.fieldValue) {
			oChangeDefinition.content.field.value = oSpecificChangeInfo.fieldValue;
		} else {
			throw new Error("oSpecificChangeInfo.fieldValue attribute required");
		}
		if (oSpecificChangeInfo.valueProperty) {
			oChangeDefinition.content.field.valueProperty = oSpecificChangeInfo.valueProperty;
		} else {
			throw new Error("oSpecificChangeInfo.valueProperty attribute required");
		}
		if ( oSpecificChangeInfo.newControlId ){
			oChangeDefinition.content.field.selector = JsControlTreeModifier.getSelector(oSpecificChangeInfo.newControlId, oAppComponent, {
				index : oSpecificChangeInfo.index
			});
		} else {
			throw new Error("oSpecificChangeInfo.newControlId attribute required");
		}
		if (oSpecificChangeInfo.jsType) {
			oChangeDefinition.content.field.jsType = oSpecificChangeInfo.jsType;
		} else {
			throw new Error("oSpecificChangeInfo.jsType attribute required");
		}
		if (oSpecificChangeInfo.index === undefined) {
			throw new Error("oSpecificChangeInfo.index attribute required");
		} else {
			oChangeDefinition.content.field.index = oSpecificChangeInfo.index;
		}
		if (oSpecificChangeInfo.entitySet){
			//an optional entity set can be configured
			oChangeDefinition.content.field.entitySet = oSpecificChangeInfo.entitySet;
		}

	};

	/**
	 * Reverts the applied change
	 *
	 * @param {sap.ui.fl.Change} oChange Change wrapper object with instructions to be applied to the control map
	 * @param {sap.ui.comp.smartform.Group|Element} oGroup Group control that matches the change selector for applying the change
	 * @param {object} mPropertyBag Property bag containing the modifier, the appComponent and the view
	 * @param {object} mPropertyBag.modifier Modifier for the controls
	 * @param {object} mPropertyBag.appComponent Component in which the change should be applied
	 * @param {object} mPropertyBag.view Application view
	 * @returns {Promise} Resolves if successful
	 * @public
	 */
	AddField.revertChange = function(oChange, oGroup, mPropertyBag) {
		return AddFields.revertChange(oChange, oGroup, mPropertyBag);
	};

	AddField.getChangeVisualizationInfo = function(oChange) {
		return {
			affectedControls: [oChange.getDefinition().content.field.selector]
		};
	};

	return AddField;
},
/* bExport= */true);
