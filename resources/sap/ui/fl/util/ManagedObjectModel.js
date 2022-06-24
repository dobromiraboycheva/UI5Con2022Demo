/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/model/base/ManagedObjectModel"],function(e,t){"use strict";function a(e){return e.charAt(0).toUpperCase()+e.slice(1)}var i=e.extend("sap.ui.fl.util.ManagedObjectModel",{metadata:{library:"sap.ui.fl",properties:{data:{type:"object"},name:{type:"string",defaultValue:"$sap.ui.fl.ManagedObjectModel"}},associations:{object:{type:"sap.ui.core.Element"}}},constructor:function(){e.apply(this,arguments);this._oManagedObjectModel=new t(sap.ui.getCore().byId(this.getObject()),this.getData());["data","name","object"].forEach(function(e){this["set"+a(e)]=function(){throw new Error("sap.ui.fl.util.ManagedObjectModel: Can't change the value of `"+e+"` after the object is initialized. Please recreate the object with correct values in the constructor.")}},this)}});i.prototype.setParent=function(t){var a=this.getParent();if(a){a.setModel(null,this.getName())}if(t){t.setModel(this._oManagedObjectModel,this.getName())}e.prototype.setParent.apply(this,arguments)};i.prototype.exit=function(){this._oManagedObjectModel.destroy()};return i});