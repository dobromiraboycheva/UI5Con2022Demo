/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/SelectionPanel","sap/ui/model/Sorter"],function(e,t){"use strict";var a=e.extend("sap.ui.mdc.p13n.panels.ActionToolbarPanel",{metadata:{library:"sap.ui.mdc"},renderer:{apiVersion:2}});a.prototype._bindListItems=function(e){var a=this.getAggregation("_template");if(a){var n=function(e){return e.getProperty("alignment")};var i=new t({path:"alignment",descending:false,group:n});this._oListControl.bindItems(Object.assign({path:this.P13N_MODEL+">/items",sorter:i,key:"name",templateShareable:false,template:this.getAggregation("_template").clone()},e))}};return a});