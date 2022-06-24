/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Icon","sap/ui/events/KeyCodes","sap/base/Log","sap/base/util/deepEqual","sap/m/library","sap/m/Button","sap/m/Dialog","sap/m/List","sap/m/MessageBox","sap/m/OverflowToolbar","sap/m/StandardListItem","sap/m/Text","sap/m/ToolbarSpacer","sap/ui/unified/FileUploader","sap/m/upload/UploadSetItem","sap/m/upload/Uploader","sap/m/upload/UploadSetRenderer","sap/m/upload/UploaderHttpRequestMethod","sap/ui/core/dnd/DragDropInfo","sap/ui/core/dnd/DropInfo","sap/m/library","sap/m/upload/UploadSetToolbarPlaceholder"],function(e,t,i,o,s,r,a,n,l,p,d,h,m,u,g,f,_,c,I,y,U,T,E){"use strict";var D=e.extend("sap.m.upload.UploadSet",{metadata:{library:"sap.m",properties:{fileTypes:{type:"string[]",defaultValue:null},maxFileNameLength:{type:"int",defaultValue:null},maxFileSize:{type:"float",defaultValue:null},mediaTypes:{type:"string[]",defaultValue:null},noDataText:{type:"string",defaultValue:null},noDataDescription:{type:"string",defaultValue:null},instantUpload:{type:"boolean",defaultValue:true},showIcons:{type:"boolean",defaultValue:true},terminationEnabled:{type:"boolean",defaultValue:true},uploadEnabled:{type:"boolean",defaultValue:true},uploadUrl:{type:"string",defaultValue:null},uploadButtonInvisible:{type:"boolean",group:"Appearance",defaultValue:false},sameFilenameAllowed:{type:"boolean",group:"Behavior",defaultValue:false},httpRequestMethod:{type:"sap.m.upload.UploaderHttpRequestMethod",defaultValue:I.Post},multiple:{type:"boolean",group:"Behavior",defaultValue:false},mode:{type:"sap.m.ListMode",group:"Behavior",defaultValue:T.ListMode.MultiSelect}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"item"},incompleteItems:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"incompleteItem"},headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"},toolbar:{type:"sap.m.OverflowToolbar",multiple:false},uploader:{type:"sap.m.upload.Uploader",multiple:false}},events:{afterItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileRenamed:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeUploadStarts:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadCompleted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"},response:{type:"string"},readyState:{type:"string"},status:{type:"string"},responseXML:{type:"string"},headers:{type:"object"}}},beforeUploadTermination:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadTerminated:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileNameLengthExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileSizeExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},mediaTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},selectionChanged:{parameters:{items:{type:"sap.m.upload.UploadSetItem[]"}}},itemDragStart:{},itemDrop:{}}},renderer:c});var S=r.UploadState;D.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=null;this._oNoDataIcon=new t(this.getId()+"-no-data-icon",{src:"sap-icon://document",size:"6rem",noTabStop:true});this._oEditedItem=null;this._oItemToBeDeleted=null;this._mListItemIdToItemMap={};this._$Body=null;this._$DragDropArea=null;this._oLastEnteredTarget=null;this._aGroupHeadersAdded=[];this._iFileUploaderPH=null;this._oItemToUpdate=null};D.prototype.exit=function(){this._oNoDataIcon.destroy();this._oNoDataIcon=null;if(this._oList){this._oList.destroy();this._oList=null}if(this._oToolbar){this._oToolbar.destroy();this._oToolbar=null}if(this._oFileUploader){this._oFileUploader.destroy();this._oFileUploader=null}if(this._oUploader){this._oUploader.destroy();this._oUploader=null}};D.prototype.onBeforeRendering=function(e){this._aGroupHeadersAdded=[];this._clearGroupHeaders();this._fillListWithUploadSetItems(this.getItems())};D.prototype.onAfterRendering=function(){var e;if(this._oEditedItem){e=this._oEditedItem._getFileNameEdit().$("inner");if(e){e.on("focus",function(){e.selectText(0,e.val().length)});e.trigger("focus")}}};D.prototype.onkeydown=function(e){var t,o;if(this._oEditedItem&&this._oEditedItem._getFileNameEdit().$("inner")[0]===e.target){o=this._oEditedItem}else if(e.target){t=sap.ui.getCore().byId(e.target.id);if(t){o=this._mListItemIdToItemMap[t.getId()]}}if(!o){return}switch(e.keyCode){case i.F2:if(o._bInEditMode){this._handleItemEditConfirmation(e,o)}else{this._handleItemEdit(e,o)}break;case i.ESCAPE:this._handleItemEditCancelation(e,o);break;case i.DELETE:if(!o.$("fileNameEdit").hasClass("sapMInputFocused")){this._handleItemDelete(e,o)}break;case i.ENTER:if(o===this._oEditedItem){this._handleItemEditConfirmation(e,o)}else{o._handleFileNamePressed()}break;default:return}};D.prototype.getToolbar=function(){if(!this._oToolbar){this._oToolbar=this.getAggregation("toolbar");if(!this._oToolbar){this._oToolbar=new d(this.getId()+"-toolbar",{content:[this._oNumberOfAttachmentsTitle,new u,this.getDefaultFileUploader()]});this._iFileUploaderPH=2;this.addDependent(this._oToolbar)}else{this._iFileUploaderPH=this._getFileUploaderPlaceHolderPosition(this._oToolbar);if(this._oToolbar&&this._iFileUploaderPH>-1){this._setFileUploaderInToolbar(this.getDefaultFileUploader())}else if(this._oToolbar){this._oToolbar.insertContent(this.getDefaultFileUploader())}}}return this._oToolbar};D.prototype.getNoDataText=function(){var e=this.getProperty("noDataText");e=e||this._oRb.getText("UPLOAD_SET_NO_DATA_TEXT");return e};D.prototype.getNoDataDescription=function(){var e=this.getProperty("noDataDescription");e=e||this._oRb.getText("UPLOADCOLLECTION_NO_DATA_DESCRIPTION");return e};D.prototype.setToolbar=function(e){this.setAggregation("toolbar",e);this.getToolbar();return this};D.prototype.addAggregation=function(t,i,o){e.prototype.addAggregation.call(this,t,i,o);if(i&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(i);this._refreshInnerListStyle()}};D.prototype.insertAggregation=function(t,i,o,s){e.prototype.insertAggregation.call(this,t,i,o,s);if(i&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(i,o||0);this._refreshInnerListStyle()}};D.prototype.removeAggregation=function(t,i,o){var s,r;e.prototype.removeAggregation.call(this,t,i,o);if(t==="items"||t==="incompleteItems"){if(typeof i==="number"){r=this.getItems();s=r[i]}else if(typeof i==="object"){if(this.getList()&&this.getList().getItems().length){s=i._getListItem()}}var a=this.getList().removeAggregation("items",s,o);if(a&&i){a.destroy();i.destroy()}this._refreshInnerListStyle()}};D.prototype.removeAllAggregation=function(t,i){if(t==="items"){this.getItems().forEach(function(e){if(this._oList){this._oList.removeAggregation("items",e._getListItem(),i)}}.bind(this))}else if(t==="incompleteItems"){this.getIncompleteItems().forEach(function(e){if(this._oList){this._oList.removeAggregation("items",e._getListItem(),i)}}.bind(this))}e.prototype.removeAllAggregation.call(this,t,i)};D.prototype.destroyAggregation=function(t,i){if(t==="items"||t==="incompleteItems"){this.removeAllAggregation(t,i)}if(this._oList&&this._oList.getItems().length===0){this._oList.destroyAggregation("items",i)}e.prototype.destroyAggregation.call(this,t,i)};D.prototype.setFileTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!s(this.getFileTypes(),t)){this.setProperty("fileTypes",t,true);this._checkRestrictions()}return this};D.prototype.setMaxFileNameLength=function(e){if(this.getMaxFileNameLength()!==e){this.setProperty("maxFileNameLength",e,true);this._checkRestrictions()}return this};D.prototype.setMaxFileSize=function(e){if(this.getMaxFileSize()!==e){this.setProperty("maxFileSize",e,true);this._checkRestrictions()}return this};D.prototype.setMediaTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!s(this.getMediaTypes(),t)){this.setProperty("mediaTypes",t,true);this._checkRestrictions()}return this};D.prototype.setShowIcons=function(e){if(e!==this.getShowIcons()){this._getAllItems().forEach(function(t){t._getIcon().setVisible(e)});this.setProperty("showIcons",e,false)}return this};D.prototype.setTerminationEnabled=function(e){if(e!==this.getTerminationEnabled()){this._getAllItems().forEach(function(t){if(t.getUploadState()===S.Uploading){t._getTerminateButton().setVisible(e)}});this.setProperty("terminationEnabled",e,false)}return this};D.prototype.setUploadButtonInvisible=function(e){if(this.getUploadButtonInvisible()===e){return this}this.setProperty("uploadButtonInvisible",e,true);this.getDefaultFileUploader().setVisible(!e);return this};D.prototype.setUploadEnabled=function(e){if(e!==this.getUploadEnabled()){this.getDefaultFileUploader().setEnabled(e);this.setProperty("uploadEnabled",e,false)}return this};D.prototype.setMultiple=function(e){if(this.getMultiple()!==e){this.setProperty("multiple",e);this.getDefaultFileUploader().setMultiple(e)}return this};D.prototype.setMode=function(e){if(e===T.ListMode.Delete){this.setProperty("mode",T.ListMode.None);o.info("sap.m.ListMode.Delete is not supported by UploadSet. Value has been resetted to 'None'")}else if(e===T.ListMode.MultiSelect&&!this.getInstantUpload()){this.setProperty("mode",T.ListMode.None);o.info("sap.m.ListMode.MultiSelect is not supported by UploadSet for Pending Upload. Value has been reset to 'None'")}else{this.setProperty("mode",e)}if(this._oList){this._oList.setMode(this.getMode())}return this};D.prototype.getList=function(){if(!this._oList){this._oList=new l(this.getId()+"-list",{selectionChange:[this._handleSelectionChange,this],headerToolbar:this.getToolbar(),dragDropConfig:[new y({dropPosition:"Between",sourceAggregation:"items",targetAggregation:"items",dragStart:[this._onDragStartItem,this],drop:[this._onDropItem,this]}),new U({dropEffect:"Move",dropPosition:"OnOrBetween",dragEnter:[this._onDragEnterFile,this],drop:[this._onDropFile,this]})],mode:this.getMode()});this._oList.addStyleClass("sapMUCList");this.addDependent(this._oList)}return this._oList};D.prototype._onDragStartItem=function(e){this.fireItemDragStart(e)};D.prototype._onDropItem=function(e){this.fireItemDrop(e)};D.prototype._onDragEnterFile=function(e){var t=e.getParameter("dragSession");var i=t.getDragControl();if(i){e.preventDefault()}};D.prototype._onDropFile=function(e){var t;e.preventDefault();if(this.getUploadEnabled()){t=e.getParameter("browserEvent").dataTransfer.files;if(t&&t.length>1&&!this.getMultiple()){var i=this._oRb.getText("UPLOADCOLLECTION_MULTIPLE_FALSE");o.warning("Multiple files upload is retsricted for this multiple property set");p.error(i);return}this._processNewFileObjects(t)}};D.prototype.upload=function(){if(!this.getUploadEnabled()){o.warning("Upload is currently disabled for this upload set.");return}this.getIncompleteItems().forEach(function(e){this._uploadItemIfGoodToGo(e)}.bind(this))};D.prototype.uploadItem=function(e){this._uploadItemIfGoodToGo(e)};D.prototype.getDefaultFileUploader=function(){var e=this._oRb.getText("UPLOADCOLLECTION_UPLOAD");if(!this._oFileUploader){this._oFileUploader=new g(this.getId()+"-uploader",{buttonOnly:true,buttonText:e,tooltip:e,iconOnly:false,enabled:this.getUploadEnabled(),fileType:this.getFileTypes(),mimeType:this.getMediaTypes(),icon:"",iconFirst:false,multiple:this.getMultiple(),style:"Transparent",name:"uploadSetFileUploader",sameFilenameAllowed:true,useMultipart:false,sendXHR:true,change:[this._onFileUploaderChange,this],uploadStart:[this._onUploadStarted,this],uploadProgress:[this._onUploadProgressed,this],uploadComplete:[this._onUploadCompleted,this],uploadAborted:[this._onUploadAborted,this],typeMissmatch:[this._fireFileTypeMismatch,this],fileSizeExceed:[this._fireFileSizeExceed,this],filenameLengthExceed:[this._fireFilenameLengthExceed,this],visible:!this.getUploadButtonInvisible()})}return this._oFileUploader};D.prototype.registerUploaderEvents=function(e){e.attachUploadStarted(this._onUploadStarted.bind(this));e.attachUploadProgressed(this._onUploadProgressed.bind(this));e.attachUploadCompleted(this._onUploadCompleted.bind(this));e.attachUploadAborted(this._onUploadAborted.bind(this))};D.prototype.getSelectedItems=function(){var e=this._oList.getSelectedItems();return this._getUploadSetItemsByListItems(e)};D.prototype.getSelectedItem=function(){var e=this._oList.getSelectedItem();if(e){return this._getUploadSetItemsByListItems([e])}return null};D.prototype.setSelectedItemById=function(e,t){this._oList.setSelectedItemById(e+"-listItem",t);this._setSelectedForItems([this._getUploadSetItemById(e)],t);return this};D.prototype.setSelectedItem=function(e,t){return this.setSelectedItemById(e.getId(),t)};D.prototype.selectAll=function(){var e=this._oList.selectAll();if(e.getItems().length!==this.getItems().length){o.info("Internal 'List' and external 'UploadSet' are not in sync.")}this._setSelectedForItems(this.getItems(),true);return this};D.prototype.openFileDialog=function(e){if(this._oFileUploader){if(e){if(!this._oFileUploader.getMultiple()){this._oItemToUpdate=e;this._oFileUploader.$().find("input[type=file]").trigger("click")}else{o.warning("Version Upload cannot be used in multiple upload mode")}}else{this._oFileUploader.$().find("input[type=file]").trigger("click")}}return this};D.prototype._onFileUploaderChange=function(e){var t=e.getParameter("files");this._processNewFileObjects(t)};D.prototype._onUploadStarted=function(e){var t=e.getParameter("item");t.setUploadState(S.Uploading)};D.prototype._onUploadProgressed=function(e){var t=e.getParameter("item"),i=Math.round(e.getParameter("loaded")/e.getParameter("total")*100);t.setProgress(i)};D.prototype._onUploadCompleted=function(e){var t=e.getParameter("item"),i=e.getParameter("responseXHR"),o=null;if(i.responseXML){o=i.responseXML.documentElement.textContent}var s={item:t,response:i.response,responseXML:o,readyState:i.readyState,status:i.status,headers:i.headers};t.setProgress(100);if(this._oItemToUpdate&&this.getInstantUpload()){this.removeAggregation("items",this._oItemToUpdate,false)}this.insertItem(t,0);t.setUploadState(S.Complete);this._oItemToUpdate=null;this.fireUploadCompleted(s)};D.prototype._onUploadAborted=function(e){var t=e.getParameter("item");t.setUploadState(S.Error);this.fireUploadTerminated({item:t})};D.prototype._handleItemEdit=function(e,t){if(this._oEditedItem){this._handleItemEditConfirmation(e,this._oEditedItem)}if(!this._oEditedItem){if(this.fireBeforeItemEdited({item:t})){this._oEditedItem=t;this._oEditedItem._setInEditMode(true)}}};D.prototype._handleItemRestart=function(e,t){t.setUploadState(S.Ready);this._uploadItemIfGoodToGo(t)};D.prototype._handleItemEditConfirmation=function(e,t){var i=t._getFileNameEdit(),o,s,r=t.getFileName(),a=f._splitFileName(r),n=f._findById(t.getId(),this._getAllItems());if(i!==null){o=i.getValue().trim()}i.focus();if(!o||o.length===0){t._setContainsError(true);return}if(a.name===o){this._removeErrorStateFromItem(this,n);t._setInEditMode(false);this.fireAfterItemEdited({item:t});this._oEditedItem=null;return}if(!this.getSameFilenameAllowed()&&f._checkDoubleFileName(i.getValue()+"."+a.extension,this._getAllItems())){i.setValueStateText(this._oRb.getText("UPLOAD_SET_FILE_NAME_EXISTS"));i.setProperty("valueState","Error",true);i.setShowValueStateMessage(true)}else{s=a.extension?o+"."+a.extension:o;t.setFileName(s);this._removeErrorStateFromItem(this,n);t._setInEditMode(false);this.fireFileRenamed({item:t})}this._oEditedItem=null;this.invalidate()};D.prototype._removeErrorStateFromItem=function(e,t){t.errorState=null;e.sErrorState=null;e.editModeItem=null};D.prototype._handleItemEditCancelation=function(e,t){t._setContainsError(false);t._setInEditMode(false);this._oEditedItem=null};D.prototype._handleItemDelete=function(e,t){var i;if(this._oEditedItem){this._handleItemEditConfirmation(e,this._oEditedItem);if(this._oEditedItem){return}}if(!t.fireRemovePressed({item:t})){return}if(!this.fireBeforeItemRemoved({item:t})){return}if(!t.getFileName()){i=this._oRb.getText("UPLOAD_SET_DELETE_WITHOUT_FILE_NAME_TEXT")}else{i=this._oRb.getText("UPLOAD_SET_DELETE_TEXT",t.getFileName())}this._oItemToBeDeleted=t;p.show(i,{id:this.getId()+"-deleteDialog",title:this._oRb.getText("UPLOAD_SET_DELETE_TITLE"),actions:[p.Action.OK,p.Action.CANCEL],onClose:this._handleClosedDeleteDialog.bind(this),dialogId:"messageBoxDeleteFile",styleClass:this.hasStyleClass("sapUiSizeCompact")?"sapUiSizeCompact":""})};D.prototype._handleClosedDeleteDialog=function(e){if(e!==p.Action.OK){return}this.removeItem(this._oItemToBeDeleted);this.removeIncompleteItem(this._oItemToBeDeleted);this.fireAfterItemRemoved({item:this._oItemToBeDeleted});this._oItemToBeDeleted=null};D.prototype._handleTerminateRequest=function(e,t){var i=new l({items:[new h({title:t.getFileName(),icon:t._getIcon().getSrc()})]}),o=new n({id:this.getId()+"-teminateDialog",title:this._oRb.getText("UPLOAD_SET_TERMINATE_TITLE"),content:[new m({text:this._oRb.getText("UPLOAD_SET_TERMINATE_TEXT")}),i],buttons:[new a({text:this._oRb.getText("UPLOAD_SET_OKBUTTON_TEXT"),press:[s,this]}),new a({text:this._oRb.getText("UPLOAD_SET_CANCEL_BUTTON_TEXT"),press:function(){o.close()}})],afterClose:function(){o.destroy()}});o.open();function s(){if(t.getUploadState()===S.Uploading){if(this.fireBeforeUploadTermination({item:t})){this._handleUploadTermination(t)}}else if(t.getUploadState()===S.Complete){this.removeItem(t)}o.close();this.invalidate()}};D.prototype._handleUploadTermination=function(e){this._getActiveUploader().terminateItem(e)};D.prototype._handleSelectionChange=function(e){var t=e.getParameter("listItems"),i=[];t.forEach(function(e){i.push(this._mListItemIdToItemMap[e.getId()])}.bind(this));this.fireSelectionChanged({items:i})};D.prototype._onDragEnterSet=function(e){if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDropIndicator")}};D.prototype._onDragLeaveSet=function(e){if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator")}};D.prototype._onDragOverSet=function(e){e.preventDefault()};D.prototype._onDropOnSet=function(e){var t;e.preventDefault();if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator");this._$DragDropArea.addClass("sapMUCDragDropOverlayHide");t=e.originalEvent.dataTransfer.files;this._processNewFileObjects(t)}};D.prototype._onDragEnterBody=function(e){if(this.getUploadEnabled()){this._oLastEnteredTarget=e.target;this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")}};D.prototype._onDragLeaveBody=function(e){if(this._oLastEnteredTarget===e.target&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};D.prototype._onDragOverBody=function(e){e.preventDefault();if(this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")}};D.prototype._onDropOnBody=function(e){if(this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};D.prototype._getAllItems=function(){return this.getItems().concat(this.getIncompleteItems())};D.prototype._refreshInnerListStyle=function(){var e=this.getList().length-1;this._oList.getItems().forEach(function(t,i){t.removeStyleClass("sapMUCListSingleItem").removeStyleClass("sapMUCListFirstItem").removeStyleClass("sapMUCListLastItem").removeStyleClass("sapMUCListItem");if(i===0&&e===0){t.addStyleClass("sapMUCListSingleItem")}else if(i===0){t.addStyleClass("sapMUCListFirstItem")}else if(i===e){t.addStyleClass("sapMUCListLastItem")}else{t.addStyleClass("sapMUCListItem")}})};D.prototype._processNewFileObjects=function(e){var t=[],i;for(var o=0;o<e.length;o++){t.push(e[o])}t.forEach(function(e){i=new f({uploadState:S.Ready});i._setFileObject(e);i.setFileName(e.name);if(!this.fireBeforeItemAdded({item:i})){return}this.insertIncompleteItem(i);this.fireAfterItemAdded({item:i});if(this.getInstantUpload()){this._uploadItemIfGoodToGo(i)}}.bind(this))};D.prototype._projectToNewListItem=function(e,t){var i=e._getListItem();this._mListItemIdToItemMap[i.getId()]=e;if(e.sParentAggregationName==="items"){this._mapGroupForItem(e)}if(t===0){this.getList().insertAggregation("items",i,t,true)}else{this.getList().addAggregation("items",i,true)}this._checkRestrictionsForItem(e)};D.prototype._getImplicitUploader=function(){if(!this._oUploader){this._oUploader=new _({httpRequestMethod:this.getHttpRequestMethod()});this._oUploader.setUploadUrl(this.getUploadUrl());this.registerUploaderEvents(this._oUploader);this.addDependent(this._oUploader)}return this._oUploader};D.prototype._getActiveUploader=function(){return this.getUploader()||this._getImplicitUploader()};D.prototype._uploadItemIfGoodToGo=function(e){if(e.getUploadState()===S.Ready&&!e._isRestricted()){if(this.fireBeforeUploadStarts({item:e})){var t=e.getHeaderFields().length?e.getHeaderFields():this.getHeaderFields();this._getActiveUploader().uploadItem(e,t)}}};D.prototype._getDragDropHandlers=function(){if(!this._oDragDropHandlers){this._oDragDropHandlers={body:{dragenter:this._onDragEnterBody.bind(this),dragleave:this._onDragLeaveBody.bind(this),dragover:this._onDragOverBody.bind(this),drop:this._onDropOnBody.bind(this)},set:{dragenter:this._onDragEnterSet.bind(this),dragleave:this._onDragLeaveSet.bind(this),dragover:this._onDragOverSet.bind(this),drop:this._onDropOnSet.bind(this)}}}return this._oDragDropHandlers};D.prototype._checkRestrictions=function(){this.getIncompleteItems().forEach(function(e){this._checkRestrictionsForItem(e)}.bind(this))};D.prototype._checkRestrictionsForItem=function(e){e._checkTypeRestriction(this.getFileTypes());e._checkNameLengthRestriction(this.getMaxFileNameLength());e._checkSizeRestriction(this.getMaxFileSize());e._checkMediaTypeRestriction(this.getMediaTypes())};D.prototype._fireFileTypeMismatch=function(e){var t=this.getMediaTypes();var i=this.getFileTypes();var o=e.getParameter("fileType");var s=e.getParameter("mimeType");var r=!!t&&t.length>0&&!!s&&t.indexOf(s)===-1;var a=!!i&&i.length>0&&!!o&&i.indexOf(o)===-1;if(r){this.fireMediaTypeMismatch({item:e})}else if(a){this.fireFileTypeMismatch({item:e})}};D.prototype._fireFileSizeExceed=function(e){this.fireFileSizeExceeded({item:e})};D.prototype._fireFilenameLengthExceed=function(e){this.fireFileNameLengthExceeded({item:e})};D.prototype._setSelectedForItems=function(e,t){if(this.getMode()!==T.ListMode.MultiSelect&&t){var i=this.getItems();for(var o=0;o<i.length;o++){i[o].setSelected(false)}}for(var s=0;s<e.length;s++){e[s].setSelected(t)}};D.prototype._getUploadSetItemById=function(e){var t=this.getItems();for(var i=0;i<t.length;i++){if(t[i].getId()===e){return t[i]}}return null};D.prototype._getUploadSetItemsByListItems=function(e){var t=[];var i=this.getItems();if(e){for(var o=0;o<e.length;o++){for(var s=0;s<i.length;s++){if(e[o].getId()===i[s].getId()+"-listItem"){t.push(i[s]);break}}}return t}return null};D.prototype._clearGroupHeaders=function(){this.getList().getItems().forEach(function(e){if(e.isGroupHeader()){e.destroy(false)}})};D.prototype._mapGroupForItem=function(e){var t=this.getBinding("items"),i=this.getBindingInfo("items")?this.getBindingInfo("items").oModel:undefined,o=this.getBindingInfo("items")?this.getBindingInfo("items").groupHeaderFactory:null;var s=function(e){return e.getBindingContext(i)?t.getGroup(e.getBindingContext(i)):null};var r=function(e){return s(e)&&s(e).key};if(t&&t.isGrouped()&&e){if(!this._aGroupHeadersAdded.some(function(t){return t===r(e)})){if(o){this.getList().addItemGroup(s(e),o(s(e)),true)}else if(s(e)){this.getList().addItemGroup(s(e),null,true)}this._aGroupHeadersAdded.push(r(e))}}};D.prototype._fillListWithUploadSetItems=function(e){var t=this;e.forEach(function(e,i){e._reset();t._projectToNewListItem(e,true);t._refreshInnerListStyle()})};D.prototype._getFileUploaderPlaceHolderPosition=function(e){for(var t=0;t<e.getContent().length;t++){if(e.getContent()[t]instanceof E){return t}}return-1};D.prototype._setFileUploaderInToolbar=function(e){this._oToolbar.getContent()[this._iFileUploaderPH].setVisible(false);this._oToolbar.insertContent(e,this._iFileUploaderPH)};return D});