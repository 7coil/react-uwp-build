"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRequestAnimationFrame = void 0;
var Throttle_1 = require("./Throttle");
function setRequestAnimationFrame() {
    var e_1, _a;
    var vendors = ["ms", "moz", "webkit", "o"];
    try {
        for (var vendors_1 = __values(vendors), vendors_1_1 = vendors_1.next(); !vendors_1_1.done; vendors_1_1 = vendors_1.next()) {
            var vendor = vendors_1_1.value;
            if (window.requestAnimationFrame)
                break;
            window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] || window[vendor + "CancelRequestAnimationFrame"];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (vendors_1_1 && !vendors_1_1.done && (_a = vendors_1.return)) _a.call(vendors_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var lastTime = 0;
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var now = Throttle_1.getNow();
            var timeToCall = Math.max(0, Throttle_1.frameMS - (now - lastTime));
            var id = window.setTimeout(function () {
                callback(now + timeToCall);
            }, timeToCall);
            lastTime = now + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}
exports.setRequestAnimationFrame = setRequestAnimationFrame;
//# sourceMappingURL=setRequestAnimationFrame.js.map