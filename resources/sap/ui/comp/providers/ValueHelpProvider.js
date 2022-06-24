/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/comp/library","sap/m/library","sap/m/List","sap/m/ResponsivePopover","sap/m/StandardListItem","sap/m/Token","sap/m/Table","sap/m/ColumnListItem","sap/m/Label","./BaseValueListProvider","sap/ui/comp/odata/MetadataAnalyser","sap/ui/comp/util/FormatUtil","sap/ui/comp/util/DateTimeUtil","sap/ui/model/json/JSONModel","sap/ui/core/format/DateFormat","sap/ui/Device","sap/ui/model/Sorter","sap/base/util/merge","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/Item","sap/base/strings/capitalize"],function(e,t,i,a,s,l,o,r,n,h,u,p,d,g,c,f,m,y,_,S,D,v){"use strict";var V=t.valuehelpdialog.ValueHelpRangeOperation;var C={DeprecatedCode:"W",RevokedCode:"E",ValidCode:""};var F;var b=u.extend("sap.ui.comp.providers.ValueHelpProvider",{constructor:function(e){if(e){this.preventInitialDataFetchInValueHelpDialog=!!e.preventInitialDataFetchInValueHelpDialog;this.sTitle=e.title;this.bSupportMultiselect=!!e.supportMultiSelect;this.bSupportRanges=!!e.supportRanges;this.bIsSingleIntervalRange=!!e.isSingleIntervalRange;this.bIsUnrestrictedFilter=!!e.isUnrestrictedFilter;this.bTakeOverInputValue=e.takeOverInputValue===false?false:true;this._sScale=e.scale;this._sPrecision=e.precision;this._defaultOperation=e.defaultOperation?e.defaultOperation:null;this.filterBarClass=e.filterBarClass;this._onBeforeOpenValueHelpDialog=e._onBeforeOpenValueHelpDialog||function(){};if(this.bIsSingleIntervalRange){this.bSupportRanges=true}}u.apply(this,arguments);this._onInitialise()}});b.prototype._onInitialise=function(){if(this.oControl.attachValueHelpRequest){this._fVHRequested=function(e){if(!this.bInitialised){return}var t=e.getParameter("_userInputValue");this.oControl=e.getSource();this.bForceTriggerDataRetreival=e.getParameter("fromSuggestions");if(this.bSupportBasicSearch&&(this.bTakeOverInputValue||this.bForceTriggerDataRetreival)&&(t||t==="")){this.sBasicSearchText=t}this._createValueHelpDialog()}.bind(this);this.oControl.attachValueHelpRequest(this._fVHRequested)}};b.prototype._getEntitiesLazy=function(){return sap.ui.getCore().loadLibrary("sap.ui.mdc",{async:true}).then(function(){return new Promise(function(e){sap.ui.require(["sap/ui/mdc/filterbar/vh/CollectiveSearchSelect","sap/ui/comp/valuehelpdialog/ValueHelpDialog"],function(t,i){e([i,t])})})})};b.prototype._createValueHelpDialog=function(){if(!this.bCreated){this.bCreated=true;if(!this._oValueHelpDialogClass||!this._oCollectiveSearchSelectClass){this._getEntitiesLazy().then(this._onValueHelpDialogRequired.bind(this))}else{this._onValueHelpDialogRequired([this._oValueHelpDialogClass,this._oCollectiveSearchSelectClass])}}};b.prototype._getTitle=function(){if(this.sTitle){return this.sTitle}else if(this.oFilterProvider){return this.oFilterProvider._determineFieldLabel(this._fieldViewMetadata)}return""};b.prototype.getValueListAnnotation=function(){var e;if(this._isContextDependent()){e=this.oControl.getBindingContext()&&this.oControl.getBindingContext().getPath()}return this._oMetadataAnalyser.getValueListAnnotationLazy(this._sFullyQualifiedFieldName,e)};b.prototype._onValueHelpDialogRequired=function(e){if(this.bInitialised&&this.bIsContextDependent){this._bValueListRequested=false;return this._loadAnnotation().then(function(){return this._onInitValueHelpDialog(e)}.bind(this))}else{return this._onInitValueHelpDialog(e)}};b.prototype._onInitValueHelpDialog=function(t){this._oValueHelpDialogClass=t[0];this._oCollectiveSearchSelectClass=t[1];var i=this.oControl.getId()+"-valueHelpDialog";this.oValueHelpDialog=new this._oValueHelpDialogClass(i,{stretch:m.system.phone,basicSearchText:this.sBasicSearchText,supportRangesOnly:this.bIsSingleIntervalRange||!this.oPrimaryValueListAnnotation,supportMultiselect:this.bSupportMultiselect,title:this._getTitle(),supportRanges:this.bSupportRanges,displayFormat:this.sDisplayFormat,ok:this._onOK.bind(this),cancel:this._onCancel.bind(this),beforeOpen:function(){this._onBeforeOpenValueHelpDialog({fieldName:this.sFieldName,_switchView:this._switchView.bind(this)})}.bind(this),afterClose:function(){if(this.oPrimaryValueListAnnotation){this._resolveAnnotationData(this.oPrimaryValueListAnnotation)}this.oValueHelpDialog.destroy();this.bCreated=false;if(this.oControl&&this.oControl.focus&&!m.system.phone){this.oControl.focus()}}.bind(this)});if(this.oValueHelpDialog&&this._defaultOperation&&V[this._defaultOperation]){this.oValueHelpDialog.setConditionPanelDefaultOperation(this._defaultOperation)}if(this.oValueHelpDialog._oColSearchBox){this.oValueHelpDialog._oColSearchBox.destroy();this.oValueHelpDialog._oColSearchBox=null}this.oValueHelpDialog._oColSearchBox=new this._oCollectiveSearchSelectClass({visible:false,title:sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("COLLECTIVE_SEARCH_SELECTION_TITLE")}).addStyleClass("sapUiTinyMarginEnd");this.oValueHelpDialog.setProperty("_enhancedExcludeOperations",true);this.oControl.addDependent(this.oValueHelpDialog);this.oValueHelpDialog.suggest(function(e,t){if(this.oPrimaryValueListAnnotation){var i=function(i){e.setShowSuggestion(true);e.setFilterSuggests(false);e._oSuggestProvider=new i({fieldName:t,control:e,model:this.oODataModel,displayFormat:this.sDisplayFormat,resolveInOutParams:false,displayBehaviour:this.sTokenDisplayBehaviour,annotation:this.oPrimaryValueListAnnotation,fieldViewMetadata:this._fieldViewMetadata,maxLength:this._sMaxLength,filterModel:this.oFilterModel,aggregation:"suggestionRows",typeAheadEnabled:true,enableShowTableSuggestionValueHelp:false})}.bind(this);F=sap.ui.require("sap/ui/comp/providers/ValueListProvider");if(!F){sap.ui.require(["sap/ui/comp/providers/ValueListProvider"],i)}else{i(F);return e._oSuggestProvider}return null}}.bind(this));if(this.bIsSingleIntervalRange){this.oValueHelpDialog.setIncludeRangeOperations([V.BT,V.EQ],this._sType);this.oValueHelpDialog.setMaxIncludeRanges(1);this.oValueHelpDialog.setMaxExcludeRanges(0);this.oValueHelpDialog.bIsSingleIntervalRange=this.bIsSingleIntervalRange;this._updateInitialInterval()}else if((this._sType==="date"||this._sType==="time"||this._sType==="datetime")&&!this.bIsUnrestrictedFilter){this.oValueHelpDialog.setIncludeRangeOperations([V.EQ],this._sType);this.oValueHelpDialog.setMaxExcludeRanges(0)}if(this.oControl.$()&&this.oControl.$().closest(".sapUiSizeCompact").length>0){this.oValueHelpDialog.addStyleClass("sapUiSizeCompact")}else if(this.oControl.$()&&this.oControl.$().closest(".sapUiSizeCozy").length>0){this.oValueHelpDialog.addStyleClass("sapUiSizeCozy")}else if(e("body").hasClass("sapUiSizeCompact")){this.oValueHelpDialog.addStyleClass("sapUiSizeCompact")}else{this.oValueHelpDialog.addStyleClass("sapUiSizeCozy")}if(this.bSupportRanges){this.oValueHelpDialog.setRangeKeyFields([{label:this._getTitle(),key:this.sFieldName,typeInstance:this._fieldViewMetadata?this._fieldViewMetadata.ui5Type:null,type:this._sType,formatSettings:this._sType==="numc"?{isDigitSequence:true,maxLength:this._sMaxLength}:Object.assign({},this._oDateFormatSettings,{UTC:false}),scale:this._sScale,precision:this._sPrecision,maxLength:this._sMaxLength,nullable:this._fieldViewMetadata?this._fieldViewMetadata.nullable:false}])}if(!(this.bIsSingleIntervalRange||!this.oPrimaryValueListAnnotation)){this.oValueHelpDialog.setModel(this.oODataModel);this._createAdditionalValueHelpControls();this._createCollectiveSearchControls()}if(this.oControl.getTokens){var a=this.oControl.getTokens();if(a){a=this._adaptTokensFromFilterBar(a);this.oValueHelpDialog.setTokens(a)}}return Promise.resolve().then(this.oValueHelpDialog.open.bind(this.oValueHelpDialog))};b.prototype._isContextDependent=function(){var e,t;if(this.bIsContextDependent===undefined){t=this._oMetadataAnalyser.getPropertyContextByPath(this._sFullyQualifiedFieldName);if(t){e=t.getObject();if(p.hasValueListRelevantQualifiers(e)){this.bIsContextDependent=true}}}return this.bIsContextDependent};b.prototype._adaptTokensFromFilterBar=function(e){var t,i,a,s=e;if(this.oFilterProvider&&e&&this._sType==="time"){s=[];for(var l=0;l<e.length;l++){t=_({},e[l]);i=t.data("range");if(i){i=_({},i);if(i.value1 instanceof Date){a=g.localToUtc(i.value1);i.value1={__edmType:"Edm.Time",ms:a.getTime()}}if(i.value2 instanceof Date){a=g.localToUtc(i.value2);i.value2={__edmType:"Edm.Time",ms:a.getTime()}}t.data("range",i);s.push(t)}}}return s};b.prototype._updateInitialInterval=function(){var e=this.oControl.getValue(),t,i,a,s,l;if(e){t=new o;i={exclude:false,keyField:this.sFieldName};if(this._sType==="numeric"){a=d.parseFilterNumericIntervalData(e);if(a.length==0){a.push(e)}}else if(this._sType==="datetime"){a=d.parseDateTimeOffsetInterval(e);s=f.getDateTimeInstance(Object.assign({},this._oDateFormatSettings,{UTC:false}));l=s.parse(a[0]);a[0]=l?l:new Date(a[0]);if(a.length===2){l=s.parse(a[1]);a[1]=l?l:new Date(a[1])}}else{a=e.split("-")}if(a&&a.length===2){i.operation="BT";i.value1=a[0];i.value2=a[1]}else{i.operation="EQ";i.value1=a[0]}t.data("range",i)}if(t){this.oValueHelpDialog.setTokens([t])}};b.prototype._createCollectiveSearchControls=function(){var e,t=0,i=0,a,s;if(this.additionalAnnotations&&this.additionalAnnotations.length){a=function(e){var t,i,a,s=e.getParameter("key"),l=e.getSource(),o=l&&l.getItems();for(var r=0;r<o.length;r++){a=o[r];if(a.getKey()===s){t=a;break}}if(t){i=t.data("_annotation");if(i){this._triggerAnnotationChange(i)}}}.bind(this);e=new v({key:this.oPrimaryValueListAnnotation.keyField,text:this.oPrimaryValueListAnnotation.valueListTitle});e.data("_annotation",this.oPrimaryValueListAnnotation);this.oValueHelpDialog._oColSearchBox.addItem(e);this.oValueHelpDialog._oColSearchBox.setSelectedItemKey(this.oPrimaryValueListAnnotation.keyField);i=this.additionalAnnotations.length;for(t=0;t<i;t++){s=this.additionalAnnotations[t];e=new v({key:s.qualifier,text:s.valueListTitle});e.data("_annotation",s);this.oValueHelpDialog._oColSearchBox.addItem(e)}this.oValueHelpDialog._oColSearchBox.attachSelect(a);this.oValueHelpDialog._oColSearchBox.setVisible(true)}};b.prototype._triggerAnnotationChange=function(e){this.oValueHelpDialog.resetTableState();this._resolveAnnotationData(e);this._createAdditionalValueHelpControls()};b.prototype._createAdditionalValueHelpControls=function(){var e=null,t=this.filterBarClass;this.oValueHelpDialog.setKey(this.sKey);this.oValueHelpDialog.setKeys(this._aKeys);this.oValueHelpDialog.setDescriptionKey(this.sDescription);this.oValueHelpDialog.setTokenDisplayBehaviour(this.sTokenDisplayBehaviour);var i=new c;i.setData({cols:this._aCols});this.oValueHelpDialog.setModel(i,"columns");if(this.bSupportBasicSearch){e=this.sKey}if(this.oSmartFilterBar){this.oSmartFilterBar._setCollectiveSearch(null);this.oSmartFilterBar.destroy()}if(!t){t=sap.ui.require("sap/ui/comp/smartfilterbar/SmartFilterBar")}this.oSmartFilterBar=new t(this.oValueHelpDialog.getId()+"-smartFilterBar",{entitySet:this.sValueListEntitySetName,basicSearchFieldName:e,enableBasicSearch:this.bSupportBasicSearch,isRunningInValueHelpDialog:true,advancedMode:true,showGoOnFB:!m.system.phone,filterBarExpanded:false,search:this._onFilterBarSearchPressed.bind(this),reset:this._onFilterBarResetPressed.bind(this),filterChange:this._onFilterBarFilterChange.bind(this),initialise:this._onFilterBarInitialise.bind(this)});if(this._oDateFormatSettings){this.oSmartFilterBar.data("dateFormatSettings",this._oDateFormatSettings)}if(this.oPrimaryValueListAnnotation&&this.oPrimaryValueListAnnotation.constParams){this.oSmartFilterBar.data("hiddenFields",Object.keys(this.oPrimaryValueListAnnotation.constParams))}this.oValueHelpDialog.setFilterBar(this.oSmartFilterBar)};b.prototype._onFilterBarFilterChange=function(){if(!this._bIgnoreFilterChange){this.oValueHelpDialog.getTableAsync().then(function(e){e.setShowOverlay(true);this.oValueHelpDialog.TableStateSearchData()}.bind(this))}};b.prototype._expandFilterBar=function(){var e=this.oFilterProvider&&this.oFilterProvider._oAdditionalConfiguration,t=e?e.getControlConfigurationByKey(this._fieldViewMetadata.fieldName):null;if(this.oSmartFilterBar._hasMandatoryFields()){this.oSmartFilterBar.setFilterBarExpanded(true);this.oSmartFilterBar._bShowAllFilters=true;this.oSmartFilterBar.rerenderFilters()}else if(!this.bSupportBasicSearch||this.oFilterProvider&&this.oFilterProvider._getPreventInitialDataFetchInValueHelpDialog(this._fieldViewMetadata,t)){this.oSmartFilterBar.setFilterBarExpanded(true)}};b.prototype._onFilterBarSearchPressed=function(){this._rebindTable()};b.prototype._rebindTable=function(){var e,t,i,a;e=this.oSmartFilterBar.getFilters();a=this.oPrimaryValueListAnnotation.deprecationCodeField;if(a){if(e.length===0||e.length>0&&!this._checkForExistingRevokedFilters(e[0],a)){e.push(new S(a,D.NE,C.RevokedCode))}}t=this.oSmartFilterBar.getParameters()||{};if(this.aSelect&&this.aSelect.length){t["select"]=this.aSelect.toString()}i={path:"/"+this.sValueListEntitySetName,filters:e,parameters:t,events:{dataReceived:function(e){this.oValueHelpDialog.TableStateDataFilled();var t=e.getSource();this.oValueHelpDialog.getTableAsync().then(function(e){if(t&&this.oValueHelpDialog&&this.oValueHelpDialog.isOpen()){var i=t.getLength();if(i){this.oValueHelpDialog.update()}else{this.oValueHelpDialog._updateTitles()}}}.bind(this))}.bind(this)}};this.oValueHelpDialog.getTableAsync().then(function(e){e.setShowOverlay(false);this.oValueHelpDialog.TableStateDataSearching();e.setEnableBusyIndicator(true);if(e instanceof r){var t;if(this.sKey&&this._oMetadataAnalyser){t=this._oMetadataAnalyser.getFieldsByEntitySetName(this.sValueListEntitySetName);for(var a=0;a<t.length;a++){if(t[a].name===this.sKey&&t[a].sortable!==false){i.sorter=new y(this.sKey);break}}}i.factory=function(t,i){var a=e.getModel("columns").getData().cols;return new n({cells:a.map(function(e){var t=e.template;return new h({text:"{"+t+"}"})})})};e.bindItems(i)}else{var s=e.getColumns();for(var a=0;a<s.length;a++){var l=s[a];l._appDefaults=null;if(i&&i.parameters&&i.parameters.custom){var o=i.parameters.custom.search?false:l.getBindingContext("columns").getProperty("sorted");l.setSorted(o)}}s=e.getSortedColumns();if(!s||s.length==0){s=e.getColumns()}for(var a=0;a<s.length;a++){var l=s[a];if(l.getSorted()){if(!i.sorter){i.sorter=[]}i.sorter.push(new y(l.getSortProperty(),l.getSortOrder()==="Descending"))}}e.bindRows(i)}}.bind(this))};b.prototype._checkForExistingRevokedFilters=function(e,t){var i=false;if(e.sPath===t&&e.sOperator===V.EQ&&e.oValue1===C.RevokedCode){i=true}else if(Array.isArray(e.aFilters)){for(var a=0;a<e.aFilters.length;a++){i=this._checkForExistingRevokedFilters(e.aFilters[a],t);if(i){break}}}return i};b.prototype._onFilterBarResetPressed=function(){this._calculateFilterInputData();if(this.oSmartFilterBar){this.oSmartFilterBar.setFilterData(this.mFilterInputData)}};b.prototype._onFilterBarInitialise=function(){var e=null;this._bIgnoreFilterChange=true;this._onFilterBarResetPressed();delete this._bIgnoreFilterChange;if(this.oSmartFilterBar&&this.oSmartFilterBar.getBasicSearchControl){e=this.oSmartFilterBar.getBasicSearchControl();if(e){e.setValue(this.sBasicSearchText);if(m.system.phone&&e.isA("sap.m.SearchField")){e.setShowSearchButton(true)}}}if(!this.preventInitialDataFetchInValueHelpDialog||this.bForceTriggerDataRetreival){this._rebindTable();this.bForceTriggerDataRetreival=false}if(m.system.desktop){this._expandFilterBar()}};b.prototype._onOK=function(e){var t=e.getParameter("_tokensHaveChanged"),i=e.getParameter("tokens"),a,s,l=0,o=[],r=null,n,h={};this._onCancel();if(!t){return}if(this.oControl.isA("sap.m.MultiInput")){this.oControl.setValue("");this.oControl.destroyTokens();this.oControl.setTokens(i);l=i.length;if(l>0){h.type="added";h.addedTokens=i}this.oControl.fireTokenUpdate(h);while(l--){r=i[l].data("row");if(r){o.push(r)}}}else{if(i[0]){if(this.bIsSingleIntervalRange){a=i[0].data("range");if(a){if(this._sType==="datetime"){n=f.getDateTimeInstance(Object.assign({},this._oDateFormatSettings,{UTC:false}));if(typeof a.value1==="string"){a.value1=new Date(a.value1)}if(a.operation==="BT"){if(typeof a.value2==="string"){a.value2=new Date(a.value2)}s=n.format(a.value1)+"-"+n.format(a.value2)}else{s=n.format(a.value1)}}else{if(a.operation==="BT"){s=a.value1+"-"+a.value2}else{s=a.value1}}}}else{s=i[0].getKey()}r=i[0].data("row");if(r){o.push(r)}i[0].destroy()}if(this.sContext==="SmartField"&&this._selectedODataRowHandler){this._selectedODataRowHandler(s,o[0])}this.oControl.setValue(s);if(this.sContext==="SmartFilterBar"&&!this.bIsSingleIntervalRange){var u=o[0]&&o[0][this.sDescription];this.oControl.setValue(d.getFormattedExpressionFromDisplayBehaviour(this.sSingleFieldDisplayBehaviour,s,u));this.oControl.setValueState("None");this.oFilterProvider.oModel.setProperty("/"+this.sFieldName,s);this.oFilterProvider._setSingleInputsTextArrangementFieldData(this.sFieldName,s,u)}this.oControl.fireChange({value:s,validated:true})}if(this.fnAsyncWritePromise){this.fnAsyncWritePromise().then(this._calculateAndSetFilterOutputData.bind(this,o))}else{this._calculateAndSetFilterOutputData(o)}};b.prototype._onCancel=function(){this.oValueHelpDialog.close();this.oValueHelpDialog.setModel(null)};b.prototype._switchView=function(e){if(!(this.oValueHelpDialog&&this.oValueHelpDialog._oColSearchBox)){return}var t=this.oValueHelpDialog._oColSearchBox,i=t.getItems(),a=i.find(function(t){return t.getKey()===e});if(a){this._triggerAnnotationChange(a.data("_annotation"));this.oValueHelpDialog._oColSearchBox.setSelectedItemKey(a.getKey())}};b.prototype.destroy=function(){if(this.oControl&&this.oControl.detachValueHelpRequest){this.oControl.detachValueHelpRequest(this._fVHRequested);this._fVHRequested=null}u.prototype.destroy.apply(this,arguments);if(this.oValueHelpDialog){this.oValueHelpDialog.destroy();this.oValueHelpDialog=null}if(this.oSmartFilterBar){this.oSmartFilterBar.destroy();this.oSmartFilterBar=null}this.sTitle=null};return b});