/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Component","sap/ui/support/library","./CoreHelper.support","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(e,r,o,t){"use strict";var n=sap.ui.require("sap/base/Log");if(!n){n=t.sap.log}var i=r.Categories;var s=r.Severity;var a=r.Audiences;var d={id:"errorLogs",audiences:[a.Control,a.Internal],categories:[i.Performance],enabled:true,minversion:"1.32",title:"Error logs",description:"Checks for the amount of error logs in the console",resolution:"Error logs should be fixed",resolutionurls:[],check:function(e,r){var o=0,t="";var i=n.getLogEntries();i.forEach(function(e){if(e.level===n.Level.ERROR){o++;if(o<=20){t+="- "+e.message+"\n"}}});if(o>0){e.addIssue({severity:s.Low,details:"Total error logs: "+o+"\n"+t,context:{id:"WEBPAGE"}})}}};var u={id:"eventBusSilentPublish",audiences:[a.Internal],categories:[i.Functionality],enabled:true,minversion:"1.32",title:"EventBus publish",description:"Checks the EventBus publications for missing listeners",resolution:"Calls to EventBus#publish should be removed or adapted such that associated listeners are found",resolutionurls:[],check:function(e,r){var o=n.getLogEntries();var t=[];o.forEach(function(e){if(e.component==="sap.ui.core.EventBus"){if(e.details&&e.details.indexOf("sap.")!==0){if(t.indexOf(e.message)===-1){t.push(e.message)}}}});t.forEach(function(r){e.addIssue({severity:s.Low,details:"EventBus publish without listeners "+r,context:{id:"WEBPAGE"}})})}};var c={id:"embeddedByLibNotLoaded",audiences:[a.Application],categories:[i.Performance],enabled:true,minversion:"1.97",title:"Embedding Component or Library not loaded",description:"Checks if the corresponding Component or Library of a Component is already loaded in case the Component is embedded by a resource.",resolution:"Before using a Component embedded by a Library or another Component, it's necessary to load the embedding Library or Component in advance. "+"The 'sap.app/embeddedBy' property must be relative path inside the deployment unit (library or component).",resolutionurls:[],check:function(r){var o={},t;var i=function(e){return function(r){return r.getManifestObject().getEntry("/sap.app/id")===e}};var a=function(e){return function(o){r.addIssue({severity:s.High,details:e.message,context:{id:o.getId()}})}};n.getLogEntries().forEach(function(e){var r=/^Component '([a-zA-Z0-9\.]*)'.*$/;if(e.component==="sap.ui.core.Component#embeddedBy"){o[r.exec(e.message)[1]]=e}});for(t in o){if(Object.hasOwnProperty.call(o,t)){var d=e.registry.filter(i(t));d.forEach(a(o[t]))}}}};return[u,d,c]},true);