/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/library","sap/m/library"],function(a,e,t){"use strict";var i=sap.ui.getCore().initLibrary({name:"sap.ui.comp",version:"1.102.1",dependencies:["sap.ui.core","sap.m"],designtime:"sap/ui/comp/designtime/library.designtime",types:["sap.ui.comp.smartfield.ControlProposalType","sap.ui.comp.smartfield.ControlContextType","sap.ui.comp.smartfield.ControlType","sap.ui.comp.smartchart.SelectionMode","sap.ui.comp.smartfield.DisplayBehaviour","sap.ui.comp.smartfield.JSONType","sap.ui.comp.smartfield.CriticalityRepresentationType","sap.ui.comp.smartfield.TextInEditModeSource","sap.ui.comp.smartfield.Importance","sap.ui.comp.TextArrangementType","sap.ui.comp.smarttable.TableType","sap.ui.comp.smarttable.ExportType","sap.ui.comp.smartlist.ListType","sap.ui.comp.personalization.AggregationRole","sap.ui.comp.personalization.ResetType","sap.ui.comp.personalization.ChangeType","sap.ui.comp.valuehelpdialog.ValueHelpRangeOperation","sap.ui.comp.smartfilterbar.SelectOptionSign","sap.ui.comp.smartfilterbar.DisplayBehaviour","sap.ui.comp.smartform.SmartFormValidationMode"],interfaces:["sap.ui.comp.smartform.SmartFormLayout","sap.ui.comp.IFormGroupElement"],controls:["sap.ui.comp.filterbar.FilterBar","sap.ui.comp.navpopover.NavigationPopover","sap.ui.comp.navpopover.SmartLink","sap.ui.comp.smartchart.SmartChart","sap.ui.comp.smartfield.SmartField","sap.ui.comp.smartfield.SmartLabel","sap.ui.comp.smartfilterbar.SmartFilterBar","sap.ui.comp.smartform.SmartForm","sap.ui.comp.smartmultiedit.Field","sap.ui.comp.smartmultiedit.Container","sap.ui.comp.smartmicrochart.SmartAreaMicroChart","sap.ui.comp.smartmicrochart.SmartLineMicroChart","sap.ui.comp.smartmicrochart.SmartBulletMicroChart","sap.ui.comp.smartmicrochart.SmartDeltaMicroChart","sap.ui.comp.smartmicrochart.SmartRadialMicroChart","sap.ui.comp.smartmicrochart.SmartStackedBarMicroChart","sap.ui.comp.smartmicrochart.SmartComparisonMicroChart","sap.ui.comp.smartmicrochart.SmartColumnMicroChart","sap.ui.comp.smartmicrochart.SmartHarveyBallMicroChart","sap.ui.comp.smartmicrochart.SmartMicroChart","sap.ui.comp.smarttable.SmartTable","sap.ui.comp.smartlist.SmartList","sap.ui.comp.smartvariants.SmartVariantManagement","sap.ui.comp.smartvariants.SmartVariantManagementUi2","sap.ui.comp.transport.TransportDialog","sap.ui.comp.valuehelpdialog.ValueHelpDialog","sap.ui.comp.variants.EditableVariantItem","sap.ui.comp.variants.VariantManagement"],elements:["sap.ui.comp.filterbar.FilterGroupItem","sap.ui.comp.filterbar.FilterItem","sap.ui.comp.navpopover.LinkData","sap.ui.comp.navpopover.SemanticObjectController","sap.ui.comp.smartfield.Configuration","sap.ui.comp.smartfield.ControlProposal","sap.ui.comp.smartfield.ObjectStatus","sap.ui.comp.smartfilterbar.ControlConfiguration","sap.ui.comp.smartfilterbar.GroupConfiguration","sap.ui.comp.smartfilterbar.SelectOption","sap.ui.comp.smartform.Group","sap.ui.comp.smartform.GroupElement","sap.ui.comp.smartform.SemanticGroupElement","sap.ui.comp.smartform.Layout","sap.ui.comp.smartvariants.PersonalizableInfo","sap.ui.comp.variants.VariantItem","sap.ui.comp.navpopover.NavigationContainer","sap.ui.comp.smartvariants.SmartVariantManagementAdapter"],extensions:{flChangeHandlers:{"sap.ui.comp.smartform.SmartForm":"sap/ui/comp/smartform/flexibility/SmartForm","sap.ui.comp.smartform.Group":{hideControl:"default",unhideControl:"default",renameGroup:"sap/ui/comp/smartform/flexibility/changes/RenameGroup",addField:"sap/ui/comp/smartform/flexibility/changes/AddField",addFields:"sap/ui/comp/smartform/flexibility/changes/AddFields",addMultiEditField:"sap/ui/comp/smartmultiedit/flexibility/changes/AddMultiEditFields"},"sap.ui.comp.smartform.GroupElement":{hideControl:"default",unhideControl:"sap/ui/comp/smartform/flexibility/changes/UnhideControl",renameField:"sap/ui/comp/smartform/flexibility/changes/RenameField"},"sap.ui.comp.navpopover.NavigationContainer":{addLink:{changeHandler:"sap/ui/comp/navpopover/flexibility/changes/AddLink",layers:{USER:true}},removeLink:{changeHandler:"sap/ui/comp/navpopover/flexibility/changes/RemoveLink",layers:{USER:true}}},"sap.ui.comp.smartfield.SmartField":"sap/ui/comp/smartfield/flexibility/SmartField"},"sap.ui.support":{publicRules:true}}})||sap.ui.comp;i.ANALYTICAL_PARAMETER_PREFIX="$Parameter.";i.STANDARD_VARIANT_NAME="STANDARD";i.smartform=i.smartform||{};i.smartform.inheritCostomDataToFields=function(a){var e=a.getKey();var t={startsWith:{strings:["sap.ui.fl"],compareFunction:function(a){return e.startsWith(a)}},wholeString:{strings:["sap-ui-custom-settings"],compareFunction:function(a){return e==a}}};var i=true;Object.keys(t).forEach(function(a){if(i&&t[a].strings.some(t[a].compareFunction)){i=false;return true}});return i};i.TextArrangementType={TextFirst:"com.sap.vocabularies.UI.v1.TextArrangementType/TextFirst",TextLast:"com.sap.vocabularies.UI.v1.TextArrangementType/TextLast",TextSeparate:"com.sap.vocabularies.UI.v1.TextArrangementType/TextSeparate",TextOnly:"com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly"};i.smartchart=i.smartchart||{};i.smartchart.SelectionMode={Multi:"MULTIPLE",Single:"SINGLE",None:"NONE"};i.smartfield=i.smartfield||{};i.smartfield.ControlType={auto:"auto",dropDownList:"dropDownList",input:"input",datePicker:"datePicker",checkBox:"checkBox",selection:"selection"};i.smartfield.DisplayBehaviour={auto:"auto",descriptionOnly:"descriptionOnly",descriptionAndId:"descriptionAndId",idAndDescription:"idAndDescription",idOnly:"idOnly",TrueFalse:"TrueFalse",OnOff:"OnOff",YesNo:"YesNo"};i.smartfield.JSONType={String:"String",Date:"Date",Float:"Float",Integer:"Integer",Boolean:"Boolean",DateTime:"DateTime"};i.smartfield.ControlContextType={None:"",ResponsiveTable:"responsiveTable",Form:"form",Table:"table",SmartFormGrid:"smartFormGrid"};i.smartfield.ControlProposalType={None:"",ObjectNumber:"ObjectNumber",ObjectIdentifier:"ObjectIdentifier"};i.smartfield.CriticalityRepresentationType={WithoutIcon:"WithoutIcon",WithIcon:"WithIcon"};i.smarttable=i.smarttable||{};i.smarttable.TableType={Table:"Table",ResponsiveTable:"ResponsiveTable",AnalyticalTable:"AnalyticalTable",TreeTable:"TreeTable"};i.smarttable.InfoToolbarBehavior={Auto:"Auto",On:"On",Off:"Off"};i.smartfield.TextInEditModeSource={None:"None",NavigationProperty:"NavigationProperty",ValueList:"ValueList",ValueListNoValidation:"ValueListNoValidation"};i.smartfield.Importance={High:"High",Medium:"Medium",Low:"Low"};i.smarttable.ExportType={GW:"GW",UI5Client:"UI5Client",UI5ClientPDF:"UI5ClientPDF"};i.smartlist=i.smartlist||{};i.smartlist.ListType={List:"List",Tree:"Tree"};i.personalization=i.personalization||{};i.personalization.ResetType={ResetFull:"ResetFull",ResetPartial:"ResetPartial"};i.personalization.AggregationRole={Dimension:"Dimension",Measure:"Measure",NotDimeasure:"NotDimeasure"};i.personalization.ChangeType={Unchanged:"Unchanged",ModelChanged:"ModelChanged",TableChanged:"TableChanged"};i.personalization.TableType={ResponsiveTable:"ResponsiveTable",Table:"Table",AnalyticalTable:"AnalyticalTable",TreeTable:"TreeTable",ChartWrapper:"ChartWrapper",SelectionWrapper:"SelectionWrapper"};i.personalization.ColumnType={ResponsiveColumn:"ResponsiveColumn",TableColumn:"TableColumn",ColumnWrapper:"ColumnWrapper"};i.smartfilterbar=i.smartfilterbar||{};i.smartfilterbar.FilterType={auto:"auto",single:"single",multiple:"multiple",interval:"interval"};i.smartfilterbar.ControlType={auto:"auto",input:"input",dropDownList:"dropDownList",date:"date",dateTimePicker:"dateTimePicker"};i.smartfilterbar.MandatoryType={auto:"auto",mandatory:"mandatory",notMandatory:"notMandatory"};i.smartfilterbar.DisplayBehaviour={auto:"auto",descriptionOnly:"descriptionOnly",descriptionAndId:"descriptionAndId",idAndDescription:"idAndDescription",idOnly:"idOnly"};i.smartfilterbar.SelectOptionSign={I:"I",include:"I",E:"E",exclude:"E"};i.navpopover=i.navpopover||{};i.navpopover.ChangeHandlerType={addLink:"addLink",removeLink:"removeLink",moveLink:"moveLink"};i.smartvariants=i.smartvariants||{};i.smartvariants.ChangeHandlerType={addFavorite:"addFavorite",removeFavorite:"removeFavorite"};i.valuehelpdialog=i.valuehelpdialog||{};i.valuehelpdialog.ValueHelpRangeOperation={BT:"BT",EQ:"EQ",Contains:"Contains",StartsWith:"StartsWith",EndsWith:"EndsWith",LT:"LT",LE:"LE",GT:"GT",GE:"GE",Initial:"Initial",Empty:"Empty"};i.smartform.SmartFormValidationMode={Standard:"Standard",Async:"Async"};i.smartform.Importance={High:"High",Medium:"Medium",Low:"Low"};i.filterbar=i.filterbar||{};return i});