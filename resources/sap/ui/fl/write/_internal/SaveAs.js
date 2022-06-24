/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/appVariant/AppVariantFactory","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/ui/fl/write/_internal/appVariant/AppVariantInlineChangeFactory","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/Utils","sap/base/Log","sap/ui/fl/Layer","sap/base/util/includes","sap/base/util/merge","sap/base/util/restricted/_omit","sap/ui/fl/registry/Settings"],function(e,t,r,n,a,i,o,s,c,u,l){"use strict";function p(e){return l.getInstance().then(function(t){if(!e.package&&(e.layer===o.VENDOR||e.layer===o.CUSTOMER_BASE&&!t.isAtoEnabled())){return Promise.reject("Package must be provided or is valid")}if(e.isForSmartBusiness&&(e.package!=="$TMP"&&e.package!=="")&&!e.transport&&!t.isAtoEnabled()){return Promise.reject("Transport must be provided")}if(e.isForSmartBusiness&&e.transport||e.package==="$TMP"){return Promise.resolve({packageName:e.package,transport:e.transport})}return Promise.resolve({packageName:"",transport:""})})}function f(e,t){var r=t.transport?e.setTransportRequest(t.transport):Promise.resolve();return r.then(function(){if(t.packageName){return e.setPackage(t.packageName)}return Promise.resolve()})}function h(e){var t=[];e.forEach(function(e){var n=e.getDefinition();var a={changeType:n.changeType,content:n.content};if(n.texts){a.texts=n.texts}t.push(r.createNew(a))});return Promise.all(t)}function g(e,t){var r={reference:t.getId()};var n=a.createNamespace(r,"changes");e.setNamespace(n);e.setComponent(t.getId())}function m(e,t){var r=[];e.forEach(function(e){e.replaceHostingIdForTextKey(t.getId(),t.getReference(),e.getContent(),e.getTexts());r.push(t.addDescriptorInlineChange(e))});return Promise.all(r)}function v(e){var t=n.getDescriptorFlexControllerInstance(e)._oChangePersistence;if(t){var r=t.getDirtyChanges();r=r.slice();return r}return[]}function A(e){var t=n.getFlexControllerInstance(e)._oChangePersistence;if(t){var r=t.getDirtyChanges();r=r.slice();return r}return[]}function d(e){var t=n.getFlexControllerInstance(e)._oChangePersistence;var r=n.getDescriptorFlexControllerInstance(e)._oChangePersistence;return t===r}function P(e,r,n){var a=[];if(r){v(e).forEach(function(e){if(s(t.getChangeTypes(),e.getDefinition().changeType)){a.push(e)}else{g(e,n)}})}else{A(e).forEach(function(e){g(e,n)});a=v(e)}return a}function _(e){v(e).forEach(function(r){if(s(t.getChangeTypes(),r.getChangeType())){n.getDescriptorFlexControllerInstance(e)._oChangePersistence.deleteChange(r)}})}function y(e,t){if(!e){throw new Error("App variant with ID: "+t.id+"does not exist")}t.package=e.getPackage();t.layer=e.getDefinition().layer;return p(t).then(function(t){return f(e,t)}).then(function(){return e})}var C={saveAs:function(t){var r;var a;var o=false;return e.prepareCreate(t).then(function(e){r=c({},e);return p(t)}).then(function(e){return f(r,e)}).then(function(){o=d(t.selector);var e=P(t.selector,o,r);return h(e)}).then(function(e){return m(e,r)}).then(function(){return r.submit().catch(function(e){e.messageKey="MSG_SAVE_APP_VARIANT_FAILED";throw e})}).then(function(e){a=c({},e);if(o){_(t.selector)}var r=n.getFlexControllerInstance(t.selector);var i=A(t.selector);if(i.length){return r.saveAll(n.getAppComponentForSelector(t.selector),true).catch(function(e){if(o){_(t.selector)}return this.deleteAppVariant({id:t.id}).then(function(){e.messageKey="MSG_COPY_UNSAVED_CHANGES_FAILED";throw e})}.bind(this))}return Promise.resolve()}.bind(this)).then(function(){if(!o){_(t.selector)}return a}).catch(function(e){if(v(t.selector).length){_(t.selector)}i.error("the app variant could not be created.",e.message||e);throw e})},updateAppVariant:function(r){var n;var a;return e.prepareUpdate(u(r,"selector")).catch(function(e){e.messageKey="MSG_LOAD_APP_VARIANT_FAILED";throw e}).then(function(e){if(!e){throw new Error("App variant with ID: "+r.id+"does not exist")}n=c({},e);r.package=n.getPackage();r.layer=n.getDefinition().layer;return p(r)}).then(function(e){return f(n,e)}).then(function(){var e=[];v(r.selector).forEach(function(r){if(s(t.getChangeTypes(),r.getDefinition().changeType)){e.push(r)}});return h(e)}).then(function(e){return m(e,n)}).then(function(){return n.submit().catch(function(e){if(r.isForSmartBusiness){_(r.selector);throw e}e.messageKey="MSG_UPDATE_APP_VARIANT_FAILED";throw e})}).then(function(e){a=c({},e);_(r.selector);return a}).catch(function(e){if(v(r.selector).length){_(r.selector)}i.error("the app variant could not be updated.",e.message||e);throw e})},deleteAppVariant:function(t){return e.prepareDelete(u(t,"selector")).catch(function(e){e.messageKey="MSG_LOAD_APP_VARIANT_FAILED";throw e}).then(function(e){return t.isForSmartBusiness?Promise.resolve(e):y(e,t)}).then(function(e){return e.submit().catch(function(e){if(e==="cancel"){return Promise.reject("cancel")}e.messageKey="MSG_DELETE_APP_VARIANT_FAILED";throw e})}).catch(function(e){if(e==="cancel"){return Promise.reject("cancel")}i.error("the app variant could not be deleted.",e.message||e);throw e})}};return C});