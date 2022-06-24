/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/mdc/Element","sap/m/library","sap/m/ResponsivePopover"],function(e,t,o,n){"use strict";var i=o.PlacementType;var r=t.extend("sap.ui.mdc.field.FieldInfoBase",{metadata:{library:"sap.ui.mdc",events:{dataUpdate:{},popoverAfterOpen:{}}}});r.prototype.isTriggerable=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method isTriggerable must be redefined")};r.prototype.getTriggerHref=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getTriggerHref must be redefined")};r.prototype.getDirectLinkHrefAndTarget=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getDirectLinkHrefAndTarget must be redefined")};r.prototype.open=function(e){var t=this.getParent();if(!t){throw new Error("sap.ui.mdc.field.FieldInfoBase: popover can not be open because the control is undefined")}if(this._oPopover&&this._oPopover.isOpen()){return Promise.resolve()}return this.checkDirectNavigation().then(function(o){return o?Promise.resolve():this.createPopover().then(function(o){if(o){this._oPopover=o;this.addDependent(this._oPopover);this._oPopover.openBy(e||t);this._oPopover.attachAfterOpen(function(){this.firePopoverAfterOpen()}.bind(this))}}.bind(this))}.bind(this))};r.prototype.getContent=function(e){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getContent must be redefined")};r.prototype.checkDirectNavigation=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method checkDirectNavigation must be redefined")};r.prototype.getSourceControl=function(){return this.getParent()};r.prototype.createPopover=function(){var t;return this.getContent(function(){return t}).then(function(o){t=new n(this.getId()+"-popover",{contentWidth:"380px",horizontalScrolling:false,showHeader:e.system.phone,placement:i.Auto,content:[o],afterClose:function(){if(this._oPopover){this._oPopover.destroy()}}.bind(this)});sap.ui.require(["sap/ui/fl/apply/api/FlexRuntimeInfoAPI"],function(e){if(e.isFlexSupported({element:o})){e.waitForChanges({element:o}).then(function(){t.addAriaLabelledBy(o.getContentTitle?o.getContentTitle():"")})}else if(o){t.addAriaLabelledBy(o.getContentTitle?o.getContentTitle():"")}});return t}.bind(this))};return r});