/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ButtonRenderer","sap/ui/core/Renderer"],function(t,e){"use strict";var n=e.extend(t);n.renderButtonAttributes=function(t,e){if(sap.ui.getCore().getConfiguration().getAccessibility()){t.writeAttribute("aria-haspopup","true")}};n.renderButtonContentAfter=function(t,e){t.write('<span class="sapUiMenuButtonIco"></span>')};return n},true);