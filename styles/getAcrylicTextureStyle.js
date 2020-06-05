"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAcrylicTextureStyle = exports.isSupportBackdropFilter = void 0;
var backdropFilterDetector_1 = require("../utils/browser/backdropFilterDetector");
Object.defineProperty(exports, "isSupportBackdropFilter", { enumerable: true, get: function () { return backdropFilterDetector_1.isSupportBackdropFilter; } });
function getAcrylicTextureStyle(config, useFluentDesign) {
    if (useFluentDesign === void 0) { useFluentDesign = true; }
    var tintColor = config.tintColor, blurSize = config.blurSize, background = config.background;
    var style = useFluentDesign ? {
        /**
         * Add theme.baseLow color.
         */
        background: background ? background + ", " + tintColor : tintColor,
        backgroundBlendMode: "exclusion",
        /**
         * Add blur filter.
         */
        backdropFilter: "blur(" + blurSize + "px)",
        transform: "translate3d(0, 0, 0)"
    } : {
        /**
         * Add theme.baseLow color.
         */
        background: background ? "linear-gradient(" + tintColor + ", " + tintColor + "), " + background : tintColor,
        backgroundBlendMode: "overlay",
        transform: "translate3d(0, 0, 0)"
    };
    return style;
}
exports.getAcrylicTextureStyle = getAcrylicTextureStyle;
//# sourceMappingURL=getAcrylicTextureStyle.js.map