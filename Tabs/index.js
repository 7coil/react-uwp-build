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
exports.Tabs = exports.Tab = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var Tab_1 = require("./Tab");
exports.Tab = Tab_1.default;
var CustomAnimate_1 = require("../Animate/CustomAnimate");
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tabFocusIndex: _this.props.defaultFocusTabIndex || 0
        };
        return _this;
    }
    Tabs.prototype.componentWillReceiveProps = function (nextProps) {
        var defaultFocusTabIndex = nextProps.defaultFocusTabIndex;
        var tabFocusIndex = this.state.tabFocusIndex;
        if (defaultFocusTabIndex !== void 0 && defaultFocusTabIndex !== tabFocusIndex) {
            this.setState({
                tabFocusIndex: defaultFocusTabIndex
            });
        }
    };
    Tabs.prototype.render = function () {
        var _this = this;
        var _a = this.props, defaultFocusTabIndex = _a.defaultFocusTabIndex, tabTitleStyle = _a.tabTitleStyle, tabTitleFocusStyle = _a.tabTitleFocusStyle, children = _a.children, tabStyle = _a.tabStyle, renderTitle = _a.renderTitle, useAnimate = _a.useAnimate, animateMode = _a.animateMode, animateSpeed = _a.animateSpeed, animateEnterStyle = _a.animateEnterStyle, animateLeaveStyle = _a.animateLeaveStyle, className = _a.className, style = _a.style, attributes = __rest(_a, ["defaultFocusTabIndex", "tabTitleStyle", "tabTitleFocusStyle", "children", "tabStyle", "renderTitle", "useAnimate", "animateMode", "animateSpeed", "animateEnterStyle", "animateLeaveStyle", "className", "style"]);
        var theme = this.context.theme;
        var tabFocusIndex = this.state.tabFocusIndex;
        var childrenArray = React.Children.toArray(children);
        var isAvailableArray = childrenArray && childrenArray.length > 0;
        var tabs = isAvailableArray && childrenArray.filter(function (child) { return child.type && (child.type === Tab_1.default || child.type.displayName === "Tab"); });
        var currTab = tabs && tabs[tabFocusIndex];
        var tabTitle = currTab && currTab.props.title;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "tabs",
            styles: inlineStyles
        });
        var normalRender = (React.createElement("div", __assign({ key: "" + tabFocusIndex }, styles.tabStyle), currTab));
        return (React.createElement("div", __assign({}, attributes, { style: styles.root.style, className: styles.root.className }),
            React.createElement("div", __assign({}, styles.titles), tabs && tabs.map(function (tab, index) {
                var tabTitle = tab.props.title || "Tabs Items " + (index + 1);
                return (React.createElement("span", __assign({}, (index === tabFocusIndex ? styles.titleFocus : styles.title), { key: "" + index, onClick: function () { return _this.setState({ tabFocusIndex: index }); } }), renderTitle(tabTitle)));
            })),
            useAnimate ? (React.createElement(CustomAnimate_1.default, { mode: animateMode, speed: animateSpeed, enterStyle: animateEnterStyle, leaveStyle: animateLeaveStyle, wrapperStyle: __assign({ width: "100%", height: "100%" }, tabStyle), appearAnimate: false }, normalRender)) : normalRender));
    };
    Tabs.defaultProps = {
        renderTitle: function (title) { return title; },
        useAnimate: true,
        animateMode: "in",
        animateSpeed: 500,
        animateEnterStyle: {
            transform: "translateX(0)",
            opacity: 1
        },
        animateLeaveStyle: {
            transform: "translateX(100%)",
            opacity: 0
        }
    };
    Tabs.contextTypes = { theme: PropTypes.object };
    return Tabs;
}(React.Component));
exports.Tabs = Tabs;
function getStyles(Tabs) {
    var theme = Tabs.context.theme, _a = Tabs.props, tabTitleStyle = _a.tabTitleStyle, tabTitleFocusStyle = _a.tabTitleFocusStyle, tabStyle = _a.tabStyle, style = _a.style;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ color: theme.baseMediumHigh, display: "inline-block", verticalAlign: "middle", overflow: "hidden" }, style)),
        titles: prefixStyle({
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            width: "100%",
            overflow: "auto"
        }),
        title: prefixStyle(__assign({ color: theme.baseHigh, borderBottom: "1px solid transparent", fontWeight: "lighter", cursor: "pointer", fontSize: 18, padding: "4px 12px", transition: "all .25s" }, tabTitleStyle)),
        titleFocus: prefixStyle(__assign(__assign(__assign({ color: theme.baseHigh, fontWeight: "lighter", cursor: "pointer", fontSize: 18, padding: "4px 12px", transition: "all .25s" }, tabTitleStyle), { borderBottom: "2px solid " + theme.accent }), tabTitleFocusStyle)),
        tabStyle: prefixStyle(__assign({ width: "100%", height: "100%" }, tabStyle))
    };
}
exports.default = Tabs;
//# sourceMappingURL=index.js.map