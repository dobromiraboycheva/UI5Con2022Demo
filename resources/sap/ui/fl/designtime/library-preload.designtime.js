//@ui5-bundle sap/ui/fl/designtime/library-preload.designtime.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/fl/designtime/library.designtime",[],function(){"use strict";return{}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/fl/designtime/util/IFrame.designtime",["sap/ui/rta/plugin/iframe/AddIFrameDialog","sap/m/library"],function(e){"use strict";function r(r){var t=new e;var i=r.get_settings();var n;return e.buildUrlBuilderParametersFor(r).then(function(e){n={parameters:e,frameUrl:i.url,frameWidth:i.width,frameHeight:i.height,updateMode:true};return t.open(n)}).then(function(e){if(!e){return[]}var t;var i;if(e.frameWidth){t=e.frameWidth+e.frameWidthUnit}else{t="100%"}if(e.frameHeight){i=e.frameHeight+e.frameHeightUnit}else{i="100%"}return[{selectorControl:r,changeSpecificData:{changeType:"updateIFrame",content:{url:e.frameUrl,width:t,height:i}}}]})}return{actions:{settings:function(){return{icon:"sap-icon://write-new",name:"CTX_EDIT_IFRAME",isEnabled:true,handler:r}},remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}}});
/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/fl/designtime/variants/VariantManagement.designtime",["sap/ui/fl/Utils"],function(e){"use strict";var t=function(t,r){var n=e.getAppComponentForControl(t);var a=t.getId();var o=n.getModel(e.VARIANT_MODEL_NAME);var i=n.getLocalId(a)||a;if(!o){return}if(r){o.waitForVMControlInit(i).then(function(){o.setModelPropertiesForControl(i,r,t);o.checkUpdate(true)})}else{o.setModelPropertiesForControl(i,r,t);o.checkUpdate(true)}};return{annotations:{},properties:{showSetAsDefault:{ignore:false},manualVariantKey:{ignore:true},inErrorState:{ignore:false},editable:{ignore:false},modelName:{ignore:false},updateVariantInURL:{ignore:true},resetOnContextChange:{ignore:true},executeOnSelectionForStandardDefault:{ignore:false},displayTextForExecuteOnSelectionForStandardVariant:{ignore:false}},variantRenameDomRef:function(e){return e.getTitle().getDomRef("inner")},customData:{},tool:{start:function(e){var r=true;t(e,r)},stop:function(e){var r=false;t(e,r)}},actions:{controlVariant:function(t){var r=e.getAppComponentForControl(t);var n=t.getId();var a=r.getModel(e.VARIANT_MODEL_NAME);var o=r.getLocalId(n)||n;return{validators:["noEmptyText",{validatorFunction:function(e){var t=a._getVariantTitleCount(e,o)||0;return t===0},errorMessage:sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl").getText("VARIANT_MANAGEMENT_ERROR_DUPLICATE")}]}}}}});
