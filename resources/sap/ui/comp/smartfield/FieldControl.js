/*
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/smartfield/BindingUtil","sap/ui/model/ParseException","sap/base/strings/capitalize","sap/base/util/isPlainObject"],function(t,e,i,r){"use strict";var o=function(e,i){this._bIsDestroyed=false;this._oBinding=new t;this._oStoredProperties={};this._bVisibleSet=false;this._bEditableSet=false;this._bMandatorySet=false;this._bUomEditableSet=false;this._oStoredBindings={};this._oParent=e;this._oHelper=i;this._oAnnotation=i.oAnnotation};o.prototype.getPropertyNames=function(t){if(t){return["editable","visible"]}return["editable","visible","mandatory"]};o.prototype.getControlFormatters=function(t,e){var r,o,n,a={};if(t&&e){o=e.length;while(o--){n=e[o];r="_get"+i(n);if(this[r]){a[n]=this[r](t,this._oParent.getBindingInfo(n))}}}return a};o.prototype._getEditable=function(t,e,o){if(o===undefined){o="editable"}var n,a=-1,s=-1,p=-1,d=-1,l=this;var f={length:0};if(o==="uomEditable"){this._bUomEditableSet=true}else{this._bEditableSet=true}if(!e){n=this._oParent["get"+i(o)]();this._oStoredProperties[o]=n;this._oStoredBindings.editable=null}else if(this._oStoredBindings.editable===undefined){this._oStoredBindings.editable=e}return{path:function(){var i=[],r,o=0;if(!t.property||!t.property.property){return[""]}r=l._oAnnotation.getFieldControlPath(t.property.property);if(r){i.push(l._toPath(t,r));a=o;o++}if(t.entitySet["sap:updatable-path"]){if(t.toRoleAssociationEndMultiplicity==="1"){i.push(l._toPath(t,t.entitySet["sap:updatable-path"]))}else{i.push(t.entitySet["sap:updatable-path"])}s=o;o++}if(e){p=o;l._oBinding.getBindingParts(e,i,f);o=o+f.length}if(t&&t.navigationPath&&!l._oParent._getEditableForNotExpandedNavigation()){i.push(t.navigationPath);d=o;o++}if(o>0){return i}return[""]},formatter:function h(u,_,y,g){if(l._bIsDestroyed){return false}if(!l._oAnnotation){return false}var b=this||l._oParent;var c;if(b&&typeof b.getBindingContext==="function"){c=b.getBindingContext()}var m=c&&c.getObject(),P=m&&m.__metadata,S=!!(P&&P.created),v=t.property&&t.property.property;if(m&&v){if(S){if(!l._getCreatableStatic(t)){return false}}else if(!l._getUpdatableStatic(t)){return false}}var E=[];if(a>-1){E.push(arguments[a]!==1)}if(s>-1&&(!m||!P||!S)&&arguments[s]!==undefined){E.push(!!arguments[s])}if(p>-1){if(e.formatter){E.push(l._execFormatter(e.formatter,arguments,p,f.length))}else{E.push(!!arguments[p])}}if(d>-1){E.push(!!arguments[d])}if(E.length==0){var B=b&&b.getBinding(o),A=b&&b.getBindingPath(o),C=A==="",I=!!B&&B.isInitial(),M=u==null;if(M&&C){n=l._oParent["get"+i(o)]()}else if(!I&&M){n=true}else if(!I&&!M&&C&&!r(u)){n=u}else{n=l._oParent["get"+i(o)]()}E.push(n)}return l._compare(E,false,true)}}};o.prototype._execFormatter=function(t,e,i,r){var o=[],n;if(i>-1&&r>-1){for(n=0;n<r;n++){o.push(e[i+n])}}return t.apply(this._oParent,o)};o.prototype._getCreatableStatic=function(t){var e=this._oAnnotation.canCreateEntitySet(t.entitySet),i=this._oAnnotation.canCreateProperty(t.property.property),r=t.ignoreInsertRestrictions;return(e||r)&&i};o.prototype._getUpdatableStatic=function(t){return this._oAnnotation.canUpdateEntitySet(t.entitySet)&&this._oAnnotation.canUpdateProperty(t.property.property)};o.prototype._compare=function(t,e,i){var r,o=t.length;for(r=0;r<o;r++){if(t[r]===e){return e}}return i};o.prototype._getVisible=function(t,e,o){if(o===undefined){o="visible"}var n,a=-1,s=-1,p=this;var d={length:0};this._bVisibleSet=true;if(!e){n=this._oParent["get"+i(o)]();this._oStoredProperties[o]=n;this._oStoredBindings.visible=null}else if(this._oStoredBindings.visible===undefined){this._oStoredBindings.visible=e}return{path:function(){var i=[],r,o=0;if(!t.property||!t.property.property){return[""]}r=p._oAnnotation.getUIHiddenPath(t.property.property);if(!r){r=p._oAnnotation.getFieldControlPath(t.property.property)}if(r){i.push(p._toPath(t,r));s=o;o++}if(e){a=o;p._oBinding.getBindingParts(e,i,d);o=o+d.length}if(o>0){return i}return[""]},formatter:function l(f,h){if(p._bIsDestroyed){return false}if(!p._oAnnotation){return false}var u=this||p._oParent;var _=t.property&&t.property.property;if(_&&p._oAnnotation.getVisible(_)==="false"||p._oAnnotation.getUIHiddenPath(_)&&f===true){return false}var y=[];if(s>-1){y.push(arguments[s]!==0);u._fieldControlValue=f}if(a>-1){if(e.formatter){y.push(p._execFormatter(e.formatter,arguments,a,d.length))}else{y.push(!!arguments[a])}}if(y.length==0){var g=u&&u.getBinding(o),b=u&&u.getBindingPath(o),c=b==="",m=!!g&&g.isInitial(),P=f==null,S;if(m&&P&&c){S=n}else if(!m&&P){S=true}else if(!m&&!P&&c&&!r(f)){S=f}else{S=p._oParent["get"+i(o)]()}y.push(S)}return p._compare(y,false,true)}}};o.prototype._getMandatory=function(t,e){var i=-1,r=-1,o=this;var n={length:0};this._bMandatorySet=true;if(!e){this._oStoredProperties.mandatory=this._oParent.getMandatory();this._oStoredBindings.mandatory=null}else if(this._oStoredBindings.mandatory===undefined){this._oStoredBindings.mandatory=e}return{path:function(){var a=[],s,p=0;if(!t.property||!t.property.property){return[""]}s=o._oAnnotation.getFieldControlPath(t.property.property);if(s){a.push(o._toPath(t,s));r=p;p++}if(e){i=p;o._oBinding.getBindingParts(e,a,n);p=p+n.length}if(p>0){return a}return[""]},formatter:function a(s,p){if(o._bIsDestroyed){return true}var d=t.property&&t.property.property,l=[];if(d){if(d.nullable==="false"||o._oAnnotation&&o._oAnnotation.isStaticMandatory(d)){l.push(true)}else if(d.nullable){l.push(false)}}var f=r>-1;if(f){l.push(arguments[r]===7)}var h=i>-1;if(h){if(e.formatter){l.push(o._execFormatter(e.formatter,arguments,i,n.length))}else{l.push(!!arguments[i])}}if(l.length===0||d.nullable==="true"&&!f&&!h){l.push(o._oParent.getMandatory())}return o._compare(l,true,false)}}};o.prototype._toPath=function(t,e){if(t.property.complex){return t.path.replace(t.property.property.name,e)}if(t.navigationPath){return t.navigationPath+"/"+e}return e};o.prototype.getMandatoryCheck=function(t){if(t){switch(t.property.type){case"Edm.DateTimeOffset":case"Edm.DateTime":case"Edm.Time":case"Edm.String":case"Edm.Decimal":case"Edm.Double":case"Edm.Float":case"Edm.Single":case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":case"Edm.Byte":case"Edm.SByte":return function(i,r){var o=i===""||i==null;if(o){var n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("VALUEHELPVALDLG_FIELDMESSAGE");if(this._oAnnotation&&!this._oAnnotation.isNullable(t.property)){throw new e(n)}if(this._oParent.getClientSideMandatoryCheck()&&this._oParent.getMandatory()){throw new e(n)}}}.bind(this)}}};o.prototype.getUOMEditState=function(t){var e,i,r,o=0,n;n=this._oParent.getBindingInfo("editable");e=this._getEditable(t,n);r={model:t.model,path:this._oHelper.getUOMPath(t),entitySet:t.entitySet,entityType:t.entityType,property:{property:t.annotations.uom.property,complex:t.property.complex,typePath:this._oHelper.getUOMTypePath(t)}};i=this._getEditable(r,this._oParent.getBindingInfo("uomEditable"),"uomEditable");return{path:function(){var t=e.path(),r=i.path();if(t[0]===""&&r===""){return[""]}o=t.length;return t.concat(r)},formatter:function t(r,n,a,s){var p=[],d,l,f,h=arguments.length;for(d=0;d<o;d++){p.push(arguments[d])}l=e.formatter.apply(null,p);p=[];for(d=0;d<h;d++){p.push(arguments[d])}for(d=0;d<o;d++){p.shift()}f=i.formatter.apply(null,p);if(!f&&!l){return 0}return 1}}};o.prototype.hasUomEditState=function(t){var e;if(t&&t.annotations&&t.annotations.uom){e=this._oParent.getControlProposal();if(e){if(e.getControlType()==="ObjectNumber"){return true}if(e.getObjectStatus()){return true}}return this._oParent.getProposedControl()==="ObjectNumber"}return false};o.prototype.bindProperties=function(t){var e={propertiesNames:this.getPropertyNames()};t=Object.assign(e,t);var i=t.propertiesNames,r=t.metadata;if(i.length){var o=this.getControlFormatters(r,i);for(var n in o){var a=this._oBinding.fromFormatter(r.model,o[n]);this._oParent.bindProperty(n,a)}}};o.prototype.destroy=function(){if(this._oBinding){this._oBinding.destroy();this._oBinding=null}this._oAnnotation=null;var t=this._oParent;if(t&&!t._bInDestroy){var e=true;for(var r in this._oStoredProperties){t.unbindProperty(r,e);var o="set"+i(r),n=t[o];if(typeof n==="function"){n.call(t,this._oStoredProperties[r])}}if(this._oStoredProperties){if(!this._oStoredProperties.editable&&this._bEditableSet){t.unbindProperty("editable")}if(!this._oStoredProperties.visible&&this._bVisibleSet){t.unbindProperty("visible")}if(!this._oStoredProperties.mandatory&&this._bMandatorySet){t.unbindProperty("mandatory")}if(!this._oStoredProperties.uomEditable&&this._bUomEditableSet){t.unbindProperty("uomEditable")}}if(this._oStoredBindings){if(this._oStoredBindings.editable){t.bindProperty("editable",this._oStoredBindings.editable)}if(this._oStoredBindings.visible){t.bindProperty("visible",this._oStoredBindings.visible)}if(this._oStoredBindings.mandatory){t.bindProperty("mandatory",this._oStoredBindings.mandatory)}if(this._oStoredBindings.uomEditable){t.bindProperty("uomEditable",this._oStoredBindings.uomEditable)}}}this._oStoredProperties=null;this._oStoredBindings=null;this._oParent=null;this._oHelper=null;this._bIsDestroyed=true;this._bEditableSet=false;this._bMandatorySet=false;this._bVisibleSet=false;this._bUomEditableSet=false};return o},true);