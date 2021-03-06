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
exports.CommandBar = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var RevealEffect_1 = require("../RevealEffect");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var AppBarButton_1 = require("../AppBarButton");
var AppBarSeparator_1 = require("../AppBarSeparator");
var ListView_1 = require("../ListView");
var CommandBar = /** @class */ (function (_super) {
    __extends(CommandBar, _super);
    function CommandBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currExpanded: _this.props.expanded
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.addBlurEventMethod = function () {
            _this.addBlurEvent.setConfig({
                addListener: _this.state.currExpanded,
                clickExcludeElm: _this.rootElm,
                blurCallback: function () {
                    _this.setState({
                        currExpanded: false
                    });
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        _this.toggleExpanded = function (currExpanded) {
            if (typeof currExpanded === "boolean") {
                if (currExpanded !== _this.state.currExpanded)
                    _this.setState({ currExpanded: currExpanded });
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({ currExpanded: !prevState.currExpanded }); });
            }
        };
        return _this;
    }
    CommandBar.prototype.componentWillReceiveProps = function (nextProps) {
        var expanded = nextProps.expanded;
        if (this.state.currExpanded !== expanded) {
            this.setState({ currExpanded: expanded });
        }
    };
    CommandBar.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    CommandBar.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
    };
    CommandBar.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    CommandBar.prototype.render = function () {
        var _this = this;
        var _a = this.props, content = _a.content, contentStyle = _a.contentStyle, contentNode = _a.contentNode, labelPosition = _a.labelPosition, primaryCommands = _a.primaryCommands, secondaryCommands = _a.secondaryCommands, flowDirection = _a.flowDirection, expanded = _a.expanded, isMinimal = _a.isMinimal, verticalPosition = _a.verticalPosition, revealConfig = _a.revealConfig, background = _a.background, attributes = __rest(_a, ["content", "contentStyle", "contentNode", "labelPosition", "primaryCommands", "secondaryCommands", "flowDirection", "expanded", "isMinimal", "verticalPosition", "revealConfig", "background"]);
        var currExpanded = this.state.currExpanded;
        var theme = this.context.theme;
        var defaultHeight = isMinimal ? 24 : 48;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "command-bar",
            styles: inlineStyles
        });
        return (React.createElement("div", __assign({}, styles.wrapper, { ref: function (rootElm) { return _this.rootElm = rootElm; } }),
            React.createElement("div", __assign({}, attributes, styles.root),
                (content !== void 0 || contentNode !== void 0) && (React.createElement("div", __assign({}, styles.content), content || contentNode)),
                React.createElement("div", __assign({}, styles.commands),
                    (isMinimal && !currExpanded) || React.Children.toArray(primaryCommands).filter(function (child) { return (child.type === AppBarButton_1.default || child.type === AppBarSeparator_1.default); }).map(function (child, index) { return (React.cloneElement(child, {
                        labelPosition: labelPosition,
                        revealConfig: {
                            effectEnable: "disabled"
                        },
                        key: index,
                        style: child.type === AppBarSeparator_1.default ? {
                            height: 24
                        } : void 0
                    })); }),
                    React.createElement(AppBarButton_1.default, { labelPosition: "bottom", revealConfig: {
                            effectEnable: "disabled"
                        }, style: inlineStyles.moreLegacy, iconStyle: {
                            maxWidth: defaultHeight,
                            height: defaultHeight,
                            lineHeight: isMinimal ? (expanded ? "48px" : "24px") : "48px"
                        }, icon: "MoreLegacy", onClick: this.toggleExpanded }),
                    secondaryCommands && (React.createElement(ListView_1.default, { style: inlineStyles.secondaryCommands, listSource: secondaryCommands.map(function (itemNode) {
                            if (itemNode.type === AppBarSeparator_1.default) {
                                itemNode = React.cloneElement(itemNode, { direction: "row" });
                                return { itemNode: itemNode, disabled: true, style: { padding: "0 8px" } };
                            }
                            return { itemNode: itemNode, onClick: _this.toggleExpanded };
                        }) }))),
                React.createElement(RevealEffect_1.default, __assign({ observerTransition: "height" }, revealConfig)))));
    };
    CommandBar.defaultProps = {
        labelPosition: "bottom",
        verticalPosition: "top"
    };
    CommandBar.contextTypes = { theme: PropTypes.object };
    return CommandBar;
}(React.Component));
exports.CommandBar = CommandBar;
function getStyles(commandBar) {
    var theme = commandBar.context.theme, _a = commandBar.props, style = _a.style, flowDirection = _a.flowDirection, labelPosition = _a.labelPosition, content = _a.content, contentNode = _a.contentNode, contentStyle = _a.contentStyle, primaryCommands = _a.primaryCommands, isMinimal = _a.isMinimal, verticalPosition = _a.verticalPosition, background = _a.background, currExpanded = commandBar.state.currExpanded;
    var prefixStyle = theme.prefixStyle;
    var inBottom = verticalPosition !== "top";
    var notChangeHeight = labelPosition !== "bottom";
    var haveContent = content || contentNode;
    var transition = "all .125s ease-in-out";
    var isReverse = flowDirection === "row-reverse";
    var defaultHeight = isMinimal ? 24 : 48;
    var expandedHeight = 72;
    var changedHeight;
    if (isMinimal) {
        changedHeight = currExpanded ? (notChangeHeight ? 48 : 72) : defaultHeight;
    }
    else {
        changedHeight = (currExpanded && !notChangeHeight && primaryCommands) ? expandedHeight : defaultHeight;
    }
    return {
        wrapper: theme.prefixStyle(__assign({ position: "relative", height: inBottom ? "auto" : defaultHeight, display: "block", zIndex: currExpanded ? theme.zIndex.commandBar : void 0 }, style)),
        root: prefixStyle({
            position: "relative",
            display: "flex",
            flexDirection: flowDirection || (haveContent ? "row" : "row-reverse"),
            alignItems: "flex-start",
            justifyContent: haveContent ? "space-between" : "flex-start",
            fontSize: 14,
            color: theme.baseMediumHigh,
            background: background || (theme.useFluentDesign ? theme.listLow : theme.altHigh),
            height: changedHeight,
            transition: transition
        }),
        content: prefixStyle(__assign({ height: defaultHeight, lineHeight: defaultHeight + "px", paddingLeft: 10, paddingRight: 10 }, contentStyle)),
        commands: prefixStyle({
            display: "flex",
            flexDirection: flowDirection,
            alignItems: "flex-start",
            height: "100%"
        }),
        moreLegacy: theme.prefixStyle({
            height: changedHeight,
            transition: transition
        }),
        secondaryCommands: __assign(__assign({}, theme.acrylicTexture60.style), { width: "auto", maxWidth: 240, zIndex: theme.zIndex.commandBar, position: "absolute", right: isReverse ? void 0 : 0, left: isReverse ? 0 : void 0, top: inBottom ? void 0 : changedHeight, bottom: inBottom ? changedHeight : void 0, transform: "translate3d(0, " + (currExpanded ? 0 : -8) + "px, 0)", opacity: currExpanded ? 1 : 0, pointerEvents: currExpanded ? "all" : "none" })
    };
}
exports.default = CommandBar;
//# sourceMappingURL=index.js.map