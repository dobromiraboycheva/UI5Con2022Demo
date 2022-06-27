/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/format/NumberFormat","sap/m/library","sap/ui/model/ChangeReason","sap/ui/base/ManagedObjectMetadata","sap/ui/core/HTML","sap/m/CustomListItem","sap/base/security/encodeXML","sap/base/util/UriParameters"],function(t,e,i,s,o,n,r,a,l){"use strict";var h=i.ListType;var g=i.ListGrowingDirection;var d=t.extend("sap.m.GrowingEnablement",{constructor:function(e){t.apply(this);this._oControl=e;this._oControl.bUseExtendedChangeDetection=true;this._oControl.addDelegate(this);var i=this._oControl.getItems(true).length;this._iRenderedDataItems=i;this._iLimit=i;this._bLoading=false;this._sGroupingPath="";this._bDataRequested=false;this._bSkippedItemsUpdateUntilDataReceived=false;this._iLastItemsCount=0;this._iTriggerTimer=0;this._aChunk=[];this._oRM=null;if(l.fromQuery(window.location.href).get("sap-ui-xx-enableItemsPool")==="true"){this._aItemsPool=[]}},destroy:function(){if(this._oTrigger){this._oTrigger.destroy();this._oTrigger=null}if(this._oScrollDelegate){this._oScrollDelegate.setGrowingList(null);this._oScrollDelegate=null}if(this._oRM){this._oRM.destroy();this._oRM=null}this._aItemsPool&&this._aItemsPool.forEach(function(t){t.destroy()});this._oControl.$("triggerList").remove();this._oControl.bUseExtendedChangeDetection=false;this._oControl.removeDelegate(this);this._oControl=null},render:function(t){t.openStart("div",this._oControl.getId()+"-triggerList");t.class("sapMListUl").class("sapMGrowingList");t.style("display","none");t.openEnd();t.renderControl(this._getTrigger());t.close("div")},onAfterRendering:function(){var t=this._oControl;if(t.getGrowingScrollToLoad()){var e=i.getScrollDelegate(t);if(e){this._oScrollDelegate=e;e.setGrowingList(this.onScrollToLoad.bind(this),t.getGrowingDirection(),this._updateTrigger.bind(this,false))}}else if(this._oScrollDelegate){this._oScrollDelegate.setGrowingList(null);this._oScrollDelegate=null}if(!this._bLoading){this._updateTriggerDelayed(false)}},setTriggerText:function(t){this._oControl.$("triggerText").text(t)},reset:function(){this._iLimit=0;var t=this._oControl.getBindingInfo("items");this._oControl.oExtendedChangeDetectionConfig=!t||!t.template?null:{replace:true}},shouldReset:function(t){var e=s;return t==e.Sort||t==e.Filter||t==e.Context},getInfo:function(){return{total:this._oControl.getMaxItemsCount(),actual:this._iRenderedDataItems}},onScrollToLoad:function(){var t=this._oControl.getDomRef("triggerList");if(this._bLoading||!t||t.style.display!="none"){return}if(this._oControl.getGrowingDirection()==g.Upwards){var e=this._oScrollDelegate;this._oScrollPosition={left:e.getScrollLeft(),top:e.getScrollHeight()}}this.requestNewPage()},requestNewPage:function(){if(!this._oControl||this._bLoading){return}var t=this._oControl.getBinding("items");if(t&&!t.isLengthFinal()||this._iLimit<this._oControl.getMaxItemsCount()){if(this._oControl.getMetadata().hasProperty("enableBusyIndicator")){this._bParentEnableBusyIndicator=this._oControl.getEnableBusyIndicator();this._oControl.setEnableBusyIndicator(false)}this._iLimit+=this._oControl.getGrowingThreshold();this._updateTriggerDelayed(true);this.updateItems("Growing")}},_onBeforePageLoaded:function(t){this._bLoading=true;this._oControl.onBeforePageLoaded(this.getInfo(),t)},_onAfterPageLoaded:function(t){if(!this._oControl){return}this._bLoading=false;this._updateTriggerDelayed(false);this._oControl.onAfterPageLoaded(this.getInfo(),t);if(this._oControl.setEnableBusyIndicator){this._oControl.setEnableBusyIndicator(this._bParentEnableBusyIndicator)}},_getTrigger:function(){var t=this._oControl.getId()+"-trigger",e=this._oControl.getGrowingTriggerText();e=e||sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LOAD_MORE_DATA");this._oControl.addNavSection(t);if(this._oTrigger){this.setTriggerText(e);return this._oTrigger}this._oTrigger=new r({id:t,busyIndicatorDelay:0,type:h.Active,content:new n({content:'<div class="sapMGrowingListTrigger">'+'<div class="sapMSLIDiv sapMGrowingListTriggerText">'+'<span class="sapMSLITitle" id="'+t+'Text">'+a(e)+"</span>"+"</div>"+'<div class="sapMGrowingListDescription sapMSLIDescription" id="'+t+'Info"></div>'+"</div>"})}).setParent(this._oControl,null,true).attachPress(this.requestNewPage,this).addDelegate({onsapenter:function(t){this.requestNewPage();t.preventDefault()},onsapspace:function(t){this.requestNewPage();t.preventDefault()},onAfterRendering:function(e){var i=this._oTrigger.$();i.removeAttr("aria-selected");i.attr({tabindex:0,role:"button","aria-labelledby":t+"Text"+" "+t+"Info"})}},this);this._oTrigger.getList=function(){};this._oTrigger.TagName="div";return this._oTrigger},_getListItemInfo:function(){return"[ "+this._iRenderedDataItems+" / "+e.getFloatInstance().format(this._oControl.getMaxItemsCount())+" ]"},_getGroupingPath:function(t){var e=t.aSorters||[];var i=e[0]||{};return i.fnGroup?i.sPath||"":""},_getDomIndex:function(t){if(typeof t!="number"){return t}if(this._oControl.hasPopin&&this._oControl.hasPopin()){return t*2}return t},_getHasScrollbars:function(){if(!this._oScrollDelegate){return false}if(this._getDomIndex(this._iRenderedDataItems)>window.innerHeight/32){return true}return this._oScrollDelegate.getMaxScrollTop()>this._oControl.getDomRef("triggerList").clientHeight},destroyListItems:function(t){this._oControl.destroyItems(t);this._iRenderedDataItems=0;this._aChunk=[]},addListItem:function(t,e,i){var s=this._oControl,o=e.binding,n=this.createListItem(t,e);if(o.isGrouped()){var r=s.getItems(true),a=r[r.length-1],l=e.model,h=o.getGroup(n.getBindingContext(l));if(a&&a.isGroupHeader()){s.removeAggregation("items",a,true);this._fnAppendGroupItem=this.appendGroupItem.bind(this,h,a,i);a=r[r.length-1]}if(!a||h.key!==o.getGroup(a.getBindingContext(l)).key){var d=e.groupHeaderFactory?e.groupHeaderFactory(h):null;if(s.getGrowingDirection()==g.Upwards){this.applyPendingGroupItem();this._fnAppendGroupItem=this.appendGroupItem.bind(this,h,d,i)}else{this.appendGroupItem(h,d,i)}}}s.addAggregation("items",n,i);if(i){this._aChunk.push(n)}},applyPendingGroupItem:function(){if(this._fnAppendGroupItem){this._fnAppendGroupItem();this._fnAppendGroupItem=undefined}},appendGroupItem:function(t,e,i){e=this._oControl.addItemGroup(t,e,i);if(i){this._aChunk.push(e)}},fillItemsPool:function(){if(!this._iLimit||this._iRenderedDataItems||this._aItemsPool.length){return}var t=this._oControl.getBindingInfo("items");if(t&&t.template){for(var e=0;e<this._iLimit;e++){this._aItemsPool.push(t.factory())}}},createListItem:function(t,e){this._iRenderedDataItems++;if(this._aItemsPool&&this._aItemsPool.length){return this._aItemsPool.pop().setBindingContext(t,e.model)}return d.createItem(t,e)},updateItemsBindingContext:function(t,e){if(!t.length){return}var i=this._oControl.getItems(true);for(var s=0,o=0,n;s<i.length;s++){n=i[s];if(!n.isGroupHeader()){n.setBindingContext(t[o++],e)}}},applyChunk:function(t){if(!this._oControl){return}this.applyPendingGroupItem();var e=this._aChunk.length;var i=this._oControl.getItemsContainerDomRef();if(!e||!i||!this._oControl.shouldRenderItems()){return}if(this._oControl.getGrowingDirection()==g.Upwards){this._aChunk.reverse();if(t===true){t=0}else if(typeof t=="number"){t=this._iRenderedDataItems-e-t}}this._oRM=this._oRM||sap.ui.getCore().createRenderManager();for(var s=0;s<e;s++){this._oRM.renderControl(this._aChunk[s])}var o=t==false&&i.contains(document.activeElement);this._oRM.flush(i,false,this._getDomIndex(t));o&&this._oControl.focus();this._aChunk=[]},applyChunkAsync:function(t){if(this._bNonClientModel){setTimeout(this.applyChunk.bind(this,t))}else{this.applyChunk(t)}},addListItems:function(t,e,i){for(var s=0;s<t.length;s++){this.addListItem(t[s],e,i)}},rebuildListItems:function(t,e,i){this.destroyListItems(i);this.addListItems(t,e,i);if(i){this.applyChunkAsync(false)}else{this.applyPendingGroupItem()}},insertListItem:function(t,e,i){var s=this.createListItem(t,e);this._oControl.insertAggregation("items",s,i,true);this._aChunk.push(s)},deleteListItem:function(t){this._oControl.getItems(true)[t].destroy(true);this._iRenderedDataItems--},refreshItems:function(t){this._bNonClientModel=true;if(!this._bDataRequested){this._bDataRequested=true;this._onBeforePageLoaded(t)}if(!this._iLimit||this.shouldReset(t)||!this._oControl.getItems(true).length){this._iLimit=this._oControl.getGrowingThreshold()}var e=this._oControl.getBinding("items");if(this._aItemsPool){if(this._oControl._bBusy){setTimeout(this.fillItemsPool.bind(this))}else{e.attachEventOnce("dataRequested",function(){setTimeout(this.fillItemsPool.bind(this))},this)}}e.getContexts(0,this._iLimit)},updateItems:function(t){var e=this._oControl,i=e.getBinding("items"),o=e.getBindingInfo("items"),n=e.getItems(true),r=this._sGroupingPath;if(!this._iLimit||this.shouldReset(t)||!n.length){this._iLimit=e.getGrowingThreshold()}this._bSkippedItemsUpdateUntilDataReceived=false;if(this._bDataRequested){this._bDataRequested=false}else{this._onBeforePageLoaded(t)}var a=i.getContexts(0,this._iLimit)||[];if(a.dataRequested){this._bDataRequested=true;if(a.diff&&!a.diff.length){if(t===s.Context){this._bSkippedItemsUpdateUntilDataReceived=true}return}}this._sGroupingPath=this._getGroupingPath(i);var l=a.diff;if(!a.length){this.destroyListItems()}else if(!e.getItemsContainerDomRef()){this.rebuildListItems(a,o)}else if(!l||!n.length&&l.length){this.rebuildListItems(a,o,e.shouldGrowingSuppressInvalidation())}else{var h=false,g=true;if(i.isGrouped()||e.checkGrowingFromScratch()){if(r!=this._sGroupingPath){h=true}else{for(var d=0;d<l.length;d++){var u=l[d],f=a[u.index];if(u.type=="delete"||u.type=="replace"){h=true;break}else if(u.index!=this._iRenderedDataItems){h=true;break}else{this.addListItem(f,o,true)}}}}else{if(r&&!this._sGroupingPath){e.removeGroupHeaders(true)}g=-1;var _=-1;for(var d=0;d<l.length;d++){var u=l[d],p=u.index,f=a[p];if(u.type=="delete"){if(g!=-1){this.applyChunk(g);_=-1;g=-1}this.deleteListItem(p)}else if(u.type=="insert"){if(g==-1){g=p}else if(_>-1&&p!=_+1){this.applyChunk(g);g=p}this.insertListItem(f,o,p);_=p}}}if(h){this.rebuildListItems(a,o,true)}else{this.updateItemsBindingContext(a,o.model);this.applyChunkAsync(g)}}if(!this._bDataRequested){this._onAfterPageLoaded(t)}},_onBindingDataReceivedListener:function(t){if(this._bSkippedItemsUpdateUntilDataReceived&&!t.getParameter("data")){this._bSkippedItemsUpdateUntilDataReceived=false;this.destroyListItems();this._onAfterPageLoaded()}},_updateTriggerDelayed:function(t){if(this._oControl.getGrowingScrollToLoad()){this._iTriggerTimer&&window.cancelAnimationFrame(this._iTriggerTimer);this._iTriggerTimer=window.requestAnimationFrame(this._updateTrigger.bind(this,t))}else{this._updateTrigger(t)}},_updateTrigger:function(t){var e=this._oTrigger,i=this._oControl,s=i&&i.getVisibleItems().length>0;if(!e||!i||!s||!i.shouldRenderItems()||!i.getDomRef()){return}var o=i.getBinding("items");if(!o){return}e.setBusy(t);e.$().toggleClass("sapMGrowingListBusyIndicatorVisible",t);if(t){e.setActive(false);i.$("triggerList").css("display","")}else{var n=i.getItems(true),r=n.length,a=o.getLength()||0,l=o.isLengthFinal(),h=i.getGrowingScrollToLoad(),d=e.getDomRef();if(d&&d.contains(document.activeElement)){(n[this._iLastItemsCount]||i).focus()}if(!r||!this._iLimit||!a||l&&this._iLimit>=a||h&&this._getHasScrollbars()){i.$("triggerList").css("display","none");i.$("listUl").removeClass("sapMListHasGrowing")}else{if(l){i.$("triggerInfo").css("display","block").text(this._getListItemInfo())}i.$("triggerList").css("display","");i.$("listUl").addClass("sapMListHasGrowing");e.$().removeClass("sapMGrowingListBusyIndicatorVisible");if(i.isA("sap.m.Table")&&!i.hasPopin()){this.adaptTriggerButtonWidth(i,d)}}this._iLastItemsCount=this._oControl.getItems(true).length;if(h&&this._oScrollPosition===undefined&&i.getGrowingDirection()==g.Upwards){this._oScrollPosition={left:0,top:0}}if(r>0&&this._oScrollPosition){var u=this._oScrollDelegate,f=this._oScrollPosition;u.scrollTo(f.left,u.getScrollHeight()-f.top);this._oScrollPosition=null}}},adaptTriggerButtonWidth:function(t,e){if(t.shouldRenderDummyColumn()&&t.$("listUl").hasClass("sapMListHasGrowing")){if(!e){e=this._oTrigger.getDomRef()}window.requestAnimationFrame(function(){if(t.bIsDestroyed){return}var i=Array.from(t.getDomRef("tblHeader").childNodes).slice(0,-1).map(function(t){var e=t.getAttribute("data-sap-width");if(!e||!e.includes("%")){return t.getBoundingClientRect().width+"px"}else{return e}}).join(" + ");e.style.width="calc("+i+" + 1px)";e.classList.add("sapMGrowingListDummyColumn")})}}});d.createItem=function(t,e,i){var s=e.factory(o.uid(i?i:"clone"),t);return s.setBindingContext(t,e.model)};return d});