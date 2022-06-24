/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/library","sap/ui/comp/smartfield/type/String","sap/ui/comp/odata/type/NumericText","sap/ui/comp/odata/FiscalFormat","sap/ui/model/ValidateException"],function(a,e,t,o,r,s){"use strict";var i=t.extend("sap.ui.comp.odata.type.FiscalDate",{constructor:function(a,s,c){t.call(this,a,s);if(this.oConstraints&&this.oConstraints.isDigitSequence){o.call(this,a,s)}this.sAnotationType=c.anotationType;this.formatter=r.getDateInstance(Object.assign({format:i.oDateFormats[c.anotationType],calendarType:e.CalendarType.Gregorian},a))}});i.prototype.parseValue=function(a){if(a===""){return null}if(this.oConstraints&&this.oConstraints.isDigitSequence){return this.formatter.parse(o.prototype.parseValue.apply(this,arguments))}return this.formatter.parse(t.prototype.parseValue.apply(this,arguments))};i.prototype.formatValue=function(a){var e;if(this.oConstraints&&this.oConstraints.isDigitSequence){var r=Array.from(arguments),s=true;r.push(s);e=o.prototype.formatValue.apply(this,r)}else{e=t.prototype.formatValue.apply(this,arguments)}if(e===null){return null}return this.formatter.format(e)};i.prototype.validateValue=function(a){try{t.prototype.validateValue.apply(this,arguments)}catch(e){if(!this.formatter.validate(a)){throw new s(this.getErrorMessage(this.sAnotationType))}}if(a===null){return}if(!this.formatter.validate(a)){throw new s(this.getErrorMessage(this.sAnotationType))}};i.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);if(this.formatter){this.formatter.destroy();this.formatter=null}};i.prototype.getErrorMessage=function(e){var t;this.iFullYear=this.iFullYear||(new Date).getFullYear().toString();switch(e){case"com.sap.vocabularies.Common.v1.IsFiscalYear":t=this.iFullYear;break;case"com.sap.vocabularies.Common.v1.IsFiscalPeriod":t="001";break;case"com.sap.vocabularies.Common.v1.IsFiscalYearPeriod":t=this.iFullYear+"001";break;case"com.sap.vocabularies.Common.v1.IsFiscalQuarter":t="1";break;case"com.sap.vocabularies.Common.v1.IsFiscalYearQuarter":t=this.iFullYear+"1";break;case"com.sap.vocabularies.Common.v1.IsFiscalWeek":t="01";break;case"com.sap.vocabularies.Common.v1.IsFiscalYearWeek":t=this.iFullYear+"01";break;case"com.sap.vocabularies.Common.v1.IsDayOfFiscalYear":t="1";break;case"com.sap.vocabularies.Common.v1.IsFiscalYearVariant":break;default:t=this.iFullYear}return a.getLibraryResourceBundle("sap.ui.comp").getText("FISCAL_VALIDATION_FAILS",[this.formatValue(t,"string")])};i.oDateFormats={"com.sap.vocabularies.Common.v1.IsFiscalYear":"YYYY","com.sap.vocabularies.Common.v1.IsFiscalPeriod":"PPP","com.sap.vocabularies.Common.v1.IsFiscalYearPeriod":"YYYYPPP","com.sap.vocabularies.Common.v1.IsFiscalQuarter":"Q","com.sap.vocabularies.Common.v1.IsFiscalYearQuarter":"YYYYQ","com.sap.vocabularies.Common.v1.IsFiscalWeek":"WW","com.sap.vocabularies.Common.v1.IsFiscalYearWeek":"YYYYWW","com.sap.vocabularies.Common.v1.IsDayOfFiscalYear":"d","com.sap.vocabularies.Common.v1.IsFiscalYearVariant":""};i.prototype.getName=function(){return"sap.ui.comp.odata.type.FiscalDate"};i.prototype.getFormatter=function(){return this.formatter};return i});