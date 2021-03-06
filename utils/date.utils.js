"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthList = exports.monthShortList = exports.dayList = exports.dayShortList = exports.getLastDayOfPrevMonth = exports.getLastDayOfMonth = exports.getFirstDayOfMonth = exports.cloneAsDate = exports.cloneDate = exports.addYears = exports.addMonths = exports.addDays = void 0;
var dayShortList = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
exports.dayShortList = dayShortList;
var dayList = ["Sunday ", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
exports.dayList = dayList;
var monthShortList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
exports.monthShortList = monthShortList;
var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
exports.monthList = monthList;
function addDays(d, days) {
    var newDate = cloneDate(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
}
exports.addDays = addDays;
function addMonths(d, months) {
    var newDate = cloneDate(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
}
exports.addMonths = addMonths;
function addYears(d, years) {
    var newDate = cloneDate(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
}
exports.addYears = addYears;
function cloneDate(d) {
    return new Date(d.getTime());
}
exports.cloneDate = cloneDate;
function cloneAsDate(d) {
    var clonedDate = cloneDate(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
}
exports.cloneAsDate = cloneAsDate;
function getFirstDayOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}
exports.getFirstDayOfMonth = getFirstDayOfMonth;
function getLastDayOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
exports.getLastDayOfMonth = getLastDayOfMonth;
function getLastDayOfPrevMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 0);
}
exports.getLastDayOfPrevMonth = getLastDayOfPrevMonth;
//# sourceMappingURL=date.utils.js.map