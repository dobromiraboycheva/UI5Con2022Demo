sap.ui.define(["sap/ui/thirdparty/jquery","./library","./CalculationBuilderItem","sap/ui/core/Control","sap/ui/core/Popup","sap/ui/core/delegate/ItemNavigation","sap/m/MessageBox","sap/m/OverflowToolbar","sap/m/OverflowToolbarToggleButton","sap/m/OverflowToolbarButton","sap/m/ToolbarSpacer","sap/m/Title","sap/m/Button","sap/m/FlexBox","sap/m/HBox","sap/m/VBox","sap/m/library","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/m/StepInput","sap/m/Input","sap/m/Page","sap/m/List","sap/m/StandardListItem","sap/m/NavContainer","sap/m/SearchField","sap/m/Label","sap/m/Panel","sap/m/ResponsivePopover","sap/m/Toolbar","sap/m/MessageStrip","./CalculationBuilderValidationResult","sap/suite/ui/commons/ControlProxy","sap/ui/core/Icon","sap/ui/core/library","sap/ui/thirdparty/jqueryui/jquery-ui-core","sap/ui/thirdparty/jqueryui/jquery-ui-widget","sap/ui/thirdparty/jqueryui/jquery-ui-mouse","sap/ui/thirdparty/jqueryui/jquery-ui-draggable","sap/ui/thirdparty/jqueryui/jquery-ui-droppable","sap/ui/thirdparty/jqueryui/jquery-ui-selectable"],function(e,t,i,r,n,s,a,o,l,u,p,c,d,_,h,g,f,I,C,m,E,T,v,A,L,y,B,R,b,O,S,N,x,P,D){"use strict";var U=f.PlacementType;var w=f.ListType;var F=f.ListMode;var K=f.InputType;var V=f.FlexAlignItems;var G=f.FlexRendertype;var M=f.ButtonType;var k=D.TextAlign;var j=D.ValueState;var Y=t.CalculationBuilderItemType,$=t.CalculationBuilderOperatorType,X=t.CalculationBuilderComparisonOperatorType,q=t.CalculationBuilderLogicalOperatorType,H=t.CalculationBuilderLayoutType,z=f.FlexDirection;var W=Object.freeze({PAGE_MAIN:"-pagemain",PAGE_OPERATORS:"-pageoperators",PAGE_VARIABLE:"-pagevariable",PAGE_FUNCTIONS:"-pagefunctions",LABEL_LITERALS:"-literalInput-label",INPUT_LITERALS:"-literalInput-field"});var Q=Object.freeze({OPERATORS_CATEGORY:"sap-icon://attachment-html",LITERALS_CATEGORY:"sap-icon://grid",VARIABLES_CATEGORY:"sap-icon://notes",FUNCTIONS_CATEGORY:"sap-icon://chalkboard",DELETE:"sap-icon://delete"});var J=Object.freeze({KEY_PREVIOUS:"previous",KEY_NEXT:"next",MOUSE:"mouse"});var Z="##DEFAULT##";var ee=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var te=r.extend("sap.suite.ui.commons.CalculationBuilderExpression",{metadata:{library:"sap.suite.ui.commons",defaultAggregation:"items",aggregations:{items:{type:"sap.suite.ui.commons.CalculationBuilderItem",multiple:true,singularName:"item",bindable:"bindable"},variables:{type:"sap.suite.ui.commons.CalculationBuilderVariable",multiple:true,singularName:"Variable"},functions:{type:"sap.suite.ui.commons.CalculationBuilderFunction",multiple:true,singularName:"Function"},operators:{type:"sap.ui.core.Item",multiple:true,singularName:"operator"},groups:{type:"sap.suite.ui.commons.CalculationBuilderGroup",multiple:true,singularName:"Group"}},events:{change:{}}},renderer:function(e,t){e.write("<div");e.writeControlData(t);e.addClass("sapCalculationBuilderInner");e.writeClasses(t);e.write(">");e.write(t._renderDelimiter(0));t.getItems().forEach(function(i,r){i._iIndex=r;i._bReadOnly=t._bReadOnly;e.renderControl(i);e.write(t._renderDelimiter(r+1))},this);if(!t._bReadOnly){e.renderControl(t._getNewItem())}e.write('<div class="sapCalculationBuilderSelected"></div>');e.write("</div>");e.write('<div id="'+t.getId()+'-erroricon"  class="sapCalculationBuilderExpressionErrorIcon">');e.renderControl(t._getErrorIcon());e.write("</div>")}});te.prototype.init=function(){this._aErrors=[];this._bAreSelectedItemsDeleting=false;this._bDragging=false;this._bIsCalculationBuilderRendering=false};te.prototype._renderDelimiter=function(e){var t="";t+='<div class="sapCalculationBuilderDelimiter sapCalculationBuilderDroppable" index="'+e+'">';t+='<div class="sapCalculationBuilderDroppableLine"></div>';t+='<div class="sapCalculationBuilderDroppableCircle"></div>';t+='<div class="sapCalculationBuilderDelimiterNewButton">';t+='<span role="presentation" aria-hidden="true" data-sap-ui-icon-content=""'+'class="sapUiIcon sapUiIconMirrorInRTL sapCalculationBuilderDelimiterNewButtonIcon sapCalculationBuilderExpressionSAPFont"></span>';t+="</div>";t+="</div>";return t};te.prototype.onBeforeRendering=function(){this._reset();this._createPopup();this.getParent()._enableOrDisableExpandAllButton();this._aErrors=this._validateSyntax();this._fireAfterValidation();this._bIsCalculationBuilderRendering=true;this._bRendered=false};te.prototype.onAfterRendering=function(){this._bIsCalculationBuilderRendering=false;if(!this._bReadOnly){this._setupDroppable();this._setupSelectable();this._setupNewButtonEvents()}this._setupKeyboard();this._bRendered=true;var e=this.getParent();if(e._bRendered){e._setExpression(e._oInput._itemsToString({items:this.getItems(),errors:this._aErrors}));e._oInput._displayError(this._aErrors.length!==0)}};te.prototype.onsapfocusleave=function(){if(!this._bAreSelectedItemsDeleting){this._deselect()}};te.prototype.onsapenter=function(e){this._handleEnter(e)};te.prototype.onsapspace=function(t){if(e(t.target).hasClass("sapCalculationBuilderItem")){this._handleSpace(t)}};te.prototype.onsappreviousmodifiers=function(e){if(e.ctrlKey){this._handleCtrlPrevious(e)}};te.prototype.onsapnextmodifiers=function(e){if(e.ctrlKey){this._handleCtrlNext(e)}};te.prototype.onsapdelete=function(e){this._handleDelete(e)};te.prototype.exit=function(){if(this._oPopover){this._oPopover.destroy()}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy()}if(this._oErrorIcon){this._oErrorIcon.destroy();this._oErrorIcon=null}};te.prototype._getErrorIcon=function(){if(!this._oErrorIcon){this._oErrorIcon=new P({src:"sap-icon://message-error",useIconTooltip:false,size:"20px"})}return this._oErrorIcon};te.prototype._createPopup=function(){var e={footerButtons:[]};this._createPopoverLayout(e);this._createPopoverFunctionsItems(e);this._createPopoverOperatorsItems(e);this._createPopoverNavContainer(e);this._createPopover(e)};te.prototype._reset=function(){this.getItems().forEach(function(e){e._reset()});if(this._oPopover){this._oPopover.destroy();this._oPopover=null}};te.prototype._createPopoverLayout=function(e){var t=function(e){return new d({text:e,press:this._updateOrCreateItem.bind(this,{type:Y.Operator,key:e})}).addStyleClass("sapUiTinyMarginEnd")}.bind(this);var i=new h({renderType:G.Div,width:"100%"});i.addStyleClass("sapCalculationBuilderItemPopupOperators");i.addStyleClass("sapCalculationBuilderItemPopupOptionItem");Object.keys($).forEach(function(e){if(this.getParent()._isTokenAllowed(e)){var r=t($[e]);if(e===$[","]){this._attachAriaLabelToButton(r,ee.getText("CALCULATION_BUILDER_COMMA_ARIA_LABEL"))}else if(e===$["-"]){this._attachAriaLabelToButton(r,ee.getText("CALCULATION_BUILDER_MINUS_ARIA_LABEL"))}i.addItem(r)}}.bind(this));var r=this._createPopoverLiteralLabelAndInput(e);var n=new g({items:[i,r],alignItems:"Start"});n.addStyleClass("sapCalculationBuilderItemPopupOperatorsAndInputWrapper");e.layout=n.getItems().length>0?n:null};te.prototype._createPopoverLiteralLabelAndInput=function(e){var t=new B({id:this.getId()+W.LABEL_LITERALS,text:ee.getText("CALCULATION_BUILDER_LITERAL_INPUT_LABEL")});var i;if(this.getParent().getAllowStringLiterals()){i=new E({id:this.getId()+W.INPUT_LITERALS,width:"100%",placeholder:ee.getText("CALCULATION_BUILDER_ADD_LITERAL_FIELD_PLACEHOLDER_ANY_STRING"),valueStateText:ee.getText("CALCULATION_BUILDER_ADD_LITERAL_FIELD_PLACEHOLDER_ERROR"),liveChange:function(t){var i=t.getSource(),r=t.getParameter("value"),n=r.indexOf('"')===-1;i.setValueState(n?j.None:j.Error);e.footerButtons.okButton.setEnabled(n)},submit:function(e){this._submitLiteralInput(i)}.bind(this)})}else{i=new m({width:"100%",placeholder:ee.getText("CALCULATION_BUILDER_ADD_LITERAL_FIELD_PLACEHOLDER"),textAlign:k.Right,valueStateText:ee.getText("CALCULATION_BUILDER_ADD_LITERAL_FIELD_ERROR_TEXT"),displayValuePrecision:3,change:function(){e.footerButtons.okButton.setEnabled(true)}});if(i._getInput){var r=i._getInput();if(r){r.attachSubmit(function(e){this._submitLiteralInput(i)},this)}}}i.addAriaLabelledBy(t);e.literalInput=i;var n=new g({renderType:G.Div,items:[t,i],width:"100%"});n.addStyleClass("sapCalculationBuilderItemPopupOptionItem");n.addStyleClass("sapCalculationBuilderItemPopupLiteralLabelAndInput");return n};te.prototype._createPopoverVariablesItems=function(e){if(!e){return[]}var t=[];e.forEach(function(e){var i=new A({title:e._getLabel()});i._calculationBuilderKey=e.getKey();t.push(i)},this);t=t.sort(function(e,t){return e.getTitle().localeCompare(t.getTitle())});var i=new v({mode:F.SingleSelectMaster,selectionChange:function(e){this._updateOrCreateItem({type:Y.Variable,key:e.getParameter("listItem")._calculationBuilderKey})}.bind(this),items:t});this._oSearchField=new y({placeholder:ee.getText("CALCULATION_BUILDER_SEARCH_VARIABLE"),liveChange:function(e){var r=e.getSource().getValue();if(r||r===""){i.removeAllItems();t.forEach(function(e){if(e.getTitle().toLowerCase().indexOf(r.toLowerCase())!==-1){i.addItem(e)}})}}});this._aVariableLists.push(i);return[this._oSearchField,i]};te.prototype._createPopoverFunctionsItems=function(e){var t=this,i=this.getParent();var r=function(e){return new A({title:e.title,description:e.description,type:w.Active,customData:[{key:"functionKey",value:e.key}],press:e.press})};e.functionList=new v({mode:F.SingleSelectMaster,itemPress:function(){this.getSelectedItem().firePress()}});i._getAllFunctions().forEach(function(i){e.functionList.addItem(r({key:i.key,title:i.title,description:i.description,press:t._updateOrCreateItem.bind(t,{key:i.key,type:i.type,functionObject:i.functionObject})}))})};te.prototype._createPopoverOperatorsItems=function(e){var t=this.getParent();var i=function(e,i){var r=[];Object.keys(e).forEach(function(n){var s,a,o=e[n];if(t._isTokenAllowed(n)){if(typeof o==="object"){a=o.getText();s=o.getKey()}else{s=a=o}var l=new d({text:a,press:this._updateOrCreateItem.bind(this,{type:i,key:s})}).addStyleClass("sapCalculationBuilderPopoverOperatorsButton").addStyleClass("sapUiTinyMarginEnd");if(n===X["!="]){this._attachAriaLabelToButton(l,ee.getText("CALCULATION_BUILDER_NOT_EQUAL_ARIA_LABEL"))}r.push(l)}}.bind(this));return r}.bind(this);var r=function(e,t,r){var n=i(t,r);if(n.length>0){return new R({content:[new B({width:"100%",text:e}).addStyleClass("sapUiTinyMarginBottom"),n]})}return null};e.operatorsItems=[];if(this.getParent().getAllowComparisonOperators()){var n=r(ee.getText("CALCULATION_BUILDER_COMPARISON_TITLE_SELECT"),X,Y.Operator);n&&e.operatorsItems.push(n)}if(this.getParent().getAllowLogicalOperators()){var s=r(ee.getText("CALCULATION_BUILDER_LOGICAL_TITLE_SELECT"),q,Y.Operator);s&&e.operatorsItems.push(s)}var a=this.getParent().getOperators();if(a.length>0){e.operatorsItems.push(r(ee.getText("CALCULATION_BUILDER_OPERATORS_TITLE"),a,Y.CustomOperator))}};te.prototype._createPopoverNavContainer=function(e){var t=function(e){var t=o.getPage(e);o.to(t)};var i=function(){var e=new S({type:"Error",showIcon:true}).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd sapUiTinyMarginTop");this._aStrips.push(e);return e}.bind(this);this._aStrips=[];var r=[];var n=this._createPopoverVariablesItems(this._mGroups[Z]);if(n.length>0){r.push(new A({title:ee.getText("CALCULATION_BUILDER_VARIABLES_TITLE"),description:ee.getText("CALCULATION_BUILDER_VARIABLES_CATEGORY_DESCRIPTION"),wrapping:true,icon:Q.VARIABLES_CATEGORY,press:t.bind(this,this.getId()+W.PAGE_VARIABLE),type:w.Active}))}var s=e.functionList.getItems();if(s.length>0){r.push(new A({title:ee.getText("CALCULATION_BUILDER_FUNCTIONS_TITLE"),type:w.Active,description:ee.getText("CALCULATION_BUILDER_FUNCTIONS_CATEGORY_DESCRIPTION"),wrapping:true,icon:Q.FUNCTIONS_CATEGORY,press:t.bind(this,this.getId()+W.PAGE_FUNCTIONS)}))}if(e.operatorsItems.length>0){r.unshift(new A({title:ee.getText("CALCULATION_BUILDER_OPERATORS_TITLE"),type:w.Active,description:ee.getText("CALCULATION_BUILDER_OPERATORS_CATEGORY_DESCRIPTION"),wrapping:true,icon:Q.OPERATORS_CATEGORY,press:t.bind(this,this.getId()+W.PAGE_OPERATORS)}))}this.getGroups().forEach(function(e){r.push(new A({title:e._getTitle(),type:w.Active,description:e.getDescription(),icon:e.getIcon(),press:t.bind(this,this.getId()+e.getKey())}))}.bind(this));var a=new T({id:this.getId()+W.PAGE_MAIN,title:ee.getText("CALCULATION_BUILDER_DIALOG_TITLE"),content:[i(),e.layout,new _({direction:z.Column,items:[new v({items:r})]}).addStyleClass("sapUiSmallMarginBeginEnd").addStyleClass("sapUiTinyMarginTop").addStyleClass("sapCalculationBuilderNavMainPage")]});a.setFooter(this._getPageFooter(a.getId(),e));var o=new L({defaultTransitionName:"show",navigate:function(t){var i=t.getParameters().to;i.setFooter(this._getPageFooter(i.getId(),e))}.bind(this),pages:[a]});if(e.operatorsItems.length>0){o.addPage(new T({id:this.getId()+W.PAGE_OPERATORS,content:[i(),new _({direction:z.Column,items:[e.operatorsItems]}).addStyleClass("sapUiSmallMarginBeginEnd").addStyleClass("sapUiTinyMarginTop")],showNavButton:true,title:ee.getText("CALCULATION_BUILDER_OPERATORS_PAGE_TITLE"),navButtonPress:t.bind(this,this.getId()+W.PAGE_MAIN)}))}if(n.length>0){o.addPage(new T({id:this.getId()+W.PAGE_VARIABLE,content:[i(),new _({direction:z.Column,items:n}).addStyleClass("sapUiSmallMarginBeginEnd").addStyleClass("sapUiTinyMarginTop")],showNavButton:true,title:ee.getText("CALCULATION_BUILDER_VARIABLES_PAGE_TITLE"),navButtonPress:t.bind(this,this.getId()+W.PAGE_MAIN)}))}if(s.length>0){o.addPage(new T({id:this.getId()+W.PAGE_FUNCTIONS,content:[i(),new _({direction:z.Column,items:[e.functionList]}).addStyleClass("sapUiSmallMarginBeginEnd").addStyleClass("sapUiTinyMarginTop")],showNavButton:true,title:ee.getText("CALCULATION_BUILDER_FUNCTIONS_PAGE_TITLE"),navButtonPress:t.bind(this,this.getId()+W.PAGE_MAIN)}))}this.getGroups().forEach(function(e){var r=new T({id:this.getId()+e.getKey(),showNavButton:true,title:e._getTitle(),navButtonPress:t.bind(this,this.getId()+W.PAGE_MAIN),content:i()});var n=e.getCustomView();if(n){var s=new x;s.setAssociation("control",n);r.addContent(s)}else{r.addContent(new _({direction:z.Column,items:this._createPopoverVariablesItems(this._mGroups[e.getKey()])}).addStyleClass("sapUiSmallMarginBeginEnd").addStyleClass("sapUiTinyMarginTop"))}o.addPage(r)}.bind(this));e.navContainer=o};te.prototype._callFunctionFireSelection=function(e){this.getGroups().forEach(function(t){if(t.getCustomView()){t.fireSetSelection({key:e})}})};te.prototype._clearVariableLists=function(){this._aVariableLists.forEach(function(e){var t=e.getSelectedItem();if(t){e.setSelectedItem(t,false)}});this._callFunctionFireSelection()};te.prototype._setVariableListSelection=function(e){for(var t=0;t<this._aVariableLists.length;t++){var i=this._aVariableLists[t],r=this._aVariableLists[t].getItems();for(var n=0;n<r.length;n++){if(r[n]._calculationBuilderKey===e){i.setSelectedItem(r[n],true);return}}}this._callFunctionFireSelection(e)};te.prototype._sanitizeStringLiteral=function(e){if(this.getParent()._isStringLiteral(e)){e=e.substring(1,e.length-1)}return e};te.prototype._clearSearchField=function(){if(this._oSearchField){this._oSearchField.setValue("");this._oSearchField.fireLiveChange()}};te.prototype._createPopover=function(e){var t=function(){var t=this._oCurrentItem,i=e.navContainer.getCurrentPage().getId(),r=e.functionList.getSelectedItem(),n,s,a;var o=this.getParent().getAllowStringLiterals()?"":0;e.literalInput.setValue(o);this._clearVariableLists();this._clearSearchField();if(r){e.functionList.setSelectedItem(r,false)}if(!t){n=this.getId()+W.PAGE_MAIN}else{if(t._isFunction()){a=t.getKey();n=this.getId()+W.PAGE_FUNCTIONS;s=e.functionList.getItems();for(var l=0;l<s.length;l++){var u=s[l].data("functionKey");if((u&&u.toLowerCase())===a.toLowerCase()){e.functionList.setSelectedItem(s[l],true);break}}}else if(t._isLiteral()){var p=this._sanitizeStringLiteral(t.getKey());e.literalInput.setValue(p);e.literalInput.setValueState(j.None);n=this.getId()+W.PAGE_MAIN}else if(t._isVariable()){this._setVariableListSelection(t.getKey());var c=t._oVariable||t.getVariable(),d=c&&c.getGroup()||W.PAGE_VARIABLE;n=this.getId()+d}else if(t._isSecondaryOperator()){n=this.getId()+W.PAGE_OPERATORS}else{n=this.getId()+W.PAGE_MAIN}}if(n!==i){if(n!==this.getId()+W.PAGE_MAIN){e.navContainer.backToPage(this.getId()+W.PAGE_MAIN)}e.navContainer.to(e.navContainer.getPage(n),"show")}else{e.navContainer.getCurrentPage().setFooter(this._getPageFooter(i,e))}var _=this._oCurrentItem&&this._oCurrentItem._getItemError(),h=_&&" "+_.title;this._aStrips.forEach(function(e){e.setVisible(!!_);e.setText(h?ee.getText("CALCULATION_BUILDER_INCORRECT_SYNTAX")+h:"")})}.bind(this);this._oPopover=new b({showHeader:false,resizable:true,placement:U.PreferredBottomOrFlip,contentWidth:"400px",contentHeight:"450px",content:[e.navContainer],beforeOpen:t,afterClose:function(){this._bDragging=false;this._clearNewButtonPositions()}.bind(this)})};te.prototype._submitLiteralInput=function(t){var i=t.getValue();if(this.getParent()&&this.getParent().getAllowStringLiterals()&&!e.isNumeric(i)){i='"'+i+'"'}this._updateOrCreateItem({type:Y.Literal,key:i});t.setValueState(j.None)};te.prototype._getPageFooter=function(e,t){var i=false,r=false,n=false;if(this._oCurrentItem&&!this._oCurrentItem._bIsNew){r=true;n=this._oCurrentItem._isLiteral()}i=t.literalInput.getValueState()===j.None&&e===this.getId()+W.PAGE_MAIN&&n;t.footerButtons.okButton=new d({enabled:i,text:ee.getText("CALCULATION_BUILDER_CONFIRM_BUTTON"),press:function(e){this._submitLiteralInput(t.literalInput)}.bind(this)});t.footerButtons.deleteButton=new d({enabled:r,text:ee.getText("CALCULATION_BUILDER_DELETE_BUTTON"),press:this._deleteItem.bind(this)});t.footerButtons.closeButton=new d({text:ee.getText("CALCULATION_BUILDER_CLOSE_BUTTON"),press:this._instantClose.bind(this)});return new O({content:[new p,t.footerButtons.okButton,t.footerButtons.deleteButton,t.footerButtons.closeButton]})};te.prototype._insertFunctionItems=function(e,t){var i=function(t){e.push(t)};if(t&&t.length>0){t.forEach(function(e){i(e)})}else{i("")}i(")")};te.prototype._updateOrCreateItem=function(e){var t=!this._oCurrentItem||this._oCurrentItem._bIsNew,i=this._oCurrentItem&&!this._oCurrentItem.getKey(),r=this.getParent(),n=e.functionObject,s=this.getItems();var a=function(){var t=e.type===Y.Function?n.template:r._convertToTemplate(n.getItems());this._insertFunctionItems(u,t)}.bind(this);var o=function(){var e=isNaN(this._iCurrentIndex)?this.getItems().length:this._iCurrentIndex,t=this._getKeys();this._smartRender(t.slice(0,e).concat(u,t.slice(e)))}.bind(this);var l=function(){for(var e=0;e<s.length;e++){if(s[e]===this._oCurrentItem){return e+1}}return null}.bind(this);if(t){var u=[e.key];if(n){a()}o()}else{this._oCurrentItem.setKey(e.key);if(e.type){this._oCurrentItem._sType=e.type}if(i&&n){var u=[];this._iCurrentIndex=l();a();o()}}this._instantClose();this._fireChange()};te.prototype._expandAllVariables=function(){this.getItems().forEach(function(e){if(e.isExpandable()){e._expandVariable(false)}});this._fireChange()};te.prototype._handleDelete=function(e){if(this._isEmptySelected()){return}this._bAreSelectedItemsDeleting=true;a.show(ee.getText("CALCULATION_BUILDER_DELETE_MESSAGE_TEXT"),{icon:a.Icon.WARNING,title:ee.getText("CALCULATION_BUILDER_DELETE_MESSAGE_TITLE"),actions:[a.Action.YES,a.Action.CANCEL],onClose:function(e){if(e===a.Action.YES){var t=this.$().find(".sapCalculationBuilderSelected .sapCalculationBuilderItem"),i=t.length,r=t.first(),n=sap.ui.getCore().byId(r.attr("id"));if(n){var s=this._getKeys();s.splice(n._iIndex,i);this._smartRender(s);this._fireChange()}}this._bAreSelectedItemsDeleting=false}.bind(this)})};te.prototype._handleEnter=function(t){var i=e(t.target),r;if(this._oItemNavigation&&!this._bReadOnly){if(i.hasClass("sapCalculationBuilderNewItem")){r=this._getNewItem();if(r){r._buttonPress(t)}}else if(i.hasClass("sapCalculationBuilderItem")){r=this._getItemById(i[0].id);if(r){r._buttonPress(t)}}else if(i.hasClass("sapCalculationBuilderItemExpandButton")){r=this._getItemById(i.closest(".sapCalculationBuilderItem")[0].id);if(r){r._expandButtonPress(t)}}}};te.prototype._createVariablesMap=function(){this._mGroups={};this._aVariableLists=[];this.getVariables().forEach(function(e){var t=e.getGroup()||Z;if(!this._mGroups[t]){this._mGroups[t]=[]}this._mGroups[t].push(e)}.bind(this))};te.prototype._handleSpace=function(e){this._selectItem(e.target)};te.prototype._handleCtrlNext=function(e){this._moveItems(J.KEY_NEXT)};te.prototype._handleCtrlPrevious=function(e){this._moveItems(J.KEY_PREVIOUS)};te.prototype._getVariableByKey=function(e){var t=this.getVariables();if(!e){return null}e=e.toLowerCase();for(var i=0;i<t.length;i++){if(t[i].getKey().toLowerCase()===e){return t[i]}}return null};te.prototype.setTitle=function(e){var t=this._oToolbarTitle;if(t){t.setText(e);t.setVisible(!!e)}this.setProperty("title",e)};te.prototype._getKeys=function(){return this.getItems().map(function(e){return e.getKey()})};te.prototype._deleteItem=function(){var e=this._getKeys();e.splice(this._oCurrentItem._iIndex,1);this._smartRender(e);this._instantClose();this._fireChange()};te.prototype._openDialog=function(e){this._oCurrentItem=e.currentItem;this._iCurrentIndex=e.index;this._oPopover.openBy(e.opener)};te.prototype._setupDroppable=function(t){var i=this;t=t||this.$().find(".sapCalculationBuilderDroppable");t.droppable({scope:i.getId()+"-scope",tolerance:"pointer",activeClass:"sapCalculationBuilderDroppableActive",hoverClass:"sapCalculationBuilderDroppableActive",drop:function(t,r){if(!r.draggable.hasClass("sapCalculationBuilderSelected")){i._selectItem(r.draggable[0])}i._moveItems(J.MOUSE,parseInt(e(this).attr("index"),10));i._bDragging=false},over:function(e,t){i._bDragging=true}})};te.prototype._clearNewButtonPositions=function(){var e=this.$();e.find(".sapCalculationBuilderDelimiterNewButton").hide(200);e.find(".sapCalculationBuilderItem").animate({left:0},300)};te.prototype._setupNewButtonEvents=function(){var t=13,i=300;var r=this.$().find(".sapCalculationBuilderDelimiter[data-events!='bound']"),n=this.$().find(".sapCalculationBuilderDelimiterNewButton[data-events!='bound']"),s=this,a,o;var l=function(e,t){e.prev().animate({left:-t},i);e.next().animate({left:t},i)};n.on("click",function(t){var i=e(this),r=parseInt(i.parent().attr("index"),10);i.css("opacity",1);s._oCurrentItem=null;s._iCurrentIndex=r;s._openDialog({opener:this,index:r})});n.attr("data-events","bound");r.on("mouseover",function(i){var r=e(this);if(!s._bDragging&&!s._oPopover.isOpen()){a=true;o=setTimeout(function(){if(a){a=false;l(r,t);r.find(".sapCalculationBuilderDelimiterNewButton").show(200)}},400)}});r.on("mouseout",function(t){var i=e(this).find(".sapCalculationBuilderDelimiterNewButton"),r=e(this);if(t.target===i[0]&&t.relatedTarget===r[0]){return}a=false;clearTimeout(o);if(s._bDragging||s._oPopover.isOpen()){return}if(!i.is(":hover")){l(r,0);i.hide(200)}});r.attr("data-events","bound")};te.prototype._setupSelectable=function(){this.$().selectable({cancel:".sapCalculationBuilderCancelSelectable",distance:5,start:function(){this._deselect();this._instantClose()}.bind(this),stop:function(){this._selectItems(this.$().find(".sapCalculationBuilderItem.ui-selected"))}.bind(this)})};te.prototype._selectItemsTo=function(t){var i=e(t.next(".sapCalculationBuilderDelimiter")[0]),r=i.attr("index")-1,n=this.$(),s,a,o,l,u;if(t.parent().hasClass("sapCalculationBuilderSelected")||this._isEmptySelected()){this._selectItem(t);return}if(r>this._iLastSelectedIndex){s=this._iFirstSelectedIndex;a=r+1}else{s=r;a=this._iLastSelectedIndex+1}this._deselect();l=n.find('.sapCalculationBuilderDelimiter[index="'+s+'"]');u=n.find('.sapCalculationBuilderDelimiter[index="'+a+'"]');o=l.nextUntil(u,".sapCalculationBuilderItem");this._selectItems(o)};te.prototype._selectItems=function(e){for(var t=0;t<e.length;t++){this._selectItem(e[t])}};te.prototype._selectItem=function(t){var i=this.$().find(".sapCalculationBuilderSelected"),r=e(t),n=e(r.next(".sapCalculationBuilderDelimiter")[0]),s=i[0].children.length,a=n.attr("index")-1,o=true;if(!this._oItemNavigation||!this._getItemById(r[0].id)||this._bReadOnly){return}if(s===0){this._iFirstSelectedIndex=a;this._iLastSelectedIndex=a}else{if(r.parent().hasClass("sapCalculationBuilderSelected")){if(this._iFirstSelectedIndex===a){this._iFirstSelectedIndex++;this._deselectItem(r,false)}else if(this._iLastSelectedIndex===a){this._iLastSelectedIndex--;this._deselectItem(r,true)}else{this._deselect()}this._setCorrectFocus();return}if(this._iFirstSelectedIndex-a===1){this._iFirstSelectedIndex=a;o=false}else if(a-this._iLastSelectedIndex===1){this._iLastSelectedIndex=a;o=true}else{this._iFirstSelectedIndex=a;this._iLastSelectedIndex=a;this._deselect()}}var l=this.$();if(this._isEmptySelected()){i.detach().insertBefore(r);i.draggable({revert:"invalid",cursor:"move",axis:"x",scope:this.getId()+"-scope",helper:function(e){var t=i.clone();t.removeClass("sapCalculationBuilderSelected");t.addClass("sapCalculationBuilderDraggingSelectedClone");return t},start:function(){i.addClass("sapCalculationBuilderDragging");l.find(".sapCalculationBuilderItemContent").css("cursor","move")},stop:function(){i.removeClass("sapCalculationBuilderDragging");l.find(".sapCalculationBuilderItemContent").css("cursor","pointer")}})}if(o){r.detach().appendTo(i);n.detach().appendTo(i)}else{n.detach().prependTo(i);r.detach().prependTo(i)}if(r.hasClass("sapCalculationBuilderItem")){r.draggable("disable");r.addClass("ui-selected")}this._setCorrectFocus()};te.prototype._isEmptySelected=function(){var e=this.$().find(".sapCalculationBuilderSelected");if(e){return e.is(":empty")}return true};te.prototype._deselectItem=function(t,i){var r=this.$().find(".sapCalculationBuilderSelected"),n=e(t.next(".sapCalculationBuilderDelimiter")[0]);if(!t.hasClass("ui-selected")){return}if(i){n.detach().insertAfter(r);t.detach().insertAfter(r)}else{t.detach().insertBefore(r);n.detach().insertBefore(r)}t.draggable("enable");t.removeClass("ui-selected")};te.prototype._deselect=function(){var t=this.$().find(".sapCalculationBuilderSelected");if(this._isEmptySelected()){return}this.$().find(".sapCalculationBuilderSelected .ui-selected").removeClass("ui-selected");t.children().each(function(){var i=e(this);if(i.hasClass("sapCalculationBuilderItem")){i.draggable("enable")}i.detach().insertBefore(t)})};te.prototype._setupKeyboard=function(){var e=this.getDomRef(),t=[];this.getItems().forEach(function(e){t.push(e.getFocusDomRef());if(e.isExpandable()){t.push(e.$("expandbutton"))}});t.push(this._getNewItem().getFocusDomRef());if(!this._oItemNavigation){this._oItemNavigation=new s;this.addDelegate(this._oItemNavigation)}this._oItemNavigation.setRootDomRef(e);this._oItemNavigation.setItemDomRefs(t);this._oItemNavigation.setCycling(true);this._oItemNavigation.setPageSize(250)};te.prototype._setCorrectFocus=function(){e(this._oItemNavigation.getFocusedDomRef()).focus()};te.prototype._getItemById=function(e){return this.getItems().filter(function(t){return t.getId()===e})[0]};te.prototype._getNewItem=function(){if(!this._oNewItem){this._oNewItem=new i;this._oNewItem._bIsNew=true;this._oNewItem.setParent(this,null,true)}return this._oNewItem};te.prototype._instantClose=function(){var e=this._oPopover.getAggregation("_popup");if(e&&e.oPopup&&e.oPopup.close){e.oPopup.close(0);this._setCorrectFocus()}};te.prototype._attachAriaLabelToButton=function(e,t){e.addEventDelegate({onAfterRendering:function(e){e.srcControl.$("content").attr("aria-label",t)}})};te.prototype._printErrors=function(){this.getItems().forEach(function(e){var t=e._getItemError(),i=e.$(),r=!!t?"addClass":"removeClass";i[r]("sapCalculationBuilderItemErrorSyntax")});if(this.getParent().getLayoutType()===H.VisualOnly){this._showErrorIcon()}};te.prototype._validateSyntax=function(t){var i=function(){var e=this.getItems()[I],t=e.getKey();return!e._isOperator()||t==="("||t==="+"||t==="-"||t.toLowerCase()==="not"}.bind(this);var r=function(){var e=this.getItems(),t=e[C-1];return!t._isOperator()||t.getKey()===")"}.bind(this);var n=function(e){var t=e.getKey().toLowerCase();if(e._isOperator()){return t==="not"||t==="("||t===")"?t:"#op#"}return e._isFunction()?"#fun#":"#col#"};var s=function(e){return{index:v,item:e,items:[],text:e.getKey()+(e._isFunction()?"(":"")}};var a=function(e){var t=1,i=v;v++;for(;v<c.length;v++){var r=c[v],n=r.getKey(),o=s(r);e.items.push(o);switch(n){case")":t--;break;case"(":t++;break;case",":t=1;break}if(r._isFunction()){a(o);e.text+=o.text}else{e.text+=n}if(t===0){return e}}T.push({index:i,title:ee.getText("CALCULATION_BUILDER_CLOSING_BRACKET_ERROR_TEXT")});return e};var o=function(t){var i=this.getParent()._getFunctionAllowParametersCount(t.item.getKey()),r=[],n=[];t.items.forEach(function(e){if(e.item._isComma()){r.push(n);n=[]}else{n.push(e)}});if(n.length>0&&n[n.length-1].text===")"){n.pop()}r.push(n);if(r.length!==i){T.push({index:t.index,title:ee.getText(r.length<i?"CALCULATION_BUILDER_TOO_LITTLE_PARAMETERS":"CALCULATION_BUILDER_TOO_MANY_PARAMETERS")})}if(r.length>0){r.forEach(function(i){if(i.length>0){e.merge(T,this._validateSyntax({from:i[0].index,to:i[i.length-1].index+1}))}else{T.push({index:t.index,title:ee.getText("CALCULATION_BUILDER_EMPTY_PARAMETER")})}}.bind(this))}}.bind(this);var l=0;var u=function(){var e=h.getKey()==="+"||h.getKey()==="-";if(e){l++;if(l>2){T.push({index:v,title:ee.getText("CALCULATION_BUILDER_SYNTAX_ERROR_TEXT")})}}else{l=0}};var p={"#op#":["(","#col#","#fun#","not","+","-"],"(":["(","+","-","#col#","#fun#","not"],")":["#op#",")"],"#col#":["#op#",")"],"#fun#":["(","+","-","#col#","#fun#"],not:["#col#","#fun#","not","("]};t=t||{};var c=t.items||this.getItems(),d,_,h,g,f,I=t.from||0,C=t.to||c.length,m=I===0&&C===c.length,E=[],T=[];if(c.length>0){if(!i()){T.push({index:I,title:ee.getText("CALCULATION_BUILDER_FIRST_CHAR_ERROR_TEXT")})}if(!r()){T.push({index:C-1,title:ee.getText("CALCULATION_BUILDER_LAST_CHAR_ERROR_TEXT")})}}for(var v=I;v<C;v++){h=c[v];if(h._getType()===Y.Error){T.push({index:v,title:ee.getText("CALCULATION_BUILDER_SYNTAX_ERROR_TEXT")});continue}u();if(!t.skipCustomValidation&&h._isFunction()){var A=h._getCustomFunction(),L=a(s(h));if(A&&!A.getUseDefaultValidation()){var y=new N;this.getParent().fireValidateFunction({definition:L,customFunction:A,result:y});e.merge(T,y.getErrors())}else{o(L)}}if(v<C-1){g=c[v+1];d=n(c[v]);_=n(g);f=g?g.getKey().toLowerCase():"";var B=g._isCustomOperator()||h._isCustomOperator();if(p[d].indexOf(_)===-1&&p[d].indexOf(f)===-1&&!B){var R={index:v+1};if(h._isOperator()&&g._isOperator()){R.title=ee.getText("CALCULATION_BUILDER_BEFORE_OPERATOR_ERROR_TEXT",g.getKey())}else if(!h._isOperator()&&!g._isOperator()){R.title=ee.getText("CALCULATION_BUILDER_BETWEEN_NOT_OPERATORS_ERROR_TEXT",[h.getKey(),g.getKey()])}else if(h.getKey()===")"&&!g._isOperator()){R.title=ee.getText("CALCULATION_BUILDER_AFTER_CLOSING_BRACKET_ERROR_TEXT")}else if(!h._isOperator()&&g.getKey()==="("){R.title=ee.getText("CALCULATION_BUILDER_BEFORE_OPENING_BRACKET_ERROR_TEXT")}else{R.title=ee.getText("CALCULATION_BUILDER_CHAR_ERROR_TEXT")}T.push(R)}}if(h._isFunction()){continue}if(m&&h.getKey()===","){T.push({index:v,title:ee.getText("CALCULATION_BUILDER_WRONG_PARAMETER_MARK")})}if(h._isOperator()&&h.getKey()==="("||h._isFunction()){E.push(v)}if(h._isOperator()&&h.getKey()===")"){if(E.length===0){T.push({index:v,title:ee.getText("CALCULATION_BUILDER_OPENING_BRACKET_ERROR_TEXT")})}else{E.pop()}}}for(v=0;v<E.length;v++){T.push({index:E[v],title:ee.getText("CALCULATION_BUILDER_CLOSING_BRACKET_ERROR_TEXT")})}return T};te.prototype._getType=function(e){return this.getParent()&&this.getParent()._getType(e)};te.prototype._moveItems=function(t,i){var r=[],n=this.$(),s=this.getItems(),a=n.find(".sapCalculationBuilderSelected"),o,l,u,p;if(this._isEmptySelected()){return}p=a.length>1?e(a[0]).children():a.children();if(t===J.KEY_PREVIOUS){l=this._iFirstSelectedIndex-1}else if(t===J.KEY_NEXT){l=this._iLastSelectedIndex+2}else if(t===J.MOUSE){l=i}if(l<0||l===s.length+1){return}o=this.$().find('.sapCalculationBuilderDelimiter[index="'+l+'"]');for(var c=0;c<s.length+1;c++){u=s[c];if(l===c){p.each(function(){var t=e(this),i;if(t.hasClass("sapCalculationBuilderItem")){i=sap.ui.getCore().byId(e(this)[0].id);r.push(i);i._bMovingItem=true;t.draggable("enable")}t.css("left",0+"px");t.detach().insertAfter(o).removeClass("");o=t})}if(u&&!u.$().parent().hasClass("sapCalculationBuilderSelected")&&!u._bMovingItem){r.push(u)}}a.css("left","");n.find(".sapCalculationBuilderDelimiter").each(function(t){e(this).attr("index",t)});this.removeAllAggregation("items",true);r.forEach(function(e,t){e._bMovingItem=false;e._iIndex=t;this.addAggregation("items",e,true)}.bind(this));this._setupKeyboard();this._selectItems(p.filter(function(t,i){return e(i).hasClass("sapCalculationBuilderItem")}));this._fireChange()};te.prototype._fireAfterValidation=function(){this.getParent().fireAfterValidation()};te.prototype._setItems=function(e){this.removeAllAggregation("items",true);(e||[]).forEach(function(e){this.addAggregation("items",this._convertFromNewItem(e),true)}.bind(this))};te.prototype._getKeyFromCreatedItem=function(e){return typeof e==="object"?e.getKey():e};te.prototype._convertFromNewItem=function(e){return typeof e==="object"?e:new i({key:e})};te.prototype._showErrorIcon=function(){var e=this.$("erroricon"),t=this.getParent(),i=t._createErrorText(null,true);if(i){e.show();e.attr("title",t._createErrorText(null,true))}else{e.hide()}};te.prototype._smartRender=function(t){var i="",r=this.$(),n=[],s=this.getItems(),a=s.length;var o=function(e){e=this._convertFromNewItem(e);this.addAggregation("items",e,true);e._iIndex=l;if(r[0]){i+=e._render();i+=this._renderDelimiter(l+1)}e.bOutput=true;n.push(e)}.bind(this);if(!this.getParent()._isExpressionVisible()){this._setItems(t);return}this._bRendered=false;this._bIsCalculationBuilderRendering=true;this._deselect();for(var l=0;l<t.length;l++){var u=s[l],p=t[l],c=typeof p==="object"&&p.getKey?p.getKey():p,d=p._sType?p._sType:"";if(!u){o(t[l])}else if(u.getKey()!==c||u._sType!==d){u.setKey(c,true);u._sType=d;var _=u.$();_[0].innerHTML=u._innerRender();_.attr("class",u._getClass());_.attr("title",u._getTooltip());u._setEvents()}}if(t.length<a){for(var l=t.length;l<s.length;l++){var _=s[l].$();_.next().remove();_.remove();this.removeAggregation("items",s[l],true)}}if(r[0]&&n.length>0){r.find(".sapCalculationBuilderDelimiter").last().after(i);n.forEach(function(e){e._afterRendering()});this._setupDroppable(r.find(".sapCalculationBuilderDroppable").filter(function(){return parseInt(e(this).attr("index"),10)>a}))}this._bRendered=true;this._setupKeyboard();this._setupNewButtonEvents();this._bIsCalculationBuilderRendering=false};te.prototype._fireChange=function(){this.fireEvent("change")};return te});