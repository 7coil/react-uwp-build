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
exports.Dialog = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var keycode_1 = require("keycode");
var AddBlurEvent_1 = require("../utils/AddBlurEvent");
var RenderToBody_1 = require("../RenderToBody");
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showDialog: _this.props.defaultShow
        };
        _this.addBlurEvent = new AddBlurEvent_1.default();
        _this.toggleShow = function (showDialog) {
            if (typeof showDialog === "undefined") {
                _this.setState(function (prevState, prevProps) { return ({
                    showDialog: prevState.showDialog
                }); });
            }
            else {
                if (showDialog !== _this.state.showDialog)
                    _this.setState({ showDialog: showDialog });
            }
        };
        _this.addBlurEventMethod = function () {
            var _a = _this.props, onCloseDialog = _a.onCloseDialog, isControlled = _a.isControlled;
            _this.addBlurEvent.setConfig({
                addListener: _this.state.showDialog,
                clickIncludeElm: _this.renderToBody.rootElm,
                blurCallback: function () {
                    if (isControlled)
                        return;
                    _this.setState({
                        showDialog: false
                    });
                    if (onCloseDialog)
                        onCloseDialog();
                },
                blurKeyCodes: [keycode_1.codes.esc]
            });
        };
        return _this;
    }
    Dialog.prototype.componentWillReceiveProps = function (nextProps) {
        var defaultShow = nextProps.defaultShow;
        if (this.state.showDialog !== defaultShow) {
            this.setState({ showDialog: defaultShow });
        }
    };
    Dialog.prototype.componentDidMount = function () {
        this.addBlurEventMethod();
    };
    Dialog.prototype.componentDidUpdate = function () {
        this.addBlurEventMethod();
    };
    Dialog.prototype.componentWillUnmount = function () {
        this.addBlurEvent.cleanEvent();
    };
    Dialog.prototype.render = function () {
        var _this = this;
        var _a = this.props, contentStyle = _a.contentStyle, contentEnterStyle = _a.contentEnterStyle, contentLeaveStyle = _a.contentLeaveStyle, defaultShow = _a.defaultShow, children = _a.children, onCloseDialog = _a.onCloseDialog, isControlled = _a.isControlled, style = _a.style, className = _a.className, attributes = __rest(_a, ["contentStyle", "contentEnterStyle", "contentLeaveStyle", "defaultShow", "children", "onCloseDialog", "isControlled", "style", "className"]);
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "dialog",
            styles: inlineStyles
        });
        return (React.createElement(RenderToBody_1.default, __assign({}, attributes, { style: styles.root.style, ref: function (renderToBody) { return _this.renderToBody = renderToBody; }, className: theme.classNames(styles.root.className, className) }),
            React.createElement("div", __assign({ ref: function (rootElm) { return _this.rootElm = rootElm; } }, styles.content), children)));
    };
    Dialog.defaultProps = {
        contentEnterStyle: { transform: "scale(1)" },
        contentLeaveStyle: { transform: "scale(0)" }
    };
    Dialog.contextTypes = { theme: PropTypes.object };
    return Dialog;
}(React.Component));
exports.Dialog = Dialog;
function getStyles(dialog) {
    var context = dialog.context, showDialog = dialog.state.showDialog, _a = dialog.props, style = _a.style, contentStyle = _a.contentStyle, contentEnterStyle = _a.contentEnterStyle, contentLeaveStyle = _a.contentLeaveStyle;
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign(__assign({ color: theme.baseMediumHigh, background: theme.altMediumHigh, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "all .25s", position: "fixed", width: "100%", height: "100%", top: 0, left: 0, zIndex: theme.zIndex.contentDialog }, style), { pointerEvents: showDialog ? "all" : "none", opacity: showDialog ? 1 : 0 })),
        content: prefixStyle(__assign(__assign({ display: "inline-block", transition: "all .25s" }, contentStyle), (showDialog ? contentEnterStyle : contentLeaveStyle)))
    };
}
exports.default = Dialog;
//# sourceMappingURL=index.js.map