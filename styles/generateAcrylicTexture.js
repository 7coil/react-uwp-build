"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stackBlurCanvas = require("stackblur-canvas");
var tinycolor2 = require("tinycolor2");
var canvasHelper_1 = require("../utils/canvasHelper");
var acrylicTextureMap = new Map();
function generateAcrylicTexture(config) {
    var image = config.image, tintColor = config.tintColor, blurSize = config.blurSize, callback = config.callback;
    blurSize = blurSize || 24;
    var configStr = JSON.stringify({ image: image, tintColor: tintColor, blurSize: blurSize });
    var acrylicTexture = acrylicTextureMap.get(configStr);
    function updateAcrylicTexture() {
        if (callback)
            callback(acrylicTexture.texture, acrylicTexture.isCanvasFilter);
        acrylicTextureMap.set(configStr, acrylicTexture);
    }
    if (acrylicTexture) {
        callback(acrylicTexture.texture, acrylicTexture.isCanvasFilter);
        return;
    }
    else {
        acrylicTexture = {};
    }
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var imageNode = new Image();
    imageNode.crossOrigin = "Anonymous";
    imageNode.src = image;
    imageNode.onload = function () {
        var naturalWidth = imageNode.naturalWidth, naturalHeight = imageNode.naturalHeight;
        if (naturalWidth > 1000) {
            naturalHeight = naturalHeight / naturalWidth * 1000;
            naturalWidth = 1000;
        }
        if (naturalHeight > 1000) {
            naturalWidth = naturalWidth / naturalHeight * 1000;
            naturalHeight = 1000;
        }
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
        var fillRect = function () {
            context.fillStyle = tinycolor2(tintColor).toRgbString();
            context.fillRect(0, 0, naturalWidth, naturalHeight);
        };
        var drawImage = function () {
            context.drawImage(imageNode, 0, 0, naturalWidth, naturalHeight);
        };
        // const now = performance.now();
        // blur image.
        var isCanvasFilter = false && "filter" in context; // canvas filter is not good.
        if (isCanvasFilter) {
            context.filter = "blur(" + blurSize + "px)";
            drawImage();
            context.filter = "blur(0px)";
            fillRect();
        }
        else {
            drawImage();
            stackBlurCanvas.canvasRGBA(canvas, 0, 0, naturalWidth, naturalHeight, blurSize);
            fillRect();
        }
        // console.log(performance.now() - now);
        canvasHelper_1.toUrl(canvas, function (imageUrl) {
            acrylicTexture.texture = imageUrl;
            acrylicTexture.isCanvasFilter = isCanvasFilter;
            updateAcrylicTexture();
        });
    };
}
exports.default = generateAcrylicTexture;
function generateNoise(canvas, context, width, height, noiseSize, opacity) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var numb = Math.floor(Math.random() * 60);
            context.fillStyle = "rgba(" + numb + ", " + numb + ", " + numb + ", " + opacity + ")";
            context.fillRect(x, y, noiseSize, noiseSize);
        }
    }
    return context.getImageData(0, 0, width, height);
}
//# sourceMappingURL=generateAcrylicTexture.js.map