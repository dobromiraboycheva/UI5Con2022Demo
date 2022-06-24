//@ui5-bundle sap/ui/mdc/designtime/library-preload.designtime.js
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/Util",[],function(){"use strict";function e(){return{actions:{},aggregations:{},description:"{description}",name:"{name}",properties:{}}}function t(e,t,i){var n=e.includes(t);var r=n&&i[t]||{};if(!Object.keys(r).length){r[t]={ignore:!n};Object.assign(i,r)}}return{getDesignTime:function(i,n,r,s){s=s?s:e();s.actions=s.actions?s.actions:{};s.properties=s.properties?s.properties:{};s.aggregations=s.aggregations?s.aggregations:{};var a=i.getMetadata(),n=n?n:[],r=r?r:[],g=Object.keys(a.getAllProperties()).concat(Object.keys(a.getAllPrivateProperties())),o=Object.keys(a.getAllAggregations()).concat(Object.keys(a.getAllPrivateAggregations()));g.forEach(function(e){t(n,e,s.properties)});o.forEach(function(e){t(r,e,s.aggregations)});return s}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/actiontoolbar/ActionToolbar.designtime",["sap/ui/mdc/ActionToolbar","../Util"],function(e,n){"use strict";var t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var i={description:"{description}",name:"{name}",aggregations:{},properties:{},actions:{settings:{name:t.getText("actiontoolbar.RTA_SETTINGS_NAME"),handler:function(e,n){return sap.ui.mdc.p13n.Engine.getInstance().getRTASettingsActionHandler(e,n,"actionsKey").then(function(e){return e})},CAUTION_variantIndependent:true}}},a=[],r=[];return n.getDesignTime(e,r,a,i)});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/chart/Chart.designtime",["sap/ui/mdc/p13n/Engine"],function(e){"use strict";return{actions:{settings:function(){return{handler:function(r,t){var n=r.getP13nMode();var i=n.indexOf("Type");if(i>-1){n.splice(i,1)}if(r.isPropertyHelperFinal()){return e.getInstance().getRTASettingsActionHandler(r,t,n)}else{return r.finalizePropertyHelper().then(function(){return e.getInstance().getRTASettingsActionHandler(r,t,n)})}}}}},properties:{width:{ignore:true},height:{ignore:true},delegate:{ignore:true},header:{ignore:true},noDataText:{ignore:true},p13nMode:{ignore:true},legendVisible:{ignore:true},ignoreToolbarActions:{ignore:true},minWidth:{ignore:true},minHeight:{ignore:true},sortConditions:{ignore:true},filterConditions:{ignore:true},showChartTooltip:{ignore:true},autoBindOnInit:{ignore:true},chartType:{ignore:true},showSelectionDetails:{ignore:true},propertyInfo:{ignore:true}},aggregations:{items:{ignore:true},actions:{ignore:true},selectionDetailsActions:{ignore:true},_toolbar:{ignore:false},_breadcrumbs:{ignore:true},_innerChart:{ignore:true}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/field/Field.designtime",["sap/ui/fl/Utils","sap/ui/fl/apply/api/FlexRuntimeInfoAPI"],function(e,n){"use strict";var t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");return{properties:{value:{ignore:true},additionalValue:{ignore:true}},getStableElements:function(t){if(!t.getFieldInfo()){return[]}var r=t.getFieldInfo();var o=typeof r.getSourceControl()==="string"?sap.ui.getCore().byId(r.getSourceControl()):r.getSourceControl();if(!o){o=t}var i=e.getAppComponentForControl(o)||e.getAppComponentForControl(t);var a=r._createPanelId(e,n);return[{id:a,appComponent:i}]},actions:{settings:function(r){if(!r.getFieldInfo()){return{}}return{name:t.getText("info.POPOVER_DEFINE_LINKS"),handler:function(t,o){var i=t.getFieldInfo();return i.getContent().then(function(a){i.addDependent(a);return n.waitForChanges({element:a}).then(function(){var i=sap.ui.mdc.p13n.Engine.getInstance();o.fnAfterClose=function(){a.destroy()};var u=function(){return i.getRTASettingsActionHandler(a,o,"LinkItems").then(function(n){n.forEach(function(n){var o=n.selectorElement;delete n.selectorElement;var i=e.getAppComponentForControl(t)||e.getAppComponentForControl(r);n.selectorControl={id:o.getId(),controlType:o===a?"sap.ui.mdc.link.Panel":"sap.ui.mdc.link.PanelItem",appComponent:i}});return n})};var l=a.getItems();if(l.length>0){return n.waitForChanges({selectors:l}).then(function(){return u()})}else{return u()}})})},CAUTION_variantIndependent:true}}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/field/FieldBase.designtime",[],function(){"use strict";return{properties:{dataType:{ignore:true},dataTypeConstraints:{ignore:true},dataTypeFormatOptions:{ignore:true},editMode:{ignore:true},required:{ignore:true},display:{ignore:true},textAlign:{ignore:true},textDirection:{ignore:true},placeholder:{ignore:true},valueState:{ignore:true},valueStateText:{ignore:true},width:{ignore:true},multipleLines:{ignore:true},maxConditions:{ignore:true},conditions:{ignore:true},label:{ignore:true},delegate:{ignore:true},showEmptyIndicator:{ignore:true}},aggregations:{content:{ignore:true},contentEdit:{ignore:true},contentDisplay:{ignore:true},fieldInfo:{ignore:true}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/field/FilterField.designtime",[],function(){"use strict";return{properties:{operators:{ignore:true},defaultOperator:{ignore:true}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/field/MultiValueField.designtime",[],function(){"use strict";return{properties:{delegate:{ignore:true}},aggregations:{items:{ignore:true}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/filterbar/FilterBar.designtime",["sap/ui/mdc/p13n/Engine"],function(e){"use strict";return{actions:{settings:function(){return{name:"filterbar.ADAPT_TITLE",handler:function(t,n){return t.initialized().then(function(){return e.getInstance().getRTASettingsActionHandler(t,n,"Item")})}}}},aggregations:{layout:{ignore:true},basicSearchField:{ignore:true},filterItems:{ignore:true}},properties:{showAdaptFiltersButton:{ignore:false},p13nMode:{ignore:false}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/filterbar/FilterBarBase.designtime",[],function(){"use strict";return{properties:{showGoButton:{ignore:false},delegate:{ignore:true},liveMode:{ignore:false},showMessages:{ignore:false},filterConditions:{ignore:true},propertyInfo:{ignore:true},suspendSelection:{ignore:true}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/library.designtime",[],function(){"use strict";return{}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/link/Panel.designtime",[],function(){"use strict";return{tool:{start:function(e){e.setEnablePersonalization(false)},stop:function(e){e.setEnablePersonalization(true)}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/link/PanelItem.designtime",["sap/ui/thirdparty/jquery"],function(e){"use strict";return{domRef:function(n){var i=e.find(".mdcbaseinfoPanelListItem");var t=i.filter(function(i){return e(i).control(0).getParent().getKey()===n.getId()});return t[0]},name:{singular:"p13nDialog.PANEL_ITEM_NAME",plural:"p13nDialog.PANEL_ITEM_NAME_PLURAL"},actions:{remove:function(){return{changeType:"hideItem"}},reveal:function(){return{changeType:"revealItem"}}},isVisible:function(e){return e.getVisible()}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/p13n/PersistenceProvider.designtime",[],function(){"use strict";return{name:"{name}",description:"{description}",properties:{mode:{ignore:true}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/table/Table.designtime",["sap/ui/mdc/p13n/Engine","sap/ui/mdc/Table","../Util"],function(e,t,n){"use strict";var i={name:"{name}",description:"{description}",actions:{settings:function(){return{handler:function(t,n){return e.getInstance().getRTASettingsActionHandler(t,n,t.getActiveP13nModes())}}}},properties:{},aggregations:{_content:{propagateMetadata:function(e){if(e.isA("sap.ui.mdc.ActionToolbar")){return{actions:{settings:{}}}}return{actions:"not-adaptable"}}}}};var a=["width","height","headerLevel","header","headerVisible","showRowCount","threshold","noDataText","enableExport","busyIndicatorDelay","enableColumnResize","showPasteButton","multiSelectMode"],s=["_content"];return n.getDesignTime(t,a,s,i)});
