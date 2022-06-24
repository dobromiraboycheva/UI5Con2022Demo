/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/library","sap/m/ComboBox","sap/m/ComboBoxRenderer"],function(e,t,r){"use strict";var a="00000000-0000-0000-0000-000000000000";function i(e){return e===a}var s=t.extend("sap.ui.comp.smartfield.ComboBox",{metadata:{library:"sap.ui.comp",properties:{enteredValue:{type:"string",group:"Data",defaultValue:""}}},renderer:r});s.prototype.setEnteredValue=function(e){if(typeof e!=="undefined"){this.setSelectedKey(e)}var t=this.getSelectedItem();if(e&&!t&&!i(e)){this.setValue(e)}var r=t?this.getSelectedKey():this.getValue();this.setProperty("enteredValue",r);return this};return s});