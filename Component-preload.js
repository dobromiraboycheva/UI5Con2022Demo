//@ui5-bundle smart/controls/demo/Component-preload.js
sap.ui.require.preload({
	"smart/controls/demo/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","smart/controls/demo/model/models"],function(e,t,i){"use strict";return e.extend("smart.controls.demo.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"smart/controls/demo/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(o){"use strict";return o.extend("smart.controls.demo.controller.controller.App",{onInit(){}})});
},
	"smart/controls/demo/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/core/UIComponent","smart/controls/demo/model/formatter"],function(e,t,o,n){"use strict";return e.extend("smart.controls.demo.controller.BaseController",{formatter:n,getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},navTo:function(e,t,o){this.getRouter().navTo(e,t,o)},getRouter:function(){return o.getRouterFor(this)},onNavBack:function(){const e=t.getInstance().getPreviousHash();if(e!==undefined){window.history.back()}else{this.getRouter().navTo("appHome",{},true)}}})});
},
	"smart/controls/demo/controller/DetailView.controller.js":function(){sap.ui.define(["./BaseController"],function(t){"use strict";return t.extend("smart.controls.demo.controller.DetailView",{onInit:function(){const t=this.getRouter();t.getRoute("detail").attachPatternMatched(this._onObjectMatched,this)},_onObjectMatched:function(t){const e=`/${window.decodeURIComponent(t.getParameter("arguments").detailPath)}`,n=this.getView();n.bindElement(e)}})});
},
	"smart/controls/demo/controller/MainView.controller.js":function(){sap.ui.define(["./BaseController"],function(t){"use strict";return t.extend("smart.controls.demo.controller.MainView",{onInit:function(){this._oSmartFilterBar=this.getView().byId("smartFilterBar");this._oStatusText=this.getView().byId("statusText")},onSFBinitialized:function(){},onBeforeExport:function(t){const e=t.getParameter("exportSettings");if(e.url){return}e.worker=false},onAssignedFiltersChanged:function(){if(this._oStatusText&&this._oSmartFilterBar){const t=this._oSmartFilterBar.retrieveFiltersWithValuesAsText();this._oStatusText.setText(t)}},onDetailNavigationPress:function(t){const e=t.getSource();this.navTo("detail",{detailPath:window.encodeURIComponent(e.getBindingContext().getPath().substr(1))})}})});
},
	"smart/controls/demo/i18n/i18n.properties":'# This is the resource bundle for com.myorg.myUI5App\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Title of Smart Controls Demo\n\n#YDES: Application description\nappDescription=Description of Smart Controls Demo\n#XTIT: Main view title\ntitle=Title of Smart Controls Demo',
	"smart/controls/demo/localService/initMockServer.js":function(){sap.ui.define(["smart/controls/demo/localService/mockserver"],function(e){"use strict";e.init();sap.ui.require(["sap/ui/core/ComponentSupport"])});
},
	"smart/controls/demo/localService/mockserver.js":function(){sap.ui.define(["sap/ui/core/util/MockServer","sap/base/util/UriParameters"],function(e,t){"use strict";return{init:function(){const a=t.fromQuery(window.location.search);const r=new e({rootUri:"/"});e.config({autoRespondAfter:a.get("serverDelay")||0});r.simulate("localService/mockdata/metadata.xml",{sMockdataBaseUrl:"localService/mockdata",aEntitySetsNames:["ZSALESREPORT","ProductCodeVH","UoMVH","SAP__UnitsOfMeasure","CurrencyCodeVH","SAP__Currencies"]});r.start()}}});
},
	"smart/controls/demo/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"smart.controls.demo","type":"application","dataSources":{"mainService":{"uri":"/","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/mockdata/metadata.xml","annotations":["annotation0"]}},"annotation0":{"uri":"localService/mockdata/annotation0.xml","type":"ODataAnnotation"}},"applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap-ux/fiori-freestyle-writer:basic","version":"0.11.15"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"dependencies":{"minUI5Version":"1.60.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.f":{},"sap.ui.table":{},"sap.ui.comp":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"":{"dataSource":"mainService","preload":true,"settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","useBatch":false,"refreshAfterChange":false,"metadataUrlParams":{"sap-value-list":"none"}}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"smart.controls.demo.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteMainView","pattern":":?query:","target":["TargetMainView"]},{"name":"detail","pattern":"detail/{detailPath}","target":["detail"]}],"targets":{"TargetMainView":{"viewType":"XML","viewId":"MainView","viewName":"MainView"},"detail":{"viewType":"XML","viewId":"detail","viewName":"DetailView"}}},"rootView":{"viewName":"smart.controls.demo.view.App","type":"XML","async":true,"id":"App"}}}',
	"smart/controls/demo/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{}});
},
	"smart/controls/demo/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){const i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"smart/controls/demo/view/App.view.xml":'<mvc:View controllerName="smart.controls.demo.controller.App" xmlns:html="http://www.w3.org/1999/xhtml"\n          xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"smart/controls/demo/view/DetailView.view.xml":'<mvc:View\n  controllerName="smart.controls.demo.controller.DetailView"\n  xmlns="sap.m"\n  xmlns:mvc="sap.ui.core.mvc"\n  xmlns:core="sap.ui.core"\n  xmlns:smartForm="sap.ui.comp.smartform"\n  xmlns:smartField="sap.ui.comp.smartfield"\n><App><Page id="idPage" title="Product" class="sapUiResponsivePadding--header" showNavButton="true"\n          navButtonPress=".onNavBack"><content><ObjectHeader title="{ProductName} {ProductCode}" backgroundDesign="Solid" id="objectHeader"/><smartForm:SmartForm id="smartForm" editable="false"><smartForm:layout><smartForm:ColumnLayout columnsM="2" columnsL="3" columnsXL="4"/></smartForm:layout><smartForm:Group><smartForm:GroupElement><smartField:SmartField id="ProductName" value="{ProductName}"/></smartForm:GroupElement></smartForm:Group><smartForm:Group><smartForm:GroupElement><smartField:SmartField id="Produced" value="{Produced}"/></smartForm:GroupElement></smartForm:Group><smartForm:Group><smartForm:GroupElement><smartField:SmartField id="Sold" value="{Sold}"/></smartForm:GroupElement></smartForm:Group><smartForm:Group><smartForm:GroupElement><smartField:SmartField id="SoldPercent" value="{SoldPercent}"/></smartForm:GroupElement></smartForm:Group></smartForm:SmartForm><IconTabBar selectedKey="headerView" id="iconTabBar" class="sapUiResponsiveContentPadding"><items><IconTabFilter key="europe" text="Europe"><smartForm:SmartForm id="smartFormEurope" title="" editable="false" editTogglable="true"><smartForm:layout><smartForm:ColumnLayout columnsM="1" columnsL="2" columnsXL="3"/></smartForm:layout><smartForm:Group><smartForm:GroupElement><smartField:SmartField id="CurrencyEurope" value="{Currency}"/></smartForm:GroupElement></smartForm:Group><smartForm:Group><smartForm:GroupElement><smartField:SmartField id="QuantityEurope" value="{Quantity}"/></smartForm:GroupElement></smartForm:Group><smartForm:Group><smartForm:GroupElement label="Production time"><smartField:SmartField id="timezoneEurope" value="{ProductionTimeEurope}"><smartField:customData><core:CustomData key="dateFormatSettings" value=\'\\{"style":"short"}\'/></smartField:customData></smartField:SmartField></smartForm:GroupElement></smartForm:Group></smartForm:SmartForm></IconTabFilter><IconTabFilter key="asia" text="Asia"><smartForm:SmartForm id="smartFormAsia" title="" editable="false" editTogglable="true"><smartForm:layout><smartForm:ColumnLayout columnsM="1" columnsL="2" columnsXL="3"/></smartForm:layout><smartForm:Group><smartForm:GroupElement><smartField:SmartField id="CurrencyAsia" value="{Currency}"/></smartForm:GroupElement><smartForm:GroupElement><smartField:SmartField id="QuantityAsia" value="{Quantity}"/></smartForm:GroupElement><smartForm:GroupElement label="Production time"><smartField:SmartField id="timezoneAsia" value="{ProductionTimeAsia}"><smartField:customData><core:CustomData key="dateFormatSettings" value=\'\\{"style":"short"}\'/></smartField:customData></smartField:SmartField></smartForm:GroupElement></smartForm:Group></smartForm:SmartForm></IconTabFilter><IconTabFilter key="america" text="America"><smartForm:SmartForm id="smartFormAmerica" title="" editable="false" editTogglable="true"><smartForm:layout><smartForm:ColumnLayout columnsM="1" columnsL="2" columnsXL="3"/></smartForm:layout><smartForm:Group><smartForm:GroupElement><smartField:SmartField id="CurrencyAmerica" value="{Currency}"/></smartForm:GroupElement><smartForm:GroupElement><smartField:SmartField id="QuantityAmerica" value="{Quantity}"/></smartForm:GroupElement><smartForm:GroupElement label="Production time"><smartField:SmartField id="timezoneAmerica" value="{ProductionTimeAmerica}"><smartField:customData><core:CustomData key="dateFormatSettings" value=\'\\{"style":"short"}\'/></smartField:customData></smartField:SmartField></smartForm:GroupElement></smartForm:Group></smartForm:SmartForm></IconTabFilter></items></IconTabBar></content></Page></App></mvc:View>\n',
	"smart/controls/demo/view/MainView.view.xml":'<mvc:View\n  xmlns:mvc="sap.ui.core.mvc"\n  xmlns="sap.m"\n  xmlns:f="sap.f"\n  xmlns:smartFilterBar="sap.ui.comp.smartfilterbar"\n  xmlns:smartTable="sap.ui.comp.smarttable"\n  xmlns:sv="sap.ui.comp.smartvariants"\n  controllerName="smart.controls.demo.controller.MainView"\n  height="100%"\n><App><f:DynamicPage fitContent="true"><f:title><f:DynamicPageTitle><f:heading><sv:SmartVariantManagement id="__SVM01" persistencyKey="fiori.test.application2.view.S4" showShare="true"\n                                       showExecuteOnSelection="true" entitySet="ZSALESREPORT"/></f:heading><f:snappedContent><Text id="statusText"/></f:snappedContent></f:DynamicPageTitle></f:title><f:header><f:DynamicPageHeader><f:content><smartFilterBar:SmartFilterBar\n              entitySet="ZSALESREPORT"\n              id="smartFilterBar"\n              smartVariant="__SVM01"\n              useToolbar="false"\n              useDateRangeType="true"\n              persistencyKey="fiori.test.application2.view.S4.FilterBar"\n              enableBasicSearch="true"\n              basicSearchFieldName="ProductCode"\n              initialized=".onSFBinitialized"\n              assignedFiltersChanged=".onAssignedFiltersChanged"\n              beforeVariantSave=".onBeforeVariantSave"\n              afterVariantLoad=".onAfterVariantLoad"\n            ><smartFilterBar:controlConfiguration><smartFilterBar:ControlConfiguration key="ProductCode" visibleInAdvancedArea="true"/><smartFilterBar:ControlConfiguration key="DateProduction"\n                                                     conditionType="sap.ui.comp.config.condition.DateRangeType"\n                                                     visibleInAdvancedArea="true"/><smartFilterBar:ControlConfiguration key="DocumentDate"\n                                                     conditionType="sap.ui.comp.config.condition.DateRangeType"\n                                                     visibleInAdvancedArea="true"/><smartFilterBar:ControlConfiguration key="CreationDateTime"\n                                                     conditionType="sap.ui.comp.config.condition.DateRangeType"\n                                                     visibleInAdvancedArea="true"/></smartFilterBar:controlConfiguration></smartFilterBar:SmartFilterBar></f:content></f:DynamicPageHeader></f:header><f:content><smartTable:SmartTable\n          id="ItemsST"\n          entitySet="ZSALESREPORT"\n          smartFilterId="smartFilterBar"\n          tableType="ResponsiveTable"\n          showFullScreenButton="true"\n          header="Sales Report"\n          showRowCount="true"\n          beforeExport=".onBeforeExport"\n          smartVariant="__SVM01"\n          enableAutoBinding="true"\n          demandPopin="true"\n          persistencyKey="fiori.test.application2.view.S4.FilterBar"\n          beforeRebindTable=".onBeforeRebindTable"\n        ><Table growing="true" sticky="ColumnHeaders,HeaderToolbar"><items><ColumnListItem type="Navigation" press=".onDetailNavigationPress"></ColumnListItem></items></Table></smartTable:SmartTable></f:content></f:DynamicPage></App></mvc:View>\n'
});