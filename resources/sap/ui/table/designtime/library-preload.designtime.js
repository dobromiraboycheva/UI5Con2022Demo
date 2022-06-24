//@ui5-bundle sap/ui/table/designtime/library-preload.designtime.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/table/designtime/AnalyticalTable.designtime",[],function(){"use strict";return{aggregations:{columns:{domRef:".sapUiTableCHA"},hScroll:{ignore:false,domRef:function(e){return e.$("hsb").get(0)}},vScroll:{ignore:false,domRef:function(e){return e.$("vsb").get(0)}}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/table/designtime/Table.designtime",function(){"use strict";return{domRef:function(e){if(e._getRowMode().isA("sap.ui.table.rowmodes.AutoRowMode")){return e.$("sapUiTableCnt").get(0)}return e.getDomRef()},aggregations:{columns:{domRef:".sapUiTableCHA"},rows:{ignore:true},hScroll:{ignore:false,domRef:function(e){return e.$("hsb").get(0)}},scrollContainers:[{domRef:function(e){return e.$("sapUiTableCnt").get(0)},aggregations:["rows"]}]}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/table/designtime/library.designtime",[],function(){"use strict";return{}});
