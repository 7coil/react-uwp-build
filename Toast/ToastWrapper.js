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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastWrapper = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var ToastWrapper = /** @class */ (function (_super) {
    __extends(ToastWrapper, _super);
    function ToastWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            toastEls: _this.props.toastEls || []
        };
        return _this;
    }
    ToastWrapper.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, toastEls = _a.toastEls, attributes = __rest(_a, ["style", "className", "toastEls"]);
        var theme = this.context.theme;
        var rootStyleClasses = theme.prepareStyle({
            className: "toast-wrapper",
            style: theme.prefixStyle(__assign({ top: 0, right: 0, height: "100%", width: 360, padding: "10px 4px", position: "fixed", display: "flex", flexDirection: "column-reverse", alignItems: "flex-end", justifyContent: "flex-start", pointerEvents: "none", overflowY: "auto", overflowX: "hidden", zIndex: theme.zIndex.toast }, style)),
            extendsClassName: className
        });
        return (this.state.toastEls && this.state.toastEls.length > 0 && (React.createElement("div", __assign({}, attributes, rootStyleClasses), toastEls.map(function (toastEl, key) { return React.cloneElement(toastEl, { key: key }); }))));
    };
    ToastWrapper.contextTypes = { theme: PropTypes.object };
    return ToastWrapper;
}(React.Component));
exports.ToastWrapper = ToastWrapper;
exports.default = ToastWrapper;
//# sourceMappingURL=ToastWrapper.js.map