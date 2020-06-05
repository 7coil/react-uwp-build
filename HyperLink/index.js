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
exports.HyperLink = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var Link_1 = require("../Link");
var HyperLink = /** @class */ (function (_super) {
    __extends(HyperLink, _super);
    function HyperLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HyperLink.prototype.render = function () {
        return (React.createElement(Link_1.default, __assign({}, __assign(__assign({}, this.props), { style: __assign({ position: "relative", lineHeight: 1.8, padding: "2px 4px", textDecoration: "underline" }, this.props.style) }), { children: React.createElement(React.Fragment, null, this.props.children) })));
    };
    HyperLink.contextTypes = { theme: PropTypes.object };
    return HyperLink;
}(React.Component));
exports.HyperLink = HyperLink;
exports.default = HyperLink;
//# sourceMappingURL=index.js.map