sap.ui.define(["./HistoryItem","sap/base/assert"],function(t,e){"use strict";var i=t.extend("sap.suite.ui.commons.imageeditor.CropEllipseHistoryItem",{constructor:function(i){t.apply(this,arguments);i=i||{};e(typeof i.x==="number","X must be a number.");e(typeof i.y==="number","Y must be a number.");e(typeof i.rx==="number","RX value must be a number.");e(typeof i.ry==="number","RY value must be a number.");e(typeof i.width==="number","Width must be a number.");e(typeof i.height==="number","Height value must be a number.");e(typeof i.oldWidth==="number","Old width value must be a number.");e(typeof i.oldHeight==="number","Old height value must be a number.");this._iX=i.x;this._iY=i.y;this._iRx=i.rx;this._iRy=i.ry;this._iWidth=i.width;this._iHeight=i.height;this._iOldWidth=i.oldWidth;this._iOldHeight=i.oldHeight}});i.prototype.getX=function(){return this._iX};i.prototype.getY=function(){return this._iY};i.prototype.getRx=function(){return this._iRx};i.prototype.getRy=function(){return this._iRy};i.prototype.getWidth=function(){return this._iWidth};i.prototype.getHeight=function(){return this._iHeight};i.prototype.getOldWidth=function(){return this._iOldWidth};i.prototype.getOldHeight=function(){return this._iOldHeight};i.prototype.compare=function(t){var e=["getWidth","getHeight"];return this._compare(t,e)};return i});