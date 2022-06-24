/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Dialog","./Popover","./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","sap/ui/core/InvisibleText","sap/ui/Device","./ActionSheetRenderer","./Button","sap/ui/thirdparty/jquery"],function(t,e,n,i,o,s,a,r,p,l){"use strict";var c=n.ButtonType;var h=n.DialogType;var u=n.PlacementType;var f=i.extend("sap.m.ActionSheet",{metadata:{library:"sap.m",properties:{placement:{type:"sap.m.PlacementType",group:"Appearance",defaultValue:u.Bottom},showCancelButton:{type:"boolean",group:"Appearance",defaultValue:true},cancelButtonText:{type:"string",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null}},aggregations:{buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_cancelButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_invisibleAriaTexts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},defaultAggregation:"buttons",events:{cancelButtonTap:{deprecated:true},beforeOpen:{},afterOpen:{},beforeClose:{parameters:{origin:{type:"sap.m.Button"}}},afterClose:{parameters:{origin:{type:"sap.m.Button"}}},cancelButtonPress:{}},designtime:"sap/m/designtime/ActionSheet.designtime"}});f.prototype.init=function(){this._fnOrientationChange=this._orientationChange.bind(this);this._actionSelected=null};f.prototype.exit=function(){a.resize.detachHandler(this._fnOrientationChange);if(this._parent){this._parent.destroy();this._parent=null}if(this._oCancelButton){this._oCancelButton.destroy();this._oCancelButton=null}this._clearItemNavigation()};f.prototype._clearItemNavigation=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};f.prototype._setItemNavigation=function(){var t=this._getAllButtons(),e=[],n=this.getDomRef();if(n){this._oItemNavigation.setRootDomRef(n);for(var i=0;i<t.length;i++){if(t[i].getEnabled()&&t[i].getVisible()){e.push(t[i].getFocusDomRef())}}if(this._oCancelButton){e.push(this._oCancelButton.getFocusDomRef())}this._oItemNavigation.setItemDomRefs(e);this._oItemNavigation.setSelectedIndex(0);this._oItemNavigation.setPageSize(5);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]})}};f.prototype.onmousedown=function(t){if(t.srcControl.isA("sap.m.Button")&&this.getButtons().indexOf(t.srcControl)!==-1){this._actionSelected=t.srcControl}};f.prototype.onBeforeRendering=function(){var t,e;this._clearItemNavigation();t=this.getTitle();if(this._parent&&!this.isPropertyInitial("title")&&this._parent.getTitle()!==t){if(a.system.phone){this._parent.setTitle(t);this._parent.setShowHeader(!!t)}if(t){this._parent.addStyleClass("sapMActionSheetDialogWithTitle")}else{this._parent.removeStyleClass("sapMActionSheetDialogWithTitle")}}e=this.getPlacement();if(this._parent&&!a.system.phone&&!this.isPropertyInitial("placement")&&this._parent.setPlacement()!==e){this._parent.setPlacement(e)}};f.prototype.onAfterRendering=function(){this._oItemNavigation=new o;this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this._setItemNavigation()};f.prototype.sapfocusleave=function(){this.close()};f.prototype.openBy=function(n){var i=this;if(!this._parent){var o=this.getParent();if(o){this.setParent(null)}if(!a.system.phone){this._parent=new e({placement:this.getPlacement(),showHeader:false,content:[this],beforeOpen:function(){i.fireBeforeOpen()},afterOpen:function(){i.focus();i.fireAfterOpen()},beforeClose:function(){i.fireBeforeClose()},afterClose:function(){if(i.getShowCancelButton()){i.fireCancelButtonTap();i.fireCancelButtonPress()}i._onAfterClose(i._actionSelected);i._actionSelected=null},ariaLabelledBy:this.getPopupHiddenLabelId()||undefined}).addStyleClass("sapMActionSheetPopover");this._parent._setAriaRoleApplication(true)}else{this._parent=new t({title:this.getTitle(),type:h.Standard,content:[this],beforeOpen:function(){i.fireBeforeOpen()},afterOpen:function(){i.focus();i.fireAfterOpen()},beforeClose:function(t){i.fireBeforeClose({origin:t.getParameter("origin")})},afterClose:function(t){i._actionSelected=t.getParameter("origin");i._onAfterClose(i._actionSelected);i._actionSelected=null;a.resize.detachHandler(i._fnOrientationChange)}}).addStyleClass("sapMActionSheetDialog");if(this.getTitle()){this._parent.addStyleClass("sapMActionSheetDialogWithTitle")}else{this._parent.addAriaLabelledBy(this.getPopupHiddenLabelId()||undefined)}if(!a.system.phone){this._parent.setBeginButton(this._getCancelButton())}if(a.system.phone){this._parent.oPopup.setModal(true);this._parent._setDimensions=function(){t.prototype._setDimensions.apply(this);this.$("cont").css("max-height","")};this._parent._adjustScrollingPane=function(){var t=this.$().height();this.$("cont").css("max-height",t);if(this._oScroller){this._oScroller.refresh()}}}}if(o){o.addDependent(this._parent)}}if(!a.system.phone){this._parent.openBy(n)}else{this._parent.open();a.resize.attachHandler(this._fnOrientationChange)}};f.prototype.close=function(){if(this._parent){this._parent.close()}};f.prototype.isOpen=function(){return!!this._parent&&this._parent.isOpen()};f.prototype._createCancelButton=function(){if(!this._oCancelButton){var t=this.getCancelButtonText()?this.getCancelButtonText():sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACTIONSHEET_CANCELBUTTON_TEXT"),e=this;this._oCancelButton=new p(this.getId()+"-cancelBtn",{text:t,type:c.Reject,press:function(){if(a.system.phone&&e._parent){e._parent._oCloseTrigger=this}e.close();e.fireCancelButtonTap();e.fireCancelButtonPress()}}).addStyleClass("sapMActionSheetButton sapMActionSheetCancelButton sapMBtnTransparent sapMBtnInverted");if(a.system.phone){this.setAggregation("_cancelButton",this._oCancelButton,true)}}return this};f.prototype._getCancelButton=function(){if(a.system.phone&&this.getShowCancelButton()){this._createCancelButton();return this._oCancelButton}return null};f.prototype.setCancelButtonText=function(t){this.setProperty("cancelButtonText",t,true);if(this._oCancelButton){this._oCancelButton.setText(t)}return this};f.prototype._preProcessActionButton=function(t){var e=t.getType();if(e!==c.Accept&&e!==c.Reject){t.setType(c.Transparent)}t.addStyleClass("sapMBtnInverted");if(!t.getIcon()){t.addStyleClass("sapMActionSheetButtonNoIcon")}t.addStyleClass("sapMActionSheetButton");this._parent&&this._parent.invalidate();return this};f.prototype._buttonSelected=function(){if(a.system.phone&&this._parent){this._parent._oCloseTrigger=this}this.close()};f.prototype._orientationChange=function(){this._parent._adjustScrollingPane()};f.prototype._addAriaHiddenTexts=function(t){var e=t.getId(),n;if(sap.ui.getCore().getConfiguration().getAccessibility()){n=new s(e+"-actionSheetHiddenText");this.addAggregation("_invisibleAriaTexts",n,false);t.addAriaDescribedBy(n.getId())}};f.prototype._removeAriaHiddenTexts=function(t){t.getAriaDescribedBy().forEach(function(e){var n=sap.ui.getCore().byId(e);if(n instanceof s&&e.indexOf("actionSheetHiddenText")>-1){this.removeAggregation("_invisibleAriaTexts",n,false);t.removeAriaDescribedBy(n);n.destroy()}},this)};f.prototype.addButton=function(t){this.addAggregation("buttons",t,false);this._addAriaHiddenTexts(t);this._preProcessActionButton(t);t.attachPress(this._buttonSelected,this);return this};f.prototype.insertButton=function(t,e){this.insertAggregation("buttons",t,e,false);this._addAriaHiddenTexts(t);this._preProcessActionButton(t);t.attachPress(this._buttonSelected,this);return this};f.prototype.removeButton=function(t){var e=this.removeAggregation("buttons",t,false);if(e){e.detachPress(this._buttonSelected,this);this._removeAriaHiddenTexts(e)}return e};f.prototype.removeAllButtons=function(){var t=this.removeAllAggregation("buttons",false),e=this;l.each(t,function(t,n){n.detachPress(e._buttonSelected,e);e._removeAriaHiddenTexts(n)});return t};f.prototype.clone=function(){var t=this.getButtons();for(var e=0;e<t.length;e++){t[e].detachPress(this._buttonSelected,this)}var n=i.prototype.clone.apply(this,arguments);for(var o=0;o<t.length;o++){t[o].attachPress(this._buttonSelected,this)}return n};f.prototype._getAllButtons=function(){return this.getButtons()};f.prototype.getPopupHiddenLabelId=function(){return s.getStaticId("sap.m","ACTIONSHEET_AVAILABLE_ACTIONS")};f.prototype._applyContextualSettings=function(){i.prototype._applyContextualSettings.call(this)};f.prototype._onAfterClose=function(t){this.fireAfterClose({origin:t})};return f});