"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var easings = require("../utils/easing");
var oldWindow = window;
var requestAnimationFrame = (oldWindow.requestAnimationFrame ||
    oldWindow.webkitRequestAnimationFrame ||
    oldWindow.mozRequestAnimationFrame ||
    oldWindow.msRequestAnimationFrame ||
    (function (callback) { return oldWindow.setTimeout(callback, 1000 / 60); }));
function animation(speed, originValue, changeValue, easing, animateFunc, delay, loop, loopDelay, callback) {
    if (speed === void 0) { speed = 1; }
    if (originValue === void 0) { originValue = 0; }
    if (changeValue === void 0) { changeValue = 1; }
    if (easing === void 0) { easing = easings.linear; }
    if (animateFunc === void 0) { animateFunc = function (currentValue) { }; }
    if (delay === void 0) { delay = 0; }
    if (loop === void 0) { loop = false; }
    if (loopDelay === void 0) { loopDelay = 0; }
    if (callback === void 0) { callback = function () { }; }
    var currentTime = 0;
    var time = Math.abs(changeValue - originValue) / speed;
    var tick = function () {
        currentTime += 1 / 60;
        var p = currentTime / time;
        var t = easing(p);
        var nextValue = originValue + ((changeValue - originValue) * t);
        if (p < 1) {
            animateFunc(nextValue);
            requestAnimationFrame(tick);
        }
        else {
            animateFunc(changeValue);
            if (loop) {
                currentTime = 0;
                setTimeout(function () {
                    animateFunc(nextValue);
                    requestAnimationFrame(tick);
                }, loopDelay);
            }
            callback();
        }
    };
    setTimeout(function () {
        tick();
    }, delay);
}
exports.default = animation;
//# sourceMappingURL=animation.js.map