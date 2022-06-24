/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/DataType","sap/ui/base/ManagedObject","sap/ui/core/CustomData","sap/ui/core/Component","./mvc/View","./mvc/ViewType","./mvc/XMLProcessingMode","./mvc/EventHandlerResolver","./ExtensionPoint","./StashedControlSupport","sap/ui/base/SyncPromise","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/values","sap/base/assert","sap/base/security/encodeXML","sap/base/util/LoaderExtensions","sap/base/util/JSTokenizer","sap/base/util/isEmptyObject"],function(e,n,t,r,i,a,o,s,u,l,c,f,d,p,g,m,v,h,w,b){"use strict";function y(e,r,i,a,o){var s=t.bindingParser(r,a,true,false,false,false,o);if(s&&typeof s==="object"){return s}var u=r=typeof s==="string"?s:r;var l=n.getType(e);if(l){if(l instanceof n){u=l.parseValue(r,{context:a,locals:o});if(!l.isValid(u)){d.error("Value '"+r+"' is not valid for type '"+l.getName()+"'.")}}}else{throw new Error("Property "+i+" has unknown type "+e)}return typeof u==="string"?t.bindingParser.escape(u):u}function C(e){return e.localName||e.nodeName}var A="http://www.w3.org/1999/xhtml";var _="http://www.w3.org/2000/xmlns/";var N="http://www.w3.org/2000/svg";var M="sap.ui.core";var x="sap.ui.core.mvc";var V="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1";var E="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1";var I="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1";var S="http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1";var P="http://schemas.sap.com/sapui5/preprocessorextension/";var R=["controllerName","resourceBundleName","resourceBundleUrl","resourceBundleLocale","resourceBundleAlias"];var T=/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;function L(e,n){function t(e,t){var r,i=[];for(var a=0;a<e.childNodes.length;a++){r=n(e,e.childNodes[a],t);if(r){i.push(r.unwrap())}}return f.resolve(i)}function r(e,t){var r=Promise.resolve(),i=[t.chain];for(var a=0;a<e.childNodes.length;a++){r=r.then(n.bind(null,e,e.childNodes[a],t));i.push(r)}return Promise.all(i)}return e?r:t}var X={};X.loadTemplate=function(e,n){var t=e.replace(/\./g,"/")+("."+(n||"view")+".xml");return h.loadResource(t).documentElement};X.loadTemplatePromise=function(e,n){var t=e.replace(/\./g,"/")+("."+(n||"view")+".xml");return h.loadResource(t,{async:true}).then(function(e){return e.documentElement})};X.parseViewAttributes=function(e,n){var t,r;for(t=0;t<e.attributes.length;t++){r=e.attributes[t];if(R.includes(r.name)){n["_"+r.name]=r.value}}};X.enrichTemplateIds=function(e,n){X.enrichTemplateIdsPromise(e,n,false);return e};X.enrichTemplateIdsPromise=function(e,n,t){return U(e,n,true,t).then(function(){return e})};X.parseTemplate=function(e,n,t){return X.parseTemplatePromise(e,n,false,{settings:t}).unwrap()};X.parseTemplatePromise=function(e,n,t,r){return U(e,n,false,t,r).then(function(e){if(n.isA("sap.ui.core.mvc.View")){var t,r;for(r=e.length-1;r>=0;r--){t=e[r];if(t&&t._isExtensionPoint){var i=[r,1].concat(t._aControls);Array.prototype.splice.apply(e,i)}}}return e})};function O(e){var n,t=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;if(!e||typeof e!=="object"){n="core:require in XMLView can't be parsed to a valid object"}else{Object.keys(e).some(function(r){if(!t.test(r)){n="core:require in XMLView contains invalid identifier: '"+r+"'";return true}if(!e[r]||typeof e[r]!=="string"){n="core:require in XMLView contains invalid value '"+e[r]+"'under key '"+r+"'";return true}})}return n}function B(e,n){var t=e.getAttributeNS(M,"require"),r,i,a;if(t){try{r=w.parseJS(t)}catch(n){d.error("Require attribute can't be parsed on Node: ",e.nodeName);throw n}a=O(r);if(a){throw new Error(a+" on Node: "+e.nodeName)}if(!b(r)){i={};if(n){return new Promise(function(e,n){var t=Object.keys(r).reduce(function(e,n){i[n]=sap.ui.require(r[n]);return e&&i[n]!==undefined},true);if(t){e(i);return}sap.ui.require(g(r),function(){var n=arguments;Object.keys(r).forEach(function(e,t){i[e]=n[t]});e(i)},n)})}else{Object.keys(r).forEach(function(e){i[e]=sap.ui.requireSync(r[e])});return f.resolve(i)}}}}function j(e,n,t){var r=f.resolve();if(!b(t)){var i=[];var a;if(e){r=new Promise(function(e){a=e})}Object.keys(t).forEach(function(e){var r=t[e];r.forEach(function(e){e.targetControl=n;var t=sap.ui.require(e.providerClass);if(t){i.push(t.applyExtensionPoint(e))}else{var r=new Promise(function(n,t){sap.ui.require([e.providerClass],function(e){n(e)},t)}).then(function(n){return n.applyExtensionPoint(e)});i.push(r)}})});if(e){Promise.all(i).then(a)}}return r}function q(e,n,t){var r=t;for(var i=0;i<100;i++){var a=e.lookupNamespaceURI(r);if(a==null||a===n){return r}r=t+i}throw new Error("Could not find an unused namespace prefix after 100 tries, giving up")}function U(n,g,v,h,w){var O=[],U=q(n,S,"__ui5"),k=B(n,h)||f.resolve(),F={openStart:function(e,n){O.push(["openStart",[e,n]])},voidStart:function(e,n){O.push(["voidStart",[e,n]])},style:function(e,n){O.push(["style",[e,n]])},class:function(e){O.push(["class",[e]])},attr:function(e,n){O.push(["attr",[e,n]])},openEnd:function(){O.push(["openEnd"])},voidEnd:function(){O.push(["voidEnd"])},text:function(e){O.push(["text",[e]])},unsafeHtml:function(e){O.push(["unsafeHtml",[e]])},close:function(e){O.push(["close",[e]])},renderControl:function(e){O.push(e)}};h=h&&!!g._sProcessingMode;d.debug("XML processing mode is "+(g._sProcessingMode||"default")+".","","XMLTemplateProcessor");d.debug("XML will be processed "+(h?"asynchronously":"synchronously")+".","","XMLTemplateProcessor");var W=sap.ui.getCore().getConfiguration().getDesignMode();if(W){g._sapui_declarativeSourceInfo={xmlNode:n,xmlRootNode:g._oContainingView===g?n:g._oContainingView._sapui_declarativeSourceInfo.xmlRootNode}}if(!g.isSubView()){n.setAttributeNS(_,"xmlns:"+U,S)}var H=Q(n,k);var D=0;function K(){for(;D<O.length;D++){var e=O[D];if(e&&typeof e.then==="function"){return e.then(z).then(K)}}return O}function z(e){var n=[D,1].concat(e);Array.prototype.splice.apply(O,n)}return k.then(K).then(function(e){if(H){var t=n.parentNode;t.removeChild(n);if(t.parentNode){t.parentNode.replaceChild(n,t)}}return e});function $(e){return e}function J(e){return g._oContainingView.createId(e)}function Z(e,n){var t=g.getMetadata().isA("sap.ui.core.mvc.View")?"View":"Fragment";var r=e.outerHTML?e.cloneNode(false).outerHTML:e.textContent;return"Error found in "+t+" (id: '"+g.getId()+"').\nXML node: '"+r+"':\n"+n}function G(e){var n=C(e),t;if(g.isA("sap.ui.core.mvc.XMLView")&&(e.namespaceURI===A||e.namespaceURI===N)){t=e.ownerDocument.createElementNS(x,"View")}else if(g.isA("sap.ui.core.Fragment")&&(n!=="FragmentDefinition"||e.namespaceURI!==M)){t=e.ownerDocument.createElementNS(M,"FragmentDefinition")}if(t){var r=e.parentNode;if(r){r.replaceChild(t,e)}t.appendChild(e)}return t}function Q(e,n){var t=false,r=g.sViewName||g._sFragmentName,i,a;if(!r){var o=g;var s=0;while(++s<1e3&&o&&o!==o._oContainingView){o=o._oContainingView}r=o.sViewName}i=G(e);if(i){e=i;t=true}a=C(e);if(g.isA("sap.ui.core.mvc.XMLView")){if(a!=="View"&&a!=="XMLView"||e.namespaceURI!==x){d.error("XMLView's root node must be 'View' or 'XMLView' and have the namespace 'sap.ui.core.mvc'"+(r?" (View name: "+r+")":""))}k=n.then(function(){return te(e,g.getMetadata().getClass(),n,null,{rootArea:true,rootNode:true})})}else{var u=L(h,function(e,n,t){if(n.nodeType===1){return ee(n,t.chain,null,undefined,{rootArea:true})}});k=n.then(function(){return u(e,{chain:n})})}return t}function Y(n,t){var r;var i=sap.ui.getCore().getLoadedLibraries();e.each(i,function(e,i){if(n===i.namespace||n===i.name){r=i.name+"."+(i.tagNames&&i.tagNames[t]||t)}});r=r||n+"."+t;function a(e){if(!e){d.error("Control '"+r+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");e=p.get(r)}if(!e){d.error("Can't find object class '"+r+"' for XML-view","","XMLTemplateProcessor")}return e}var o=r.replace(/\./g,"/");var s=sap.ui.require(o);if(!s){if(h){return new Promise(function(e,n){sap.ui.require([o],function(n){n=a(n);e(n)},n)})}else{s=sap.ui.requireSync(o);s=a(s)}}return s}function ee(e,n,t,r,i){var a=i&&i.rootArea,o=i&&i.rootNode&&g.isSubView(),s=C(e),u=a&&(g.isA("sap.ui.core.Fragment")||r&&r.name==="content"),l,c;if(e.nodeType===1){if(e.namespaceURI===A||e.namespaceURI===N){if(a){if(r&&r.name!=="content"){d.error(Z(e,"XHTML nodes can only be added to the 'content' aggregation and not to the '"+r.name+"' aggregation."));return f.resolve([])}if(i&&i.contentBound){throw new Error(Z(e,"No XHTML or SVG node is allowed because the 'content' aggregation is bound."))}var p=e.namespaceURI===A;var m=e.getAttribute("id");if(m!=null){m=ie(g,e)}else{m=o?g.getId():undefined}if(s==="style"){var w=e.attributes;var b=e.textContent;e=document.createElement(s);e.textContent=b;for(c=0;c<w.length;c++){var y=w[c];if(!y.prefix){e.setAttribute(y.name,y.value)}}if(m!=null){e.setAttribute("id",m)}if(o){e.setAttribute("data-sap-ui-preserve",g.getId())}F.unsafeHtml(e.outerHTML);return f.resolve([])}var _=T.test(s);if(_){F.voidStart(s,m)}else{F.openStart(s,m)}for(c=0;c<e.attributes.length;c++){var M=e.attributes[c];if(M.name!=="id"){F.attr(p?M.name.toLowerCase():M.name,M.value)}}if(o){F.attr("data-sap-ui-preserve",g.getId())}if(_){F.voidEnd();if(e.firstChild){d.error("Content of void HTML element '"+s+"' will be ignored")}}else{F.openEnd();var x=e instanceof HTMLTemplateElement?e.content:e;var V=L(h,function(e,n,t){return ee(n,t.chain,t.closestBinding,t.aggregation,t.config)});l=V(x,{chain:n,closestBinding:t,aggregation:r,config:{rootArea:a}});return l.then(function(e){F.close(s);return e.reduce(function(e,n){if(Array.isArray(n)){n.forEach(function(n){e.push(n)})}return e},[])})}}else{var E=e.attributes["id"]?e.attributes["id"].textContent||e.attributes["id"].text:null;if(v){return X.enrichTemplateIdsPromise(e,g,h).then(function(){return[]})}else{var I=function(n){var t={id:E?ie(g,e,E):undefined,xmlNode:e,containingView:g._oContainingView,processingMode:g._sProcessingMode};if(g.fnScopedRunWithOwner){return g.fnScopedRunWithOwner(function(){return new n(t)})}return new n(t)};return n.then(function(){if(h){return new Promise(function(e,n){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(n){e([I(n)])},n)})}else{var e=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return[I(e)]}})}}}else{l=ne(e,n,t);if(u){F.renderControl(l)}return l}}else if(e.nodeType===3&&u){if(!i||!i.contentBound){F.text(e.textContent)}else if(e.textContent.trim()){throw new Error(Z(e,"Text node isn't allowed because the 'content' aggregation is bound."))}}return f.resolve([])}function ne(e,n,t){if(C(e)==="ExtensionPoint"&&e.namespaceURI===M){if(v){return f.resolve([])}else{var r=g instanceof a?g._oContainingView:g;var i=l._factory.bind(null,r,e.getAttribute("name"),function(){var r=f.resolve();var i=[];var a=e.childNodes;for(var o=0;o<a.length;o++){var s=a[o];if(s.nodeType===1){r=r.then(ee.bind(null,s,n,t));i.push(r)}}return f.all(i).then(function(e){var n=[];e.forEach(function(e){n=n.concat(e)});return n})},undefined,undefined,h);return f.resolve(g.fnScopedRunWithOwner?g.fnScopedRunWithOwner(i):i())}}else{var o=C(e);var s=o;var u=o.lastIndexOf(".");if(u>=0){s=o.substring(u+1,o.length)}if(/^[a-z].*/.test(s)){var c=g.sViewName||g._sFragmentName||g.getId();d.warning("View or Fragment '"+c+"' contains a Control tag that starts with lower case '"+s+"'",g.getId(),"sap.ui.core.XMLTemplateProcessor#lowerCase")}var p=Y(e.namespaceURI,o);if(p&&typeof p.then==="function"){return p.then(function(r){return te(e,r,n,t)})}else{return te(e,p,n,t)}}}function te(e,n,l,p,A){var _=e.namespaceURI,N={},x={},T="",O=[],q=null,U=null,k=e.getAttribute("stashed")==="true",F=A&&A.rootArea,H=A&&A.rootNode,D;if(!v){e.removeAttribute("stashed")}if(!n){return f.resolve([])}if(H){N.id=g.getId()}var K=n.getMetadata();var z=K.getAllSettings();var G=!F?B(e,h):undefined;if(G){l=f.all([l,G]).then(function(e){return Object.assign({},e[0],e[1])})}l=l.then(function(i){if(b(i)){i=null}D=i;if(!v){for(var a=0;a<e.attributes.length;a++){var o=e.attributes[a],s=o.name,l=o.namespaceURI,c=z[s],f=o.value;if(H&&R.includes(s)){continue}if(s==="id"&&!H){N[s]=ie(g,e,f)}else if(s==="class"){T+=f}else if(s==="viewName"){N[s]=f}else if(s==="fragmentName"){N[s]=f;N["containingView"]=g._oContainingView}else if(s==="binding"&&!c||s==="objectBindings"){if(!k){var p=t.bindingParser(f,g._oContainingView.oController);if(p){N.objectBindings=N.objectBindings||{};N.objectBindings[p.model||undefined]=p}}}else if(s==="metadataContexts"){if(!k){var h=null;try{h=X._calculatedModelMapping(f,g._oContainingView.oController,true)}catch(e){d.error(g+":"+e.message)}if(h){N.metadataContexts=h;if(X._preprocessMetadataContexts){X._preprocessMetadataContexts(n.getMetadata().getName(),N,g._oContainingView.oController)}}}}else if(s.indexOf(":")>-1){l=o.namespaceURI;if(l===V){var w=C(o);O.push(new r({key:w,value:y("any",f,w,g._oContainingView.oController,i)}))}else if(l===E){U=f}else if(l&&l.startsWith(P)){d.debug(g+": XMLView parser ignored preprocessor attribute '"+s+"' (value: '"+f+"')")}else if(l===S&&C(o)==="invisible"){c=z.visible;if(c&&c._iKind===0&&c.type==="boolean"){N.visible=false}}else if(l===M||l===S||s.startsWith("xmlns:")){}else{if(!q){q={}}if(!q.hasOwnProperty(o.namespaceURI)){q[o.namespaceURI]={}}q[o.namespaceURI][C(o)]=o.nodeValue;d.debug(g+": XMLView parser encountered unknown attribute '"+s+"' (value: '"+f+"') with unknown namespace, stored as sap-ui-custom-settings of customData")}}else if(c&&c._iKind===0){N[s]=y(c.type,f,s,g._oContainingView.oController,i)}else if(c&&c._iKind===1&&c.altTypes){if(!k){N[s]=y(c.altTypes[0],f,s,g._oContainingView.oController,i)}}else if(c&&c._iKind===2){if(!k){var p=t.bindingParser(f,g._oContainingView.oController,false,false,false,false,i);if(p){N[s]=p}else{d.error(g+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+s+"='"+f+"')")}}}else if(c&&c._iKind===3){if(!k){N[s]=J(f)}}else if(c&&c._iKind===4){if(!k){N[s]=f.split(/[\s,]+/g).filter($).map(J)}}else if(c&&c._iKind===5){if(!k){var A=[];u.parse(f).forEach(function(e){var n=u.resolveEventHandler(e,g._oContainingView.oController,i);if(n){A.push(n)}else{d.warning(g+': event handler function "'+e+'" is not a function or does not exist in the controller.')}});if(A.length){N[s]=A}}}else if(c&&c._iKind===-1){if(K.isA("sap.ui.core.mvc.View")&&s=="async"){N[s]=y(c.type,f,s,g._oContainingView.oController,i)}else{d.warning(g+": setting '"+s+"' for class "+K.getName()+" (value:'"+f+"') is not supported")}}else{m(s==="xmlns",g+": encountered unknown setting '"+s+"' for class "+K.getName()+" (value:'"+f+"')");if(X._supportInfo){X._supportInfo({context:e,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+s+"' for class "+K.getName()}})}}}if(q){O.push(new r({key:"sap-ui-custom-settings",value:q}))}if(O.length>0){N.customData=O}}return i}).catch(function(n){if(!n.isEnriched){n=new Error(Z(e,n));n.isEnriched=true;d.error(n)}if(h&&g._sProcessingMode!==s.SequentialLegacy){throw n}});var Q=L(h,Y);function Y(e,n,t){var r=t.aggregation,i=t.allAggregations,a=t.chain,o=t.closestBinding,s=t.config,u,l;if(n.nodeType===1){if(n.namespaceURI===I){N[C(n)]=n.querySelector("*");return undefined}u=n.namespaceURI===_&&i&&i[C(n)];if(u){return Q(n,{aggregation:u,allAggregations:null,chain:a,closestBinding:o,config:s})}else if(r){if(n.getAttribute("stashed")==="true"&&!v){var d=n;n=n.cloneNode();d.removeAttribute("stashed");l=function(){var t=ie(g,n);c.createStashedControl({wrapperId:t,fnCreate:function(){var n=h;h=false;try{return Y(e,d,{aggregation:r,allAggregations:i,chain:f.resolve(D),closestBinding:o}).unwrap()}finally{h=n}}})};if(g.fnScopedRunWithOwner){g.fnScopedRunWithOwner(l)}else{l()}n.removeAttribute("visible");re(n,"invisible")}if(N[r.name]&&typeof N[r.name].path==="string"){o={aggregation:r.name,id:N.id};if(H&&r.name==="content"){s=s||{};s.contentBound=true}}return ee(n,a,o,r,s).then(function(e){for(var n=0;n<e.length;n++){var t=e[n];var i=r.name;if(t._isExtensionPoint){if(!N[i]){N[i]=[]}var a=x[i];if(!a){a=x[i]=[]}t.index=N[i].length;t.aggregationName=i;t.closestAggregationBindingCarrier=o&&o.id;t.closestAggregationBinding=o&&o.aggregation;var s=a[a.length-1];if(s){s._nextSibling=t}a.push(t)}else if(r.multiple){if(!N[i]){N[i]=[]}if(typeof N[i].path==="string"){m(!N[i].template,"list bindings support only a single template object");N[i].template=t}else{N[i].push(t)}}else{m(!N[i],"multiple aggregates defined for aggregation with cardinality 0..1");N[i]=t}}return e})}else{throw new Error(Z(n,"Cannot add direct child without default aggregation defined for control "+K.getElementName()))}}else if(n.nodeType===3){if(s&&s.rootArea){ee(n,a,o,r,s)}else{var p=n.textContent||n.text;if(p&&p.trim()){throw new Error(Z(n,"Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed."))}}}}var ne=K.getDefaultAggregation();var te=K.getAllAggregations();return Q(e,{aggregation:ne,allAggregations:te,chain:l,closestBinding:p,config:A}).then(function(){var t;var r=f.resolve();var s=f.resolve();var u=e.getAttribute("type");var l=i.getOwnerComponentFor(g);var c=l&&l.isA("sap.ui.core.IAsyncContentCreation");if(v){if(!F&&e.hasAttribute("id")){ae(g,e)}}else if(!H&&n.getMetadata().isA("sap.ui.core.mvc.View")){var d=function(){if(!n._sType&&!N.viewName){N.viewName="module:"+n.getMetadata().getName().replace(/\./g,"/")}if(c&&h){if(N.async===false){throw new Error("A nested view contained in a Component implementing 'sap.ui.core.IAsyncContentCreation' is processed asynchronously by default and cannot be processed synchronously.\n"+"Affected Component '"+l.getMetadata().getComponentName()+"' and View '"+N.viewName+"'.")}N.type=n._sType||u;s=a.create(N)}else{if(n.getMetadata().isA("sap.ui.core.mvc.XMLView")&&g._sProcessingMode){N.processingMode=g._sProcessingMode}return a._create(N,undefined,n._sType||u)}};if(g.fnScopedRunWithOwner){t=g.fnScopedRunWithOwner(d)}else{t=d()}}else if(n.getMetadata().isA("sap.ui.core.Fragment")&&h){if(u!==o.JS){N.processingMode=g._sProcessingMode}var p="sap/ui/core/Fragment";var m=sap.ui.require(p);N.name=N.name||N.fragmentName;if(m){s=m.load(N)}else{s=new Promise(function(e,n){sap.ui.require([p],function(n){n.load(N).then(function(n){e(n)})},n)})}}else{var b=function(){var e;if(H){e=g;if(!h){if(w&&w.settings){Object.keys(N).forEach(function(e){if(w.settings.hasOwnProperty(e)){w.settings[e]=N[e];delete N[e]}})}}g.applySettings(N)}else if(g.fnScopedRunWithOwner){e=g.fnScopedRunWithOwner(function(){var e=new n(N);return e})}else{e=new n(N)}r=j(h,e,x);return e};if(w&&w.fnRunWithPreprocessor){t=w.fnRunWithPreprocessor(b)}else{t=b()}}return s.then(function(e){return e||t}).then(function(n){if(T&&n.addStyleClass){n.addStyleClass(T)}if(!n){n=[]}else if(!Array.isArray(n)){n=[n]}if(X._supportInfo&&n){for(var t=0,i=n.length;t<i;t++){var a=n[t];if(a&&a.getId()){var o=X._supportInfo({context:e,env:{caller:"createRegularControls",nodeid:e.getAttribute("id"),controlid:a.getId()}}),s=U?U+",":"";s+=o;X._supportInfo.addSupportInfo(a.getId(),s)}}}if(W){n.forEach(function(n){if(K.getCompositeAggregationName){var t=e.getElementsByTagName(n.getMetadata().getCompositeAggregationName());for(var r=0;r<t.length;r++){e.removeChild(t[0])}}n._sapui_declarativeSourceInfo={xmlNode:e,xmlRootNode:g._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:K.getName()==="sap.ui.core.Fragment"?N["fragmentName"]:null}})}return r.then(function(){return n})})})}function re(e,n){var t=q(e,S,U);e.setAttributeNS(S,t+":"+n,"true")}function ie(e,n,t){if(n.getAttributeNS(S,"id")){return n.getAttribute("id")}else{return J(t?t:n.getAttribute("id"))}}function ae(e,n){n.setAttribute("id",J(n.getAttribute("id")));re(n,"id")}}X._preprocessMetadataContexts=null;X._calculatedModelMapping=function(e,n,r){var i,a={},o=t.bindingParser(e,n);function s(e){if(e.length%2===0){throw new Error("The last entry is no binding")}for(var n=1;n<=e.length;n=n+2){if(typeof e[n-1]=="string"){throw new Error("Binding expected not a string")}if(e[n]){if(typeof e[n]!="string"||e[n]!=","){throw new Error("Missing delimiter ','")}}}}if(o){if(!o.formatter){i=o;o={parts:[i]}}else{s(o.formatter.textFragments)}for(var u=0;u<o.parts.length;u++){i=o.parts[u];a[i.model]=a[i.model]||(r?[]:null);if(Array.isArray(a[i.model])){a[i.model].push(i)}else{a[i.model]=i}}}return a};return X},true);