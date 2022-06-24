/*!
 * ${copyright}
 */

sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/Matcher",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/Ancestor",
	"sap/ui/test/matchers/Descendant",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"./Util",
	"../p13n/Actions",
	"../p13n/Util",
	"../p13n/waitForP13nButtonWithMatchers",
	"../p13n/waitForP13nDialog",
	"sap/ui/core/Core"
], function(
	Opa5,
	Matcher,
	Properties,
	Ancestor,
	Descendant,
	PropertyStrictEquals,
	Press,
	EnterText,
	FilterBarUtil,
	p13nActions,
	p13nUtil,
	waitForP13nButtonWithMatchers,
	waitForP13nDialog,
	oCore
) {
	"use strict";

	var oMDCBundle = oCore.getLibraryResourceBundle("sap.ui.mdc");

	var iEnterFilterValue = function(oGroupViewItem, mSettings) {
		// Get sap.m.Panel of GroupViewItem
		this.waitFor({
			controlType: "sap.m.Panel",
			matchers: new Ancestor(oGroupViewItem, true),
			success: function(aPanels) {
				var oGroupPanel = aPanels[0];
				// Get the expand button for the panel
				this.waitFor({
					controlType: "sap.m.Button",
					matchers: new Ancestor(oGroupPanel, true),
					success: function(aButtons) {
						var oButton = aButtons[0];
						// click on expand button
						if (!oGroupPanel.getExpanded()) {
							new Press().executeOn(oButton);
						}
						this.waitFor({
							controlType: "sap.m.Toolbar",
							matchers: new Ancestor(oGroupPanel, true),
							success: function(aToolbars) {
								var oToolbar = aToolbars[0];
								// Get label of the GroupViewItem
								this.waitFor({
									controlType: "sap.m.Label",
									matchers: new Ancestor(oToolbar, true),
									success: function(aToolbarLabels) {
										var oToolbarLabel = aToolbarLabels[0];
										this.waitFor({
											controlType: "sap.m.List",
											matchers: new Ancestor(oGroupPanel, true),
											success: function(aLists) {
												var oList = aLists[0];
												// Get CustomListItems inside the GroupViewItem panel
												this.waitFor({
													controlType: "sap.m.CustomListItem",
													matchers: new Ancestor(oList, true),
													actions: function(oFilterItem) {
														this.waitFor({
															controlType: "sap.m.Label",
															matchers: new Ancestor(oFilterItem, false),
															success: function(aFilterFieldLabels) {
																var oFilterFieldLabel = aFilterFieldLabels[0];
																var sLabelFor = oFilterFieldLabel.getLabelFor();
																this.waitFor({
																	controlType: "sap.ui.mdc.filterbar.p13n.FilterGroupLayout",
																	id: sLabelFor,
																	success: function(oFilterGroupLayout) {
																		this.waitFor({
																			controlType: "sap.ui.mdc.FilterField",
																			matchers: function(oFilterField) {
																				if (mSettings[oToolbarLabel.getText()]) {
																					return oFilterField === oFilterGroupLayout._oFilterField;
																				}
																				return false;
																			},
																			actions: function (oFilterField) {
																				var oSettings = mSettings[oToolbarLabel.getText()];
																				if (oSettings.label === oFilterFieldLabel.getText()) {
																					oSettings.values.forEach(function(oValue) {
																						this.waitFor({
																							controlType: "sap.ui.mdc.field.FieldMultiInput",
																							matchers: new Ancestor(oFilterField),
																							actions: new EnterText({
																								text: oValue,
																								clearTextFirst: false,
																								pressEnterKey: true
																							})
																						});
																					}.bind(this));
																				}
																			}.bind(this)
																		});
																	}
																});
															}
														});
													}.bind(this),
													// close group panel
													success: function() {
														if (oGroupPanel.getExpanded()) {
															new Press().executeOn(oButton);
														}
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	};

    var oActions = {
		iOpenThePersonalizationDialog: function(oControl, oSettings) {
			var sControlId = typeof oControl === "string" ? oControl : oControl.getId();
			var aDialogMatchers = [];
			var aButtonMatchers = [];
			return this.waitFor({
				id: sControlId,
				success: function(oControlInstance) {
					Opa5.assert.ok(oControlInstance);

					aButtonMatchers.push(new Ancestor(oControlInstance));
					aDialogMatchers.push(new Ancestor(oControlInstance, false));

					// Add matcher for p13n button text
					var oMatcher = new Matcher();
					oMatcher.isMatching = function(oButton) {
						return oButton.getText().includes(oMDCBundle.getText("filterbar.ADAPT"));
					};
					aButtonMatchers.push(oMatcher);
					aDialogMatchers.push(new Properties({
						title: oMDCBundle.getText("filterbar.ADAPT_TITLE")
					}));

					waitForP13nButtonWithMatchers.call(this, {
						actions: new Press(),
						matchers: aButtonMatchers,
						success: function() {
							waitForP13nDialog.call(this, {
								matchers: aDialogMatchers,
								success:  function(oP13nDialog) {
									if (oSettings && typeof oSettings.success === "function") {
										oSettings.success.call(this, oP13nDialog);
									}
								}
							});
						},
						errorMessage: "Control '" + sControlId + "' has no P13n button"
					});
				},
				errorMessage: "Control '" + sControlId + "' not found."
			});
		},
		iExpectSearch: function(oFilterBar) {
			var sFilterBarId = typeof oFilterBar === "string" ? oFilterBar : oFilterBar.getId();
			var sText = FilterBarUtil.texts.go;
			return this.waitFor({
				id: sFilterBarId,
				success: function(oFilterBarInstance) {
					Opa5.assert.ok(oFilterBarInstance, "Found FilterBar.");
					if (!oFilterBarInstance.getLiveMode()) {
						this.waitFor({
							controlType: "sap.m.Button",
							matchers: [
								new Ancestor(oFilterBarInstance, false),
								new PropertyStrictEquals({
									name: "text",
									value: sText
								})
							],
							actions: new Press(),
							errorMessage: "No '" + sText + "' button found on the FilterBar."
						});
					}
				}
			});
		},
		iEnterFilterValue: function(oFilterBar, mSettings) {
			var sIcon = p13nUtil.icons.group;
			return oActions.iOpenThePersonalizationDialog.call(this, oFilterBar, {
				success: function(oP13nDialog) {
					this.waitFor({
						controlType: "sap.m.Button",
						matchers: [
							new Ancestor(oP13nDialog, false),
							new PropertyStrictEquals({
								name: "icon",
								value: sIcon
							})
						],
						actions: new Press(),
						success: function() {
							this.waitFor({
								controlType: "sap.ui.mdc.p13n.panels.GroupView",
								matchers: new Ancestor(oP13nDialog, false),
								success: function(aGroupViews) {
									var oGroupView = aGroupViews[0];
									this.waitFor({
										controlType: "sap.m.VBox",
										matchers: new Ancestor(oGroupView, true),
										success: function(aVBoxes) {
											var oVBox = aVBoxes[0];
											this.waitFor({
												controlType: "sap.m.List",
												matchers: new Ancestor(oVBox, true),
												success: function(aLists) {
													var oList = aLists[0];
													this.waitFor({
														controlType: "sap.m.CustomListItem",
														matchers: function(oCustomListItem) {
															var bAncestor = new Ancestor(oList, true)(oCustomListItem);

															return bAncestor && Object.keys(mSettings).includes(oCustomListItem.getContent()[0].getHeaderToolbar().getContent()[0].getText());
														},
														actions: function(oGroupViewItem) {
															iEnterFilterValue.call(this, oGroupViewItem, mSettings);
														}.bind(this),
														success: function() {
															p13nActions.iPressTheOKButtonOnTheDialog.call(this, oP13nDialog);
														}
													});
												}
											});
										}
									});
								}
							});
						},
						errorMessage: "No button with icon '" + sIcon + "' found on P13nDialog"
					});
				}
			});
		},
		iClearFilterValue: function(oFilterBar, sFilterLabel) {
			var sFilterBarId = typeof oFilterBar === "string" ? oFilterBar : oFilterBar.getId();
			return this.waitFor({
				id: sFilterBarId,
				success: function(oFilterBarInstance) {
					this.waitFor({
						controlType: "sap.ui.mdc.FilterField",
						matchers: [
							new PropertyStrictEquals({
								name: "label",
								value: sFilterLabel
							}),
							new Ancestor(oFilterBarInstance, true)
						],
						success: function(aFilterFields) {
							var oFilterField = aFilterFields[0];
							this.waitFor({
								controlType: "sap.m.Token",
								matchers: new Ancestor(oFilterField, false),
								actions: function(oToken) {
									this.waitFor({
										controlType: "sap.ui.core.Icon",
										matchers: [
											new Ancestor(oToken),
											new PropertyStrictEquals({
												name: "src",
												value: FilterBarUtil.icons.decline
											})
										],
										actions: new Press()
									});
								}.bind(this)
							});
						}
					});
				}
			});
		}
    };

	return oActions;

});