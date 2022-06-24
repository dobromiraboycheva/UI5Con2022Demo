/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/SelectionPanel","sap/m/ColumnListItem","sap/m/HBox","sap/m/VBox","sap/m/Link","sap/m/Text","sap/ui/core/Icon","sap/m/library","sap/m/OverflowToolbar","sap/ui/model/Filter"],function(t,e,i,s,n,o,r,a,p,l){"use strict";var c=a.ListType;var d=t.extend("sap.ui.mdc.p13n.panels.LinkSelectionPanel",{metadata:{library:"sap.ui.mdc",events:{linkPressed:{}}},renderer:{apiVersion:2}});d.prototype._getListTemplate=function(){return new e({selected:"{"+this.P13N_MODEL+">"+this.PRESENCE_ATTRIBUTE+"}",type:c.Active,cells:[new i({items:[new s({items:[new n({tooltip:"{"+this.P13N_MODEL+">tooltip}",text:"{"+this.P13N_MODEL+">text}",href:"{"+this.P13N_MODEL+">href}",target:"{"+this.P13N_MODEL+">target}",press:this._onLinkPressed.bind(this)}),new o({text:"{"+this.P13N_MODEL+">description}",visible:"{= ${"+this.P13N_MODEL+">description} ? true:false}"})]})]})]})};d.prototype.setShowHeader=function(t){if(t){this._oListControl.setHeaderToolbar(new p({content:[this._getSearchField()]}))}this.setProperty("showHeader",t);return this};d.prototype._getSearchField=function(){var e=t.prototype._getSearchField.apply(this,arguments);e.getLayoutData().setMaxWidth(undefined);return e};d.prototype._onLinkPressed=function(t){this.fireLinkPressed(t)};d.prototype.setMultiSelectMode=function(t){this._oListControl.setMultiSelectMode(t)};d.prototype._filterList=function(t,e){var i=[],s=[];if(t){s=new l(this.PRESENCE_ATTRIBUTE,"EQ",true)}if(e){i=new l("text","Contains",e)}this._oListControl.getBinding("items").filter(new l([].concat(s,i),true))};return d});