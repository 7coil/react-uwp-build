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
exports.ContentDialog = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var shallowEqual_1 = require("../utils/shallowEqual");
var Button_1 = require("../Button");
var IconButton_1 = require("../IconButton");
var RenderToBody_1 = require("../RenderToBody");
var emptyFunc = function () { };
var iconButtonHoverStyle = { background: "#d00f2a", color: "#fff" };
var ContentDialog = /** @class */ (function (_super) {
    __extends(ContentDialog, _super);
    function ContentDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showDialog: _this.props.defaultShow
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.addBlurEventMethod = function () {
            _this.addBlurEvent.setConfig({
                addListener: _this.state.showDialog,
                clickExcludeElm: _this.rootElm,
                blurCallback: function () {
                    _this.setState({
                        showDialog: false
                    });
                    _this.props.onCloseDialog();
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        _this.containerMouseEnterHandle = function (e) {
            e.currentTarget.style.border = "1px solid " + _this.context.theme.accent;
        };
        _this.containerMouseLeaveHandle = function (e) {
            e.currentTarget.style.border = "1px solid " + _this.context.theme.baseLow;
        };
        _this.closeDialog = function () {
            _this.setState({ showDialog: false });
            _this.props.onCloseDialog();
        };
        return _this;
    }
    ContentDialog.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var shouldUpdate = !shallowEqual_1.default(nextProps, this.props);
        if (shouldUpdate) {
            this.state.showDialog = nextProps.defaultShow;
        }
        return shouldUpdate;
    };
    ContentDialog.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    ContentDialog.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
    };
    ContentDialog.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    ContentDialog.prototype.render = function () {
        var _this = this;
        var _a = this.props, statusBarTitle = _a.statusBarTitle, title = _a.title, primaryButtonText = _a.primaryButtonText, secondaryButtonText = _a.secondaryButtonText, defaultShow = _a.defaultShow, showCloseButton = _a.showCloseButton, content = _a.content, contentNode = _a.contentNode, primaryButtonAction = _a.primaryButtonAction, secondaryButtonAction = _a.secondaryButtonAction, closeButtonAction = _a.closeButtonAction, onCloseDialog = _a.onCloseDialog, background = _a.background, padding = _a.padding, className = _a.className, attributes = __rest(_a, ["statusBarTitle", "title", "primaryButtonText", "secondaryButtonText", "defaultShow", "showCloseButton", "content", "contentNode", "primaryButtonAction", "secondaryButtonAction", "closeButtonAction", "onCloseDialog", "background", "padding", "className"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "content-dialog",
            styles: inlineStyles
        });
        return (React.createElement(RenderToBody_1.default, { ref: function (renderToBody) { return _this.renderToBody = renderToBody; } },
            React.createElement("div", __assign({}, attributes, { style: styles.mask.style, className: theme.classNames(styles.mask.className, className) }),
                React.createElement("div", __assign({ ref: function (rootElm) { return _this.rootElm = rootElm; } }, styles.container, { onMouseEnter: this.containerMouseEnterHandle, onMouseLeave: this.containerMouseLeaveHandle }),
                    statusBarTitle && React.createElement("div", __assign({}, styles.statusBar),
                        React.createElement("p", __assign({}, styles.statusBarTitle), statusBarTitle),
                        showCloseButton
                            ?
                                React.createElement(IconButton_1.default, { onClick: closeButtonAction, size: 24, style: inlineStyles.iconButton, hoverStyle: iconButtonHoverStyle, activeStyle: iconButtonHoverStyle }, "\uE894")
                            : null),
                    React.createElement("div", __assign({}, styles.titleWrapper),
                        title ? React.createElement("h5", __assign({}, styles.title), title) : null,
                        content && React.createElement("p", null, content)),
                    contentNode,
                    React.createElement("div", __assign({}, styles.content), (primaryButtonText || secondaryButtonText) && React.createElement("div", __assign({}, styles.buttonGroup),
                        primaryButtonText && React.createElement(Button_1.default, { onClick: function (e) { primaryButtonAction(e), _this.closeDialog(); }, style: inlineStyles.button }, primaryButtonText),
                        secondaryButtonText && React.createElement(Button_1.default, { onClick: function (e) { secondaryButtonAction(e), _this.closeDialog(); }, style: inlineStyles.button }, secondaryButtonText)))))));
    };
    ContentDialog.defaultProps = {
        primaryButtonText: "Delete",
        secondaryButtonText: "Cancel",
        closeButtonAction: emptyFunc,
        primaryButtonAction: emptyFunc,
        secondaryButtonAction: emptyFunc,
        onCloseDialog: emptyFunc,
        padding: 16
    };
    ContentDialog.contextTypes = { theme: PropTypes.object };
    return ContentDialog;
}(React.Component));
exports.ContentDialog = ContentDialog;
function getStyles(contentDialog) {
    var context = contentDialog.context, _a = contentDialog.props, style = _a.style, background = _a.background, padding = _a.padding, primaryButtonText = _a.primaryButtonText, secondaryButtonText = _a.secondaryButtonText, showDialog = contentDialog.state.showDialog;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    return {
        mask: prefixStyle(__assign({ lineHeight: 1.6, margin: 0, padding: 0, zIndex: 2000, opacity: showDialog ? 1 : 0, pointerEvents: showDialog ? "all" : "none", position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", fontSize: 14, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", color: theme.baseHigh, background: theme.altMediumHigh, transition: "all .25s " + (showDialog ? 0 : 0.25) + "s ease-in-out" }, style)),
        container: prefixStyle(__assign(__assign({}, theme.acrylicTexture80.style), { border: "1px solid " + theme.baseLow, flex: "0 0 auto", width: "80%", maxWidth: 720, cursor: "default", transform: "scale(" + (showDialog ? 1 : 0) + ")", opacity: showDialog ? 1 : 0, transition: "all .25s " + (showDialog ? 0.25 : 0) + "s ease-in-out" })),
        statusBar: prefixStyle({
            color: "#fff",
            background: theme.accent,
            height: 28,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 18
        }),
        statusBarTitle: {
            fontSize: 12,
            lineHeight: "28x"
        },
        iconButton: prefixStyle({
            color: "#fff",
            display: "flex",
            alignSelf: "flex-start",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            width: 40,
            lineHeight: "28px",
            height: 28
        }),
        content: prefixStyle({
            boxSizing: "border-box",
            width: "100%",
            padding: padding,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between"
        }),
        titleWrapper: {
            padding: padding,
            minHeight: 160
        },
        title: {
            fontWeight: 500,
            fontSize: 18,
            margin: 0
        },
        buttonGroup: prefixStyle({
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }),
        button: {
            width: (primaryButtonText && secondaryButtonText) ? "calc(50% - 2px)" : "100%"
        }
    };
}
exports.default = ContentDialog;
//# sourceMappingURL=index.js.map