/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/date/UniversalDate","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/base/assert"],function(e,t,r,n){"use strict";function a(t){n(t instanceof e,"method accepts only instances of UniversalDate");return t.createDate(t.constructor,[t.getJSDate()])}var u={};u.getRange=function(e,t,r,n){if(n===undefined){n=true}if(isNaN(e)){throw new TypeError("duration is NaN, but is "+e)}e=Math.trunc(e);var s=u.resetStartTime(r==undefined?null:r),i;if(n){switch(t){case"DAY":break;case"WEEK":s=u.getWeekStartDate(s);break;case"MONTH":s=u.getMonthStartDate(s);break;case"QUARTER":s=u.getQuarterStartDate(s);break;case"YEAR":s=u.getYearStartDate(s);break;default:throw new TypeError("invalid unit "+t)}}switch(t){case"DAY":if(e>0){s.setDate(s.getDate()+1)}i=a(s);e=e==0?1:e;i.setDate(s.getDate()+e);break;case"WEEK":if(e>0){s.setDate(s.getDate()+7)}i=a(s);e=e==0?1:e;i.setDate(s.getDate()+e*7);break;case"MONTH":if(e>0){s.setMonth(s.getMonth()+1)}i=a(s);e=e==0?1:e;i.setMonth(s.getMonth()+e);break;case"QUARTER":if(e>0){s.setMonth(s.getMonth()+3)}i=a(s);e=e==0?1:e;i.setMonth(s.getMonth()+e*3);break;case"YEAR":if(e>0){s.setFullYear(s.getFullYear()+1)}i=a(s);e=e==0?1:e;i.setFullYear(s.getFullYear()+e);break;default:throw new TypeError("invalid unit "+t)}if(i.getTime()<s.getTime()){i=[s,s=i][0]}i.setDate(i.getDate()-1);return[u.resetStartTime(s),u.resetEndTime(i)]};u.getWeekStartDate=function(e,n){var s=n?new t(n):sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),i=r.getInstance(s),g=i.getFirstDayOfWeek();e=e?a(e):a(u.createNewUniversalDate());e.setDate(e.getDate()-e.getDay()+g);return u.resetStartTime(e)};u.getWeekLastDate=function(e,t){var r=u.getWeekStartDate(e,t);r.setDate(r.getDate()+6);return u.resetStartTime(r)};u.getMonthStartDate=function(e){e=e?a(e):a(u.createNewUniversalDate());e.setDate(1);return u.resetStartTime(e)};u.getMonthEndDate=function(e){var t=u.getMonthStartDate(e);t.setMonth(t.getMonth()+1);t.setDate(0);return u.resetStartTime(t)};u.getQuarterStartDate=function(e){e=e?a(e):a(u.createNewUniversalDate());e.setMonth(3*Math.floor(e.getMonth()/3));e.setDate(1);return u.resetStartTime(e)};u.getQuarterEndDate=function(e){var t=u.getQuarterStartDate(e);t.setMonth(t.getMonth()+3);t.setDate(0);return u.resetStartTime(t)};u.getYearStartDate=function(e){e=e?a(e):a(u.createNewUniversalDate());e.setMonth(0);e.setDate(1);return u.resetStartTime(e)};u.getYearEndDate=function(e){e=e?a(e):a(u.createNewUniversalDate());e.setFullYear(e.getFullYear()+1);e.setMonth(0);e.setDate(0);return u.resetStartTime(e)};u.resetStartTime=function(e){e=e?a(e):a(u.createNewUniversalDate());e.setHours(0,0,0,0);return e};u.resetEndTime=function(e){e=e?a(e):a(u.createNewUniversalDate());e.setHours(23,59,59,999);return e};u.createNewUniversalDate=function(){return new e};u.ranges={lastDays:function(e){return u.getRange(-e,"DAY")},yesterday:function(){return u.getRange(-1,"DAY")},today:function(){return u.getRange(0,"DAY")},tomorrow:function(){return u.getRange(1,"DAY")},nextDays:function(e){return u.getRange(e,"DAY")},lastWeeks:function(e){return u.getRange(-e,"WEEK")},lastWeek:function(){return u.getRange(-1,"WEEK")},currentWeek:function(){return u.getRange(0,"WEEK")},firstDayOfWeek:function(){var e=u.getWeekStartDate();return[e,u.resetEndTime(e)]},lastDayOfWeek:function(){var e=u.getWeekLastDate();return[e,u.resetEndTime(e)]},nextWeek:function(){return u.getRange(1,"WEEK")},nextWeeks:function(e){return u.getRange(e,"WEEK")},lastMonths:function(e){return u.getRange(-e,"MONTH")},lastMonth:function(){return u.getRange(-1,"MONTH")},currentMonth:function(){return u.getRange(0,"MONTH")},firstDayOfMonth:function(){var e=u.getMonthStartDate();return[e,u.resetEndTime(e)]},lastDayOfMonth:function(){var e=u.getMonthEndDate();return[e,u.resetEndTime(e)]},nextMonth:function(){return u.getRange(1,"MONTH")},nextMonths:function(e){return u.getRange(e,"MONTH")},lastQuarters:function(e){return u.getRange(-e,"QUARTER")},lastQuarter:function(){return u.getRange(-1,"QUARTER")},firstDayOfQuarter:function(){var e=u.getQuarterStartDate();return[e,u.resetEndTime(e)]},lastDayOfQuarter:function(){var e=u.getQuarterEndDate();return[e,u.resetEndTime(e)]},currentQuarter:function(){return u.getRange(0,"QUARTER")},nextQuarter:function(){return u.getRange(1,"QUARTER")},nextQuarters:function(e){return u.getRange(e,"QUARTER")},quarter:function(e){if(e<=2){return u.getRange(e-1,"QUARTER",u.getYearStartDate())}else{var t=u.getRange(e-2,"QUARTER",u.getYearStartDate());var r=t[1];r.setMilliseconds(1e3);return u.getRange(0,"QUARTER",r)}},lastYears:function(e){return u.getRange(-e,"YEAR")},lastYear:function(){return u.getRange(-1,"YEAR")},firstDayOfYear:function(){var e=u.getYearStartDate();return[e,u.resetEndTime(e)]},lastDayOfYear:function(){var e=u.getYearEndDate();return[e,u.resetEndTime(e)]},currentYear:function(){return u.getRange(0,"YEAR")},nextYear:function(){return u.getRange(1,"YEAR")},nextYears:function(e){return u.getRange(e,"YEAR")},yearToDate:function(){var e=u.createNewUniversalDate();return[u.getYearStartDate(e),u.resetEndTime(e)]},dateToYear:function(){var e=u.createNewUniversalDate();return[u.resetStartTime(e),u.resetEndTime(u.getYearEndDate(e))]}};return u});