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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FadeInOut = void 0;
var React = require("react");
var CustomAnimate_1 = require("./CustomAnimate");
var FadeInOut = /** @class */ (function (_super) {
    __extends(FadeInOut, _super);
    function FadeInOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FadeInOut.prototype.render = function () {
        return React.createElement(CustomAnimate_1.default, __assign({}, this.props));
    };
    FadeInOut.defaultProps = {
        leaveStyle: { opacity: 0 },
        enterStyle: { opacity: 1 }
    };
    return FadeInOut;
}(React.Component));
exports.FadeInOut = FadeInOut;
exports.default = FadeInOut;
//# sourceMappingURL=FadeInOut.js.map