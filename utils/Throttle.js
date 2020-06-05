"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throttle = exports.getNow = exports.highFrameMS = exports.loweFrameMS = exports.frameMS = void 0;
exports.frameMS = Math.floor(1000 / 60);
exports.loweFrameMS = Math.floor(1000 / 24);
exports.highFrameMS = Math.floor(1000 / 144);
function getNow() {
    if ("performance" in window) {
        return performance.now();
    }
    else {
        return Date.now();
    }
}
exports.getNow = getNow;
var Throttle = /** @class */ (function () {
    function Throttle(props) {
        var _this = this;
        this.prevRuntime = getNow();
        this.timeMS = exports.frameMS;
        this.enableRunFunc = false;
        this.remainTime = 0;
        this.shouldFunctionRun = function () {
            var now = getNow();
            var remainTime = now - _this.prevRuntime;
            _this.remainTime = remainTime;
            if (remainTime < exports.frameMS) {
                return false;
            }
            else {
                _this.prevRuntime = now;
                return true;
            }
        };
        this.runOnceTime = null;
        this.runOnceByThrottle = function (method) {
            clearTimeout(_this.runOnceTime);
            var shouldRun = _this.shouldFunctionRun();
            if (shouldRun) {
                method();
            }
            else {
                _this.runOnceTime = setTimeout(method, _this.remainTime);
            }
        };
        this.runTimer = null;
        this.startRunFunc = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.enableRunFunc = true;
            clearTimeout(_this.runTimer);
            if (!_this.enableRunFunc)
                return;
            _this.runFunc.apply(_this, __spread(args));
            var shouldRun = _this.shouldFunctionRun();
            if (shouldRun) {
                _this.startRunFunc.apply(_this, __spread(args));
            }
            else {
                _this.runTimer = setTimeout(function () { return _this.startRunFunc.apply(_this, __spread(args)); }, _this.remainTime);
            }
        };
        this.endRunFunc = function () {
            clearTimeout(_this.runTimer);
            _this.enableRunFunc = false;
        };
        if (props) {
            var timeMS = props.timeMS;
            if (timeMS !== void 0)
                this.timeMS = timeMS;
            if (props.runFunc) {
                this.enableRunFunc = true;
                this.runFunc = props.runFunc;
            }
        }
    }
    return Throttle;
}());
exports.Throttle = Throttle;
//# sourceMappingURL=Throttle.js.map