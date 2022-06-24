/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/library","sap/ui/base/ManagedObject","sap/ui/comp/odata/MetadataAnalyser","sap/ui/model/odata/AnnotationHelper","sap/ui/model/Context","sap/ui/thirdparty/jquery"],function(e,t,r,a,n,i){"use strict";var o=t.extend("sap.ui.comp.state.UIState",{metadata:{library:"sap.ui.comp",properties:{presentationVariant:{type:"object"},selectionVariant:{type:"object"},variantName:{type:"string"},valueTexts:{type:"object"},semanticDates:{type:"object"}}}});o._getFilterNamesWithValuesForCurrentLanguage=function(e){var t=[],r=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().getLanguage();if(e&&e.Texts){e.Texts.some(function(e){if(e.Language===r){e.PropertyTexts.forEach(function(e){var r,a=false;for(var n=0;n<t.length;n++){if(t[n].filterName===e.PropertyName){r=t[n];a=true;break}}if(e.PropertyName&&e.ValueTexts&&Object.keys(e.ValueTexts).length>0){e.ValueTexts.forEach(function(t){if(!r){r={filterName:e.PropertyName,keys:[]}}r.keys.push(t.PropertyValue)})}if(!a&&r&&r.keys.length){t.push(r)}});return true}return false})}return t};o._getFilterNamesWithValuesFromSelectOption=function(e,t){var r=[];if(e&&e.SelectOptions){e.SelectOptions.forEach(function(e){var a=t?t.indexOf(e.PropertyName)<0:true;if(a){var n={filterName:e.PropertyName,keys:[]};e.Ranges.forEach(function(e){if(e.Option==="EQ"&&e.Sign==="I"){n.keys.push(e.Low)}});r.push(n)}})}return r};o._determineFiltersWithOnlyKeyValues=function(e,t){var r,a,n=[];e=e||[];t=t||[];t.forEach(function(t){var i={filterName:t.filterName,keys:[]};a=null;e.some(function(e){if(t.filterName===e.filterName){a=e}return a!==null});for(var o=0;o<t.keys.length;o++){r=false;if(a){for(var s=0;s<a.keys.length;s++){if(t.keys[o]===a.keys[s]){r=true;break}}}if(!r){i.keys.push(t.keys[o])}}if(i.keys.length){n.push(i)}});return n};o.determineFiltersWithOnlyKeyValues=function(e,t,r){var a=o._getFilterNamesWithValuesForCurrentLanguage(e);var n=o._getFilterNamesWithValuesFromSelectOption(t,r);return o._determineFiltersWithOnlyKeyValues(a,n)};o.calculateValueTexts=function(e,t){var r=null;var a=function(e,t){var a=null;if(!r){r={Texts:[{ContextUrl:"",Language:sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().getLanguage(),PropertyTexts:[]}]}}for(var n=0;n<r.Texts[0].PropertyTexts.length;n++){if(r.Texts[0].PropertyTexts[n].PropertyName===e){a=r.Texts[0].PropertyTexts[n];break}}if(!a){a={PropertyName:e,ValueTexts:[]};r.Texts[0].PropertyTexts.push(a)}a.ValueTexts.push({PropertyValue:t.key,Text:t.text})};if(t&&e&&e.SelectOptions){e.SelectOptions.forEach(function(e){if(t[e.PropertyName]){if(t[e.PropertyName].ranges){t[e.PropertyName].ranges.forEach(function(t){if(t.hasOwnProperty("text")){a(e.PropertyName,t)}})}if(t[e.PropertyName].items){t[e.PropertyName].items.forEach(function(t){if(t.hasOwnProperty("text")){a(e.PropertyName,t)}})}}})}return r};o.enrichWithValueTexts=function(e,t){var r=false,a,n,i,o=e;n=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().getLanguage().toLowerCase();if(t&&t.Texts){t.Texts.some(function(e){if(e.Language&&e.Language.toLowerCase()===n){a=e}return a!==null});if(a&&a.PropertyTexts){if(!i){i=JSON.parse(e)}a.PropertyTexts.forEach(function(e){var t=i[e.PropertyName];if(t&&t.ranges&&e.ValueTexts){e.ValueTexts.forEach(function(a){var n=null,o=-1;if(a.Text){t.ranges.some(function(e,t){if(!e.exclude&&e.operation==="EQ"&&e.value1===a.PropertyValue){n=e;o=t}return n!=null})}if(n){r=true;if(!t.items){t.items=[]}t.items.push({key:a.PropertyValue,text:a.Text});i[e.PropertyName].ranges.splice(o,1)}})}});if(r){o=JSON.stringify(i)}}}return o};o.createFromSelectionAndPresentationVariantAnnotation=function(e,t,s){var u={};if(t&&t.SelectOptions&&t.SelectOptions.length){u.SelectOptions=t.SelectOptions.map(function(e){return{PropertyName:e.PropertyName.PropertyPath,Ranges:e.Ranges.map(function(e){var t=new n(null,"/");return{Sign:r.getSelectionRangeSignType([e.Sign.EnumMember]),Option:r.getSelectionRangeOptionType([e.Option.EnumMember]),Low:e.Low&&a.format(t,e.Low)||undefined,High:e.High&&a.format(t,e.High)||undefined}})}})}if(t&&t.Parameters&&t.Parameters.length){u.Parameters=t.Parameters.map(function(e){var t=new n(null,"/");return{PropertyName:e.PropertyName.PropertyPath,PropertyValue:e.PropertyValue&&a.format(t,e.PropertyValue)||undefined}})}var l={};if(s&&s.lineItemAnnotation){if(!l.Visualizations){l.Visualizations=[]}var f=[];if(s.lineItemAnnotation.fields){var p=s.lineItemAnnotation.labels;var m=s.lineItemAnnotation.urlInfo;var c=s.lineItemAnnotation.importance;var y=s.lineItemAnnotation.criticality;s.lineItemAnnotation.fields.forEach(function(e){var t={Value:e};t.Label=p[e]?p[e]:null;t.IconUrl=m[e]?m[e]:null;t.Importance=c[e]?c[e]:null;t.Criticality=y[e]?y[e]:null;f.push(t)})}l.Visualizations.push({Type:"LineItem",Content:f})}if(s&&s.chartAnnotation){if(!l.Visualizations){l.Visualizations=[]}l.Visualizations.push({Type:"Chart",Content:{ChartType:s.chartAnnotation.chartType,Measures:s.chartAnnotation.measureFields,MeasureAttributes:Object.keys(s.chartAnnotation.measureAttributes).map(function(e){return{Measure:e,Role:s.chartAnnotation.measureAttributes[e].role}}),Dimensions:s.chartAnnotation.dimensionFields,DimensionAttributes:Object.keys(s.chartAnnotation.dimensionAttributes).map(function(e){return{Dimension:e,Role:s.chartAnnotation.dimensionAttributes[e].role}})}})}if(s&&s.maxItems){l.MaxItems=parseInt(s.maxItems)}if(s&&s.sortOrderFields){l.SortOrder=s.sortOrderFields.map(function(e){return{Property:e.name,Descending:e.descending}})}if(s&&s.groupByFields){l.GroupBy=s.groupByFields}if(s&&s.requestAtLeastFields){l.RequestAtLeast=s.requestAtLeastFields}return new o({presentationVariant:!i.isEmptyObject(l)?l:undefined,selectionVariant:!i.isEmptyObject(u)?u:undefined,variantName:e?e:undefined})};o.calcSemanticDates=function(e,t){var r=null;var a=function(e,t){var a=null;if(!r){r={Dates:[]}}for(var n=0;n<r.Dates.length;n++){if(r.Dates[n].PropertyName===e){a=r.Dates[n];break}}if(!a){a={PropertyName:e,Data:t.conditionTypeInfo.data};r.Dates.push(a)}};if(t&&e&&e.SelectOptions){e.SelectOptions.forEach(function(e){if(t[e.PropertyName]){if(t[e.PropertyName].ranges){if(t[e.PropertyName].hasOwnProperty("conditionTypeInfo")){a(e.PropertyName,t[e.PropertyName])}}}})}return r};o.enrichWithSemanticDates=function(e,t){var r=false,a,n=e;if(t&&t.Dates){if(!a){a=JSON.parse(e)}t.Dates.forEach(function(e){var t=a[e.PropertyName];if(t&&t.ranges&&e.Data){r=true;if(!t.items){t.items=[]}t.ranges[0].semantic=e.Data}});if(r){n=JSON.stringify(a)}}return n};return o});