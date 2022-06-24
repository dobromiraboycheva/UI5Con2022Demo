sap.ui.define(["sap/ui/thirdparty/jquery","sap/suite/ui/commons/library","sap/ui/core/Control","sap/ui/core/theming/Parameters","sap/suite/ui/commons/taccount/TAccountPanel","sap/suite/ui/commons/taccount/TAccountGroup","sap/ui/core/format/NumberFormat","sap/ui/core/Core","sap/ui/core/library","./TAccountUtils","sap/ui/thirdparty/bignumber"],function(t,e,i,r,o,a,s,n,u,c,p){"use strict";var l=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var g=i.extend("sap.suite.ui.commons.taccount.TAccountItem",{metadata:{library:"sap.suite.ui.commons",properties:{value:{type:"any",group:"Misc",defaultValue:0},color:{type:"sap.m.ValueCSSColor",group:"Misc",defaultValue:null},group:{type:"string",group:"Misc",defaultValue:""},ariaLabel:{type:"string",group:"Misc",defaultValue:""}},aggregations:{properties:{type:"sap.suite.ui.commons.taccount.TAccountItemProperty",multiple:true,singularName:"property"}},events:{press:{}}},renderer:{apiVersion:2,render:function(t,e){var i=e.getColor(),o=e.getParent()&&e.getParent().getMeasureOfUnit(),a=e._getPanel(),s=c.formatCurrency(e.getValue(),o,a?a.getMaxFractionDigits():0),n=s+" "+o;t.openStart("div",e).attr("tabindex","0");t.class("sapSuiteUiCommonsAccountItem");if(e.getGroup()){t.attr("group",e.getGroup())}t.attr("aria-selected","false");t.attr("aria-setsize",e._indexSize);t.attr("aria-posinset",e._index);t.attr("role","option");t.attr("aria-label",e._getAriaLabel(n));t.openEnd();t.openStart("div").class("sapSuiteUiCommonsAccountColorBar");if(i&&u.CSSColor.isValid(i)){t.style("background-color",i)}else if(u.CSSColor.isValid(r.get(i))){t.style("background-color",r.get(i))}t.openEnd();t.close("div");t.openStart("div").attr("id",e.getId()+"-content").class("sapSuiteUiCommonsAccountContent").openEnd();t.openStart("div").class("sapSuiteUiCommonsAccountItemTitleWrapper").openEnd();t.openStart("span").class("sapSuiteUiCommonsAccountItemTitle").openEnd();t.text(n);t.close("span");t.close("div");t.openStart("div").class("sapSuiteUiCommonsAccountItemProperties").openEnd();e.getProperties().forEach(function(e){t.renderControl(e)});t.close("div");t.close("div");t.close("div")}}});g.prototype.onBeforeRendering=function(){this._prepareProperties()};g.prototype.onAfterRendering=function(){this.$().on("click",this._click.bind(this))};g.prototype._refreshAriaLabel=function(t){this.$().attr("aria-label",this._getAriaLabel())};g.prototype._getAriaLabel=function(t){var e=this.getAriaLabel();if(e){return e}if(!t){var i=this.getParent()&&this.getParent().getMeasureOfUnit(),r=this._getPanel(),o=c.formatCurrency(this.getValue(),i,r?r.getMaxFractionDigits():0),t=o+" "+i}var a=(this._bIsDebit?l.getText("TACCOUNT_DEBIT"):l.getText("TACCOUNT_CREDIT"))+" "+l.getText("TACCOUNT_ITEM");a+=" "+t+" ";this.getProperties().forEach(function(t){if(t.getVisible()){a+=t.getLabel()+":"+t.getValue()+" "}});return a};g.prototype._click=function(){var t=this.fireEvent("press",{},true);if(t){this._highlightItems()}};g.prototype._highlightItems=function(){var e=this.$(),i=this.getGroup(),r=!e.is(".sapSuiteUiCommonsAccountItemSelected, .sapSuiteUiCommonsAccountItemSelectedByGroup"),o=t(".sapSuiteUiCommonsAccountItemSelected");this._setAriaHighlighted(o,false);this._setAriaHighlighted(e,r);o.removeClass("sapSuiteUiCommonsAccountItemSelected");r?e.addClass("sapSuiteUiCommonsAccountItemSelected"):e.removeClass("sapSuiteUiCommonsAccountItemSelected");var s=this._findHighlightParent();if(s){var n=t(".sapSuiteUiCommonsAccountItemSelectedByGroup");n.removeClass("sapSuiteUiCommonsAccountItemSelectedByGroup");this._setAriaHighlighted(n,false);if(i&&r){var u=t(".sapSuiteUiCommonsAccountItem[group="+i+"]");u.addClass("sapSuiteUiCommonsAccountItemSelectedByGroup");var c=this;u.each(function(t,e){var i=sap.ui.getCore().byId(e.id);if(i){c._setAriaHighlighted(i.$(),true);var r=i.getParent();if(r){r.$().addClass("sapSuiteUiCommonsAccountItemSelectedByGroup");var o=r.getParent();if(o instanceof a){o.$().addClass("sapSuiteUiCommonsAccountItemSelectedByGroup")}}}})}}};g.prototype.onsapenter=function(){this._highlightItems()};g.prototype.onsapspace=function(){this._highlightItems()};g.prototype._setAriaHighlighted=function(t,e){t.attr("aria-selected",e);t.attr("aria-label",e?l.getText("COLORED_ITEM_FROM")+" "+this.getGroup():this._getAriaLabel())};g.prototype._findHighlightParent=function(){var t=this.getParent();t=t&&t.getParent();if(t instanceof a){var e=t.getParent();return e instanceof o||t}return null};g.prototype._getPanel=function(){var t=this.getParent();t=t&&t.getParent();if(t instanceof a){var e=t.getParent();if(e instanceof o){return e}}return null};g.prototype._prepareProperties=function(){this._mProperties={};this.getProperties().forEach(function(t){var e=t.getKey();if(e){this._mProperties[e]=t}}.bind(this))};g.prototype.setValue=function(t){var e=new p(t);var i=new p(this.getValue());var r=this._bIsDebit?-1:1;var o=new p(r).times(e.minus(i));var a=o.isGreaterThan(0);this.setProperty("value",t);this.getParent()&&this.getParent()._valueChanged(o,this._bIsDebit&&!a)};return g});