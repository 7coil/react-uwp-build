"use strict";
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
Object.defineProperty(exports, "__esModule", { value: true });
var IS_NODE_ENV_1 = require("../nodeJS/IS_NODE_ENV");
var requestAnimationFrame;
if (IS_NODE_ENV_1.default) {
    requestAnimationFrame = function (callback) { return setTimeout(callback, 1000 / 60); };
}
else {
    var oldWindow = window;
    requestAnimationFrame = (oldWindow.requestAnimationFrame ||
        oldWindow.webkitRequestAnimationFrame ||
        oldWindow.mozRequestAnimationFrame ||
        oldWindow.msRequestAnimationFrame ||
        (function (callback) { return setTimeout(callback, 1000 / 60); }));
}
var easingEquations = {
    easeOutSine: function (pos) { return Math.sin(pos * (Math.PI / 2)); },
    easeInOutSine: function (pos) { return (-0.5 * (Math.cos(Math.PI * pos) - 1)); },
    easeInOutQuint: function (pos) { return ((pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 5)
        : 0.5 * (Math.pow((pos - 2), 5) + 2)); }
};
var scrollToY = function (targetElement, scrollTargetY, speed, easing, callback) {
    if (targetElement === void 0) { targetElement = null; }
    if (scrollTargetY === void 0) { scrollTargetY = 0; }
    if (speed === void 0) { speed = 2000; }
    if (easing === void 0) { easing = "easeOutSine"; }
    if (callback === void 0) { callback = (function () { }); }
    var scrollY = window.scrollY;
    var currentTime = 0;
    var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));
    if (targetElement) {
        scrollY = targetElement.scrollTop;
    }
    var scrollToFunc = function (top) {
        if (targetElement) {
            targetElement.scrollTop = top;
        }
        else {
            window.scrollTo(0, top);
        }
    };
    function tick() {
        currentTime += 1 / 60;
        var flag = 0;
        var p = currentTime / time;
        var t = easingEquations[easing](p);
        if (p < 1) {
            scrollToFunc(scrollY + ((scrollTargetY - scrollY) * t));
            requestAnimationFrame(tick);
        }
        else {
            scrollToFunc(scrollTargetY);
            flag = 1;
        }
        callback();
    }
    tick();
};
exports.default = scrollToY;
//# sourceMappingURL=scrollToYEasing.js.map