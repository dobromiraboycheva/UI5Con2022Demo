sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","./CalculationBuilderItem","./CalculationBuilderExpression","./CalculationBuilderInput","./CalculationBuilderFunction","sap/m/OverflowToolbar","sap/m/OverflowToolbarToggleButton","sap/m/OverflowToolbarButton","sap/m/ToolbarSpacer","sap/m/Title","sap/m/MessageBox","sap/base/Log","sap/base/util/uid","sap/ui/core/library","sap/m/library","sap/suite/ui/commons/util/FullScreenUtil"],function(t,e,i,r,o,n,s,a,l,u,p,d,c,_,h,f,g,y){"use strict";var E=g.ButtonType;var T=f.TitleLevel;var b=Object.freeze({SHOW_EXPRESSION:"sap-icon://notification-2",EXPAND_VARIABLE:"sap-icon://disconnected",FULL_SCREEN:"sap-icon://full-screen",EXIT_FULL_SCREEN:"sap-icon://exit-full-screen"});var I=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var m=e.CalculationBuilderOperatorType,x=e.CalculationBuilderLogicalOperatorType,C=e.CalculationBuilderComparisonOperatorType,B=e.CalculationBuilderItemType,S=e.CalculationBuilderFunctionType,L=e.CalculationBuilderLayoutType,w=e.CalculationBuilderValidationMode;var A=new RegExp(String.fromCharCode(160),"g");var O={abs:{key:"ABS",title:"ABS - Absolute Value",allowed:true},round:{key:"Round",title:"Round",template:["",",",""],allowed:true},roundup:{key:"RoundUp",title:"Round Up",template:["",",",""],allowed:true},rounddown:{key:"RoundDown",title:"Round Down",template:["",",",""],allowed:true},sqrt:{key:"SQRT",title:"SQRT",allowed:true},case:{key:"Case",title:"Case",description:'CASE ( "When" Expression "Then" Expression "Else" Expression )',template:["",",","",",",""]},ndiv0:{key:"NDIV0",title:"NDIV0"},nodim:{key:"NODIM",title:"NODIM",description:"NODIM ( Variable )"},sumct:{key:"SUMCT",title:"SUMCT",description:"SUMGT ( Variable )"},sumgt:{key:"SUMGT",title:"SUMGT",description:"SUMGT ( Variable )"},sumrt:{key:"SUMRT",title:"SUMRT",description:"SUMRT ( Variable )"}};var V=i.extend("sap.suite.ui.commons.CalculationBuilder",{metadata:{library:"sap.suite.ui.commons",properties:{expression:{type:"string",group:"Misc",defaultValue:null},title:{type:"string",group:"Misc",defaultValue:null},showToolbar:{type:"boolean",group:"Misc",defaultValue:true},wrapItemsInExpression:{type:"boolean",group:"Misc",defaultValue:true},layoutType:{type:"string",group:"Misc",defaultValue:"Default"},showInputToolbar:{type:"boolean",group:"Misc",defaultValue:false},readOnly:{type:"boolean",group:"Misc",defaultValue:false},allowComparisonOperators:{type:"boolean",group:"Misc",defaultValue:true},allowLogicalOperators:{type:"boolean",group:"Misc",defaultValue:true},allowSuggestions:{type:"boolean",group:"Misc",defaultValue:true},allowStringConstants:{type:"boolean",group:"Misc",defaultValue:false},allowStringLiterals:{type:"boolean",group:"Misc",defaultValue:false},validationMode:{type:"sap.suite.ui.commons.CalculationBuilderValidationMode",group:"Misc",defaultValue:w.LiveChange},disabledDefaultTokens:{type:"string",group:"Misc",defaultValue:""}},defaultAggregation:"items",aggregations:{items:{type:"sap.suite.ui.commons.CalculationBuilderItem",multiple:true,singularName:"item",bindable:"bindable",forwarding:{idSuffix:"-expression",aggregation:"items",forwardBinding:true}},variables:{type:"sap.suite.ui.commons.CalculationBuilderVariable",multiple:true,singularName:"Variable",forwarding:{idSuffix:"-expression",aggregation:"variables",forwardBinding:true}},functions:{type:"sap.suite.ui.commons.CalculationBuilderFunction",multiple:true,singularName:"Function",forwarding:{idSuffix:"-expression",aggregation:"functions",forwardBinding:true}},operators:{type:"sap.ui.core.Item",multiple:true,singularName:"Operator",forwarding:{idSuffix:"-expression",aggregation:"operators",forwardBinding:true}},groups:{type:"sap.suite.ui.commons.CalculationBuilderGroup",multiple:true,singularName:"Group",forwarding:{idSuffix:"-expression",aggregation:"groups",forwardBinding:true}}},events:{validateFunction:{parameters:{definition:"object",customFunction:"object",result:"sap.suite.ui.commons.CalculationBuilderValidationResult"}},change:{},afterValidation:{}}},renderer:function(t,e){var i=e.getWrapItemsInExpression()?" sapCalculationBuilderWrapItems ":"",r=e.getLayoutType()===L.TextualOnly,o=e._bShowInput||r,n=e._isExpressionVisible(),s=e._isInputVisible(),a=e.getReadOnly();t.write("<div");t.writeControlData(e);t.addClass("sapCalculationBuilder");if(e.getReadOnly()){t.addClass("sapCalculationBuilderReadOnly")}t.writeClasses(e);t.write(">");if(e.getShowToolbar()&&!r){t.renderControl(e.getToolbar())}if(n){e._oExpressionBuilder._bReadOnly=a;t.write('<div class="sapCalculationBuilderInsideWrapper'+i+'">');t.renderControl(e._oExpressionBuilder);t.write("</div>")}if(n&&s){t.write('<div class="sapCalculationBuilderDelimiterLine"></div>')}if(s){e._oInput._bReadOnly=a||e.getLayoutType()===L.VisualTextualReadOnly;t.write("<div");t.addClass("sapCalculationBuilderInputOuterWrapper");if(e._oInput._bReadOnly){t.addClass("sapCalculationBuilderReadOnly")}if(e.getLayoutType()===L.Default||e.getLayoutType()===L.VisualTextualReadOnly){t.addClass("sapCalculationBuilderInputOuterWrapperMargin")}if(!o){t.addClass("sapCalculationBuilderDisplayNone")}t.writeClasses();t.write(">");t.renderControl(e._oInput);t.write("</div>")}t.write("</div>")}});V.prototype.init=function(){this._mDisabledTokens={};this._bShowInput=true;this._oFullScreenContainer=null;this._bIsFullScreen=false;this._oExpressionBuilder=new o(this.getId()+"-expression",{change:function(){this._expressionChanged();this.fireChange()}.bind(this)});this.addDependent(this._oExpressionBuilder);this._oInput=new n(this.getId()+"-input",{change:function(t){var e=t.getParameter("value"),i=this._oInput._stringToItems(e),r=t.getParameter("position");this._oExpressionBuilder._smartRender(i);this._setExpression(this._oInput._convertEmptyHashes(e));if(this.getValidationMode()!==w.FocusOut){this._validateInput(e,r)}else{this._oInput._recreateText({text:e,position:r,errors:this._oExpressionBuilder._aErrors})}this._enableOrDisableExpandAllButton();this.fireChange()}.bind(this)});this.addDependent(this._oInput)};V.prototype._expressionChanged=function(){var t="";this._oExpressionBuilder._aErrors=this._oExpressionBuilder._validateSyntax();t=this._oInput._itemsToString({items:this._oExpressionBuilder.getItems(),errors:this._oExpressionBuilder._aErrors});this._setExpression(t);this.fireAfterValidation();this._oInput._displayError(this._oExpressionBuilder._aErrors.length!==0);this._oExpressionBuilder._printErrors();this._enableOrDisableExpandAllButton()};V.prototype.clone=function(t){var e=i.prototype.clone.apply(this,[t,undefined,{cloneChildren:false,cloneBindings:true}]);return e};V.prototype.onBeforeRendering=function(){this._resetItems();this._createToolbar();this._oExpressionBuilder._createVariablesMap();this._oInput._aVariables=this.getVariables();if(this._bExpressionSet){this._oExpressionBuilder._setItems(this._oInput._stringToItems(this._sExpressionDirectValue))}this._bExpressionSet=false;this._sExpressionDirectValue="";if(!this._isExpressionVisible()){this._oExpressionBuilder._aErrors=this._oExpressionBuilder._validateSyntax()}this._bRendered=false};V.prototype.onAfterRendering=function(){this._setExpression(this._oInput._itemsToString({items:this._oExpressionBuilder.getItems(),errors:this._oExpressionBuilder._aErrors}));this._bRendered=true;this._oInput._displayError(this._oExpressionBuilder._aErrors.length>0)};V.prototype.exit=function(){if(this._oFullScreenUtil){this._oFullScreenUtil.cleanUpFullScreen(this)}};V.prototype.getToolbar=function(){return this._oToolbar};V.prototype.getInputToolbar=function(){return this._oInput&&this._oInput._oInputToolbar};V.prototype.validateParts=function(t){t=t||{};return this._oExpressionBuilder._validateSyntax({items:t.items,from:t.from,to:t.to})};V.prototype.appendError=function(t){this._oExpressionBuilder._aErrors.push(t)};V.prototype.getErrors=function(){return this._oExpressionBuilder._aErrors};V.prototype.validate=function(){this._resetItems();this._oExpressionBuilder._aErrors=this._oExpressionBuilder._validateSyntax();this.updateErrorsDisplay()};V.prototype.updateErrorsDisplay=function(){var t=this._oExpressionBuilder._aErrors;if(this._isInputVisible()){this._oInput._recreateText({errors:t});this._oInput._displayError(t.length>0)}if(this._isExpressionVisible()){this._oExpressionBuilder._printErrors()}};V.prototype.allowFunction=function(t,e){if(!t){return}var i=O[t.toLowerCase()];if(i){i.allowed=e}};V.prototype.updateOrCreateItem=function(t){this._oExpressionBuilder._updateOrCreateItem({key:t})};V.prototype.getErrors=function(){return this._oExpressionBuilder&&this._oExpressionBuilder._aErrors};V.prototype.getAllowStringConstants=function(){_.warning("This function is deprecated, please use getAllowStringLiterals instead");return this.getAllowStringLiterals()};V.prototype.setAllowStringConstants=function(t){_.warning("This function is deprecated, please use setAllowStringLiterals instead");return this.setAllowStringLiterals(t)};V.prototype._resetItems=function(){this.getItems().forEach(function(t){t._reset()})};V.prototype._validateInput=function(t,e){this._oExpressionBuilder._aErrors=this._oExpressionBuilder._validateSyntax();this.fireAfterValidation();this._oInput._recreateText({text:t,position:e,errors:this._oExpressionBuilder._aErrors});this._oExpressionBuilder._printErrors();this._oInput._displayError(this._oExpressionBuilder._aErrors.length>0)};V.prototype._findInArray=function(t,e,i){return e.some(function(e){var r=i?e["get"+i]():e;return r.toLowerCase()===t})};V.prototype._findInItems=function(t,e){t=(t||"").toLowerCase();return e.some(function(e){return e.getKey().toLowerCase()===t})};V.prototype._createErrorText=function(e,i){e=e||this.getErrors();var r="",o=0,n=5;for(var s=0;s<e.length&&o<n;s++){if(e[s].index<0||!t.isNumeric(e[s].index)||!i){o++;r+=e[s].title+"\n"}}return r};V.prototype._getFunctionMap=function(){return O};V.prototype._getFunctionDefinition=function(e){e=(e||"").toLowerCase();return O[e]||t.grep(this.getFunctions(),function(t){return t.getKey().toLowerCase()===e})[0]};V.prototype._getFunctionDescription=function(t){var e;if(t.description){return t.description}e=I.getText("CALCULATION_BUILDER_EXPRESSION_TITLE");if(t.template){var i=(t.key||"")+" ( ";t.template.forEach(function(t){i+=(t?t:e)+" "});return i+")"}return(t.key||"")+" ( "+e+" )"};V.prototype._getFunctionTemplateItems=function(t){if(!t){return[]}var e=t instanceof s?B.CustomFunction:B.Function;return e===B.Function?t.template||[]:this._convertToTemplate(t.getItems())};V.prototype._getFunctionAllowParametersCount=function(t){var e=this._getFunctionTemplateItems(this._getFunctionDefinition(t)),i=e.join("");return(i.match(/,/g)||[]).length+1};V.prototype._convertToTemplate=function(t){return t.map(function(t){return t.getKey()})};V.prototype._isOperator=function(t,e){e=e!==false;t=(t||"").toLowerCase();if(!this._isTokenAllowed(t)){return false}return this._findInArray(t,Object.keys(m))||e&&this.getAllowLogicalOperators()&&this._findInArray(t,Object.keys(x))||this.getAllowComparisonOperators()&&this._findInArray(t,Object.keys(C))};V.prototype._isFunction=function(t){return this._isTokenAllowed(t)&&this._findInArray(t,Object.keys(S))};V.prototype._isCustomOperator=function(t){return this._findInItems(t,this.getOperators())};V.prototype._isStringLiteral=function(t){return t&&t.length>=2&&t[0]==='"'&&t[t.length-1]==='"'};V.prototype._getType=function(t){t=(t||"").toLowerCase();if(!t){return B.Empty}if(this._isOperator(t)){return B.Operator}if(this._isCustomOperator(t)){return B.CustomOperator}if(this._findInArray(t,this.getVariables(),"Key")){return B.Variable}if(this._isFunction(t)){return B.Function}if(this._findInArray(t,this.getFunctions(),"Key")){return B.CustomFunction}if(this.getAllowStringLiterals()&&this._isStringLiteral(t)){return B.Literal}if(!isNaN(t)){return B.Literal}return B.Error};V.prototype._createToolbar=function(){if(this._oToolbar){this._oShowInputButton&&this._oShowInputButton.setVisible(this._isInputVisible());this._oToolbarTitle.setText(this.getTitle());this._oToolbarTitle.setVisible(!!this.getTitle());return}this._oToolbarTitle=new d({titleStyle:T.H4,text:this.getTitle(),visible:!!this.getTitle()});this._oToolbar=new a(this.getId()+"-toolbar",{content:[this._oToolbarTitle,new p]}).addStyleClass("sapCalculationBuilderToolbar");this._oShowInputButton=new l({type:E.Transparent,icon:b.SHOW_EXPRESSION,tooltip:I.getText("CALCULATION_BUILDER_TOGGLE_EXPRESSION_BUTTON"),pressed:true,press:function(){this.$().find(".sapCalculationBuilderInputOuterWrapper").toggle();this._bShowInput=!this._bShowInput}.bind(this)});this._oToolbar.addContent(this._oShowInputButton);this._oToolbar.addContent(this._getExpandAllVariablesButton());this._oToolbar.addContent(new l({type:E.Transparent,icon:b.FULL_SCREEN,tooltip:I.getText("CALCULATION_BUILDER_ENTER_FULL_SCREEN_BUTTON"),press:function(t){var e=t.getSource();this._toggleFullScreen(e);e.setTooltip(this._bIsFullScreen?I.getText("CALCULATION_BUILDER_EXIT_FULL_SCREEN_BUTTON"):I.getText("CALCULATION_BUILDER_ENTER_FULL_SCREEN_BUTTON"));e.setIcon(this._bIsFullScreen?b.EXIT_FULL_SCREEN:b.FULL_SCREEN)}.bind(this)}));this.addDependent(this._oToolbar)};V.prototype._getExpandAllVariablesButton=function(){if(!this._oExpandAllVariablesButton){this._oExpandAllVariablesButton=new u({type:E.Transparent,icon:b.EXPAND_VARIABLE,tooltip:I.getText("CALCULATION_BUILDER_EXPAND_ALL_BUTTON"),press:function(t){c.show(I.getText("CALCULATION_BUILDER_EXPAND_ALL_MESSAGE_TEXT"),{icon:c.Icon.WARNING,title:I.getText("CALCULATION_BUILDER_EXPAND_ALL_MESSAGE_TITLE"),actions:[c.Action.OK,c.Action.CANCEL],onClose:function(t){if(t===c.Action.OK){this._oExpressionBuilder._expandAllVariables()}}.bind(this)})}.bind(this)})}return this._oExpandAllVariablesButton};V.prototype._enableOrDisableExpandAllButton=function(){var t=this.getReadOnly()||this.getLayoutType()===L.VisualTextualReadOnly,e=this._getExpandAllVariablesButton().$();if(e[0]){this._getExpandAllVariablesButton().setEnabled(!t&&this.getItems().some(function(t){return t._isVariable()&&t.isExpandable()}))}};V.prototype.setExpression=function(t){this.setProperty("expression",t);this._sExpressionDirectValue=t;if(this._bRendered||this._sExpressionDirectValue){this._bExpressionSet=true}this._oInput._setupAriaLabel();return this};V.prototype.getExpression=function(){if(this._bExpressionSet){return this._sExpressionDirectValue}return this._oInput._itemsToString({createInputText:false,items:this.getItems()})};V.prototype._setExpression=function(t){if(t){t=t.replace(A," ")}this.setProperty("expression",t,true);this._oInput._setupAriaLabel()};V.prototype._toggleFullScreen=function(t){this._oFullScreenButton=t;this._bIsFullScreen=!this._bIsFullScreen;if(!this._oFullScreenUtil){this._oFullScreenUtil=y}this._oFullScreenUtil.toggleFullScreen(this,this._bIsFullScreen,this._oFullScreenButton,this._toggleFullScreen)};V.prototype._getGroupMap=function(){return this._oExpressionBuilder._mGroups};V.prototype._isExpressionVisible=function(){return this.getLayoutType()!==L.TextualOnly};V.prototype._isInputVisible=function(){return this.getLayoutType()!==L.VisualOnly};V.prototype._createFunctionObject=function(t){if(!t){return null}return t instanceof s?{key:t.getKey(),title:t._getLabel(),description:this._getFunctionDescription({key:t.getKey(),description:t.getDescription(),template:this._convertToTemplate(t.getItems())}),type:B.CustomFunction,functionObject:t}:{key:t.key,title:t.title,description:this._getFunctionDescription(t),type:B.Function,functionObject:t}};V.prototype._getAllFunctions=function(){var t=[];Object.keys(O).forEach(function(e){if(O[e].allowed&&this._isTokenAllowed(e)){t.push(this._createFunctionObject(O[e]))}}.bind(this));this.getFunctions().forEach(function(e){t.push(this._createFunctionObject(e))}.bind(this));return t.sort(function(t,e){if(t.title<e.title){return-1}else{return 1}})};V.prototype._isTokenAllowed=function(t){return!this._mDisabledTokens[(t||"").toLowerCase()]};V.prototype.setDisabledDefaultTokens=function(t){this._mDisabledTokens={};this.setProperty("disabledDefaultTokens",t);if(t){var e=t.split(";");e.forEach(function(t){if(t){this._mDisabledTokens[t.toLowerCase()]=1}}.bind(this))}return this};return V});