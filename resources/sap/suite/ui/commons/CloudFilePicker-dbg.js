/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */

// Provides control sap.suite.ui.commons.CloudFilePicker.
sap.ui.define([
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/DialogRenderer",
	"sap/m/List",
	"sap/m/StandardListItem",
	"sap/ui/model/odata/v4/ODataModel",
	"sap/m/Select",
	"sap/m/Label",
	"sap/m/Input",
	"sap/ui/layout/form/SimpleForm",
	"sap/ui/core/IconPool",
	"sap/m/Page",
	"sap/m/Breadcrumbs",
	"sap/m/Link",
	"sap/m/Text",
	"./CloudFileInfo",
	"./library",
	"sap/m/library",
	"sap/ui/core/library",
	"sap/ui/layout/FixFlex"
], function (
	Button,
	Dialog,
	DialogRenderer,
	List,
	StandardListItem,
	ODataModel,
	Select,
	Label,
	Input,
	SimpleForm,
	IconPool,
	Page,
	Breadcrumbs,
	Link,
	Text,
	CloudFileInfo,
	library,
	mLibrary,
	coreLibrary,
	FixFlex
) {
	"use strict";
	/**
	 * Constructur of the CloudFilePicker
         *
         * @extends sap.m.Dialog
         *
	 * @namespace sap.suite.ui.commons.CloudFilePicker
	 * @experimental
	 * @since 1.101
         *
         * @constructur
         * @internal
	 * @version 1.102.0
	 */
	var DialogType = mLibrary.DialogType;
	var ButtonType = mLibrary.ButtonType;
	var ValueState = coreLibrary.ValueState;
	var FilePickerModes = library.FilePickerModes;
	var oListControl, oSelectControl, oBreadcrumbLinkControl, oFileNameControl,
		aVisibleLinks, oNavigationMap, oConfirmationButton;

	var oResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");
	var CloudFilePicker = Dialog.extend("sap.suite.ui.commons.CloudFilePicker", {
		metadata: {
			library: "sap.suite.ui.commons",
			properties: {
				/**
				 * Url of the FileShare OData V4 service.
				 */
				serviceUrl: {
					type: "sap.ui.core.URI",
					group: "Data",
					defaultValue: ""
				},
				/**
				 * Overwrites the default text for the confirmation button.
				 */
				confirmButtonText: {
					type: "string",
					group: "Data",
					defaultValue: oResourceBundle.getText(
						"CFP_BUTTON_SELECT"
					)
				},
				/**
				 * Allow the type of resources that can be selected.
				 */
				filePickerMode: {
					type: "sap.suite.ui.commons.FilePickerModes",
					group: "Data",
					defaultValue: "All"
				},
				/**
				 * Specifies the text for selectButton.
				 */
				title: {
					type: "string",
					group: "Data",
					defaultValue: oResourceBundle.getText("CFP_TITLE")
				},
				/**
				 * Specifies whether duplicate file check logic is needed.
				 */
				enableDuplicateCheck: {
					type: "boolean",
					group: "Data",
					defaultValue: false
				},
				/**
				 * Overwrites the default text for the duplicate message popup.
				 * It is relevant only if "enableDuplicateCheck" is set to true.
				 */
				duplicateMessage: {
					type: "string",
					group: "Data"
				},
				/**
				 * File name could be provided in case File picker control is
				 * used for Export/Save As scenario for selecting the location.
				 * Value will be displayed in the File Name control on the dialog.
				 */
				suggestedFileName: {
					type: "string",
					group: "Data"
				},
				/**
				 * Specifies whether file name is mandatory to perform confirmation action
				 */
				fileNameMandatory: {
					type: "boolean",
					group: "Data",
					defaultValue: false
				}
			},
			events: {
				/**
				 * Event is fired when the selection is made
				 */
				select: {
					parameters: {
						/**
						 * Specifies whether an existing file is being overwritten in a file share.
						 */
						replaceExistingFile: "boolean",
						/**
						 * Specifies the name of the selected file.
						 */
						selectedFileName: "string",
						/**
						 * Specifies the details of the seleced file.
						 */
						selectedFiles: { type: "sap.suite.ui.commons.CloudFileInfo[]" },
						/**
						 * Specifies the details of the folder of a selected file.
						 */
						selectedFolder: { type: "sap.suite.ui.commons.CloudFileInfo" }
					}
				},

				/**
				 * Event is fired when the cancel button is pressed
				 *
				 *
				 */
				cancel: {}
			}
		},
		constructor: function () {
			Dialog.prototype.constructor.apply(this, arguments);

			this.setResizable(true);
			this._createDialogContent();
			this._createButton();

			this.setContentWidth("40%");
			this.setContentHeight("50%");

			this.setHorizontalScrolling(false);
			this.setVerticalScrolling(false);
			this.setTitle(this.getTitle());
		},
		renderer: DialogRenderer
	});

	CloudFilePicker.prototype._createDialogContent = function () {
		var sServiceURL = this.getServiceUrl();
		if (sServiceURL) {
			var oModel = new ODataModel({
				serviceUrl: sServiceURL,
				synchronizationMode: "None"
			});
			this.setModel(oModel);
			// Adding Select for cloud spaces
			var oSimpleForm = this._createCloudDropdownAndFileNameField();
			// Adding list to show the files and folders
			oBreadcrumbLinkControl = this._createBreadcrumbLinks();
			// Adding list to show the files and folders
			var oListContent = this._createListContent();
			var oFlexContainer = new FixFlex({
				fixContent: [oSimpleForm, oBreadcrumbLinkControl],
				flexContent: oListContent
			});
			this.addContent(oFlexContainer);
		}
	};

	CloudFilePicker.prototype._createCloudDropdownAndFileNameField = function () {
		var oLocationLabel = new Label({
			text: oResourceBundle.getText("CFP_LOCATION"),
			showColon: true,
			labelFor: this.getId() + "-cloudSpaceSelect"
		}).addStyleClass("sapUiTinyMarginTop");

		oSelectControl = new Select({
			selectedKey: "{FileShare}",
			id: this.getId() + "-cloudSpaceSelect",
			forceSelection: false,
			change: function (oControlEvent) {
				oFileNameControl.setValue(this.getSuggestedFileName());
				// Confirmation button if disabled already should be re enabled if fileNameControl is set with a value during drive location change
				// and the Confirmation button should be kept disabled when drive location changes
				this._setConfirmationButtonEnabled(false);
				oBreadcrumbLinkControl.destroyLinks();
				this._initializeVisibleLinks();

				var oSelectedItem = oControlEvent.getParameters().selectedItem;
				this._loadFileShareRootFolder(oSelectedItem.getKey());
			}.bind(this)
		}).bindItems({
			path: "/FileShares",
			template: new sap.ui.core.Item({
				key: "{FileShare}",
				text: {
					parts: ["FileShare", "FileShareDescription"],
					formatter: function (
						sFileShare,
						sFileShareDescription
					) {
						return sFileShareDescription ? sFileShareDescription : sFileShare;
					}
				}
			})
		});

		var oSimpleForm = new SimpleForm({
			layout: "ResponsiveGridLayout",
			singleContainerFullSize: false
		});
		oSimpleForm.addContent(oLocationLabel);
		oSimpleForm.addContent(oSelectControl);

		var oLabel = new Label({
			text: oResourceBundle.getText("CFP_FILENAME"),
			showColon: true,
			labelFor: this.getId() + "-fileName"
		}).addStyleClass("sapUiTinyMarginTop");

		oFileNameControl = new Input({
			id: this.getId() + "-fileName",
			liveChange: function (oControlEvent) {
				oListControl.removeSelections();
				this._setConfirmationButtonEnabled();
			}.bind(this)
		});
		oSimpleForm.addContent(oLabel);
		oSimpleForm.addContent(oFileNameControl);

		if (this.getFilePickerMode() === FilePickerModes.FileOnly) {
			oFileNameControl.setVisible(false);
		} else {
			oFileNameControl.setValue(this.getSuggestedFileName());
		}

		return oSimpleForm;
	};

	CloudFilePicker.prototype._createBreadcrumbLinks = function () {
		oBreadcrumbLinkControl = new Breadcrumbs(this.getId() + "-breadcrumbs").addStyleClass(
			"sapUiSmallMarginBegin sapUiSmallMarginEnd"
		);

		oNavigationMap = new Map();
		this._initializeVisibleLinks();

		return oBreadcrumbLinkControl;
	};

	CloudFilePicker.prototype._initializeVisibleLinks = function () {
		var oRoot = {
			fileShareItemId: "Root",
			title: oResourceBundle.getText("CFP_FOLDER_ROOT")
		};
		aVisibleLinks = [oRoot];
		oBreadcrumbLinkControl.setCurrentLocationText(oRoot.title);
		oNavigationMap.clear();
	};

	CloudFilePicker.prototype._createListContent = function () {
		oListControl = new List({
			mode: mLibrary.ListMode.SingleSelectMaster,
			select: function (oControlEvent) {
				var oSelectedItem = oControlEvent.getParameters().listItem;
				var oContext = oSelectedItem.getBindingContext();
				var bIsFolder = oContext.getObject("FileShareItemKind") === "folder";

				if (bIsFolder) {
					var oSelectedFolderInfo = this._createSelectionParameter(oSelectedItem);
					var sFileShareItemId = oSelectedFolderInfo.getFileShareItemId();
					oSelectedFolderInfo.path = oContext.getCanonicalPath() + "/_Children";
					oNavigationMap.set(sFileShareItemId, oSelectedFolderInfo);
					var oNewContext = oContext
						.getModel()
						.createBindingContext(oSelectedFolderInfo.path);
					aVisibleLinks.push({
						fileShareItemId: sFileShareItemId,
						title: oSelectedItem.getTitle()
					});

					this._updateBreadcrumbLinks();
					oListControl.setBindingContext(oNewContext);
				} else {
					var sFieldValue = oContext.getProperty("FileShareItemName");
					oFileNameControl.setValue(sFieldValue);
					this._setConfirmationButtonEnabled(true);
				}
			}.bind(this)
		});

		oListControl.bindItems({
			path: "",
			template: new StandardListItem({
				title: "{FileShareItemName}",
				icon: {
					parts: ["FileShareItemKind", "FileShareItemContentType"],
					formatter: function (
						sFileShareItemKind,
						sFileShareItemContentType
					) {
						if (sFileShareItemKind === "folder") {
							return "sap-icon://folder";
						} else {
							return IconPool.getIconForMimeType(sFileShareItemContentType);
						}
					}
				},
				type: "{= ${FileShareItemKind} === 'folder' ? 'Navigation' : 'Active'}"
			})
		});

		var oPage = new Page({
			content: [oListControl],
			enableScrolling: true,
			title: oResourceBundle.getText("CFP_LIST_HEADER")
		});
		return oPage;
	};

	CloudFilePicker.prototype._updateBreadcrumbLinks = function () {
		if (aVisibleLinks && aVisibleLinks.length > 1) {
			var aVisibleLinksRev = aVisibleLinks.slice().reverse();
			var newLinks = [];
			aVisibleLinksRev.forEach(
				function (oVisibleLink, index, array) {
					// Set current drill position in breadcrumb control
					if (index == 0) {
						oBreadcrumbLinkControl.setCurrentLocationText(oVisibleLink.title);
					} else {
						var oCrumb = new Link({
							text: oVisibleLink.title,
							press: function (oEvent) {
								var iLinkIndex = oBreadcrumbLinkControl.indexOfLink(
									oEvent.getSource()
								);
								var aRemovedLinks = aVisibleLinks.splice(iLinkIndex + 1);
								var oSelectedFolderInfo, oNewContext;
								this._updateBreadcrumbLinks();
								if (aVisibleLinks.length > 1) {
									// update binding context for the levels below the root
									oSelectedFolderInfo = oNavigationMap.get(
										aVisibleLinks[aVisibleLinks.length - 1].fileShareItemId
									);
									for (var sKey in aRemovedLinks) {
										oNavigationMap.delete(aRemovedLinks[sKey].fileShareItemId);
									}
									oNewContext = this.getModel().createBindingContext(oSelectedFolderInfo.path);
									oListControl.setBindingContext(oNewContext);
								} else {
									this._loadFileShareRootFolder(oSelectControl.getSelectedKey());
								}
							}.bind(this)
						});
						newLinks.push(oCrumb); //note the links are added in an incorrect order need to reverse
					}
				}.bind(this)
			);

			newLinks.reverse();
			// Clear aggregation before we rebuild it
			if (oBreadcrumbLinkControl.getLinks()) {
				oBreadcrumbLinkControl.removeAllLinks();
			}
			for (var i = 0; i < newLinks.length; i++) {
				oBreadcrumbLinkControl.addLink(newLinks[i]);
			}
		} else {
			oBreadcrumbLinkControl.destroyLinks();
			this._initializeVisibleLinks();
		}
		this._setConfirmationButtonEnabled(false);
	};

	CloudFilePicker.prototype._loadFileShareRootFolder = function (sFileShareKey) {
		// update binding context for root
		oNavigationMap.clear();
		var sPath = "/FileShares(" + "'" + sFileShareKey + "'" + ")/_Root/_Children";
		var oContext = this.getModel().createBindingContext(sPath);
		oListControl.setBindingContext(oContext);
	};

	CloudFilePicker.prototype._createButton = function () {
		oConfirmationButton = new Button({
			text: this.getConfirmButtonText(),
			type: ButtonType.Emphasized,
			press: function () {
				var sCurrentItemInInput = oFileNameControl.getValue();
				if ((this.getFilePickerMode() === FilePickerModes.FileOnly) || sCurrentItemInInput) {
					if (this.getEnableDuplicateCheck() && this._checkForDuplicate(oListControl, sCurrentItemInInput.toLowerCase())) {
						this._showOverwriteMessage(sCurrentItemInInput);
					} else {
						this._closeDialog();
					}
				} else {
					this._closeDialog();
				}
			}.bind(this)
		});
		this.addButton(
			oConfirmationButton
		);
		this.addButton(
			new Button({
				text: oResourceBundle.getText("CFP_BUTTON_CANCEL"),
				press: function () {
					this.fireCancel();
					this.close();
					setTimeout(function () {
						this.destroy();
					}.bind(this));
				}.bind(this)
			})
		);
		this._setConfirmationButtonEnabled(false);
	};

	CloudFilePicker.prototype._setConfirmationButtonEnabled = function (bEnabled) {
		if (this.getFilePickerMode() === FilePickerModes.FileOnly) {
			oConfirmationButton.setEnabled(bEnabled);
		} else if (this.getFileNameMandatory()) {
			// Filename control not available when FilePickerMode is fileOnly.
			var bEnabled = oFileNameControl.getValue() !== '';
			oConfirmationButton.setEnabled(bEnabled);
		}
	};

	CloudFilePicker.prototype._checkForDuplicate = function (oListControl, sLowerCaseSearchText) {
		var oDuplicateItem = oListControl.getItems().find(function (oListItem) {
			if (oListItem.getTitle().toLowerCase() === sLowerCaseSearchText) {
				oListControl.setSelectedItem(oListItem);
				return true;
			}
			return false;
		});
		return !!oDuplicateItem;
	};

	CloudFilePicker.prototype._showOverwriteMessage = function (sFileShareItemName) {
		var sDuplicateMessage = this.getDuplicateMessage();
		if (!sDuplicateMessage) {
			sDuplicateMessage = oResourceBundle.getText("CFP_MESSAGE_DUPLICATE", sFileShareItemName);
		}

		var oApproveDialog = new Dialog({
			type: DialogType.Message,
			title: oResourceBundle.getText("CFP_TITLE_WARNING"),
			state: ValueState.Warning,
			content: new Text({ text: sDuplicateMessage }),
			beginButton: new Button({
				type: ButtonType.Emphasized,
				text: oResourceBundle.getText("CFP_BUTTON_YES"),
				press: function () {
					oApproveDialog.close();
					this._closeDialog(true);
				}.bind(this)
			}),
			endButton: new Button({
				text: oResourceBundle.getText("CFP_BUTTON_NO"),
				press: function () {
					oApproveDialog.close();
				}
			})
		});
		oApproveDialog.open();
	};

	CloudFilePicker.prototype._closeDialog = function (bReplaceExistingFile) {
		var mParameters = {};

		if (aVisibleLinks.length > 1) {
			mParameters.selectedFolder = oNavigationMap.get(aVisibleLinks[aVisibleLinks.length - 1].fileShareItemId);
		} else {
			mParameters.selectedFolder = new CloudFileInfo();
			mParameters.selectedFolder.setFileShareId(oSelectControl.getSelectedKey());
		}

		mParameters.selectedFileName = oFileNameControl.getValue();
		mParameters.replaceExistingFile = !!bReplaceExistingFile;

		mParameters.selectedFiles = [];
		var oSelectedItem = oListControl.getSelectedItem();
		if (oSelectedItem) {
			mParameters.selectedFiles.push(this._createSelectionParameter(oSelectedItem));
		}

		this.fireEvent("select", mParameters);

		this.close();
		setTimeout(function () {
			this.destroy();
		}.bind(this));
	};

	CloudFilePicker.prototype._createSelectionParameter = function (oSelectedItem) {
		var oCloudFileInfo = new CloudFileInfo();
		var oContext = oSelectedItem.getBindingContext();

		oCloudFileInfo.setFileShareId(oContext.getObject("FileShare"));
		oCloudFileInfo.setFileShareItemId(oContext.getObject("FileShareItem"));
		oCloudFileInfo.setParentFileShareItemId(
			oContext.getObject("ParentFileShareItem")
		);
		oCloudFileInfo.setIsFolder(
			oContext.getObject("FileShareItemKind") === "folder"
		);
		oCloudFileInfo.setFileShareItemName(
			oContext.getObject("FileShareItemName")
		);
		oCloudFileInfo.setCreatedByUser(oContext.getObject("CreatedByUser"));
		oCloudFileInfo.setCreationDateTime(
			oContext.getObject("CreationDateTime")
		);
		oCloudFileInfo.setLastChangedByUser(
			oContext.getObject("LastChangedByUser")
		);
		oCloudFileInfo.setLastChangeDateTime(
			oContext.getObject("LastChangeDateTime")
		);
		oCloudFileInfo.setFileShareItemContent(
			oContext.getObject("FileShareItemContent")
		);
		oCloudFileInfo.setFileShareItemContentType(
			oContext.getObject("FileShareItemContentType")
		);
		oCloudFileInfo.setFileShareItemContentSize(
			oContext.getObject("FileShareItemContentSize")
		);
		oCloudFileInfo.setFileShareItemContentLink(
			oContext.getObject("FileShareItemContentLink")
		);

		return oCloudFileInfo;
	};

	return CloudFilePicker;
});