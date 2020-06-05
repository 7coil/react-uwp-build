"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalRevealStore = void 0;
var React = require("react");
var helper_1 = require("./helper");
var tinyColor = require("tinycolor2");
var Throttle_1 = require("../utils/Throttle");
var resize_observer_1 = require("@juggle/resize-observer");
var ResizeObserver = window["ResizeObserver"] || resize_observer_1.ResizeObserver;
// TODO: CSS border gradient.
var borderStyle = {
    borderImage: "radial-gradient(circle 120px at 50% 50%, red 0%, transparent 100%)",
    borderImageSlice: 1,
    borderTop: "100px solid"
};
function getGradient(ctx, borderColor, theme) {
    var hslStr = tinyColor(borderColor).toHslString();
    var gradient = theme.revealGradientMap.get(hslStr);
    if (!gradient) {
        gradient = helper_1.createRadialGradient(ctx, borderColor).gradient;
        theme.revealGradientMap.set(borderColor, gradient);
    }
    return gradient;
}
function isRectangleOverlap(rect1, rect2) {
    return Math.max(rect1.left, rect2.left) < Math.min(rect1.right, rect2.right) && Math.max(rect1.top, rect2.top) < Math.min(rect1.bottom, rect2.bottom);
}
var GlobalRevealStore = /** @class */ (function (_super) {
    __extends(GlobalRevealStore, _super);
    function GlobalRevealStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currPosition = {
            clientX: 0,
            clientY: 0
        };
        _this.resizeObserver = new ResizeObserver(function (entries, observer) {
            var e_1, _a, e_2, _b;
            var revealEffectMap = _this.props.theme.revealEffectMap;
            var isResize = false;
            try {
                for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                    var entry = entries_1_1.value;
                    if (isResize)
                        break;
                    if (entry.target) {
                        try {
                            for (var revealEffectMap_1 = (e_2 = void 0, __values(revealEffectMap)), revealEffectMap_1_1 = revealEffectMap_1.next(); !revealEffectMap_1_1.done; revealEffectMap_1_1 = revealEffectMap_1.next()) {
                                var _c = __read(revealEffectMap_1_1.value, 1), borderCanvas = _c[0];
                                if (borderCanvas.parentElement === entry.target) {
                                    _this.handleDrawGlobalEffect(_this.currPosition);
                                    isResize = true;
                                    break;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (revealEffectMap_1_1 && !revealEffectMap_1_1.done && (_b = revealEffectMap_1.return)) _b.call(revealEffectMap_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
        _this.drawByBorderCanvas = function (borderCanvas, isHoverEl) {
            if (isHoverEl === void 0) { isHoverEl = false; }
            var _a = _this.props, theme = _a.theme, revealEffectMap = _a.theme.revealEffectMap;
            var _b = _this.currPosition, clientX = _b.clientX, clientY = _b.clientY;
            var _c = revealEffectMap.get(borderCanvas), hoverColor = _c.hoverColor, hoverSize = _c.hoverSize, borderColor = _c.borderColor, borderWidth = _c.borderWidth, effectEnable = _c.effectEnable;
            var parentEl = borderCanvas.parentElement;
            var parentRect = parentEl.getBoundingClientRect();
            var hoverCanvas = borderCanvas.previousElementSibling;
            var borderCtx = borderCanvas.getContext("2d");
            var hoverCtx = hoverCanvas.getContext("2d");
            var _d = __read([clientX - parentRect.left, clientY - parentRect.top], 2), x = _d[0], y = _d[1];
            var enableDrawBorder = effectEnable === "border" || effectEnable === "both";
            var enableDrawHover = effectEnable === "hover" || effectEnable === "both";
            if (enableDrawBorder) {
                borderCtx.clearRect(0, 0, borderCanvas.width, borderCanvas.height);
                var borderGradient = getGradient(borderCtx, borderColor, theme);
                helper_1.drawBorder({
                    borderCanvas: borderCanvas,
                    hoverSize: hoverSize,
                    borderWidth: borderWidth,
                    gradient: borderGradient,
                    x: x,
                    y: y
                });
            }
            if (isHoverEl && enableDrawHover) {
                hoverCtx.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);
                var hoverGradient = getGradient(hoverCtx, hoverColor, theme);
                helper_1.drawHover({
                    hoverCanvas: hoverCanvas,
                    hoverSize: hoverSize,
                    gradient: hoverGradient,
                    x: x,
                    y: y
                });
            }
        };
        _this.globalDrawThrottle = new Throttle_1.Throttle();
        _this.handleDrawGlobalEffect = function (event) {
            _this.globalDrawThrottle.runOnceByThrottle(function () {
                _this.drawGlobalEffects(event);
            });
        };
        _this.drawGlobalEffects = function (event) {
            var e_3, _a, e_4, _b, e_5, _c, e_6, _d, e_7, _e;
            var _f = _this.updatePosition(event), clientX = _f.clientX, clientY = _f.clientY;
            var _g = _this.props, theme = _g.theme, revealEffectMap = _g.theme.revealEffectMap;
            if (revealEffectMap.size === 0)
                return;
            // Add hover size.
            var effectRect;
            var setEffectRect = function (hoverSize) {
                var halfHoverSize = hoverSize / 2;
                effectRect = {
                    left: clientX - halfHoverSize,
                    top: clientY - halfHoverSize,
                    right: clientX + halfHoverSize,
                    bottom: clientY + halfHoverSize
                };
            };
            var hoverSize = theme.revealConfig.hoverSize;
            setEffectRect(hoverSize);
            if (_this.hoverBorderCanvas) {
                var hoverCanvas = _this.hoverBorderCanvas.previousElementSibling;
                if (hoverCanvas) {
                    var hoverCtx = hoverCanvas.getContext("2d");
                    hoverCtx.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);
                }
            }
            var focusElements = [];
            var hadFromPointEl = "elementsFromPoint" in document;
            if (hadFromPointEl) {
                focusElements = document.elementsFromPoint(_this.currPosition.clientX, _this.currPosition.clientY);
            }
            var foundFocusEl = false;
            try {
                for (var focusElements_1 = __values(focusElements), focusElements_1_1 = focusElements_1.next(); !focusElements_1_1.done; focusElements_1_1 = focusElements_1.next()) {
                    var focusElement = focusElements_1_1.value;
                    if (foundFocusEl)
                        break;
                    try {
                        for (var revealEffectMap_2 = (e_4 = void 0, __values(revealEffectMap)), revealEffectMap_2_1 = revealEffectMap_2.next(); !revealEffectMap_2_1.done; revealEffectMap_2_1 = revealEffectMap_2.next()) {
                            var _h = __read(revealEffectMap_2_1.value, 2), borderCanvas = _h[0], revealConfig = _h[1];
                            if (borderCanvas.parentElement === focusElement && revealConfig.effectEnable !== "disabled") {
                                _this.hoverBorderCanvas = borderCanvas;
                                setEffectRect(revealConfig.hoverSize);
                                foundFocusEl = true;
                                break;
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (revealEffectMap_2_1 && !revealEffectMap_2_1.done && (_b = revealEffectMap_2.return)) _b.call(revealEffectMap_2);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (focusElements_1_1 && !focusElements_1_1.done && (_a = focusElements_1.return)) _a.call(focusElements_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (!hadFromPointEl) {
                try {
                    for (var revealEffectMap_3 = __values(revealEffectMap), revealEffectMap_3_1 = revealEffectMap_3.next(); !revealEffectMap_3_1.done; revealEffectMap_3_1 = revealEffectMap_3.next()) {
                        var _j = __read(revealEffectMap_3_1.value, 2), borderCanvas = _j[0], revealConfig = _j[1];
                        var parentEl = borderCanvas.parentElement;
                        var parentRect = parentEl.getBoundingClientRect();
                        var isInside = helper_1.inRectInside({ left: clientX, top: clientY }, parentRect);
                        if (isInside) {
                            _this.hoverBorderCanvas = borderCanvas.contains(_this.hoverBorderCanvas) ? _this.hoverBorderCanvas : borderCanvas;
                            setEffectRect(revealConfig.hoverSize);
                            foundFocusEl = true;
                            break;
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (revealEffectMap_3_1 && !revealEffectMap_3_1.done && (_c = revealEffectMap_3.return)) _c.call(revealEffectMap_3);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
            // find all border effect.
            var drawBorderCanvasList = [];
            try {
                for (var revealEffectMap_4 = __values(revealEffectMap), revealEffectMap_4_1 = revealEffectMap_4.next(); !revealEffectMap_4_1.done; revealEffectMap_4_1 = revealEffectMap_4.next()) {
                    var _k = __read(revealEffectMap_4_1.value, 2), borderCanvas = _k[0], revealConfig = _k[1];
                    var borderCtx = borderCanvas.getContext("2d");
                    var parentEl = borderCanvas.parentElement;
                    var parentRect = parentEl.getBoundingClientRect();
                    var effectEnable = revealConfig.effectEnable, effectRange = revealConfig.effectRange;
                    var isSelfRange = effectRange === "self";
                    var isOthersRange = effectRange === "others";
                    var isOverlap = isRectangleOverlap(effectRect, parentRect);
                    borderCtx.clearRect(0, 0, borderCanvas.width, borderCanvas.height);
                    if (isOverlap) {
                        helper_1.updateCanvasRect(borderCanvas);
                        var enableDrawBorder = effectEnable === "border" || effectEnable === "both";
                        if (enableDrawBorder && !isSelfRange && !isOthersRange && _this.showRenderCanvas(borderCanvas)) {
                            drawBorderCanvasList.push(borderCanvas);
                        }
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (revealEffectMap_4_1 && !revealEffectMap_4_1.done && (_d = revealEffectMap_4.return)) _d.call(revealEffectMap_4);
                }
                finally { if (e_6) throw e_6.error; }
            }
            // draw all borders.
            if (foundFocusEl) {
                var revealConfig = revealEffectMap.get(_this.hoverBorderCanvas);
                if (revealConfig.effectRange === "self") {
                    drawBorderCanvasList = [];
                }
            }
            try {
                for (var drawBorderCanvasList_1 = __values(drawBorderCanvasList), drawBorderCanvasList_1_1 = drawBorderCanvasList_1.next(); !drawBorderCanvasList_1_1.done; drawBorderCanvasList_1_1 = drawBorderCanvasList_1.next()) {
                    var borderCanvas = drawBorderCanvasList_1_1.value;
                    _this.drawByBorderCanvas(borderCanvas);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (drawBorderCanvasList_1_1 && !drawBorderCanvasList_1_1.done && (_e = drawBorderCanvasList_1.return)) _e.call(drawBorderCanvasList_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
            // draw hoverEl.
            if (foundFocusEl && _this.showRenderCanvas(_this.hoverBorderCanvas)) {
                _this.drawByBorderCanvas(_this.hoverBorderCanvas, true);
            }
        };
        _this.cleanGlobalEffects = function (e) {
            var e_8, _a;
            _this.updatePosition(e);
            var revealEffectMap = _this.props.theme.revealEffectMap;
            try {
                for (var revealEffectMap_5 = __values(revealEffectMap), revealEffectMap_5_1 = revealEffectMap_5.next(); !revealEffectMap_5_1.done; revealEffectMap_5_1 = revealEffectMap_5.next()) {
                    var _b = __read(revealEffectMap_5_1.value, 1), borderCanvas = _b[0];
                    var borderCtx = borderCanvas.getContext("2d");
                    borderCtx.clearRect(0, 0, borderCanvas.width, borderCanvas.height);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (revealEffectMap_5_1 && !revealEffectMap_5_1.done && (_a = revealEffectMap_5.return)) _a.call(revealEffectMap_5);
                }
                finally { if (e_8) throw e_8.error; }
            }
        };
        _this.reflowPropertyNames = ["transform", "left", "width", "top", "right", "width", "height"];
        _this.transitionRunThrottle = new Throttle_1.Throttle({
            runFunc: function () {
                _this.handleDrawGlobalEffect(_this.currPosition);
            }
        });
        _this.handleTransitionRun = function (e) {
            var e_9, _a;
            var propertyName = e.propertyName;
            var revealEffectMap = _this.props.theme.revealEffectMap;
            var transitionEl = e.target;
            if (_this.reflowPropertyNames.includes(propertyName)) {
                try {
                    for (var revealEffectMap_6 = __values(revealEffectMap), revealEffectMap_6_1 = revealEffectMap_6.next(); !revealEffectMap_6_1.done; revealEffectMap_6_1 = revealEffectMap_6.next()) {
                        var _b = __read(revealEffectMap_6_1.value, 2), borderCanvas = _b[0], revealConfig = _b[1];
                        if (transitionEl.contains(borderCanvas) && revealConfig.observerTransition === propertyName) {
                            _this.transitionRunThrottle.startRunFunc();
                            break;
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (revealEffectMap_6_1 && !revealEffectMap_6_1.done && (_a = revealEffectMap_6.return)) _a.call(revealEffectMap_6);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
        };
        _this.handleTransitionEnd = function (e) {
            var e_10, _a;
            var propertyName = e.propertyName;
            var revealEffectMap = _this.props.theme.revealEffectMap;
            var transitionEl = e.target;
            if (_this.reflowPropertyNames.includes(propertyName)) {
                try {
                    for (var revealEffectMap_7 = __values(revealEffectMap), revealEffectMap_7_1 = revealEffectMap_7.next(); !revealEffectMap_7_1.done; revealEffectMap_7_1 = revealEffectMap_7.next()) {
                        var _b = __read(revealEffectMap_7_1.value, 2), borderCanvas = _b[0], revealConfig = _b[1];
                        if (transitionEl.contains(borderCanvas) && revealConfig.observerTransition === propertyName) {
                            _this.transitionRunThrottle.endRunFunc();
                            _this.handleDrawGlobalEffect(_this.currPosition);
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (revealEffectMap_7_1 && !revealEffectMap_7_1.done && (_a = revealEffectMap_7.return)) _a.call(revealEffectMap_7);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        };
        return _this;
    }
    GlobalRevealStore.prototype.componentDidMount = function () {
        var e_11, _a;
        this.initAll();
        var revealEffectMap = this.props.theme.revealEffectMap;
        try {
            for (var revealEffectMap_8 = __values(revealEffectMap), revealEffectMap_8_1 = revealEffectMap_8.next(); !revealEffectMap_8_1.done; revealEffectMap_8_1 = revealEffectMap_8.next()) {
                var _b = __read(revealEffectMap_8_1.value, 2), borderCanvas = _b[0], revealConfig = _b[1];
                if (revealConfig.observerResize)
                    this.resizeObserver.observe(borderCanvas.parentElement);
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (revealEffectMap_8_1 && !revealEffectMap_8_1.done && (_a = revealEffectMap_8.return)) _a.call(revealEffectMap_8);
            }
            finally { if (e_11) throw e_11.error; }
        }
    };
    GlobalRevealStore.prototype.componentWillUnmount = function () {
        this.unInitAll();
    };
    GlobalRevealStore.prototype.initAll = function () {
        this.addGlobalListeners();
    };
    GlobalRevealStore.prototype.unInitAll = function () {
        this.removeGlobalListeners();
    };
    GlobalRevealStore.prototype.updatePosition = function (e) {
        if (!e)
            return this.currPosition;
        var clientX = e.clientX, clientY = e.clientY;
        if (clientX !== void 0 && clientY !== void 0) {
            this.currPosition = { clientX: clientX, clientY: clientY };
        }
        return this.currPosition;
    };
    GlobalRevealStore.prototype.showRenderCanvas = function (canvasEl) {
        var parentElement = canvasEl.parentElement;
        if (parentElement) {
            var _a = window.getComputedStyle(parentElement), pointerEvents = _a.pointerEvents, visibility = _a.visibility, display = _a.display, opacity = _a.opacity;
            return pointerEvents !== "none" && visibility !== "hidden" && display !== "none" && opacity !== "0";
        }
        else {
            return false;
        }
    };
    GlobalRevealStore.prototype.addGlobalListeners = function () {
        window.addEventListener("click", this.handleDrawGlobalEffect, true);
        window.addEventListener("mouseenter", this.handleDrawGlobalEffect, true);
        window.addEventListener("mouseover", this.handleDrawGlobalEffect, true);
        window.addEventListener("mousemove", this.handleDrawGlobalEffect, true);
        window.addEventListener("touchstart", this.handleDrawGlobalEffect, true);
        window.addEventListener("touchmove", this.handleDrawGlobalEffect, true);
        window.addEventListener("mouseout", this.cleanGlobalEffects, true);
        window.addEventListener("mouseleave", this.cleanGlobalEffects, true);
        window.addEventListener("touchend", this.cleanGlobalEffects, true);
        document.body.addEventListener("transitionstart", this.handleTransitionRun, false);
        document.body.addEventListener("transitionrun", this.handleTransitionRun, false);
        document.body.addEventListener("transitionend", this.handleTransitionEnd, false);
    };
    GlobalRevealStore.prototype.removeGlobalListeners = function () {
        window.removeEventListener("click", this.handleDrawGlobalEffect, true);
        window.removeEventListener("mouseenter", this.handleDrawGlobalEffect, true);
        window.removeEventListener("mouseover", this.handleDrawGlobalEffect, true);
        window.removeEventListener("mousemove", this.handleDrawGlobalEffect, true);
        window.removeEventListener("touchstart", this.handleDrawGlobalEffect, true);
        window.removeEventListener("touchmove", this.handleDrawGlobalEffect, true);
        window.removeEventListener("mouseout", this.cleanGlobalEffects, true);
        window.removeEventListener("mouseleave", this.cleanGlobalEffects, true);
        window.removeEventListener("touchend", this.cleanGlobalEffects, true);
        document.body.removeEventListener("transitionstart", this.handleTransitionRun, false);
        document.body.removeEventListener("transitionrun", this.handleTransitionRun, false);
        document.body.removeEventListener("transitionend", this.handleTransitionEnd, false);
    };
    GlobalRevealStore.prototype.render = function () {
        var _this = this;
        var theme = this.props.theme;
        theme.onAddBorderCanvas = function (borderCanvas, revealConfig) {
            if (revealConfig.observerResize)
                _this.resizeObserver.observe(borderCanvas.parentElement);
        };
        return null;
    };
    return GlobalRevealStore;
}(React.Component));
exports.GlobalRevealStore = GlobalRevealStore;
exports.default = GlobalRevealStore;
//# sourceMappingURL=GlobalRevealStore.js.map