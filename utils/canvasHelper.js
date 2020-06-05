"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPatternRegularPolygon = exports.getRegularPolygon = exports.getRadEndPos = exports.rad2deg = exports.deg2rad = exports.isSupportWebGL = exports.toUrl = exports.toBlob = void 0;
function toBlob(canvas, callback) {
    if (HTMLCanvasElement.prototype.toBlob) {
        canvas.toBlob(callback);
    }
    else if (HTMLCanvasElement.prototype["msToBlob"]) {
        var blob = canvas["msToBlob"]();
        if (callback)
            callback(blob);
    }
    else {
        callback(null);
    }
}
exports.toBlob = toBlob;
function toUrl(canvas, callback) {
    toBlob(canvas, function (blob) {
        var imageUrl;
        if (blob) {
            imageUrl = URL.createObjectURL(blob);
        }
        else {
            imageUrl = canvas.toDataURL("image/png");
        }
        if (callback)
            callback(imageUrl);
    });
}
exports.toUrl = toUrl;
var detectCanvas;
var isSupportedWebGL;
function isSupportWebGL() {
    if (isSupportedWebGL !== void 0) {
        return isSupportedWebGL;
    }
    else {
        if (!detectCanvas)
            detectCanvas = document.createElement("canvas");
        var gl = detectCanvas.getContext("webgl") || detectCanvas.getContext("experimental-webgl");
        isSupportedWebGL = Boolean(gl && gl instanceof WebGLRenderingContext);
        return isSupportedWebGL;
    }
}
exports.isSupportWebGL = isSupportWebGL;
function deg2rad(deg) {
    return Math.PI / 180 * deg;
}
exports.deg2rad = deg2rad;
function rad2deg(rad) {
    return rad / Math.PI * 180;
}
exports.rad2deg = rad2deg;
function getRadEndPos(pos, radius, rad) {
    return { x: pos.x + radius * Math.cos(rad), y: pos.y + radius * Math.sin(rad) };
}
exports.getRadEndPos = getRadEndPos;
function getRegularPolygon(center, radius, angleSize) {
    if (center === void 0) { center = { x: 0, y: 0 }; }
    if (radius === void 0) { radius = 1; }
    if (angleSize === void 0) { angleSize = 4; }
    var isDoublePolygon = angleSize % 2 === 0;
    var singleRad = (angleSize - 2) * Math.PI / angleSize;
    var singleAngle = 360 / angleSize;
    var rads = [];
    var angles = [];
    var points = [];
    var offsetRad = isDoublePolygon ? (Math.PI / 2 - singleRad / 2) : Math.PI / 2;
    // Set polygon position is vertical.
    var offsetAngle = isDoublePolygon ? (90 - singleAngle / 2) : 90;
    for (var ind = 0; ind < angleSize; ind++) {
        var rad = (ind * singleRad + offsetRad) % (Math.PI * 2);
        var angle = (ind * singleAngle + offsetAngle) % 360;
        var point = getRadEndPos(center, radius, rad);
        rads.push(rad);
        angles.push(angle);
        points.push(point);
    }
    return {
        rads: rads,
        angles: angles,
        points: points
    };
}
exports.getRegularPolygon = getRegularPolygon;
function isPatternRegularPolygon(sides) {
    var insideAngle = 360 / sides;
    var outSideAngle = 180 - insideAngle;
    // result is [1, 3, 4, 6].
    return 360 % outSideAngle === 0;
}
exports.isPatternRegularPolygon = isPatternRegularPolygon;
//# sourceMappingURL=canvasHelper.js.map