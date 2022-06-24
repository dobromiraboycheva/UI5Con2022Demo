/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/util/PromiseCache"],function(e){"use strict";var i={};i.addPromise=function(e,i){return this.promiseCache.add(e,i)};i.cancelPromise=function(e,i){return this.promiseCache.cancel(e,i)};i.retrievePromise=function(e,i){return this.promiseCache.retrieve(e,i)};i.retrievePromises=function(){return this.promiseCache.retrieveMany.apply(this.promiseCache,arguments)};i.removePromise=function(e){return this.promiseCache.remove(e)};i.resolvePromise=function(e,i){return this.promiseCache.resolve(e,i)};i.rejectPromise=function(e,i){return this.promiseCache.reject(e,i)};i.exit=function(e){return function(){if(this.promiseCache){this.promiseCache.destroy();this.promiseCache=null}if(e){e.apply(this,arguments)}}};return function(){var r=function(i){return function(){if(this.bIsDestroyed){return undefined}if(!this.promiseCache){this.promiseCache=new e}return i.apply(this,arguments)}};this._addPromise=r(i.addPromise);this._cancelPromise=r(i.cancelPromise);this._removePromise=r(i.removePromise);this._resolvePromise=r(i.resolvePromise);this._rejectPromise=r(i.rejectPromise);this._retrievePromise=r(i.retrievePromise);this._retrievePromises=r(i.retrievePromises);this.exit=i.exit(this.exit)}});