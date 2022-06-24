/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Core","sap/m/library","sap/m/List","sap/m/Popover","sap/m/StandardListItem","sap/m/MultiInput","sap/m/MultiComboBox","sap/m/Select","sap/m/Token","sap/m/Tokenizer","sap/ui/comp/smartfield/SmartField","sap/ui/comp/odata/MetadataAnalyser","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/BindingMode","sap/ui/comp/odata/ODataType","sap/ui/comp/providers/ValueHelpProvider","sap/ui/comp/util/FormatUtil","sap/ui/core/format/DateFormat","sap/ui/comp/smartfilterbar/FilterProvider","sap/base/Log","sap/base/util/deepEqual","sap/ui/comp/library","sap/ui/core/library","sap/ui/core/ResizeHandler","sap/m/Link","sap/m/Text","sap/m/FlexBox","sap/m/HBox","sap/base/util/isEmptyObject","sap/base/security/sanitizeHTML"],function(t,e,i,o,a,n,r,s,h,l,u,p,d,g,_,f,c,y,m,v,T,x,M,b,k,I,C,B,D,S,E){"use strict";var P=M.valuehelpdialog.ValueHelpRangeOperation;var R=M.smartfilterbar.DisplayBehaviour;var F=M.smartfield.TextInEditModeSource;var H=b.ValueState;var V=e.PlacementType;var L="-mInput";var N="-mInputTokenizer";var O="-mInputHBox";var w="-mMoreLink";var A=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");var z=u.extend("sap.ui.comp.smartmultiinput.SmartMultiInput",{metadata:{library:"sap.ui.comp",properties:{supportRanges:{type:"boolean",defaultValue:false},supportMultiSelect:{type:"boolean",defaultValue:true},enableODataSelect:{type:"boolean",defaultValue:false},requestAtLeastFields:{type:"string",defaultValue:""},textSeparator:{type:"string",defaultValue:null},singleTokenMode:{type:"boolean",defaultValue:false}},aggregations:{_initialTokens:{type:"sap.m.Token",multiple:true,visibility:"hidden"}},events:{beforeCreate:{allowPreventDefault:true,parameters:{oData:{type:"object"},mParameters:{type:"object"}}},beforeRemove:{allowPreventDefault:true,parameters:{mParameters:{type:"object"}}},tokenUpdate:{parameters:{type:{type:"string"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}},selectionChange:{parameters:{changedItem:{type:"sap.ui.core.Item"},selected:{type:"boolean"}}},selectionFinish:{parameters:{selectedItems:{type:"sap.ui.core.Item[]"}}}}},renderer:function(t,e){u.getMetadata().getRenderer().render(t,e);if(e._oEmptyDash){var i=e.getTokens().length>0?false:true;e._oEmptyDash.setVisible(i);if(i&&e._oMoreLink){e._oMoreLink.setVisible(false)}}}});z.prototype.getTokens=function(){if(this._isReadMode()&&this._oTokenizer){return this._oTokenizer.getTokens()}else if(this._oMultiComboBox&&this._oMultiComboBox.getAggregation("tokenizer")){return this._oMultiComboBox.getAggregation("tokenizer").getTokens()}else if(this._oMultiInput){return this._oMultiInput.getTokens()}return[]};z.prototype.getValue=function(){return this.getTokens()};z.prototype._createMultiInput=function(){var t=this._createAttributes(),e;if(this._oMultiComboBox){this._oMultiComboBox.destroy();this._oMultiComboBox=null}if(this.getSingleTokenMode()&&!this.getBindingContext()){t["maxTokens"]=1}this._oMultiInput=new n(this.getId()+L,t);this._oMultiInput.attachChange(function(t){this._validateValueOnChange(t.getParameter("value"))},this);if(this.getBindingContext()){this._bindMultiInput()}else{e=this.getAggregation("_initialTokens")||[];e.forEach(function(t){this._oMultiInput.addToken(t)}.bind(this))}this._oMultiInput.attachTokenUpdate(function(t){this._validateValueOnChange(this._oMultiInput.getValue());var e=t.getParameters();delete e.id;if(this.getBinding("value").getBindingMode()!=="TwoWay"||!this.getBindingContext()){if(t.getParameter("removedTokens")){t.getParameter("removedTokens").forEach(function(t){t.destroy()})}}this.fireTokenUpdate(e)},this);var i={control:this._oMultiInput,onCreate:"_onMultiInputCreate",params:{type:{type:this._getType(),property:this._oFactory._oMetaData.property}}};this._initMultiInputValueHelp(i);return i};z.prototype._createMultiComboBox=function(){var t=this._createAttributes();if(this.getSingleTokenMode()&&!this.getBindingContext()){t["width"]="100%";delete t["placeholder"]}this._oMultiComboBox=this.getSingleTokenMode()&&!this.getBindingContext()?new s(this.getId()+"mComboBox",t):new r(this.getId()+"mComboBox",t);if(this.getBindingContext()){this._bindMultiComboBox()}else{this._oMultiInput=this._oMultiComboBox._oTokenizer}if(!this.getSingleTokenMode()){this._oMultiComboBox.attachSelectionChange(function(t){var e=t.getParameters();delete e.id;this.fireSelectionChange(e)},this);this._oMultiComboBox.attachSelectionFinish(function(t){var e=t.getParameters();delete e.id;this.oLocalContext=[];this.fireSelectionFinish(e)},this)}else if(this.getSingleTokenMode()&&!this.getBindingContext()){this._oMultiComboBox.attachChange(function(t){var e=t.getParameters();delete e.id;this.fireSelectionChange(e)},this)}var e={control:this._oMultiComboBox,onCreate:"_onCreate",params:{type:{type:this._getType(),property:this._oFactory._oMetaData.property},valuehelp:{annotation:this._getValueListAnnotation(),aggregation:"items",noDialog:true,noTypeAhead:true}}};return e};z.prototype._createAttributes=function(){var t={width:true,textAlign:true,placeholder:true,tooltip:true,name:true,valueState:true,valueStateText:true};var e=this._oFactory.createAttributes(null,this._oFactory._oMetaData.property,t,{event:"change",parameter:"value"});return e};function W(t){var e=t.getParameter("tokens"),i,o,a=0,r=[],s=null,h;this._onCancel();if(this.oControl instanceof n){this.oControl.setValue("");var l=this.oControl.getTokens();var u=[];var p=[];var d=[];l.forEach(function(t){var i=e.some(function(e){return t.getKey()===e.getKey()});if(!i){p.push(t)}else{var o=e.filter(function(e){return t.getKey()===e.getKey()})[0];t.setText(o.getText());d.push(t)}});e.forEach(function(t){var e=l.some(function(e){return e.getKey()===t.getKey()});if(!e){u.push(t);d.push(t)}});this.oControl.setTokens(d);var g=this.oControl.getParent();if(g.getBindingContext()&&g.getBinding("value").getBindingMode()==="TwoWay"){var _=g._getModel(),f=g._getEntitySetName(),c=_._resolveGroup(f),y=_.getDeferredGroups().indexOf(c.groupId)>=0||_.getDeferredBatchGroups().indexOf(c.groupId)>=0;if(!y&&(p.length||u.length)&&d.length){g.setBusyIndicatorDelay(g.getBusyIndicatorDelay());g.setBusy(true)}}this.oControl.fireTokenUpdate({type:"tokensChanged",removedTokens:p,addedTokens:u});a=e.length;while(a--){s=e[a].data("row");if(s){r.push(s)}}}else{if(e[0]){if(this.bIsSingleIntervalRange){i=e[0].data("range");if(i){if(this._sType==="datetime"){h=m.getDateTimeInstance(Object.assign({},this._oDateFormatSettings,{UTC:false}));if(typeof i.value1==="string"){i.value1=new Date(i.value1)}if(i.operation==="BT"){if(typeof i.value2==="string"){i.value2=new Date(i.value2)}o=h.format(i.value1)+"-"+h.format(i.value2)}else{o=h.format(i.value1)}}else{if(i.operation==="BT"){o=i.value1+"-"+i.value2}else{o=i.value1}}}}else{o=e[0].getKey()}s=e[0].data("row");if(s){r.push(s)}}this.oControl.setValue(o);this.oControl.fireChange({value:o,validated:true})}this._calculateAndSetFilterOutputData(r)}function K(t){var e,i,o,a={};if(t&&this.mOutParams){for(e in this.mOutParams){if(e){i=this.mOutParams[e];if(i!==this.sKey){o=t[i];a[e]=o}}}if(a&&!S(a)){this.fireEvent("valueListChanged",{changes:a})}}}function G(t,e){var i=document.createElement("span");i.style.whiteSpace="nowrap";i.style.maxWidth="fit-content";i.innerHTML=t;i.className="sapMText";e.appendChild(i);var o=e.childNodes;var a=o[o.length-1].offsetWidth;e.removeChild(e.childNodes[o.length-1]);return a}z.prototype._initMultiInputValueHelp=function(t){var e=this._getFilterType(this._oFactory._oMetaData.property.property),i={},o=this._getDateFormatSettings(),a;this._oFactory._getValueHelpDialogTitle(i);if(this._getValueListAnnotation()){t.params.valuehelp={annotation:this._getValueListAnnotation(),aggregation:"suggestionRows",noDialog:false,noTypeAhead:false,supportMultiSelect:this.getSingleTokenMode()?false:this.getSupportMultiSelect(),supportRanges:this.getBindingContext()?false:this.getSupportRanges(),type:e,displayBehaviour:this._getDisplayBehaviour()}}else if(this.getSupportRanges()&&!this.getBindingContext()){a=new c({fieldName:this._getPropertyName(),preventInitialDataFetchInValueHelpDialog:true,model:this.getModel(),control:this._oMultiInput,title:i.dialogtitle,supportMultiSelect:this.getSingleTokenMode()?false:this.getSupportMultiSelect(),supportRanges:true,type:e,dateFormatSettings:o,isUnrestrictedFilter:this._isTimeType(e),displayBehaviour:this._getDisplayBehaviour()});a._onOK=W;a._calculateAndSetODataModelOutputData=K;this._oMultiInput.addValidator(this._validateToken.bind(this))}else{this._oMultiInput.setShowValueHelp(false);this._oMultiInput.addValidator(this._validateToken.bind(this))}};z.prototype._bindMultiInput=function(){var t=this.getBinding("value").getBindingMode();switch(t){case _.OneTime:this._bindMultiInputOneTime();break;case _.OneWay:this._bindMultiInputOneWay();break;case _.TwoWay:default:this._bindMultiInputTwoWay()}};z.prototype._bindMultiInputOneTime=function(){var t=this;this._readNavigationPropertySet().then(function(e){e.results.forEach(function(e){var i=e[t._getPropertyName()];var o=t._getDescriptionFieldName();var a=o?e[o]:"";t._oMultiInput.addToken(t._createToken(i,a))})})};z.prototype._bindMultiInputOneWay=function(){this._bindMultiInputTokens(this._oMultiInput)};z.prototype._bindMultiInputTwoWay=function(){this._bindMultiInputTokens(this._oMultiInput);this._oMultiInput.attachTokenUpdate(function(t){t.getParameter("addedTokens").forEach(this._addToken.bind(this));t.getParameter("removedTokens").forEach(this._removeToken.bind(this))},this)};z.prototype._bindMultiInputTokens=function(t){var e=this._getNavigationPath(),i=this._getSelectExpandParameter();if(!S(i)){t.bindAggregation("tokens",{path:e,parameters:i,factory:this._tokensFactory.bind(this),events:{aggregatedDataStateChange:this._processDataState.bind(this)}})}else{t.bindAggregation("tokens",{path:e,factory:this._tokensFactory.bind(this),events:{aggregatedDataStateChange:this._processDataState.bind(this)}})}};z.prototype._processDataState=function(e){var i=e.getParameter("dataState"),o=this.getBinding("value");if(!i||!i.getChanges().messages){return}if(o&&o.bIsBeingDestroyed){return}var a=i.getMessages();if(a.length){var n=false;var r=a[0];a.forEach(function(t){if(t.getControlIds().indexOf(this.getId())==-1){t.addControlId(this.getId());n=true}}.bind(this));this.setValueState(r.getType());this.setValueStateText(r.getMessage());if(n){t.getMessageManager().getMessageModel().checkUpdate(false,true)}}else{this.setValueState(H.None);this.setValueStateText("")}};z.prototype._getSelectExpandParameter=function(){var t={};if(this.getEnableODataSelect()){t.select=this._addODataSelectParameters()}if(this._oFactory._oMetaData.annotations.text&&this._oFactory._oMetaData.annotations.text.navigationPathHelp){t.expand=this._oFactory._oMetaData.annotations.text.navigationPathHelp}return t};z.prototype._addODataSelectParameters=function(t){var e=this._getPropertyName();if(this._getDescriptionFieldName()){e=e+","+this._getDescriptionFieldName()}if(this.getRequestAtLeastFields()){e=e+","+this.getRequestAtLeastFields()}return e};z.prototype._calculateFieldGroupMetaData=function(){var t,e,i,o;if(this._oFactory._oMeta){e=this._oFactory._oMeta.entitySet;i=this.getModel().getMetaModel().getODataEntitySet(e);o=this.getModel().getMetaModel().getODataEntityType(i.entityType);t={entitySet:i,entityType:o,path:this._getNavigationPath()}}return t};z.prototype._bindMultiComboBox=function(){var t=this.getBinding("value").getBindingMode();switch(t){case _.OneTime:this._bindMultiComboBoxOneTime();break;case _.OneWay:this._bindMultiComboBoxOneWay();break;case _.TwoWay:default:this._bindMultiComboBoxTwoWay()}};z.prototype._bindMultiComboBoxOneTime=function(){var t=this;this._readNavigationPropertySet().then(function(e){var i=e.results.map(function(e){return e[t._getPropertyName()]});t._oMultiComboBox.setSelectedKeys(i)})};z.prototype._bindMultiComboBoxOneWay=function(){this._createAndAttachHelperMultiInput()};z.prototype._bindMultiComboBoxTwoWay=function(){this._createAndAttachHelperMultiInput();this.oLocalContext=[];this._oMultiComboBox.attachSelectionChange(function(t){var e=t.getParameter("selected"),i=t.getParameter("changedItem"),o={},a,n,r;this.setValueState(H.None);this.setValueStateText("");if(e){o[this._getPropertyName()]=i.getKey();r=i.getBindingContext("list")||i.getBindingContext();a=r.getProperty();this._getEntityType().key.propertyRef.forEach(function(t){if(a&&a[t.name]){o[t.name]=a[t.name]}})}else{n=this._oMultiInput.getTokens().filter(function(t){return t.getKey()===i.getKey()})[0]}if(e){this.oLocalContext.push(this._createEntity(o))}else{if(n){this._removeEntity(n.getBindingContext())}else{this.oLocalContext.forEach(function(t,e){if(t.getProperty(this._getPropertyName())===i.getKey()){this._getModel().deleteCreatedEntry(t);this.oLocalContext.splice(e,1)}}.bind(this))}}},this)};z.prototype._readNavigationPropertySet=function(){var t=this;return new Promise(function(e,i){var o=t.getBindingContext(),a=t._getModel(),n=t._getNavigationPath();a.read(n,{context:o,success:function(t){e(t)},error:function(e){t.setValueState(H.Error);t.setValueStateText(e.responseText);i(e)}})})};z.prototype._createAndAttachHelperMultiInput=function(){this._oMultiInput=new n({maxTokens:this.getSingleTokenMode()?1:undefined});this._oMultiInput.setBindingContext(this.getBindingContext());this._oMultiInput.setModel(this._getModel());this._bindMultiInputTokens(this._oMultiInput);var t=this._oMultiInput.getBinding("tokens");function e(){var t=this._oMultiInput.getTokens().map(function(t){return t.getKey()});if(this._oMultiComboBox){this._oMultiComboBox.setSelectedKeys(t)}}e.call(this);t.attachChange(e,this)};z.prototype._getReadTokenList=function(){if(!this.oReadTokenList){this.oReadTokenList=new i;this.addDependent(this.oReadTokenList)}return this.oReadTokenList};z.prototype._getReadTokenListPopover=function(){if(!this.oReadTokenListPopover){this.oReadTokenListPopover=new o({showArrow:true,placement:V.Auto,showHeader:false,contentMinWidth:"auto",content:[this.oReadTokenList]});this.addDependent(this.oReadTokenListPopover)}return this.oReadTokenListPopover};z.prototype._handleNMoreIndicatorPress=function(){var t=this.getTokens();if(!t){return}var e=this._getReadTokenList();var i=this._getReadTokenListPopover();e.removeAllItems();for(var o=0,n=t.length;o<n;o++){var r=t[o],s=new a({title:r.getText()});e.addItem(s)}if(this._oMoreLink.getDomRef()){i.openBy(this._oMoreLink.getDomRef())}};z.prototype._onResize=function(){if(this._isReadMode()&&this._oTokenizer){this._deregisterResizeHandler();this._oTokenizer.setMaxWidth(this.$().width()+"px");this._oTokenizer.setRenderMode("Narrow");this._oTokenizer.scrollToEnd();if(this.getMode()==="display"&&this.getTokens().length>0){this._onDisplayResize()}this._registerResizeHandler()}};z.prototype._onDisplayResize=function(){if(this.getDomRef()&&this.getDomRef().offsetWidth>0){var t=this.getDomRef().clientWidth,e=this._iHiddenLabelsCount?G("999 "+A.getText("POPOVER_DEFINE_MORE_LINKS"),this.getDomRef()):0,i=!this._iHBoxWidth||this._iHBoxWidth+e>t,o=this._iHiddenLabelsCount>0&&this._iHBoxWidth+e+this._iFirstHiddenTokenLength<t;if(i||o){this._oHBox.removeAllItems();this.getTokens().forEach(function(t){this._oHBox.addItem(this._generateDisplayText(t.getText()))}.bind(this))}}};z.prototype.onBeforeRendering=function(){if(u.prototype.onBeforeRendering){u.prototype.onBeforeRendering.apply(this,arguments)}this._deregisterResizeHandler()};z.prototype.onAfterRendering=function(){if(u.prototype.onAfterRendering){u.prototype.onAfterRendering.apply(this,arguments)}if(this.getMode()==="display"&&this.bControlNotRendered){this._oHBox.removeAllItems();this._oMoreLink.setVisible(false);this.getTokens().forEach(function(t){var e=this._generateDisplayText(t.getText());this._oHBox.addItem(e)},this)}this._registerResizeHandler()};z.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){this._iResizeHandlerId=k.register(this,this._onResize.bind(this))}};z.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){k.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};z.prototype._createTokenizer=function(){this._oTokenizer=new l(this.getId()+N,{editable:false,visible:false,width:"100%"});this._oHBox=new D(this.getId()+O);this._oMoreLink=new I(this.getId()+w,{press:this._handleNMoreIndicatorPress.bind(this),ariaLabelledBy:this.getId()+"-label"});this._oEmptyDash=new C({text:"–",visible:true});var t=this._getNavigationPath(),e=this._getSelectExpandParameter();if(this.getBindingContext()){this._bindMultiInputTokens(this._oTokenizer);this._oHBox.bindAggregation("items",{path:t,parameters:e,factory:this._textFactory.bind(this)})}else{this.attachInnerControlsCreated(this._mirrorTokensToDisplayTokenizer,this)}var i=new B({height:"100%",items:[this._oEmptyDash,this._oHBox,this._oMoreLink,this._oTokenizer]});return{control:i,onCreate:"_onCreate"}};z.prototype._textFactory=function(t,e){var i=e.getProperty(this._getPropertyName()),o=i instanceof Date?this._formatValue(i):i.toString(),a=this._getDescriptionFieldName(),n=a?e.getProperty(a):"",r=this._getFormattedText(o,n),s;if(this.getDomRef()){this.bControlNotRendered=false;s=this._generateDisplayText(r)}else{this.bControlNotRendered=true;s=new C({text:r})}if(this._oEmptyDash){this._oEmptyDash.setVisible(false)}return s};z.prototype._generateDisplayText=function(t){var e=this.getDomRef(),i=e.offsetWidth,o=G("999 "+A.getText("POPOVER_DEFINE_MORE_LINKS"),e),a=new C,n,r,s;t=E(t);if(this._oHBox.getItems().length===0){this._iHBoxWidth=0;this._iHiddenLabelsCount=0;this._iFirstHiddenTokenLength=0}this._oHBox.getItems().filter(function(t){return!t.getVisible()}).forEach(function(t){this._oHBox.removeItem(t)}.bind(this));a.setTooltip(t);t=this._iHBoxWidth===0?t:" "+this.getTextSeparator()+" "+t;a.setText(t);var h=G(t,e);this._iHBoxWidth+=h;if(this._iHiddenLabelsCount===0&&this._iHBoxWidth<=i){this._oMoreLink.setVisible(false)}else{while(this._iHBoxWidth&&this._iHBoxWidth>i-o){this._iHiddenLabelsCount+=1;if(this._oHBox.getItems()[0]){this._iFirstHiddenTokenLength=G(this._oHBox.getItems()[0].getText(),e);this._iHBoxWidth-=this._iFirstHiddenTokenLength;this._oHBox.removeItem(0)}else{this._iHBoxWidth-=h;a.setVisible(false)}}if(this._oHBox.getItems().length===0&&this._iHiddenLabelsCount===1&&!a.getVisible()){this._iHiddenLabelsCount=0;this._iHBoxWidth+=h;a.setVisible(true);this._oMoreLink.setVisible(false)}else{if(this._oHBox.getItems().length>0){n=this._oHBox.getItems()[0];n.setText(n.getTooltip());if(this._oHBox.getItems().length-1>0){r=this._oHBox.getItems()[this._oHBox.getItems().length-1];s=" "+this.getTextSeparator()+" "+r.getTooltip();r.setText(s)}a.setText(a.getText()+" "+this.getTextSeparator()+" ")}else{a.setText(a.getTooltip()+" "+this.getTextSeparator()+" ")}this._oMoreLink.setVisible(true);this._oMoreLink.setText(this._iHiddenLabelsCount+" "+A.getText("POPOVER_DEFINE_MORE_LINKS"))}}return a};z.prototype._mirrorTokensToDisplayTokenizer=function(){if(this.getMode()==="display"){var t=this._oMultiInput&&this._oMultiInput.getTokens();this._oTokenizer.removeAllTokens();this._oHBox.removeAllItems();this._oMoreLink.setVisible(false);if(!t){t=this.getAggregation("_initialTokens")||[]}t.forEach(function(t){var e=new h({text:t.getText(),key:t.getKey()});this._oTokenizer.addToken(e);var i=this._generateDisplayText(t.getText());this._oHBox.addItem(i)},this)}};z.prototype.getTextSeparator=function(){var t=this.getProperty("textSeparator");if(t){return t}return A.getText("SMARTMULTIINPUT_SEPARATOR")};z.prototype._tokensFactory=function(t,e){var i;this.setBusy(false);if(this._oFactory){var o=e.getProperty(this._getPropertyName());var a=o instanceof Date?this._formatValue(o):o.toString();var n=this._getDescriptionFieldName();var r=n?e.getProperty(n):"";i=this._createToken(a,r,e)}else{i=new h}return i};z.prototype._createToken=function(t,e,i){var o=this._getFormattedText(t,e);var a;a=new h;a.setKey(t);a.setText(o);return a};z.prototype._addToken=function(t){var e={},i,o,a,n=t.data("row"),r=t.data("range");e[this._getPropertyName()]=t.getKey();if(n){this._getEntityType().key.propertyRef.forEach(function(t){if(n[t.name]){e[t.name]=n[t.name]}});if(this._oFactory._aProviders&&this._oFactory._aProviders[0].mOutParams){var s=this._oFactory._aProviders[0].mOutParams;for(o in s){if(o&&o!==this._getPropertyName()){a=s[o];e[o]=n[a]}}}}if(r){e["range"]=r}this.setValueState(H.None);this.setValueStateText("");i=this._createEntity(e);t.setBindingContext(i)};z.prototype._createEntity=function(t){var e=this._getModel(),i=this._getEntitySetName(),o=e._resolveGroup(i),a=this._getNavigationPath(),n=this.fireBeforeCreate({oData:t,mParameters:o});o.refreshAfterChange=true;o.context=this.getBindingContext();if(n){o.properties=t;var r=e.createEntry(a,o);return r}};z.prototype._removeToken=function(t){this._removeEntity(t.getBindingContext());t.destroy()};z.prototype._removeEntity=function(t){var e=this._getModel(),i=this._getEntitySetName(),o=e._resolveGroup(i),a=this.fireBeforeRemove({mParameters:o});var n=e.getDeferredGroups().indexOf(o.groupId)>=0||e.getDeferredBatchGroups().indexOf(o.groupId)>=0;if(n&&this._entityHasPendingCreateChange(e,t)){e.deleteCreatedEntry(t);a=false}o.refreshAfterChange=true;o.context=t;if(a){var r="";e.remove(r,o)}};z.prototype._entityHasPendingCreateChange=function(t,e){var i=t.getPendingChanges();var o=t.getKey(e);return!!i[o]&&x(i[o],e.getObject())};z.prototype._getEntityKeyProperties=function(t){var e=this._getModel(),i=e.oMetadata._getEntityTypeByPath(t.getPath()),o={};i.key.propertyRef.forEach(function(e){var i=e.name;o[i]=t.getProperty(i)});return o};z.prototype.checkClientError=function(){if(this.getMode()==="display"){return false}return!this._validateMultiInput()};z.prototype.getRangeData=function(){var t=this.getTokens(),e=[];t.forEach(function(t){var i;if(t.data("range")){i=t.data("range")}else{i=this._getDefaultTokenRangeData(t)}e.push(i)},this);return e};z.prototype.setRangeData=function(t){if(!this.getBindingContext()){var e=Array.isArray(t)?t:[t];if(!this._oMultiInput){var i=this.getEditable(),o=this.getEnabled(),a=this.getContextEditable();this.setEditable(true);this.setEnabled(true);this.setContextEditable(true);this._updateInnerControlsIfRequired();this.setEditable(i);this.setEnabled(o);this.setContextEditable(a);this._updateInnerControlsIfRequired()}this._oMultiInput.removeAllTokens();e.forEach(function(t){var e=this._getTokenTextFromRangeData(t);var i=new h({text:e,key:e});i.data("range",t);this._oMultiInput.addToken(i)},this);this._mirrorTokensToDisplayTokenizer()}else{T.warning("setRangeData can only be used without property binding")}};z.prototype._getTokenTextFromRangeData=function(t){var e="";switch(t.operation){case P.EQ:e="="+t.value1;break;case P.GT:e=">"+t.value1;break;case P.GE:e=">="+t.value1;break;case P.LT:e="<"+t.value1;break;case P.LE:e="<="+t.value1;break;case P.Contains:e="*"+t.value1+"*";break;case P.StartsWith:e=t.value1+"*";break;case P.EndsWith:e="*"+t.value1;break;case P.BT:e=t.value1+"...";if(t.value2){e+=t.value2}break;default:e=""}if(t.exclude&&e!==""){e="!("+e+")"}return e};z.prototype._getComputedTextInEditModeSource=function(){var t=this.getTextInEditModeSource();if(this.isPropertyInitial("textInEditModeSource")&&this.getMode()==="edit"){t=F.None}return t};z.prototype.getFilter=function(){var t=[this._getPropertyName()],e={},i=this.getRangeData(),o;e[this._getPropertyName()]={ranges:i,items:[]};o=v.generateFilters(t,e);return o&&o.length===1&&o[0]};z.prototype._getDefaultTokenRangeData=function(t){var e={exclude:false,operation:P.EQ,value1:this._parseValue(t.getKey()),value2:"",keyField:this._getPropertyName()};return e};z.prototype._validateToken=function(t){var e=t.text;var i=this._validateValue(e);if(i){var o=new h({key:e,text:e});if(this.getSupportRanges()){var a=this._getDefaultTokenRangeData(o);o.data("range",a);o.setText("="+e)}return o}};z.prototype._validateMultiInput=function(){if(this._oMultiInput.getValueState()!==H.None){return false}if(this.getRequired()&&this.getTokens().length===0){this.setValueStateText(sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("VALUEHELPVALDLG_FIELDMESSAGE"));this.setValueState(H.Error);return false}else{this.setValueState(H.None);this.setValueStateText("");return true}};z.prototype._validateValueOnChange=function(t){if(t===""){this.setValueState(H.None);this.setValueStateText("");this._validateMultiInput()}else{this._validateValue(t)}};z.prototype._parseValue=function(t){return this._getType().parseValue(t,"string")};z.prototype._formatValue=function(t){return this._getType().formatValue(t,"string")};z.prototype._validateValue=function(t){try{var e=this._parseValue(t);this._getType().validateValue(e);this.setValueState(H.None);this.setValueStateText("");return true}catch(e){this.setValueState(H.Error);this.setValueStateText(e.message);var i={element:this._oMultiInput,property:"value",type:this._getType(),newValue:t,oldValue:null,exception:e,message:e.message};if(e instanceof d){this.fireParseError(i)}else if(e instanceof g){this.fireValidationError(i)}return false}};z.prototype._getModel=function(){if(this._oFactory){return this._oFactory._oModel}};z.prototype._getDateFormatSettings=function(){var t=this.data("dateFormatSettings");if(typeof t==="string"){try{t=JSON.parse(t)}catch(t){}}return t};z.prototype._getNavigationPath=function(){return this._oFactory._oMetaData.navigationPath};z.prototype._getDescriptionFieldName=function(){var t=this._oFactory._oMetaData.annotations.text;if(t){if(t.navigationPathHelp){return t.navigationPathHelp+"/"+t.property.property.name}return t.property.property.name}};z.prototype._getType=function(){if(!this._oType){var t;if(this._isEdmTimeType()){t=this._getDateFormatSettings()}this._oType=this._oFactory._oTypes.getType(this._oFactory._oMetaData.property,t)}return this._oType};z.prototype._isEdmTimeType=function(){var t=["Edm.DateTime","Edm.DateTimeOffset","Edm.Time"];return t.indexOf(this._oFactory._oMetaData.property.property.type)>-1};z.prototype._isTimeType=function(t){var e=["date","datetime","time"];return e.indexOf(t)>-1};z.prototype._getPropertyName=function(){return this._oFactory._oMetaData.property.property.name};z.prototype._getEntitySetName=function(){return this._oFactory._oMetaData.entitySet.name};z.prototype._getEntityType=function(){return this._oFactory._oMetaData.entityType};z.prototype._getValueListAnnotation=function(){return this._oFactory._oMetaData.annotations.valuelist};z.prototype._getDisplayBehaviour=function(){var t=this._oFactory._getDisplayBehaviourConfiguration("defaultInputFieldDisplayBehaviour");if(!t||t===R.auto){t=R.descriptionAndId}return t};z.prototype._getFormattedText=function(t,e){var i=this._getDisplayBehaviour();return E(y.getFormattedExpressionFromDisplayBehaviour(i,t,e))};z.prototype._getFilterType=function(t){if(f.isNumeric(t.type)){return"numeric"}else if(t.type==="Edm.DateTime"&&t["sap:display-format"]==="Date"){return"date"}else if(t.type==="Edm.String"){return"string"}else if(t.type==="Edm.Boolean"){return"boolean"}else if(t.type==="Edm.Time"){return"time"}else if(t.type==="Edm.DateTimeOffset"){return"datetime"}return undefined};z.prototype.setEntitySet=function(){u.prototype.setEntitySet.apply(this,arguments);this.updateBindingContext(false,this._getModel());return this};z.prototype.bindProperty=function(t,e){u.prototype.bindProperty.apply(this,arguments);if(t==="value"){this.updateBindingContext(false,this._getModel())}return this};z.prototype._checkComboBox=function(){var t=this._oFactory._oSelector.checkComboBox();return t&&t.combobox};z.prototype._isReadMode=function(){return!this.getEditable()||!this.getEnabled()||!this.getContextEditable()};function U(){this._onCreate.apply(this,arguments);if(this._aProviders.length>0){this._aProviders[0]._onOK=W;this._aProviders.forEach(function(t){t._calculateAndSetODataModelOutputData=K})}}z.prototype._init=function(){var t=this;u.prototype._init.apply(this,arguments);if(this._oFactory){this._oFactory._createMultiInput=this._createMultiInput.bind(this);this._oFactory._createMultiComboBox=this._createMultiComboBox.bind(this);this._oFactory._createTokenizer=this._createTokenizer.bind(this);this._oFactory._onMultiInputCreate=U;this._oFactory._oSelector.getCreator=function(e){var i=e!==undefined&&e.mode!==undefined?e.mode==="display":t._isReadMode();if(i){return"_createTokenizer"}else if(t._checkComboBox()){return"_createMultiComboBox"}else{return"_createMultiInput"}}}};z.prototype._getEditableForNotExpandedNavigation=function(){return true};z.prototype.exit=function(){u.prototype.exit.apply(this,arguments);this._deregisterResizeHandler();if(this._oMultiInput){this._oMultiInput.destroy()}if(this._oMultiComboBox){this._oMultiComboBox.destroy()}if(this._oTokenizer){this._oTokenizer.destroy()}if(this._oHBox){this._oHBox.destroy()}this._oMultiInput=null;this._oMultiComboBox=null;this._oTokenizer=null;this._oHBox=null};return z});