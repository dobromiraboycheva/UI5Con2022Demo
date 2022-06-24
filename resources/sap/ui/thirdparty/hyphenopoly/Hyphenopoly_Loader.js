/**
 * @license Hyphenopoly_Loader 3.4.0 - client side hyphenation
 * ©2019  Mathias Nater, Zürich (mathiasnater at gmail dot com)
 * https://github.com/mnater/Hyphenopoly
 *
 * Released under the MIT license
 * http://mnater.github.io/Hyphenopoly/LICENSE
 * Modifications SAP SE or an SAP affiliate company and OpenUI5 contributors. All rights reserved.
 */
(function e(n,t,a,s){"use strict";var r=sessionStorage;var i=n.WebAssembly;var o=new Map;var l=new Map;function f(){return s.create(null)}function c(e,n){s.keys(e).forEach(n)}(function e(){if(a.cacheFeatureTests&&r.getItem("Hyphenopoly_Loader")){a.cf=JSON.parse(r.getItem("Hyphenopoly_Loader"))}else{a.cf={langs:f(),polyfill:false,wasm:null}}})();(function e(){var n=t.currentScript?t.currentScript.src.replace(/Hyphenopoly_Loader.js/i,""):"../";var r=n+"patterns/";if(a.paths){a.paths.maindir=a.paths.maindir||n;a.paths.patterndir=a.paths.patterndir||r}else{a.paths=s.create({maindir:n,patterndir:r})}})();(function e(){if(a.setup){a.setup.selectors=a.setup.selectors||{".hyphenate":{}};a.setup.timeout=a.setup.timeout||1e3;a.setup.hide=a.setup.hide||"all"}else{a.setup={hide:"all",selectors:{".hyphenate":{}},timeout:1e3}}})();(function e(){c(a.require,function e(n){l.set(n.toLowerCase(),a.require[n])});if(a.fallbacks){c(a.fallbacks,function e(n){o.set(n.toLowerCase(),a.fallbacks[n].toLowerCase())})}})();a.toggle=function e(n){if(n==="on"){var s=t.getElementById("H9Y_Styles");if(s){s.parentNode.removeChild(s)}}else{var r=" {visibility: hidden !important}\n";var i=t.createElement("style");var o="";i.id="H9Y_Styles";switch(a.setup.hide){case"all":o="html"+r;break;case"element":c(a.setup.selectors,function e(n){o+=n+r});break;case"text":c(a.setup.selectors,function e(n){o+=n+" {color: transparent !important}\n"});break}i.appendChild(t.createTextNode(o));t.head.appendChild(i)}};(function e(){var t=new Map;var s=[];var r=[];function i(e,n,a){t.set(e,{cancellable:a,default:n,register:[]})}i("timeout",function e(t){a.toggle("on");n.console.info("Hyphenopolys 'FOUHC'-prevention timed out after %dms",t.delay)},false);i("error",function e(t){switch(t.lvl){case"info":n.console.info(t.msg);break;case"warn":n.console.warn(t.msg);break;default:n.console.error(t.msg)}},true);i("contentLoaded",function e(n){s.push({data:n,name:"contentLoaded"})},false);i("engineLoaded",function e(n){s.push({data:n,name:"engineLoaded"})},false);i("hpbLoaded",function e(n){s.push({data:n,name:"hpbLoaded"})},false);i("loadError",function e(n){s.push({data:n,name:"loadError"})},false);i("tearDown",null,true);function o(e,n){n=n||f();var a=false;t.get(e).register.forEach(function s(r){n.preventDefault=function n(){if(t.get(e).cancellable){a=true}};r(n)});if(!a&&t.get(e).default){t.get(e).default(n)}}function l(e,n,s){if(t.has(e)){t.get(e).register.push(n)}else if(s){r.push({handler:n,name:e})}else{a.events.dispatch("error",{lvl:"warn",msg:'unknown Event "'+e+'" discarded'})}}if(a.handleEvent){c(a.handleEvent,function e(n){l(n,a.handleEvent[n],true)})}a.events=f();a.events.deferred=s;a.events.tempRegister=r;a.events.dispatch=o;a.events.define=i;a.events.addListener=l})();function p(){if(typeof i==="object"&&typeof i.Instance==="function"){try{var e=new i.Module(Uint8Array.from([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,5,1,1,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]));return new i.Instance(e).exports.t(4)!==0}catch(e){return false}}return false}function u(e,n){var s=t.createElement("script");s.src=e+n;if(n==="hyphenEngine.asm.js"){s.addEventListener("load",function e(){a.events.dispatch("engineLoaded",{msg:"asm"})})}t.head.appendChild(s)}var d=new Map;function h(e,t,s,r){function o(e,t,s,r){n.fetch(e+t).then(function n(o){if(o.ok){if(s==="hyphenEngine"){a.bins.set(s,o.arrayBuffer().then(function e(n){return new i.Module(n)}));a.events.dispatch("engineLoaded",{msg:r})}else{var l=d.get(t);l.forEach(function e(n){a.bins.set(n,l.length>1?o.clone().arrayBuffer():o.arrayBuffer());a.events.dispatch("hpbLoaded",{msg:n})})}}else{a.events.dispatch("loadError",{file:t,msg:r,name:s,path:e})}})}function l(e,n,t,s){var r=new XMLHttpRequest;r.onload=function i(){if(r.status===200){d.get(n).forEach(function e(n){a.bins.set(n,r.response);a.events.dispatch("hpbLoaded",{msg:n})})}else{a.events.dispatch("loadError",{file:n,msg:s,name:t,path:e})}};r.open("GET",e+n);r.responseType="arraybuffer";r.send()}if(!d.has(t)){d.set(t,[r]);if(a.cf.wasm){o(e,t,s,r)}else{l(e,t,s,r)}}else if(s!=="hyphenEngine"){d.get(t).push(r)}}function m(e){var n=new Map([["de",54],["hu",205],["nb-no",91],["nl",41]]);var t=n.get(e)||32;a.specMems=a.specMems||new Map;if(a.cf.wasm){a.specMems.set(e,new i.Memory({initial:t,maximum:256}))}else{var s=2<<Math.floor(Math.log(t)*Math.LOG2E)<<16;a.specMems.set(e,new ArrayBuffer(s))}}(function e(){var s=function e(){var n=null;var s=["visibility:hidden","-moz-hyphens:auto","-webkit-hyphens:auto","-ms-hyphens:auto","hyphens:auto","width:48px","font-size:12px","line-height:12px","border:none","padding:0","word-wrap:normal"].join(";");function r(e){if(a.cf.langs[e]){return}n=n||t.createElement("body");var r=t.createElement("div");r.lang=e;r.style.cssText=s;r.appendChild(t.createTextNode(l.get(e).toLowerCase()));n.appendChild(r)}function i(e){if(n){e.appendChild(n);return n}return null}function o(){if(n){n.parentNode.removeChild(n)}}return{append:i,clear:o,create:r}}();function r(e){return e.style.hyphens==="auto"||e.style.webkitHyphens==="auto"||e.style.msHyphens==="auto"||e.style["-moz-hyphens"]==="auto"}function i(e){a.hyphenators=a.hyphenators||f();if(!a.hyphenators[e]){if(n.Promise){a.hyphenators[e]=new Promise(function n(t,s){a.events.addListener("engineReady",function n(s){if(s.msg===e){t(a.createHyphenator(s.msg))}},true);a.events.addListener("loadError",function n(t){if(t.name===e||t.name==="hyphenEngine"){s(new Error("File "+t.file+" can't be loaded from "+t.path))}},false)});a.hyphenators[e].catch(function e(n){a.events.dispatch("error",{lvl:"error",msg:n.message})})}else{a.hyphenators[e]={then:function(){a.events.dispatch("error",{msg:"Promises not supported in this engine. Use a polyfill."})}}}}}function d(e){var n=e+".hpb";var t=e;a.cf.polyfill=true;a.cf.langs[e]="H9Y";if(o&&o.has(e)){t=o.get(e);n=t+".hpb"}a.bins=a.bins||new Map;h(a.paths.patterndir,n,t,e)}if(a.cf.wasm===null){a.cf.wasm=p()}l.forEach(function e(n,t){if(n==="FORCEHYPHENOPOLY"||a.cf.langs[t]&&a.cf.langs[t]==="H9Y"){d(t)}else{s.create(t)}});var y=s.append(t.documentElement);if(y!==null){var g=y.querySelectorAll("div");Array.prototype.forEach.call(g,function e(n){if(r(n)&&n.offsetHeight>12){a.cf.langs[n.lang]="CSS"}else{d(n.lang)}});s.clear()}if(a.cf.polyfill){u(a.paths.maindir,"Hyphenopoly.js");if(a.cf.wasm){h(a.paths.maindir,"hyphenEngine.wasm","hyphenEngine","wasm")}else{u(a.paths.maindir,"hyphenEngine.asm.js")}c(a.cf.langs,function e(n){if(a.cf.langs[n]==="H9Y"){m(n);i(n)}})}})();function y(){if(a.setup.hide.match(/^(?:element|text)$/)){a.toggle("off")}a.events.dispatch("contentLoaded",{msg:["contentLoaded"]})}if(a.cf.polyfill){if(a.setup.hide==="all"){a.toggle("off")}if(a.setup.hide!=="none"){a.setup.timeOutHandler=n.setTimeout(function e(){a.toggle("on");a.events.dispatch("timeout",{delay:a.setup.timeout})},a.setup.timeout)}if(t.readyState==="loading"){t.addEventListener("DOMContentLoaded",y,{once:true,passive:true})}else{y()}}else{a.events.dispatch("tearDown",{});n.Hyphenopoly=null}if(a.cacheFeatureTests){r.setItem("Hyphenopoly_Loader",JSON.stringify(a.cf))}})(window,document,Hyphenopoly,Object);