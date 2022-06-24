/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["./library","sap/suite/ui/commons/util/HtmlElement","sap/ui/core/Icon","sap/m/Button","sap/base/security/encodeXML"],function(e,i,t,s,a){"use strict";var d=e.TimelineAxisOrientation,o=e.TimelineScrollingFadeout;var l={},n=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");l.apiVersion=2;l.render=function(e,i){var t=this._getHtmlModel(i);t.getRenderer().render(e)};l._getHtmlModel=function(e){if(e.getAxisOrientation()===d.Horizontal){return this._getHorizontalTimelineElement(e)}else{return this._getVerticalTimelineElement(e)}};l._getScrollerIcon=function(e,s,d){var o=new i("div"),l="scrollerIcon"+d,n="getScrollerIcon"+d;o.addClass(a("sapSuiteUiCommonsTimelineScrollerIconWrapper sapSuiteUiCommonsTimelineScrollerIconWrapper"+d));e._objects.register(l,function(){return new t({src:"sap-icon://step"})});o.addChild(e._objects[n]());return o};l._setWidthAndHeight=function(e,i){var t=e.getHeight(),s=e.getWidth();if(t&&!e._isVertical()){i.addStyle("height",t)}if(s&&(e._isVertical()||e.getEnableScroll())){i.addStyle("width",s)}};l._getHorizontalTimelineElement=function(e){var t=e.getEnableDoubleSided(),s=e._isLeftAlignment(),a=e._outputItem,d=0,l=true,n,r,m,u,C,p,c=e._isMaxed(),g,S=function(){var e=new i("ul");e.setAttribute("role","listbox");return e};var h=new i("div"),T=new i("div"),_=new i("div"),f=new i("div"),I=new i("div"),U=S(),v=new i("div"),H=S(),b=new i("div"),w=S(),B=new i("div"),A=new i("div"),G=new i("div"),E=new i("div");h.addControlData(e);h.addClass("sapSuiteUiCommonsTimelineH");if(!e.getEnableScroll()){h.addClass("sapSuiteUiCommonsTimelineNoScroll")}if(e._useAutomaticHeight()){h.addClass("sapSuiteUiCommonsTimelineAutomaticLineHeight")}this._addAccessibilityTags(h,e);this._setWidthAndHeight(e,h);if(t){h.addClass("sapSuiteUiCommonsTimelineDblSidedH")}else{h.addClass(s?"sapSuiteUiCommonsTimelineRight":"sapSuiteUiCommonsTimelineLeft")}if(e._isGrouped()){h.addClass("sapSuiteUiCommonsTimelineGrouped")}h.addChild(e._objects.getHeaderBar());e._setMessageBars(h);G.setId(e.getId()+"-contentH-before");h.addChild(G);T.setId(e.getId()+"-contentH");T.addClass("sapSuiteUiCommonsTimelineContentsH");h.addChild(T);E.setId(e.getId()+"-contentH-after");h.addChild(E);_.setId(e.getId()+"-scrollH");_.addClass("sapSuiteUiCommonsTimelineScrollH");T.addChild(_);I.addClass("sapSuiteUiCommonsTimelineHorizontalTopLine");v.addClass("sapSuiteUiCommonsTimelineHorizontalMiddleLine");v.addChild(H);b.addClass("sapSuiteUiCommonsTimelineHorizontalBottomLine");if(t||s){I.addChild(U)}if(t||!s){b.addChild(w)}U.addClass("sapSuiteUiCommonsTimelineHorizontalScrollingLine");w.addClass("sapSuiteUiCommonsTimelineHorizontalScrollingLine");H.addClass("sapSuiteUiCommonsTimelineHorizontalScrollingLine");if(a.length>0){if(e._scrollingFadeout()){h.addChild(B);h.addChild(A);B.addClass("sapSuiteUiCommonsTimelineHorizontalLeftScroller sapSuiteUiCommonsTimelineHorizontalScroller");A.addClass("sapSuiteUiCommonsTimelineHorizontalRightScroller sapSuiteUiCommonsTimelineHorizontalScroller");if(e.getScrollingFadeout()===o.AreaWithButtons){B.addChild(this._getScrollerIcon(e,"_scollerIconLeft","Left"));A.addChild(this._getScrollerIcon(e,"_scollerIconRight","Right"))}}f.addClass("sapSuiteUiCommonsTimelineHorizontalScrollContainer");_.addChild(f);f.addChild(I);f.addChild(v);f.addChild(b);H.addChild(this._getFirstHorizontalDelimiterLine(a[0]));for(var M=0;M<a.length;M++){g=c;n=a[M];r=s?"top":"bottom";m=d%2;u=n.getText()==="GroupHeader";C=a[M+1];p=s?U:w;if(t){p=U;if(!u){p=m?w:U}r=m?"bottom":"top"}if(u){d=0;l=true;r="top";if(g){for(var L=M+1;L<a.length;L++){if(a[L]._isGroupHeader){g=false;break}}}}else if(m){n._isFirstGroupEvenItem=l;l=false}n._index=M;n._orientation="H";n._placementLine=r;p.addChild(n);var x=this._getHorizontalDelimiterLine(e,n,d,C,c&&!C,g);if(x){H.addChild(x)}if(!u){d++}}}else{_.addChild(this._getEmptyTimelineElement(e))}if(e._showMore){H.addChild(this._getShowMoreElement(e))}return h};l._getFirstHorizontalDelimiterLine=function(e){var t=new i("li"),s=new i("div"),a=new i("div"),d=new i("div"),o=e._isGroupHeader;d.addClass("sapSuiteUiCommonsTimelineItemBarH");a.addClass("sapSuiteUiCommonsTimelineItemBarWrapper");a.addChild(d);s.addChild(a);s.addClass("sapSuiteUiCommonsTimelineItemBarDivWrapper");t.addChild(s);t.addClass("sapSuiteUiCommonsTimelineItemFirstBar");if(o){t.addClass(e._isGroupCollapsed()?"sapSuiteUiCommonsTimelineGroupCollapsed":"sapSuiteUiCommonsTimelineGroupExpanded")}return t};l._getHorizontalDelimiterLine=function(e,t,s,d,o,l){var n=s%2,r=t.getText()==="GroupHeader",m=r?"sapSuiteUiCommonsTimelineItemGroupHeaderH":"sapSuiteUiCommonsTimelineItemBaseLength",u="sapSuiteUiCommonsTimelineItemBarH",C=d!=null&&d._isGroupHeader,p=d===null,c=t._getStatusColorClass(),g=new i("li"),S=new i("div"),h=new i("div"),T=new i("div"),_=new i("div"),f=new i("div"),I=new i("div");g.setId(t.getId()+"-line");if(r&&!t._isGroupCollapsed()){g.addStyle("display","none")}if(t._groupID){g.setAttribute("groupid",t._groupID)}if(r){u="sapSuiteUiCommonsTimelineItemGroupHeaderBar";g.setAttribute("nodeType","GroupHeaderBar")}else if(e.getEnableDoubleSided()){if((!C||n)&&!p){m=n?"sapSuiteUiCommonsTimelineItemHOdd":"sapSuiteUiCommonsTimelineItemHEven"}}if(!r&&o||r&&l){g.addClass("sapSuiteUiCommonsTimelineLastItem")}g.addClass(a(m));T.addClass("sapSuiteUiCommonsTimelineItemBarWrapper");h.addClass("sapSuiteUiCommonsTimelineItemBarH");h.addClass(a(u));S.addStyle("display","flex");S.addStyle("height","100%");if(e.getShowIcons()||r){S.addChild(_);if(!r){if(c){_.addClass(a(c))}else{_.addClass("sapSuiteUiCommonsTimelineNoStatus")}_.addClass("sapSuiteUiCommonsTimelineItemIconWrapper")}else{_.addClass("sapSuiteUiCommonsTimelineItemGroupBarIconWrapper")}_.addChild(t._getLineIcon())}else{I.addChild(f);I.addClass("sapSuiteUiCommonsTimelineItemNoIconWrapper");f.addClass("sapSuiteUiCommonsTimelineItemNoIcon");if(c){f.addClass(a(c))}else{f.addClass("sapSuiteUiCommonsTimelineNoStatus")}S.addClass("sapSuiteUiCommonsTimelineItemWrapper");S.addChild(I)}S.addChild(T);T.addChild(h);if(e._collapsedGroups[t._groupID]){if(r){g.addClass("sapSuiteUiCommonsTimelineItemGroupCollapsedBar")}else{g.addStyle("display","none")}}g.addChild(S);return g};l._getVerticalTimelineElement=function(e){var t=new i("div"),s=new i("div"),a=new i("div"),d=new i("div"),l=new i("div"),n=new i("div"),r=new i("div"),m=new i("div"),u=new i("div"),C,p,c,g,S,h,T=function(){var t=new i("ul");t.addClass("sapSuiteUiCommonsTimelineItemUlWrapper");t.setAttribute("role","listbox");t.setAttribute("aria-labelledby",e.getAriaLabelledBy().join(" "),true);return t};t.addControlData(e);t.addClass("sapSuiteUiCommonsTimeline");this._addAccessibilityTags(t,e);n.addClass("sapSuiteUiCommonsTimelineContentWrapper");if(e._isGrouped()){t.addClass("sapSuiteUiCommonsTimelineGrouped")}if(e._scrollingFadeout()){n.addChild(s);n.addChild(a);s.addClass("sapSuiteUiCommonsTimelineTopScroller sapSuiteUiCommonsTimelineVerticalScroller");a.addClass("sapSuiteUiCommonsTimelineBottomScroller sapSuiteUiCommonsTimelineVerticalScroller");if(e.getScrollingFadeout()===o.AreaWithButtons){s.addChild(this._getScrollerIcon(e,"_scollerIconTop","Top"));a.addChild(this._getScrollerIcon(e,"_scrollerIconBottom","Bottom"))}}this._setWidthAndHeight(e,t);t.addChild(e._objects.getHeaderBar());e._setMessageBars(t);if(e.getMessageStrip()!==null&&e.getMessageStrip()!==undefined&&e.getMessageStrip().getText()!==""){t.addChild(e._objects.getMessageStrip())}m.setId(e.getId()+"-content-before");m.setAttribute("tabindex",0);t.addChild(m);t.addChild(n);n.addChild(d);d.setId(e.getId()+"-content");d.setAttribute("data-sap-ui-fastnavgroup","true");d.addClass("sapSuiteUiCommonsTimelineContents");d.addClass("sapSuiteUiCommonsTimelineScrollV");d.addClass("sapSuiteUiCommonsTimelineScroll");u.setId(e.getId()+"-content-after");u.setAttribute("tabindex",0);t.addChild(u);d.addChild(l);l.setId(e.getId()+"-scroll");l.addClass("sapSuiteUiCommonsTimelineScroll");C=T();var _=e._outputItem,f=e._isMaxed();if(_.length>0){l.addChild(C);for(var I=0;I<_.length;I++){h=f;p=_[I];c=_[I+1];g=p._isGroupHeader;p._orientation="V";p._position=e.getAlignment();p._additionalBarClass="";p._index=I;p._isLast=f&&_.length-1===I;if(g){C.setAttribute("groupId",p._groupID)}if(g){for(var U=I+1;U<_.length;U++){S=_[U];if(S._isGroupHeader){if(!S._isGroupCollapsed()&&p._isGroupCollapsed()){p._additionalBarClass="sapSuiteUiCommonsTimelineGroupNextExpanded"}h=false;break}}}p._isLastGroup=h;if(c&&c._isGroupHeader&&!c._isGroupCollapsed()){p._additionalBarClass="sapSuiteUiCommonsTimelineGroupNextExpanded"}if(g&&I!=0){C=T();l.addChild(C)}if(g){C.setAttribute("role","tree")}C.addChild(p)}}else{l.addChild(this._getEmptyTimelineElement(e))}if(e._showMore){r.addClass("sapSuiteUiCommonsTimelineShowMoreWrapper");r.addChild(this._getShowMoreElement(e));l.addChild(r)}return t};l._getEmptyTimelineElement=function(e){var t=new i("div"),s=new i("span");t.addClass("sapSuiteUiCommonsTimelineNoTextWrapper");t.addChild(s);s.addChildEscaped(e.getNoDataText());return t};l._getShowMoreElement=function(e){var t=e._isVertical()?new i("div"):new i("li"),o="sapSuiteUiCommonsTimelineItemGetMoreButtonV",l="sap-icon://drill-down";if(e.getAxisOrientation()===d.Horizontal){l="sap-icon://process";o="sapSuiteUiCommonsTimelineItemGetMoreButtonH"}e._objects.register("moreButton",function(){var i=new s({icon:l,tooltip:n.getText("TIMELINE_MORE"),press:function(){e._loadMore()}});i.addEventDelegate({onAfterRendering:function(){this.$().attr("tabindex",-1)}},i);return i});t.addClass("sapSuiteUiCommonsTimelineItemGetMoreButton");t.addClass(a(o));t.addChild(e._objects.getMoreButton());return t};l._addAccessibilityTags=function(e,i){var t=[i._objects.getAccessibilityTitle().getId()];if(i._getFilterMessage()){t.push(i._objects.getFilterMessageText().getId())}e.setAttribute("role","presentation");e.addChild(i._objects.getAccessibilityTitle());e.setAttribute("aria-labelledby",t.join(" "),true);e.setAttribute("aria-live","assertive")};return l},true);