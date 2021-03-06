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
exports.NavigationView = exports.SplitViewCommand = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var shallowEqual_1 = require("../utils/shallowEqual");
var SlideInOut_1 = require("../Animate/SlideInOut");
var IconButton_1 = require("../IconButton");
var SplitViewCommand_1 = require("../SplitViewCommand");
exports.SplitViewCommand = SplitViewCommand_1.default;
var NavigationView = /** @class */ (function (_super) {
    __extends(NavigationView, _super);
    function NavigationView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            expanded: false,
            focusNodeIndex: _this.props.focusNavigationNodeIndex,
            currDisplayMode: _this.props.displayMode,
            currInitWidth: _this.props.initWidth
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.addBlurEventMethod = function () {
            _this.addBlurEvent.setConfig({
                addListener: _this.state.expanded,
                clickExcludeElm: _this.paneElm,
                blurCallback: function () {
                    _this.setState({
                        expanded: false
                    });
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        _this.autoResize = function (e) {
            if (window.innerWidth < 1280) {
                if (_this.state.currDisplayMode !== "compact") {
                    _this.setState({
                        currDisplayMode: "compact",
                        currInitWidth: 0
                    });
                }
            }
            else {
                if (_this.state.currDisplayMode === "compact") {
                    _this.setState({
                        currDisplayMode: "minimal",
                        currInitWidth: 48
                    });
                }
            }
        };
        _this.updateProps2State = function (_a) {
            var defaultExpanded = _a.defaultExpanded;
            if (defaultExpanded !== _this.state.expanded) {
                _this.setState({ expanded: defaultExpanded });
            }
        };
        _this.toggleExpanded = function (expanded) {
            if (typeof expanded === "boolean" && expanded !== _this.state.expanded) {
                _this.setState({ expanded: expanded });
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({ expanded: !prevState.expanded }); });
            }
        };
        _this.getNewNodeProps = function (currNode, index, expanded, haveExpandedNode) {
            var onClick = currNode.props.onClick;
            var isSplitViewCommand = currNode && currNode.type === SplitViewCommand_1.default;
            var focusNodeIndex = _this.state.focusNodeIndex;
            var props = {
                key: index + " " + expanded,
                visited: focusNodeIndex === void 0 ? void 0 : focusNodeIndex === index,
                onClick: function (e) {
                    _this.setState({
                        focusNodeIndex: index,
                        expanded: haveExpandedNode ? true : _this.state.expanded
                    });
                    if (onClick)
                        onClick(e);
                }
            };
            if (isSplitViewCommand) {
                props.showLabel = _this.state.expanded;
            }
            return props;
        };
        return _this;
    }
    NavigationView.prototype.componentWillMount = function () {
        this.updateProps2State(this.props);
    };
    NavigationView.prototype.componentDidMount = function () {
        if (this.props.autoResize) {
            this.autoResize();
            window.addEventListener("resize", this.autoResize);
        }
        if (!this.props.isControlled)
            this.addBlurEventMethod();
    };
    NavigationView.prototype.componentDidUpdate = function () {
        if (!this.props.isControlled)
            this.addBlurEventMethod();
    };
    NavigationView.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        return !shallowEqual_1.default(nextProps, this.props) || !shallowEqual_1.default(nextState, this.state) || !shallowEqual_1.default(!nextContext, this.context);
    };
    NavigationView.prototype.componentWillUnmount = function () {
        if (this.props.autoResize) {
            window.removeEventListener("resize", this.autoResize);
        }
        this.addBlurEvent.cleanEvent();
    };
    NavigationView.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, topIcon = _a.topIcon, initWidth = _a.initWidth, navigationTopNodes = _a.navigationTopNodes, navigationBottomNodes = _a.navigationBottomNodes, expandedWidth = _a.expandedWidth, children = _a.children, paneStyle = _a.paneStyle, defaultExpanded = _a.defaultExpanded, displayMode = _a.displayMode, pageTitle = _a.pageTitle, background = _a.background, isTenFt = _a.isTenFt, autoResize = _a.autoResize, isControlled = _a.isControlled, focusNavigationNodeIndex = _a.focusNavigationNodeIndex, className = _a.className, attributes = __rest(_a, ["style", "topIcon", "initWidth", "navigationTopNodes", "navigationBottomNodes", "expandedWidth", "children", "paneStyle", "defaultExpanded", "displayMode", "pageTitle", "background", "isTenFt", "autoResize", "isControlled", "focusNavigationNodeIndex", "className"]);
        var theme = this.context.theme;
        var _b = this.state, expanded = _b.expanded, focusNodeIndex = _b.focusNodeIndex, currDisplayMode = _b.currDisplayMode;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "navigation-view",
            styles: inlineStyles
        });
        var nodeIndex = -1;
        var isCompact = currDisplayMode === "compact";
        var renderContent = (React.createElement("div", __assign({}, (isCompact ? void 0 : attributes), { style: styles.root.style, className: theme.classNames(styles.root.className, className) }),
            React.createElement("div", __assign({}, styles.paneParent, { ref: function (paneElm) { return _this.paneElm = paneElm; } }),
                React.createElement("div", __assign({}, styles.pane),
                    React.createElement("div", __assign({}, styles.paneTop),
                        React.createElement("div", __assign({}, styles.topIcon),
                            React.cloneElement(topIcon || (React.createElement(IconButton_1.default, { style: inlineStyles.iconButton, hoverStyle: { background: theme.baseLow }, activeStyle: { background: theme.baseMediumLow } }, "GlobalNavButton")), isControlled ? void 0 : {
                                onClick: function (e) {
                                    _this.toggleExpanded();
                                    if (topIcon && topIcon.props.onClick)
                                        topIcon.props.onclick(e);
                                }
                            }),
                            React.createElement("p", __assign({}, styles.pageTitle), pageTitle)),
                        React.createElement("div", __assign({}, styles.paneTopIcons), navigationTopNodes && navigationTopNodes.map(function (node, index) {
                            var currNode = node;
                            var haveExpandedNode = "expanded" in node;
                            if (node.default)
                                currNode = node.default;
                            if (haveExpandedNode && expanded)
                                currNode = node.expanded;
                            ++nodeIndex;
                            return (React.createElement(SlideInOut_1.default, { appearAnimate: false, mode: "in", direction: "right", key: "" + index, style: { height: 48 } }, React.cloneElement(currNode, _this.getNewNodeProps(currNode, nodeIndex, Boolean(expanded && haveExpandedNode), haveExpandedNode))));
                        }))),
                    React.createElement("div", __assign({}, styles.paneBottomIcons), navigationBottomNodes && navigationBottomNodes.map(function (node, index) {
                        var currNode = node;
                        var haveExpandedNode = "expanded" in node;
                        if (node.default)
                            currNode = node.default;
                        if (haveExpandedNode && expanded)
                            currNode = node.expanded;
                        ++nodeIndex;
                        return (React.createElement(SlideInOut_1.default, { appearAnimate: false, mode: "in", direction: "right", key: "" + index, style: { height: 48 } }, React.cloneElement(currNode, _this.getNewNodeProps(currNode, nodeIndex, Boolean(expanded && haveExpandedNode), haveExpandedNode))));
                    })))),
            React.createElement("div", { style: {
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                } }, children)));
        return renderContent;
    };
    NavigationView.defaultProps = {
        isTenFt: false,
        autoResize: true,
        initWidth: 48,
        expandedWidth: 320,
        displayMode: "compact"
    };
    NavigationView.contextTypes = { theme: PropTypes.object };
    return NavigationView;
}(React.Component));
exports.NavigationView = NavigationView;
function getStyles(NavigationView) {
    var context = NavigationView.context, _a = NavigationView.props, expandedWidth = _a.expandedWidth, style = _a.style, paneStyle = _a.paneStyle, background = _a.background, navigationTopNodes = _a.navigationTopNodes, navigationBottomNodes = _a.navigationBottomNodes, _b = NavigationView.state, currInitWidth = _b.currInitWidth, expanded = _b.expanded, currDisplayMode = _b.currDisplayMode;
    var isOverLay = currDisplayMode === "overlay";
    var isMinimal = currDisplayMode === "minimal";
    var isCompact = currDisplayMode === "compact";
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    var minHeight = isMinimal ? 0 : 48;
    if (navigationTopNodes)
        minHeight += 48 * navigationTopNodes.length;
    if (navigationBottomNodes)
        minHeight += 48 * navigationBottomNodes.length;
    var transition = "width .25s ease-in-out";
    return {
        root: prefixStyle(__assign({ display: isCompact ? "flex" : "inline-block", fontSize: 16, color: theme.baseHigh, height: isCompact ? "100%" : void 0, position: "relative" }, style)),
        topIcon: prefixStyle(__assign(__assign({}, theme.acrylicTexture40.style), { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: isMinimal ? "100%" : expandedWidth, flex: "0 0 auto", zIndex: 1 })),
        pageTitle: prefixStyle({
            paddingLeft: 2,
            opacity: (expanded || isMinimal) ? 1 : 0,
            width: isMinimal ? expandedWidth : "100%",
            wordWrap: "normal",
            whiteSpace: "nowrap",
            overflow: isMinimal ? void 0 : "hidden",
            textOverflow: "ellipsis"
        }),
        paneParent: prefixStyle(__assign(__assign({}, (isMinimal ? theme.acrylicTexture40.style : {})), { display: "inline-block", verticalAlign: "top", width: isMinimal ? "100%" : (isOverLay ? currInitWidth : (expanded ? expandedWidth : currInitWidth)), flex: "0 0 auto", height: isMinimal ? currInitWidth : "100%", zIndex: isOverLay || isMinimal ? 1 : void 0, position: isOverLay ? "absolute" : void 0, top: isOverLay ? 0 : void 0, transition: transition })),
        pane: prefixStyle(__assign(__assign(__assign(__assign(__assign({}, theme.acrylicTexture40.style), { display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", overflow: isMinimal ? void 0 : "hidden", width: expanded ? expandedWidth : (isMinimal ? 0 : currInitWidth) }), (isMinimal ? {
            position: "absolute",
            top: 0,
            left: 0,
        } : void 0)), { height: "100%", transition: transition }), prefixStyle(paneStyle))),
        paneTop: prefixStyle({
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: "0 0 auto"
        }),
        paneTopIcons: prefixStyle({
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            width: (isMinimal && !expanded) ? 0 : expandedWidth,
            flex: "0 0 auto",
            zIndex: 1
        }),
        paneBottomIcons: prefixStyle({
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            width: (isMinimal && !expanded) ? 0 : expandedWidth,
            flex: "0 0 auto",
            zIndex: 1
        }),
        iconButton: {
            cursor: "pointer",
            fontSize: 16,
            width: 48,
            height: 48,
            background: "none"
        }
    };
}
exports.default = NavigationView;
//# sourceMappingURL=index.js.map