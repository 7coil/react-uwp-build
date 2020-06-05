"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Prefixer = require("inline-style-prefixer");
var IS_NODE_ENV_1 = require("../utils/nodeJS/IS_NODE_ENV");
var StyleManager_1 = require("./StyleManager");
var flexArr = ["flex", "inline-flex"];
var arrayProperties = {
    "flex": "",
    "inline-flex": ""
};
function prefixAll() {
    var prefixer = new Prefixer({ userAgent: navigator.userAgent });
    return function (style) {
        if (style) {
            var prefixedStyle = IS_NODE_ENV_1.default ? Prefixer.prefixAll(style) : prefixer.prefix(style);
            if (IS_NODE_ENV_1.default) {
                var display = style.display;
                if (display && flexArr.includes(display)) {
                    // We can't apply this join with react-dom:
                    // #https://github.com/facebook/react/issues/6467
                    prefixedStyle.display = arrayProperties[display] || (arrayProperties[display] = prefixedStyle.display.map(function (t) { return StyleManager_1.replace2Dashes(t); }).join("; display: "));
                }
            }
            return prefixedStyle;
        }
    };
}
exports.default = prefixAll;
//# sourceMappingURL=prefixAll.js.map