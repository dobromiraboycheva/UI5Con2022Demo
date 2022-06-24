/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/InvisibleRenderer","sap/ui/thirdparty/jquery"],function(e,t,i){"use strict";return{findDropTargetsAbove:function(e,t){return this._findDropTargets(e,t,this._isAbove)},findDropTargetsBelow:function(e,t){return this._findDropTargets(e,t,this._isBelow)},getItemWrapper:function(e){var i=e.getDomRef(),r;if(i){return i.parentElement}r=document.getElementById(t.createInvisiblePlaceholderId(e));if(r){return r.parentElement}return null},createConfig:function(e,t){return{grid:e,item:t}},_findDropTargets:function(e,t,r){var n=[],o=this.getItemWrapper(t),s=e.getItems().filter(function(e){return r(o,this.getItemWrapper(e))}.bind(this)),u=this.createConfig(e,this._findClosest(t,s),t,r);if(u.item){n.push(u)}else{n=Array.from(document.querySelectorAll(".sapFGridContainer")).filter(function(e){return r(o,e)}).map(function(e){var n=i(e).control(0);var o=this.createConfig(n,this._findClosest(t,n.getItems()),t,r);o.distFromItemToGrid=this._getDistance(t,n,r);return o}.bind(this)).sort(function(e,t){return e.distFromItemToGrid-t.distFromItemToGrid})}return n},_findClosest:function(e,t,i){var r=null,n=Number.POSITIVE_INFINITY;t.forEach(function(t){var o=this._getDistance(e,t,i);if(o<n){r=t;n=o}}.bind(this));return r},_getDistance:function(t,i,r){var n=t.getDomRef().getBoundingClientRect(),o=i.getDomRef().getBoundingClientRect();var s={x:o.left};if(r===this._isAbove){s.y=o.top+o.height}else{s.y=o.top}var u={x:s.x+o.width,y:s.y};var a={x:n.left+n.width/2,y:n.top+n.height/2};var f=(u.x-s.x)*(u.x-s.x)+(u.y-s.y)*(u.y-s.y);var d=((a.x-s.x)*(u.x-s.x)+(a.y-s.y)*(u.y-s.y))/f;var g={};if(d<0){g.x=s.x;g.y=s.y}else if(d>1){g.x=u.x;g.y=u.y}else{g.x=s.x+d*(u.x-s.x);g.y=s.y+d*(u.y-s.y)}var c=g.x-a.x,l=g.y-a.y,p=c*c+l*l;if(p>Number.MAX_SAFE_INTEGER){e.warning("Maximum safe integer value exceeded.",p,"GridContainerUtils")}return p},_isAbove:function(e,t){var i=e.getBoundingClientRect().top,r=t.getBoundingClientRect().top;return r-i<0},_isBelow:function(e,t){var i=e.getBoundingClientRect().top,r=t.getBoundingClientRect().top;return r-i>0}}});