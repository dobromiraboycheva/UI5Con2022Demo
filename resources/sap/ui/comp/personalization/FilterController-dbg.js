/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */

// Provides FilterController
sap.ui.define([
	'./BaseController',
	'sap/m/library',
	'sap/ui/comp/library',
	'./Util',
	'sap/ui/comp/filterbar/VariantConverterTo',
	'sap/ui/comp/filterbar/VariantConverterFrom',
	'sap/base/util/merge'

], function(
	BaseController,
	MLibrary,
	CompLibrary,
	Util,
	VariantConverterTo,
	VariantConverterFrom,
	merge
) {
	"use strict";

	/**
	 * The FilterController can be used to...
	 *
	 * @class Table Personalization Controller
	 * @extends sap.ui.comp.personalization.BaseController
	 * @author SAP
	 * @version 1.25.0-SNAPSHOT
	 * @private
	 * @alias sap.ui.comp.personalization.FilterController
	 */
	var FilterController = BaseController.extend("sap.ui.comp.personalization.FilterController", /** @lends sap.ui.comp.personalization.FilterController.prototype */ {
		constructor: function(sId, mSettings) {
			BaseController.apply(this, arguments);
			this.setType(MLibrary.P13nPanelType.filter);
			this.setItemType(MLibrary.P13nPanelType.filter + "Items");
			this._aDropdownFields = [];
		},
		metadata: {
			events: {
				afterFilterModelDataChange: {}
			}
		}
	});

	FilterController.prototype.setTable = function(oTable) {
		BaseController.prototype.setTable.apply(this, arguments);
	};

	FilterController.prototype.getColumn2Json = function(oColumn, sColumnKey, iIndex) {
		// This is not complete but the best we can do - problem is that the filter is not extractable from other table instances.
		if (this.getTableType() !== CompLibrary.personalization.TableType.AnalyticalTable && this.getTableType() !== CompLibrary.personalization.TableType.Table && this.getTableType() !== CompLibrary.personalization.TableType.TreeTable) {
			return null;
		}
		if (!Util.isFilterable(oColumn)) {
			return null;
		}
		if (!oColumn.getFiltered || (oColumn.getFiltered && !oColumn.getFiltered())) {
			return null;
		}
		return {
			columnKey: sColumnKey,
			exclude: false,
			operation: oColumn.getFilterOperator(),
			value1: oColumn.getFilterValue(),
			value2: "" // The Column API does not provide method for 'value2'
		};
	};

	FilterController.prototype.getColumn2JsonTransient = function(oColumn, sColumnKey, sText, sTooltip) {
		if (!Util.isFilterable(oColumn)) {
			return null;
		}

		var aValues;
		if (this.getTableType() === CompLibrary.personalization.TableType.AnalyticalTable || this.getTableType() === CompLibrary.personalization.TableType.Table || this.getTableType() === CompLibrary.personalization.TableType.TreeTable) {
			if (Util.getColumnType(oColumn) === "boolean") {
				aValues = Util._getCustomProperty(oColumn, "values");
			}

			return {
				columnKey: sColumnKey,
				text: sText,
				tooltip: sTooltip !== sText ? sTooltip : undefined,
				maxLength: Util._getCustomProperty(oColumn, "maxLength"),
				precision: Util._getCustomProperty(oColumn, "precision"),
				scale: Util._getCustomProperty(oColumn, "scale"),
				type: Util.getColumnType(oColumn),
				typeInstance: Util._getCustomProperty(oColumn, "typeInstance"),
				values: aValues,
				nullable: Util._getCustomProperty(oColumn, "nullable")
			};
		}
		if (this.getTableType() === CompLibrary.personalization.TableType.ResponsiveTable) {
			if (Util.getColumnType(oColumn) === "boolean") {
				aValues = Util._getCustomProperty(oColumn, "values");
			}

			return {
				columnKey: sColumnKey,
				text: sText,
				tooltip: sTooltip !== sText ? sTooltip : undefined,
				maxLength: Util._getCustomProperty(oColumn, "maxLength"),
				precision: Util._getCustomProperty(oColumn, "precision"),
				scale: Util._getCustomProperty(oColumn, "scale"),
				type: Util.getColumnType(oColumn),
				typeInstance: Util._getCustomProperty(oColumn, "typeInstance"),
				values: aValues,
				nullable: Util._getCustomProperty(oColumn, "nullable")
			};
		}
		if (this.getTableType() === CompLibrary.personalization.TableType.ChartWrapper) {
			return {
				columnKey: sColumnKey,
				text: sText,
				tooltip: sTooltip !== sText ? sTooltip : undefined,
				maxLength: Util._getCustomProperty(oColumn, "maxLength"),
				precision: Util._getCustomProperty(oColumn, "precision"),
				scale: Util._getCustomProperty(oColumn, "scale"),
				type: Util.getColumnType(oColumn),
				typeInstance: Util._getCustomProperty(oColumn, "typeInstance"),
				values: aValues,
				nullable: Util._getCustomProperty(oColumn, "nullable")
			};
		}
	};

	FilterController.prototype.handleIgnore = function(oJson, iIndex) {
		oJson.sort.sortItems.splice(iIndex, 1);
	};

	FilterController.prototype.syncJson2Table = function(oJson) {
		var oColumnKey2ColumnMap = this.getColumnMap();
		var oColumnKey2ColumnMapUnfiltered = merge({}, oColumnKey2ColumnMap);

		this.fireBeforePotentialTableChange();

		if (this.getTableType() === CompLibrary.personalization.TableType.AnalyticalTable || this.getTableType() === CompLibrary.personalization.TableType.Table || this.getTableType() === CompLibrary.personalization.TableType.TreeTable) {
			oJson.filter.filterItems.forEach(function(oFilterItem) {
				var oColumn = oColumnKey2ColumnMap[oFilterItem.columnKey];
				if (oColumn) {
					if (!oColumn.getFiltered()) {
						oColumn.setFiltered(true);
					}
					delete oColumnKey2ColumnMapUnfiltered[oFilterItem.columnKey];
				}
			});

			for (var sColumnKey in oColumnKey2ColumnMapUnfiltered) {
				var oColumn = oColumnKey2ColumnMapUnfiltered[sColumnKey];
				if (oColumn && oColumn.getFiltered()) {
					oColumn.setFiltered(false);
				}
			}
		}

		this.fireAfterPotentialTableChange();
	};

	FilterController.prototype.getDataSuiteFormat2Json = function(oDataSuiteFormat) {
		var oJson = this.createControlDataStructure();

		if (!oDataSuiteFormat.SelectOptions || !oDataSuiteFormat.SelectOptions.length) {
			return oJson;
		}
		oJson.filter.filterItems = oDataSuiteFormat.SelectOptions.map(function(oSelectOption) {
			var oConvertedOption = VariantConverterFrom.convertOption(oSelectOption.Ranges[0].Option, oSelectOption.Ranges[0].Low);
			return {
				columnKey: oSelectOption.PropertyName,
				exclude: (oSelectOption.Ranges[0].Sign === "E"),
				operation: oConvertedOption.op,
				value1: oConvertedOption.v,
				value2: oSelectOption.Ranges[0].High
			};
		});
		return oJson;
	};
	/**
	 * Creates property <code>SelectOptions</code> in <code>oDataSuiteFormat</code> object if at least one filter item exists. The <code>SelectOptions</code> contains the current PersistentData snapshot.
	 * @param {object} oDataSuiteFormat Structure of Data Suite Format
	 */
	FilterController.prototype.getDataSuiteFormatSnapshot = function(oDataSuiteFormat) {
		var oControlDataTotal = this.getUnionData(this.getControlDataInitial(), this.getControlData());
		if (!oControlDataTotal.filter || !oControlDataTotal.filter.filterItems || !oControlDataTotal.filter.filterItems.length) {
			return;
		}
		oControlDataTotal.filter.filterItems.forEach(function(oFilterItem) {
			var aRanges = VariantConverterTo.addRangeEntry(oDataSuiteFormat, oFilterItem.columnKey);
			VariantConverterTo.addRanges(aRanges, [
				oFilterItem
			]);
		});
	};

	FilterController.prototype.getPanel = function(oPayload) {
		// Note: in the time where controller gets the panel all table columns are present (also missing columns).
		// Note: in case that all filterable columns are excluded we nevertheless have to create the panel for the case that some filterable columns will be included.
		if (!Util.hasFilterableColumns(this.getColumnMap())) {
			return null;
		}
		if (oPayload && oPayload.column) {
			var sColumnKey = Util.getColumnKey(oPayload.column);
			if (sColumnKey) {
				var oJson = this.getTransientData();
				oJson.filter.filterItems.forEach(function(oItem) {
					oItem["isDefault"] = oItem.columnKey === sColumnKey;
				});
			}
		}
		var oTable = this.getTable(),
			oSmartFilter = this._getSmartFilterBar();

		if (oSmartFilter && oSmartFilter._oFilterProvider) {
			this._aDropdownFields = oSmartFilter._oFilterProvider._aFilterBarDropdownFieldMetadata;
		} else if (oTable && oTable.oParent && oTable.oParent._oTableProvider && oTable.oParent._oTableProvider._aTableViewMetadata) {
			this._aDropdownFields = oTable.oParent._oTableProvider._aTableViewMetadata.filter(function(oField) {
				return oField.hasFixedValues;
			});
		}
		return new Promise(function(resolve) {
			// Dynamically load panel once it is needed
			sap.ui.require([
				'sap/ui/comp/p13n/P13nFilterPanel', 'sap/m/P13nItem', 'sap/m/P13nAnyFilterItem', 'sap/ui/comp/providers/ValueListProvider'
			], function(P13nFilterPanel, P13nItem, P13nAnyFilterItem, ValueListProvider) {
				var oColumnKeyMap = this.getColumnMap(true),
					oPanel = new P13nFilterPanel({
					containerQuery: true,
					enableEmptyOperations: true,
					items: {
						path: "$sapmP13nPanel>/transientData/filter/filterItems",
						template: new P13nItem({
							columnKey: '{$sapmP13nPanel>columnKey}',
							text: "{$sapmP13nPanel>text}",
							tooltip: "{$sapmP13nPanel>tooltip}",
							maxLength: "{$sapmP13nPanel>maxLength}",
							precision: "{$sapmP13nPanel>precision}",
							scale: "{$sapmP13nPanel>scale}",
							type: "{$sapmP13nPanel>type}",
							typeInstance: "{$sapmP13nPanel>typeInstance}",
							isDefault: "{$sapmP13nPanel>isDefault}",
							values: "{$sapmP13nPanel>values}",
							nullable: "{$sapmP13nPanel>nullable}"
						})
					},
					filterItems: {
						path: "$sapmP13nPanel>/controlDataReduce/filter/filterItems",
						template: new P13nAnyFilterItem({
							key: "{$sapmP13nPanel>key}",
							columnKey: "{$sapmP13nPanel>columnKey}",
							exclude: "{$sapmP13nPanel>exclude}",
							operation: "{$sapmP13nPanel>operation}",
							value1: "{$sapmP13nPanel>value1}",
							value2: "{$sapmP13nPanel>value2}"
						})
					},
					messageStrip: this.getMessageStrip(),
					beforeNavigationTo: this.setModelFunction(),
					filterItemChanged: function(oEvent) {
						var sReason = oEvent.getParameter("reason");
						var iIndex = oEvent.getParameter("index");
						var oItem = oEvent.getParameter("itemData");
						var oControlDataReduce = this.getControlDataReduce();

						if (oItem && sReason === "added") {
							if (iIndex > -1) {
								oControlDataReduce.filter.filterItems.splice(iIndex, 0, oItem);
							} else {
								oControlDataReduce.filter.filterItems.push(oItem);
							}
						}

						// Note: as long as P13nFilterPanel updates the 'filterItem' aggregation we do not need to update the model item
						// if (sReason === "updated") {
						// 	oControlDataReduce[that.getType()][that.getItemType()].splice(iIndex, 1, oItem);
						// }

						if (sReason === "removed" && iIndex > -1) {
							oControlDataReduce[this.getType()][this.getItemType()].splice(iIndex, 1);
						}

						this.setControlDataReduce2Model(oControlDataReduce);
						this.fireAfterPotentialModelChange({
							json: oControlDataReduce
						});
					}.bind(this)
				});

				if (this._aDropdownFields && this._aDropdownFields.length > 0) {
					this._aDropdownFields = this._aDropdownFields.filter(function(oField){
						var oColumn = oColumnKeyMap[oField.name];
						return !!Util._getCustomProperty(oColumn, "fullName");
					});
				}

				oPanel._oConditionPanel.data("dropdownFields", this._aDropdownFields);
				var fnSuggestCallback = function(oControl, sFieldName) {
					var oColumnKey2ColumnMap = this.getColumnMap(true),
						oColumn = oColumnKey2ColumnMap[sFieldName],
						sFullyQualifiedFieldName = Util._getCustomProperty(oColumn, "fullName"),
						oSmartFilter = this._getSmartFilterBar(),
						oProvider,
						oSmartTable = this._getSmartTable(),
						oResult,
						aControlConfigurations = oSmartFilter && oSmartFilter.getControlConfiguration(),
						sAggregationName, bTypeAheadEnabled, sDisplayBehaviour, oControlConfiguration, i;

						if (oControl.isA("sap.m.ComboBox") || oControl.isA("sap.m.MultiComboBox")) {
							sAggregationName = "items";
							bTypeAheadEnabled = false;

							if (oSmartFilter && oSmartFilter._oFilterProvider) {
								oProvider = oSmartFilter._oFilterProvider;
								sDisplayBehaviour = oProvider._sTextArrangementDisplayBehaviour || "idOnly";
							} else if (oSmartTable && oSmartTable._oTableProvider) {
								oProvider = oSmartTable._oTableProvider;
								sDisplayBehaviour = oProvider._oDefaultDropDownDisplayBehaviour || "idOnly";
							}
							this._aDropdownFields.forEach(function(oField) {
								if (oField.name === sFieldName) {
									oResult = oField["com.sap.vocabularies.Common.v1.Text"];
									if (oResult) {
										sDisplayBehaviour = oProvider._oMetadataAnalyser.getTextArrangementValue(oResult);
									} else if (oField["com.sap.vocabularies.UI.v1.TextArrangement"]) {
										sDisplayBehaviour = oProvider._oMetadataAnalyser.getTextArrangementValue(oField);
									}
								}
							});
						if (Array.isArray(aControlConfigurations) && aControlConfigurations.length > 0) {
							for (i = 0; i < aControlConfigurations.length; i++) {
								oControlConfiguration = aControlConfigurations[i];
								if (oControlConfiguration.getKey() === sFieldName) {
									sDisplayBehaviour = oControlConfiguration.getDisplayBehaviour();
									break;
								}
							}
						}
					} else {
						sAggregationName = "suggestionRows";
						bTypeAheadEnabled = true;
					}

					if (sFullyQualifiedFieldName) {
						oControl.setShowSuggestion && oControl.setShowSuggestion(true);
						oControl.setFilterSuggests && oControl.setFilterSuggests(false);
						oControl.setModel(this.getTable().getModel()); // the control which should show suggest need the model from the table assigned

						return new ValueListProvider({
							fieldName: sFieldName,
							control: oControl,
							model: this.getTable().getModel(),
							maxLength: Util._getCustomProperty(oColumn, "maxLength"),
							displayBehaviour: sDisplayBehaviour,
							resolveInOutParams: false,
							loadAnnotation: true,
							fullyQualifiedFieldName: sFullyQualifiedFieldName,
							aggregation: sAggregationName,
							typeAheadEnabled: bTypeAheadEnabled,
							enableShowTableSuggestionValueHelp: false
						});
					}
				}.bind(this);

				oPanel._oConditionPanel._fSuggestCallback = fnSuggestCallback;

				// Enable enhanced exclude operations
				oPanel._enableEnhancedExcludeOperations();

				oPanel.addStyleClass("sapUiSmallMarginTop");

				return resolve(oPanel);
			}.bind(this));
		}.bind(this));
	};

	/**
	 * Operations on filter are processed sometime directly at the table and sometime not. In case that something has been changed via Personalization
	 * Dialog the consumer of the Personalization Dialog has to apply filtering at the table. In case that filter has been changed via user
	 * interaction at table, the change is instantly applied at the table.
	 */
	FilterController.prototype.getChangeType = function(oPersistentDataBase, oPersistentDataCompare) {
		if (!oPersistentDataCompare || !oPersistentDataCompare.filter || !oPersistentDataCompare.filter.filterItems) {
			return CompLibrary.personalization.ChangeType.Unchanged;
		}

		if (oPersistentDataCompare && oPersistentDataCompare.filter && oPersistentDataCompare.filter.filterItems) {
			oPersistentDataCompare.filter.filterItems.forEach(function(oFilterItem) {
				delete oFilterItem.key;
				delete oFilterItem.source;
			});
		}
		if (oPersistentDataBase && oPersistentDataBase.filter && oPersistentDataBase.filter.filterItems) {
			oPersistentDataBase.filter.filterItems.forEach(function(oFilterItem) {
				delete oFilterItem.key;
				delete oFilterItem.source;
			});
		}
		var bIsDirty = JSON.stringify(oPersistentDataBase.filter.filterItems) !== JSON.stringify(oPersistentDataCompare.filter.filterItems);

		return bIsDirty ? CompLibrary.personalization.ChangeType.ModelChanged : CompLibrary.personalization.ChangeType.Unchanged;
	};

	/**
	 * Result is XOR based difference = CurrentModelData - oPersistentDataCompare
	 *
	 * @param oPersistentDataBase
	 * @param {object} oPersistentDataCompare JSON object. Note: if sortItems is [] then it means that all sortItems have been deleted
	 * @returns {object} JSON object or null
	 */
	FilterController.prototype.getChangeData = function(oPersistentDataBase, oPersistentDataCompare) {
		if (!oPersistentDataBase || !oPersistentDataBase.filter || !oPersistentDataBase.filter.filterItems) {
			return this.createControlDataStructure();
		}

		if (oPersistentDataCompare && oPersistentDataCompare.filter && oPersistentDataCompare.filter.filterItems) {
			oPersistentDataCompare.filter.filterItems.forEach(function(oFilterItem) {
				delete oFilterItem.key;
				delete oFilterItem.source;
			});
		}
		if (oPersistentDataBase && oPersistentDataBase.filter && oPersistentDataBase.filter.filterItems) {
			oPersistentDataBase.filter.filterItems.forEach(function(oFilterItem) {
				delete oFilterItem.key;
				delete oFilterItem.source;
			});
		}

		if (!oPersistentDataCompare || !oPersistentDataCompare.filter || !oPersistentDataCompare.filter.filterItems) {
			return {
				filter: Util.copy(oPersistentDataBase.filter)
			};
		}

		if (JSON.stringify(oPersistentDataBase.filter.filterItems) !== JSON.stringify(oPersistentDataCompare.filter.filterItems)) {
			return {
				filter: Util.copy(oPersistentDataBase.filter)
			};
		}
		return null;
	};

	/**
	 * @param {object} oJsonBase - JSON object to which different properties from JSON oJson are added
	 * @param {object} oJson - JSON object from where the different properties are added to oJsonBase. Note: if filterItems
	 *        is [] then it means that all filterItems have been deleted
	 * @returns {object} JSON object as union result of oJsonBase and oJson
	 */
	FilterController.prototype.getUnionData = function(oJsonBase, oJson) {
		if (!oJson || !oJson.filter || !oJson.filter.filterItems) {
			return {
				filter: Util.copy(oJsonBase.filter)
			};
		}

		return {
			filter: Util.copy(oJson.filter)
		};
	};

	/**
	 * @private
	 * @returns The <code>SmartFilterBar</code> connected to the Table or null
	 */
	FilterController.prototype._getSmartFilterBar = function() {
		var oSmartFilter,
			oTable = this.getTable();

		if (oTable) {
			oSmartFilter = oTable.oParent && oTable.oParent._oSmartFilter;
		}

		if (!oSmartFilter && oTable && this.getTableType() === CompLibrary.personalization.TableType.ChartWrapper){
			oSmartFilter = oTable.getChartObject() && oTable.getChartObject().oParent &&
				oTable.getChartObject().oParent._oSmartFilter;
		}


		return oSmartFilter ? oSmartFilter : null;
	};

	/**
	 * @private
	 * @returns The <code>SmartFilterBar</code> connected to the Table or null
	 */
	 FilterController.prototype._getSmartTable = function() {
		return this.getTable() && this.getTable().getParent();
	 };

	/**
	 * Cleans up before destruction.
	 *
	 * @private
	 */
	FilterController.prototype.exit = function() {
		BaseController.prototype.exit.apply(this, arguments);
		this._aDropdownFields = null;
	};

	return FilterController;

});
