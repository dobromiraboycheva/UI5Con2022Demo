/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/p13n/Engine"],function(e){"use strict";return{actions:{settings:function(){return{name:"filterbar.ADAPT_TITLE",handler:function(n,t){return n.initialized().then(function(){return e.getInstance().getRTASettingsActionHandler(n,t,"Item")})}}}},aggregations:{layout:{ignore:true},basicSearchField:{ignore:true},filterItems:{ignore:true}},properties:{showAdaptFiltersButton:{ignore:false},p13nMode:{ignore:false}}}});