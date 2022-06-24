/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */

// Provides element sap.viz.ui5.types.Line_marker.
sap.ui.define(['sap/viz/library', 'sap/viz/ui5/core/BaseStructuredType'],
	function(library, BaseStructuredType) {
		"use strict";

	/**
	 * Constructor for a new sap.viz.ui5.types.Line_marker
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @classdesc Settings for marker/data point graphics
	 * @extends sap.viz.ui5.core.BaseStructuredType
	 *
	 * @constructor
	 * @public
	 * @since 1.7.2
	 * @deprecated Since version 1.32.0.
	 * The chart controls in the <code>sap.viz.ui5</code> package (which were always marked as <i>experimental</i>) have been deprecated since 1.32.0.
	 * They are no longer actively developed and won't receive new features or improvements, only important bug fixes. They will only remain in the
	 * SAPUI5 distribution for backward compatibility.
	 *
	 * <b>SAP strongly recommends that existing consumers of those controls migrate to the new {@link sap.viz.ui5.controls.VizFrame VizFrame}
	 * control to benefit from new charting enhancements and timely support. </b>
	 *
	 * <b>Note</b>: As the feature set, design and API usage of VizFrame might differ from the old chart controls, make sure you evaluate it thoroughly before migration.
	 * @experimental Since version 1.7.2.
	 * Charting API is not finished yet and might change completely.
	 * @alias sap.viz.ui5.types.Line_marker
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var Line_marker = BaseStructuredType.extend("sap.viz.ui5.types.Line_marker", /** @lends sap.viz.ui5.types.Line_marker.prototype */ { metadata: {

		library: "sap.viz",


		properties : {

			/**
			 * Set the visibility of the markers
			 */
			visible : {type : "boolean", defaultValue : true},

			/**
			 * Set the shape of the markers
			 */
			shape : {type : "sap.viz.ui5.types.Line_marker_shape", defaultValue : sap.viz.ui5.types.Line_marker_shape.circle},

			/**
			 * Set the marker size for data points, ranging from '4' to '32'. If you enter a value outside that range, the marker size defaults to '6'.
			 */
			size : {type : "int", defaultValue : 6},

			/**
			 * Set the number to enable events for markers when they are invisible. If the total amount of markers is bigger than this value, markers will remain hidden when selected or hovered over. The default value is Number.POSITIVE_INFINITY, which is the largest possible value.
			 * @deprecated Since version 1.12.
			 * This Property has been deprecated. This interface will be removed from the SAPUI5 delivery in one of the next releases.
			 */
			number : {type : "int", deprecated: true}
		}
	}});


	return Line_marker;

});