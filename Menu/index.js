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
exports.Menu = exports.MenuItem = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var MenuItem_1 = require("./MenuItem");
exports.MenuItem = MenuItem_1.default;
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    Menu.prototype.render = function () {
        var _a = this.props, menuItemWidth = _a.menuItemWidth, menuItemHeight = _a.menuItemHeight, menuItemHoverStyle = _a.menuItemHoverStyle, children = _a.children, className = _a.className, expandedMethod = _a.expandedMethod, attributes = __rest(_a, ["menuItemWidth", "menuItemHeight", "menuItemHoverStyle", "children", "className", "expandedMethod"]);
        var theme = this.context.theme;
        var styles = getStyles(this);
        var styleClasses = theme.prepareStyle({
            className: "menu",
            style: styles.root,
            extendsClassName: className
        });
        return (React.createElement("div", __assign({}, attributes, styleClasses), children && React.Children.map(children, function (child, index) {
            return child.type === MenuItem_1.default ? React.cloneElement(child, {
                itemWidth: menuItemWidth,
                itemHeight: menuItemHeight,
                hoverStyle: menuItemHoverStyle,
                expandedMethod: expandedMethod
            }) : child;
        })));
    };
    Menu.defaultProps = {
        menuItemHeight: 44,
        menuItemWidth: 240
    };
    Menu.contextTypes = { theme: PropTypes.object };
    return Menu;
}(React.Component));
exports.Menu = Menu;
function getStyles(menu) {
    var theme = menu.context.theme, style = menu.props.style;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign(__assign(__assign({}, theme.acrylicTexture60.style), { width: 240, color: theme.baseHigh, border: "1px solid " + theme.listLow }), style))
    };
}
exports.default = Menu;
//# sourceMappingURL=index.js.map