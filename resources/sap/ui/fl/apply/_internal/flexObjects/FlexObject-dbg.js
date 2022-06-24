/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/base/Log",
	"sap/base/util/deepClone",
	"sap/base/util/isEmptyObject",
	"sap/base/util/isPlainObject",
	"sap/base/util/ObjectPath",
	"sap/base/util/restricted/_omit",
	"sap/ui/base/ManagedObject",
	"sap/ui/fl/apply/_internal/flexObjects/States",
	"sap/ui/fl/Layer",
	"sap/ui/fl/registry/Settings",
	"sap/ui/fl/Utils"
], function(
	Log,
	deepClone,
	isEmptyObject,
	isPlainObject,
	ObjectPath,
	_omit,
	ManagedObject,
	States,
	Layer,
	Settings,
	Utils
) {
	"use strict";

	/**
	 * @type {sap.ui.fl.apply._internal.flexObjects.FlexObject.FlexObjectMetadata}
	 * @static
	 * @constant
	 * @typedef {object} sap.ui.fl.apply._internal.flexObjects.FlexObject.FlexObjectMetadata
	 * @property {string} reference - Application component name
	 * @property {string} namespace - Namespace of the flex object file
	 * @property {string} creation - Timestamp of creation date
	 * @property {string} projectId - Project ID of the flex object file
	 * @property {string} packageName - ABAP package name
	 * @property {string} moduleName - Name of the module which this flex object refers to (XML or JS)
	 * @private
	 */

	/**
	 * @type {sap.ui.fl.apply._internal.flexObjects.FlexObject.SupportInformation}
	 * @static
	 * @constant
	 * @typedef {object} sap.ui.fl.apply._internal.flexObjects.FlexObject.SupportInformation
	 * @property {string} generator - Tool that is used to generate the flex object file
	 * @property {string} service - Name of the OData service
	 * @property {string} sourceSystem - ABAP source system
	 * @property {string} sourceClient - ABAP source client
	 * @property {string} user - Username who created the flex object
	 * @property {string} sapui5Version - UI5 version in which the flex object was created
	 * @property {string} sourceChangeFileName - File name of the source flex object in case of a copied flex object
	 * @property {string} compositeCommand - Unique ID that defines which flex objects belong together in a composite command
	 * @property {string} command - Name of the command
	 * @property {string} oDataInformation - Object with information about the OData service
	 * @property {string} originalLanguage - Language in which the flex object was created
	 * @private
	 */

	/**
	 * Base class for any flex object.
	 *
	 * @class Base class for any flex object
	 * @extends sap.ui.base.ManagedObject
	 * @alias sap.ui.fl.apply._internal.flexObjects.FlexObject
	 * @since 1.100
	 * @version 1.102.1
	 * @private
	 * @ui5-restricted sap.ui.fl
	 */
	var FlexObject = ManagedObject.extend("sap.ui.fl.apply._internal.flexObjects.FlexObject", /* @lends sap.ui.fl.apply._internal.flexObjects.FlexObject.prototype */ {
		metadata: {
			properties: {
				/**
				 * Current state of the flex object regarding the persistence.
				 * See {@link sap.ui.fl.apply._internal.flexObjects.States}.
				 */
				state: {
					type: "string",
					defaultValue: States.NEW
				},
				/**
				 * File type of the flex object.
				 * One of <code>change</code>, <code>variant</code>, <code>ctrl_variant</code>,
				 * <code>ctrl_variant_change</code> or <code>ctrl_variant_management_change</code>
				 */
				fileType: {
					type: "string",
					defaultValue: "change"
				},
				/**
				 * Layer of the flex object.
				 * See {@link sap.ui.fl.Layer}.
				 */
				layer: {
					type: "string"
				},
				/**
				 * Additional metadata of the flex object.
				 * See {@link sap.ui.fl.apply._internal.flexObjects.FlexObject.FlexObjectMetadata}.
				 */
				flexObjectMetadata: {
					type: "object",
					defaultValue: {}
				},
				/**
				 * Optional support information.
				 * See {@link sap.ui.fl.apply._internal.flexObjects.FlexObject.SupportInformation}.
				 */
				supportInformation: {
					type: "object",
					defaultValue: {}
				},
				/**
				 * Content of the flex object that is used to apply the flex object.
				 */
				content: {
					type: "any"
				},
				/**
				 * Map of texts that should be translated.
				 */
				texts: {
					type: "object",
					defaultValue: {}
				}
			}
		},
		constructor: function() {
			ManagedObject.apply(this, arguments);
			var oFlexObjectMetadata = this.getFlexObjectMetadata();
			if (oFlexObjectMetadata.reference) {
				oFlexObjectMetadata.namespace = (
					oFlexObjectMetadata.namespace
					|| Utils.createNamespace(
						{ reference: oFlexObjectMetadata.reference },
						this.getFileType()
					)
				);

				if (!oFlexObjectMetadata.projectId) {
					oFlexObjectMetadata.projectId = oFlexObjectMetadata.reference.replace(".Component", "");
				}
			}
			this.setFlexObjectMetadata(oFlexObjectMetadata);

			var oSupportInformation = this.getSupportInformation();
			if (!oSupportInformation.originalLanguage) {
				oSupportInformation.originalLanguage = Utils.getCurrentLanguage();
			}
			this.setSupportInformation(oSupportInformation);
		}
	});

	/**
	 * Returns the mapping between flex object properties and file content properties in the back-end response.
	 * @returns {object} Mapping information
	 * @static
	 */
	FlexObject.getMappingInfo = function () {
		return Object.assign({}, {
			"flexObjectMetadata.reference": "reference",
			"flexObjectMetadata.namespace": "namespace",
			"flexObjectMetadata.creation": "creation",
			"flexObjectMetadata.projectId": "projectId",
			"flexObjectMetadata.packageName": "packageName",
			"flexObjectMetadata.moduleName": "moduleName",
			"supportInformation.generator": "support.generator",
			"supportInformation.service": "support.service",
			"supportInformation.sourceSystem": "sourceSystem",
			"supportInformation.sourceClient": "sourceClient",
			"supportInformation.user": "support.user",
			"supportInformation.sapui5Version": "support.sapui5Version",
			"supportInformation.sourceChangeFileName": "support.sourceChangeFileName",
			"supportInformation.compositeCommand": "support.compositeCommand",
			"supportInformation.command": "support.command",
			"supportInformation.oDataInformation": "oDataInformation",
			"supportInformation.originalLanguage": "originalLanguage",
			layer: "layer",
			fileType: "fileType",
			content: "content",
			id: "fileName",
			texts: "texts"
		});
	};

	/**
	 * Returns the mapping between flex object properties and file content properties in the back-end response.
	 * Can be overridden to avoid access of static mapping within base methods.
	 * @returns {object} Mapping information
	 */
	FlexObject.prototype.getMappingInfo = function () {
		return FlexObject.getMappingInfo();
	};

	/**
	 * Sets the content of the flex object and marks the state as DIRTY.
	 * @param {any} oContent - Flex object content
	 * @returns {sap.ui.fl.apply._internal.flexObjects.FlexObject} <code>this</code> for chaining
	 */
	FlexObject.prototype.setContent = function (oContent) {
		this.setProperty("content", oContent);
		this.setState(States.DIRTY);
		return this;
	};

	/**
	 * Getter for additional flex object metadata.
	 * @returns {sap.ui.fl.apply._internal.flexObjects.FlexObject.FlexObjectMetadata} Additional metadata
	 */
	FlexObject.prototype.getFlexObjectMetadata = function () {
		return Object.assign({}, this.getProperty("flexObjectMetadata"));
	};

	/**
	 * Getter for flex object support information.
	 * @returns {sap.ui.fl.apply._internal.flexObjects.FlexObject.SupportInformation} Support information
	 */
	FlexObject.prototype.getSupportInformation = function () {
		return Object.assign({}, this.getProperty("supportInformation"));
	};

	function isValidStateChange(sNewState, sCurrentState) {
		if (!Object.values(States).includes(sNewState)) {
			return false;
		}
		// flex object state cannot move from NEW to DIRTY directly
		if (
			sCurrentState === States.NEW
			&& sNewState === States.DIRTY
		) {
			return false;
		}
		return true;
	}

	/**
	 * Validates and sets the state of the flex object.
	 * @param {sap.ui.fl.States} sState - New state
	 * @returns {sap.ui.fl.apply._internal.flexObjects.FlexObject} <code>this</code> for chaining
	 */
	FlexObject.prototype.setState = function (sState) {
		var sCurrentState = this.getState();
		if (sCurrentState !== sState && isValidStateChange(sState, sCurrentState)) {
			this._sPreviousState = sCurrentState;
			this.setProperty("state", sState);
		}
		return this;
	};

	/**
	 * Changes the state of the flex object to DELETED.
	 */
	FlexObject.prototype.markForDeletion = function () {
		this.setState(States.DELETED);
	};

	/**
	 * Restores the state before the last state change.
	 * Cannot go back further than the previous state.
	 */
	FlexObject.prototype.restorePreviousState = function () {
		if (this._sPreviousState) {
			this.setState(this._sPreviousState);
			delete this._sPreviousState;
		}
	};

	/**
	 * Checks if flex object is read only because of its source system.
	 * @returns {boolean} <code>true</code> if the flex object is from another system
	 */
	FlexObject.prototype.isChangeFromOtherSystem = function () {
		var sSourceSystem = this.getSupportInformation().sourceSystem;
		var sSourceClient = this.getSupportInformation().sourceClient;
		if (!sSourceSystem || !sSourceClient) {
			return false;
		}
		var oSettings = Settings.getInstanceOrUndef();
		if (!oSettings) {
			return true; // without settings the right to edit or delete a flex object cannot be determined
		}
		var sSystem = oSettings.getSystem();
		var sClient = oSettings.getClient();
		if (!sSystem || !sClient) {
			return false;
		}
		return (sSourceSystem !== sSystem || sSourceClient !== sClient);
	};

	/**
	 * Returns <code>true</code> if the flex object is user dependent.
	 * @returns {boolean} <code>true</code> if the flex object is only relevant for the current user
	 */
	FlexObject.prototype.isUserDependent = function () {
		return this.getLayer() === Layer.USER;
	};

	/**
	 * Returns the text in the current language for a given ID.
	 * @param {string} sTextId - Text ID which was used as part of the <code>texts</code> property
	 * @returns {string} The text for the given text ID
	 */
	FlexObject.prototype.getText = function (sTextId) {
		var oText = this.getTexts()[sTextId] || {};
		return oText.value || "";
	};

	/**
	 * Sets the new text for the given text ID.
	 * @param {string} sTextId - Text ID which was used as part of the <code>texts</code> property
	 * @param {string} sNewText - New text for the given text ID
	 * @returns {sap.ui.fl.apply._internal.flexObjects.FlexObject} <code>this</code> context for chaining
	 */
	FlexObject.prototype.setText = function (sTextId, sNewText) {
		var oTexts = Object.assign({}, this.getTexts());
		if (oTexts[sTextId]) {
			oTexts[sTextId] = Object.assign({}, oTexts[sTextId], {
				value: sNewText
			});
			this.setTexts(oTexts);
			this.setState(States.DIRTY);
		}
		return this;
	};

	function capitalize(sKey) {
		return sKey.length ? sKey.charAt(0).toUpperCase() + sKey.slice(1) : sKey;
	}

	function getOriginalMutator(sFunctionName) {
		return typeof this[sFunctionName] === "function"
			? this[sFunctionName].bind(this)
			: function () {
				throw new Error(sFunctionName + " is not a valid mutator");
			};
	}

	function getMutators(sPropertyName) {
		var aInstanceParts = sPropertyName.split(".");
		aInstanceParts[0] = capitalize(aInstanceParts[0]);
		var sFunctionName = aInstanceParts.shift();
		var fnGetter = getOriginalMutator.call(this, "get" + sFunctionName);
		var fnSetter = getOriginalMutator.call(this, "set" + sFunctionName);
		return {
			getValue: function () {
				var vCurrentValue = deepClone(fnGetter());
				if (aInstanceParts.length > 0) {
					return ObjectPath.get(aInstanceParts, vCurrentValue);
				}
				return vCurrentValue;
			},
			setValue: function (vValue) {
				var vPropertyValue = deepClone(fnGetter());
				if (aInstanceParts.length > 0) {
					ObjectPath.set(aInstanceParts, vValue, vPropertyValue);
				} else {
					vPropertyValue = vValue;
				}
				fnSetter(vPropertyValue);
				return this;
			}.bind(this)
		};
	}

	/**
	 * Converts properties of the flex object to the file content format according to the mapping info.
	 * @returns {object} File content of the flex object that can be persisted
	 */
	FlexObject.prototype.convertToFileContent = function() {
		var oFileContent = {};
		Object.entries(this.getMappingInfo()).forEach(function (aProperty) {
			var oValueToSet = getMutators.call(this, aProperty[0]).getValue();
			if (oValueToSet !== undefined) {
				ObjectPath.set(aProperty[1], oValueToSet, oFileContent);
			}
		}.bind(this));
		return oFileContent;
	};

	function updateProperty(sPropertyName, vValue) {
		var oMutators = getMutators.call(this, sPropertyName);
		var vCurrentValue = oMutators.getValue();
		if (vCurrentValue !== vValue) {
			oMutators.setValue(vValue);
		}
	}

	/**
	 * Converts the file content to the properties of the flex object according to the mapping info.
	 * @param {object} oFileContent - File content
	 * @param {object} oMappingInfo - Mapping info
	 * @returns {object} Properties map to create a new flex object
	 * @static
	 */
	FlexObject.mapFileContent = function (oFileContent, oMappingInfo) {
		var aValidFileProperties = Object.values(oMappingInfo);
		var mPropertyMap = {};

		var fnMapProperty = function (sKey, vValue, sPath) {
			var sNewPath = sPath ? sPath + "." + sKey : sKey;
			var iIndex = aValidFileProperties.indexOf(sNewPath);
			if (iIndex >= 0) {
				var sPropertyName = Object.keys(oMappingInfo)[iIndex];
				mPropertyMap[sPropertyName] = vValue;
			} else if (isPlainObject(vValue)) {
				Object.entries(vValue).forEach(function(aEntry) {
					fnMapProperty(aEntry[0], aEntry[1], sNewPath);
				});
			} else {
				Log.error("Missing mapping info for property " + sNewPath);
			}
		};

		Object.entries(deepClone(oFileContent)).forEach(function (aEntry) {
			fnMapProperty(aEntry[0], aEntry[1]);
		});
		return mPropertyMap;
	};

	/**
	 * Updates the flex object with a file content delta.
	 * @param {object} oFileContent - File content of the flex object
	 */
	FlexObject.prototype.update = function (oFileContent) {
		var oFilteredFileContent = _omit(oFileContent, ["fileName"]);
		var mProperties = FlexObject.mapFileContent(oFilteredFileContent, this.getMappingInfo());
		Object.entries(mProperties).forEach(function (aProperty) {
			updateProperty.call(this, aProperty[0], aProperty[1]);
		}.bind(this));
	};

	/**
	 * Sets the response from the back end after the flex object is saved.
	 * @param {object} oResponse - File content
	 */
	FlexObject.prototype.setResponse = function (oResponse) {
		if (!oResponse || isEmptyObject(oResponse)) {
			return;
		}
		this.update(oResponse);
		this.setState(States.PERSISTED);
	};

	return FlexObject;
});