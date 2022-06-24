/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/m/Button","sap/m/Dialog","sap/m/DialogRenderer","sap/m/List","sap/m/StandardListItem","sap/ui/model/odata/v4/ODataModel","sap/m/Select","sap/m/Label","sap/m/Input","sap/ui/layout/form/SimpleForm","sap/ui/core/IconPool","sap/m/Page","sap/m/Breadcrumbs","sap/m/Link","sap/m/Text","./CloudFileInfo","./library","sap/m/library","sap/ui/core/library","sap/ui/layout/FixFlex"],function(e,t,i,a,n,r,s,o,l,d,c,u,h,g,p,m,f,F,C,S){"use strict";var y=F.DialogType;var I=F.ButtonType;var b=C.ValueState;var v=f.FilePickerModes;var _,T,L,x,B,D,w;var O=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var k=t.extend("sap.suite.ui.commons.CloudFilePicker",{metadata:{library:"sap.suite.ui.commons",properties:{serviceUrl:{type:"sap.ui.core.URI",group:"Data",defaultValue:""},confirmButtonText:{type:"string",group:"Data",defaultValue:O.getText("CFP_BUTTON_SELECT")},filePickerMode:{type:"sap.suite.ui.commons.FilePickerModes",group:"Data",defaultValue:"All"},title:{type:"string",group:"Data",defaultValue:O.getText("CFP_TITLE")},enableDuplicateCheck:{type:"boolean",group:"Data",defaultValue:false},duplicateMessage:{type:"string",group:"Data"},suggestedFileName:{type:"string",group:"Data"},fileNameMandatory:{type:"boolean",group:"Data",defaultValue:false}},events:{select:{parameters:{replaceExistingFile:"boolean",selectedFileName:"string",selectedFiles:{type:"sap.suite.ui.commons.CloudFileInfo[]"},selectedFolder:{type:"sap.suite.ui.commons.CloudFileInfo"}}},cancel:{}}},constructor:function(){t.prototype.constructor.apply(this,arguments);this.setResizable(true);this._createDialogContent();this._createButton();this.setContentWidth("40%");this.setContentHeight("50%");this.setHorizontalScrolling(false);this.setVerticalScrolling(false);this.setTitle(this.getTitle())},renderer:i});k.prototype._createDialogContent=function(){var e=this.getServiceUrl();if(e){var t=new r({serviceUrl:e,synchronizationMode:"None"});this.setModel(t);var i=this._createCloudDropdownAndFileNameField();L=this._createBreadcrumbLinks();var a=this._createListContent();var n=new S({fixContent:[i,L],flexContent:a});this.addContent(n)}};k.prototype._createCloudDropdownAndFileNameField=function(){var e=new o({text:O.getText("CFP_LOCATION"),showColon:true,labelFor:this.getId()+"-cloudSpaceSelect"}).addStyleClass("sapUiTinyMarginTop");T=new s({selectedKey:"{FileShare}",id:this.getId()+"-cloudSpaceSelect",forceSelection:false,change:function(e){x.setValue(this.getSuggestedFileName());this._setConfirmationButtonEnabled(false);L.destroyLinks();this._initializeVisibleLinks();var t=e.getParameters().selectedItem;this._loadFileShareRootFolder(t.getKey())}.bind(this)}).bindItems({path:"/FileShares",template:new sap.ui.core.Item({key:"{FileShare}",text:{parts:["FileShare","FileShareDescription"],formatter:function(e,t){return t?t:e}}})});var t=new d({layout:"ResponsiveGridLayout",singleContainerFullSize:false});t.addContent(e);t.addContent(T);var i=new o({text:O.getText("CFP_FILENAME"),showColon:true,labelFor:this.getId()+"-fileName"}).addStyleClass("sapUiTinyMarginTop");x=new l({id:this.getId()+"-fileName",liveChange:function(e){_.removeSelections();this._setConfirmationButtonEnabled()}.bind(this)});t.addContent(i);t.addContent(x);if(this.getFilePickerMode()===v.FileOnly){x.setVisible(false)}else{x.setValue(this.getSuggestedFileName())}return t};k.prototype._createBreadcrumbLinks=function(){L=new h(this.getId()+"-breadcrumbs").addStyleClass("sapUiSmallMarginBegin sapUiSmallMarginEnd");D=new Map;this._initializeVisibleLinks();return L};k.prototype._initializeVisibleLinks=function(){var e={fileShareItemId:"Root",title:O.getText("CFP_FOLDER_ROOT")};B=[e];L.setCurrentLocationText(e.title);D.clear()};k.prototype._createListContent=function(){_=new a({mode:F.ListMode.SingleSelectMaster,select:function(e){var t=e.getParameters().listItem;var i=t.getBindingContext();var a=i.getObject("FileShareItemKind")==="folder";if(a){var n=this._createSelectionParameter(t);var r=n.getFileShareItemId();n.path=i.getCanonicalPath()+"/_Children";D.set(r,n);var s=i.getModel().createBindingContext(n.path);B.push({fileShareItemId:r,title:t.getTitle()});this._updateBreadcrumbLinks();_.setBindingContext(s)}else{var o=i.getProperty("FileShareItemName");x.setValue(o);this._setConfirmationButtonEnabled(true)}}.bind(this)});_.bindItems({path:"",template:new n({title:"{FileShareItemName}",icon:{parts:["FileShareItemKind","FileShareItemContentType"],formatter:function(e,t){if(e==="folder"){return"sap-icon://folder"}else{return c.getIconForMimeType(t)}}},type:"{= ${FileShareItemKind} === 'folder' ? 'Navigation' : 'Active'}"})});var e=new u({content:[_],enableScrolling:true,title:O.getText("CFP_LIST_HEADER")});return e};k.prototype._updateBreadcrumbLinks=function(){if(B&&B.length>1){var e=B.slice().reverse();var t=[];e.forEach(function(e,i,a){if(i==0){L.setCurrentLocationText(e.title)}else{var n=new g({text:e.title,press:function(e){var t=L.indexOfLink(e.getSource());var i=B.splice(t+1);var a,n;this._updateBreadcrumbLinks();if(B.length>1){a=D.get(B[B.length-1].fileShareItemId);for(var r in i){D.delete(i[r].fileShareItemId)}n=this.getModel().createBindingContext(a.path);_.setBindingContext(n)}else{this._loadFileShareRootFolder(T.getSelectedKey())}}.bind(this)});t.push(n)}}.bind(this));t.reverse();if(L.getLinks()){L.removeAllLinks()}for(var i=0;i<t.length;i++){L.addLink(t[i])}}else{L.destroyLinks();this._initializeVisibleLinks()}this._setConfirmationButtonEnabled(false)};k.prototype._loadFileShareRootFolder=function(e){D.clear();var t="/FileShares("+"'"+e+"'"+")/_Root/_Children";var i=this.getModel().createBindingContext(t);_.setBindingContext(i)};k.prototype._createButton=function(){w=new e({text:this.getConfirmButtonText(),type:I.Emphasized,press:function(){var e=x.getValue();if(this.getFilePickerMode()===v.FileOnly||e){if(this.getEnableDuplicateCheck()&&this._checkForDuplicate(_,e.toLowerCase())){this._showOverwriteMessage(e)}else{this._closeDialog()}}else{this._closeDialog()}}.bind(this)});this.addButton(w);this.addButton(new e({text:O.getText("CFP_BUTTON_CANCEL"),press:function(){this.fireCancel();this.close();setTimeout(function(){this.destroy()}.bind(this))}.bind(this)}));this._setConfirmationButtonEnabled(false)};k.prototype._setConfirmationButtonEnabled=function(e){if(this.getFilePickerMode()===v.FileOnly){w.setEnabled(e)}else if(this.getFileNameMandatory()){var e=x.getValue()!=="";w.setEnabled(e)}};k.prototype._checkForDuplicate=function(e,t){var i=e.getItems().find(function(i){if(i.getTitle().toLowerCase()===t){e.setSelectedItem(i);return true}return false});return!!i};k.prototype._showOverwriteMessage=function(i){var a=this.getDuplicateMessage();if(!a){a=O.getText("CFP_MESSAGE_DUPLICATE",i)}var n=new t({type:y.Message,title:O.getText("CFP_TITLE_WARNING"),state:b.Warning,content:new p({text:a}),beginButton:new e({type:I.Emphasized,text:O.getText("CFP_BUTTON_YES"),press:function(){n.close();this._closeDialog(true)}.bind(this)}),endButton:new e({text:O.getText("CFP_BUTTON_NO"),press:function(){n.close()}})});n.open()};k.prototype._closeDialog=function(e){var t={};if(B.length>1){t.selectedFolder=D.get(B[B.length-1].fileShareItemId)}else{t.selectedFolder=new m;t.selectedFolder.setFileShareId(T.getSelectedKey())}t.selectedFileName=x.getValue();t.replaceExistingFile=!!e;t.selectedFiles=[];var i=_.getSelectedItem();if(i){t.selectedFiles.push(this._createSelectionParameter(i))}this.fireEvent("select",t);this.close();setTimeout(function(){this.destroy()}.bind(this))};k.prototype._createSelectionParameter=function(e){var t=new m;var i=e.getBindingContext();t.setFileShareId(i.getObject("FileShare"));t.setFileShareItemId(i.getObject("FileShareItem"));t.setParentFileShareItemId(i.getObject("ParentFileShareItem"));t.setIsFolder(i.getObject("FileShareItemKind")==="folder");t.setFileShareItemName(i.getObject("FileShareItemName"));t.setCreatedByUser(i.getObject("CreatedByUser"));t.setCreationDateTime(i.getObject("CreationDateTime"));t.setLastChangedByUser(i.getObject("LastChangedByUser"));t.setLastChangeDateTime(i.getObject("LastChangeDateTime"));t.setFileShareItemContent(i.getObject("FileShareItemContent"));t.setFileShareItemContentType(i.getObject("FileShareItemContentType"));t.setFileShareItemContentSize(i.getObject("FileShareItemContentSize"));t.setFileShareItemContentLink(i.getObject("FileShareItemContentLink"));return t};return k});