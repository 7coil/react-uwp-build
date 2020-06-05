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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCanvasRect = exports.drawHover = exports.drawBorder = exports.createRadialGradient = exports.drawRectAtRange = exports.drawElement2Ctx = exports.DrawType = exports.drawRadiusRect = exports.inRectInside = exports.isRectangleOverlap = exports.getBorderRadius = exports.px2numb = void 0;
var tinyColor = require("tinycolor2");
var easing = require("d3-ease");
function px2numb(px) {
    return px ? Number(px.replace("px", "")) : 0;
}
exports.px2numb = px2numb;
function getBorderRadius(style) {
    return {
        borderTopLeftRadius: px2numb(style.borderTopLeftRadius),
        borderTopRightRadius: px2numb(style.borderTopRightRadius),
        borderBottomLeftRadius: px2numb(style.borderBottomLeftRadius),
        borderBottomRightRadius: px2numb(style.borderBottomRightRadius)
    };
}
exports.getBorderRadius = getBorderRadius;
function isRectangleOverlap(rect1, rect2) {
    return Math.max(rect1.left, rect2.left) < Math.min(rect1.right, rect2.right) && Math.max(rect1.top, rect2.top) < Math.min(rect1.bottom, rect2.bottom);
}
exports.isRectangleOverlap = isRectangleOverlap;
/**
 * Detect cursor is inside to rect.
 * @param position The mouse cursor position.
 * @param rect The DOMRect.
 */
function inRectInside(position, rect) {
    return (position.left > rect.left && position.left < rect.right && position.top > rect.top && position.top < rect.bottom);
}
exports.inRectInside = inRectInside;
function drawRadiusRect(ctx, rect, radius) {
    var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
    var borderTopLeftRadius = radius.borderTopLeftRadius, borderTopRightRadius = radius.borderTopRightRadius, borderBottomLeftRadius = radius.borderBottomLeftRadius, borderBottomRightRadius = radius.borderBottomRightRadius;
    ctx.beginPath();
    // tl start point.
    ctx.moveTo(x, y + borderTopLeftRadius);
    // tl radius.
    ctx.arcTo(x, y, x + borderTopLeftRadius, y, borderTopLeftRadius);
    // top line.
    ctx.lineTo(x + w - borderTopRightRadius, y);
    // tr radius.
    ctx.arcTo(x + w, y, x + w, y + borderTopRightRadius, borderTopRightRadius);
    // right line.
    ctx.lineTo(x + w, y + h - borderBottomRightRadius);
    // br radius.
    ctx.arcTo(x + w, y + h, x + w - borderBottomRightRadius, y + h, borderBottomRightRadius);
    // bottom line.
    ctx.lineTo(x + borderBottomLeftRadius, y + h);
    // bl radius.
    ctx.arcTo(x, y + h, x, y + h - borderBottomLeftRadius, borderBottomLeftRadius);
    // left line.
    ctx.lineTo(x, y + borderTopLeftRadius);
}
exports.drawRadiusRect = drawRadiusRect;
var DrawType;
(function (DrawType) {
    DrawType[DrawType["Fill"] = 0] = "Fill";
    DrawType[DrawType["Stroke"] = 1] = "Stroke";
})(DrawType = exports.DrawType || (exports.DrawType = {}));
function drawElement2Ctx(ctx, element, drawType, renderToScreen) {
    if (drawType === void 0) { drawType = DrawType.Stroke; }
    if (renderToScreen === void 0) { renderToScreen = true; }
    var rect = element.getBoundingClientRect();
    var x = rect.left, y = rect.top, w = rect.width, h = rect.height;
    if (!renderToScreen) {
        x = 0;
        y = 0;
    }
    var style = window.getComputedStyle(element);
    var borderTopWidth = style.borderTopWidth, borderBottomWidth = style.borderBottomWidth, borderLeftWidth = style.borderLeftWidth, borderRightWidth = style.borderRightWidth;
    var _a = __read([borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth].map(function (t) { return Number.parseInt(t); }), 4), topWidth = _a[0], bottomWidth = _a[1], leftWidth = _a[2], rightWidth = _a[3];
    var isExistBorder = [topWidth, bottomWidth, leftWidth, rightWidth].some(function (t) { return Boolean(t); });
    var isStroke = drawType === DrawType.Stroke;
    var borderRadius = getBorderRadius(style);
    if (isStroke) {
        if (isExistBorder) {
            drawRadiusRect(ctx, { x: x, y: y, w: w, h: h }, borderRadius);
            ctx.fill();
            ctx.globalCompositeOperation = "destination-out";
            drawRadiusRect(ctx, { x: x + leftWidth, y: y + topWidth, w: w - leftWidth - rightWidth, h: h - topWidth - bottomWidth }, borderRadius);
            ctx.fill();
        }
        else {
            var offsetWidth = ctx.lineWidth / 2;
            drawRadiusRect(ctx, { x: x + offsetWidth, y: y + offsetWidth, w: w - ctx.lineWidth, h: h - ctx.lineWidth }, borderRadius);
            ctx.closePath();
            ctx.stroke();
        }
    }
    else {
        drawRadiusRect(ctx, { x: x, y: y, w: w, h: h }, borderRadius);
        ctx.fill();
    }
    return ctx;
}
exports.drawElement2Ctx = drawElement2Ctx;
function drawRectAtRange(ctx, config, fillStyle) {
    if (fillStyle === void 0) { fillStyle = "#fff"; }
    var x = config.x, y = config.y, scale = config.scale, size = config.size;
    var width = size * scale;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = fillStyle;
    ctx.scale(width, width);
    ctx.fillRect(-.5, -.5, 1, 1);
    ctx.restore();
}
exports.drawRectAtRange = drawRectAtRange;
function createRadialGradient(ctx, colorStr, timingFunc) {
    if (timingFunc === void 0) { timingFunc = easing.easeQuadInOut; }
    var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    var tColor = tinyColor(colorStr);
    var hsla = tColor.toHsl();
    var hslaStr = tColor.toHslString();
    var step = 0.01;
    for (var x = 1; x > 0; x -= step) {
        var alpha = timingFunc(x);
        gradient.addColorStop(x / 2, "hsla(" + hsla.h + ", " + hsla.h * 100 + "%, " + hsla.l * 100 + "%, " + (1 - alpha) * hsla.a + ")");
    }
    return { hslaStr: hslaStr, gradient: gradient };
}
exports.createRadialGradient = createRadialGradient;
function drawBorder(config) {
    var borderCanvas = config.borderCanvas, hoverSize = config.hoverSize, borderWidth = config.borderWidth, gradient = config.gradient, x = config.x, y = config.y;
    var borderCtx = borderCanvas.getContext("2d");
    borderCtx.clearRect(0, 0, borderCanvas.width, borderCanvas.height);
    borderCtx.globalCompositeOperation = "source-over";
    drawRectAtRange(borderCtx, {
        x: x,
        y: y,
        scale: 1,
        size: hoverSize * 2
    }, gradient);
    borderCtx.globalCompositeOperation = "destination-in";
    borderCtx.lineWidth = borderWidth;
    borderCtx.fillStyle = "#fff";
    borderCtx.strokeStyle = "#fff";
    drawElement2Ctx(borderCtx, borderCanvas.parentElement, DrawType.Stroke, false);
}
exports.drawBorder = drawBorder;
function drawHover(config) {
    var hoverCanvas = config.hoverCanvas, hoverSize = config.hoverSize, gradient = config.gradient, x = config.x, y = config.y;
    var hoverCtx = hoverCanvas.getContext("2d");
    hoverCtx.clearRect(0, 0, hoverCanvas.width, hoverCanvas.height);
    drawRectAtRange(hoverCtx, {
        x: x,
        y: y,
        scale: 1,
        size: hoverSize * 2
    }, gradient);
}
exports.drawHover = drawHover;
function updateCanvasRect(borderCanvasEl) {
    var hoverCanvasEl = borderCanvasEl.previousElementSibling;
    var parentEl = borderCanvasEl.parentElement;
    if (!parentEl)
        return;
    var style = window.getComputedStyle(parentEl);
    var _a = parentEl.getBoundingClientRect(), elWidth = _a.width, elHeight = _a.height;
    var borderTopWidth = style.borderTopWidth, borderLeftWidth = style.borderLeftWidth;
    var btWidth = Number.parseInt(borderTopWidth);
    var blWidth = Number.parseInt(borderLeftWidth);
    var width = elWidth + "px";
    var height = elHeight + "px";
    var isSameBorderEl = borderCanvasEl.width === elWidth && borderCanvasEl.height === elHeight;
    var isSameHoverEl = hoverCanvasEl.width === elWidth && hoverCanvasEl.height === elHeight;
    var currStyle = {
        left: blWidth ? -blWidth + "px" : "0px",
        top: btWidth ? -btWidth + "px" : "0px",
        width: width,
        height: height,
        display: "block"
    };
    if (!isSameBorderEl) {
        Object.assign(borderCanvasEl, { width: elWidth, height: elHeight });
        Object.assign(borderCanvasEl.style, currStyle);
    }
    if (!isSameHoverEl) {
        Object.assign(hoverCanvasEl, { width: elWidth, height: elHeight });
        Object.assign(hoverCanvasEl.style, currStyle);
    }
}
exports.updateCanvasRect = updateCanvasRect;
//# sourceMappingURL=helper.js.map