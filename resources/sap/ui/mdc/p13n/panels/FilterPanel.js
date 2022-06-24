/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/QueryPanel","sap/m/VBox","sap/m/Text","sap/ui/layout/Grid","sap/ui/layout/GridData","sap/m/Button","sap/m/ComboBox","sap/ui/core/library"],function(e,t,a,n,o,r,i,s){"use strict";var p=s.ValueState;var l=e.extend("sap.ui.mdc.p13n.panels.FilterPanel",{metadata:{properties:{itemFactory:{type:"function"}}},renderer:{}});l.prototype.PRESENCE_ATTRIBUTE="active";l.prototype._createQueryRowGrid=function(e){var i=e.name?new t({items:[new a({text:e.label}).addStyleClass("sapUiTinyMarginTop").addStyleClass("sapUiTinyMarginBegin")]}):this._createKeySelect(e.name);var s;if(!e.name){s=new r({text:"Add",press:this._addPressed.bind(this),enabled:false});s.setLayoutData(new o({indent:"XL7 L7 M7 S7",span:"XL1 L1 M1 S1"}))}return new n({containerQuery:true,defaultSpan:"XL4 L4 M4 S4",content:[i,e.name?this._createFactoryControl(e):s]}).addStyleClass("sapUiTinyMargin")};l.prototype._getPlaceholderText=function(){return this._getResourceText("p13n.FILTER_PLACEHOLDER")};l.prototype._getRemoveButtonTooltipText=function(){return this._getResourceText("p13n.FILTER_REMOVEICONTOOLTIP")};l.prototype._createKeySelect=function(e){var t=new i({width:"100%",items:this._getAvailableItems(),placeholder:this._getPlaceholderText(),selectionChange:function(e){var t=e.getSource();this._selectKey(t)}.bind(this),change:function(e){var t=e.getSource();var a=e.getParameter("newValue");t.setValueState(a&&!t.getSelectedItem()?p.Error:p.None)}});t.onsapenter=function(e){this._selectKey()}.bind(this);return t};l.prototype._getAvailableItems=function(t){var a=e.prototype._getAvailableItems.apply(this,arguments);a.shift();return a};l.prototype._createRemoveButton=function(t){var a=e.prototype._createRemoveButton.apply(this,arguments);a.setLayoutData(new o({span:"XL1 L1 M1 S1"}));return a};l.prototype._addPressed=function(e){this._selectKey()};l.prototype._selectKey=function(n){var o,r;if(n){this._oComboBox=n;o=n.getParent();r=n.getSelectedKey();o.getContent()[1].setEnabled(!!r)}else if(this._oComboBox){n=this._oComboBox;o=n.getParent();r=n.getSelectedKey();if(r){e.prototype._selectKey.call(this,n);var i=r?n.getSelectedItem().getText():"";var s=o.getContent()[0];o.removeContent(s);var p=o.getContent()[0];o.removeContent(p);var l=new t({items:[new a({text:i}).addStyleClass("sapUiTinyMarginTop").addStyleClass("sapUiTinyMarginBegin")]});l._key=r;o.insertContent(l,0);var c=this._createFactoryControl({name:r});o.insertContent(c,1)}delete this._oComboBox}};l.prototype._createFactoryControl=function(e){var t=this.getItemFactory().call(this,e);t.setLayoutData(new o({span:"XL7 L7 M7 S7"}));return t};return l});