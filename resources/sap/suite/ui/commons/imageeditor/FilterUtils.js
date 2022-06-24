sap.ui.define([],function(){"use strict";var a=function(){};a.grayscale=function(a,t){var d,n,r;for(var h=0;h<a.data.length;h+=4){d=a.data[h];n=a.data[h+1];r=a.data[h+2];a.data[h]=d*(.2126+.7874*(1-t))+n*(.7152-.7152*(1-t))+r*(.0722-.0722*(1-t));a.data[h+1]=d*(.2126-.2126*(1-t))+n*(.7152+.2848*(1-t))+r*(.0722-.0722*(1-t));a.data[h+2]=d*(.2126-.2126*(1-t))+n*(.7152-.7152*(1-t))+r*(.0722+.9278*(1-t))}};a.sepia=function(a,t){var d,n,r;for(var h=0;h<a.data.length;h+=4){d=a.data[h];n=a.data[h+1];r=a.data[h+2];a.data[h]=d*(.393+.607*(1-t))+n*(.769-.769*(1-t))+r*(.189-.189*(1-t));a.data[h+1]=d*(.349-.349*(1-t))+n*(.686+.314*(1-t))+r*(.168-.168*(1-t));a.data[h+2]=d*(.272-.272*(1-t))+n*(.534-.534*(1-t))+r*(.131+.869*(1-t))}};a.saturate=function(a,t){var d,n,r;for(var h=0;h<a.data.length;h+=4){d=a.data[h];n=a.data[h+1];r=a.data[h+2];a.data[h]=d*(.213+.787*t)+n*(.715-.715*t)+r*(.072-.072*t);a.data[h+1]=d*(.213-.213*t)+n*(.715+.285*t)+r*(.072-.072*t);a.data[h+2]=d*(.213-.213*t)+n*(.715-.715*t)+r*(.072+.928*t)}};a.invert=function(a,t){var d,n,r,h,o,s;for(var i=0;i<a.data.length;i+=4){d=a.data[i];n=a.data[i+1];r=a.data[i+2];h=255-d;o=255-n;s=255-r;a.data[i]=d-(d-h)*t;a.data[i+1]=n-(n-o)*t;a.data[i+2]=r-(r-s)*t}};a.brightness=function(a,t){var d,n,r;for(var h=0;h<a.data.length;h+=4){d=a.data[h];n=a.data[h+1];r=a.data[h+2];a.data[h]=d*t;a.data[h+1]=n*t;a.data[h+2]=r*t}};a.contrast=function(a,t){var d,n,r;for(var h=0;h<a.data.length;h+=4){d=a.data[h];n=a.data[h+1];r=a.data[h+2];a.data[h]=d*t+(-.5*t+.5)*255;a.data[h+1]=n*t+(-.5*t+.5)*255;a.data[h+2]=r*t+(-.5*t+.5)*255}};a.hueRotate=function(a,t){var d,n,r;for(var h=0;h<a.data.length;h+=4){d=a.data[h];n=a.data[h+1];r=a.data[h+2];a.data[h]=d*(.2126+Math.cos(t)*.7874-Math.sin(t)*.2126)+n*(.7152-Math.cos(t)*.7152-Math.sin(t)*.7152)+r*(.0722-Math.cos(t)*.0722+Math.sin(t)*.9278);a.data[h+1]=d*(.2126-Math.cos(t)*.2126+Math.sin(t)*.143)+n*(.7152+Math.cos(t)*.285+Math.sin(t)*.14)+r*(.0722-Math.cos(t)*.0722-Math.sin(t)*.283);a.data[h+2]=d*(.2126-Math.cos(t)*.2126-Math.sin(t)*.7874)+n*(.7152-Math.cos(t)*.7152+Math.sin(t)*.7152)+r*(.0722+Math.cos(t)*.9278+Math.sin(t)*.0722)}};return a},true);