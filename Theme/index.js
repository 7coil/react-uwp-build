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
exports.Theme = exports.getTheme = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var handleScrollReveal_1 = require("./handleScrollReveal");
var darkTheme_1 = require("../styles/darkTheme");
var getTheme_1 = require("../styles/getTheme");
exports.getTheme = getTheme_1.default;
var RenderToBody_1 = require("../RenderToBody");
var ToastWrapper_1 = require("../Toast/ToastWrapper");
var getBaseCSSText_1 = require("../styles/getBaseCSSText");
var getAcrylicTextureStyle_1 = require("../styles/getAcrylicTextureStyle");
var GlobalRevealStore_1 = require("../RevealEffect/GlobalRevealStore");
var Throttle_1 = require("../utils/Throttle");
var supportedBackdropFilter = getAcrylicTextureStyle_1.isSupportBackdropFilter();
var desktopBgDefaultConfig = {
    enableRender: true,
    renderToScreen: true
};
var themeCallback = function () { };
var Theme = /** @class */ (function (_super) {
    __extends(Theme, _super);
    function Theme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.useUpdateTheme = false;
        _this.handleThemeUpdate = function (theme) {
            _this.props.themeWillUpdate(theme);
        };
        _this.state = {
            currTheme: _this.getThemeFromProps(_this.props)
        };
        _this.updateTheme = function (currTheme) {
            _this.useUpdateTheme = true;
            var prevTheme = _this.state.currTheme;
            _this.setThemeHelper(currTheme, prevTheme, function (newTheme) {
                _this.mergeStyleManager(newTheme, prevTheme);
                _this.setState({ currTheme: newTheme });
            });
        };
        _this.scrollThrottle = new Throttle_1.Throttle();
        _this.handleScrollReveal = function (e) {
            if (!_this.scrollThrottle.shouldFunctionRun())
                return;
            e.stopPropagation();
            e.preventDefault();
            handleScrollReveal_1.handleScrollReveal(_this.state.currTheme);
        };
        return _this;
    }
    Theme.prototype.getThemeFromProps = function (props) {
        var theme = props.theme;
        var currTheme = theme || darkTheme_1.default;
        // this.mergeStyleManager(currTheme);
        return currTheme;
    };
    Theme.prototype.getChildContext = function () {
        return { theme: this.state.currTheme };
    };
    Theme.prototype.componentDidMount = function () {
        var _this = this;
        this.setThemeHelper(this.state.currTheme, null, function (newTheme) {
            _this.setState({ currTheme: newTheme });
        });
        this.updateAllCSSToEl();
        window.addEventListener("scroll", this.handleScrollReveal);
    };
    Theme.prototype.componentDidUpdate = function () {
        this.updateAllCSSToEl();
    };
    Theme.prototype.componentWillUnmount = function () {
        window.removeEventListener("scroll", this.handleScrollReveal);
        var _a = this.state.currTheme, acrylicTexture40 = _a.acrylicTexture40, acrylicTexture60 = _a.acrylicTexture60, acrylicTexture80 = _a.acrylicTexture80;
        // URL.revokeObjectURL(acrylicTexture40.background);
        // URL.revokeObjectURL(acrylicTexture60.background);
        // URL.revokeObjectURL(acrylicTexture80.background);
    };
    Theme.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        var currTheme = this.getThemeFromProps(nextProps);
        var prevTheme = this.state.currTheme;
        if (currTheme !== prevTheme && !this.useUpdateTheme) {
            this.setThemeHelper(currTheme, prevTheme, function (newTheme) {
                _this.mergeStyleManager(newTheme, prevTheme);
                _this.setState({ currTheme: newTheme });
            });
        }
    };
    Theme.prototype.updateAllCSSToEl = function () {
        // const now = performance.now();
        if (this.styleEl) {
            this.state.currTheme.styleManager.insertAllRule2el(this.styleEl);
        }
        // console.log(performance.now() - now);
    };
    Theme.prototype.setStyleManagerUpdate = function (theme) {
        var _this = this;
        theme.styleManager.onAddRules = (function (rules) {
            rules.forEach(function (inserted, rule) {
                if (!inserted) {
                    theme.styleManager.insertRule2el(_this.styleEl, rule);
                    rules.set(rule, true);
                }
            });
        });
        theme.styleManager.onRemoveRules = (function (rules) {
            rules.forEach(function (inserted, rule) {
                if (inserted) {
                    theme.styleManager.deleteRule2el(_this.styleEl, rule);
                    rules.set(rule, false);
                }
            });
        });
    };
    Theme.prototype.mergeStyleManager = function (newTheme, prevTheme) {
        if (prevTheme) {
            this.removeCSSText4theme(prevTheme);
            prevTheme.styleManager.allRules.forEach(function (inserted, rule) {
                newTheme.styleManager.allRules.set(rule, inserted);
            });
        }
        this.setStyleManagerUpdate(newTheme);
        this.addCSSText2theme(newTheme);
    };
    Theme.prototype.removeCSSText4theme = function (theme) {
        var enableGlobalThemeCSSText = this.props.enableGlobalThemeCSSText;
        var selector = theme ? "." + theme.themeClassName : "";
        var themeBaseCSSText = getBaseCSSText_1.getThemeBaseCSS(theme, enableGlobalThemeCSSText ? "" : selector);
        theme.styleManager.removeCSSText(themeBaseCSSText);
    };
    Theme.prototype.addCSSText2theme = function (theme) {
        var enableGlobalThemeCSSText = this.props.enableGlobalThemeCSSText;
        var selector = theme ? "." + theme.themeClassName : "";
        theme.styleManager.addCSSText(getBaseCSSText_1.getBaseCSS());
        theme.styleManager.addCSSText(getBaseCSSText_1.getThemeBaseCSS(theme, enableGlobalThemeCSSText ? "" : selector));
    };
    Theme.prototype.setThemeHelper = function (theme, prevTheme, themeCallback) {
        var _this = this;
        var _a = this.props, enableNoiseTexture = _a.enableNoiseTexture, forceGenerateAcrylicTextures = _a.forceGenerateAcrylicTextures;
        this.mergeStyleManager(theme, prevTheme);
        Object.assign(theme, {
            updateTheme: this.updateTheme,
            onToastsUpdate: function (toasts) {
                var toastWrapper = _this.toastWrapper;
                if (toastWrapper) {
                    toastWrapper.setState(function () { return ({
                        toastEls: toasts.map(function (toast) { return toast.virtualRender(); })
                    }); });
                }
            }
        });
        if (theme.useFluentDesign) {
            if (theme.desktopBackground && (!supportedBackdropFilter || forceGenerateAcrylicTextures)) {
                if (enableNoiseTexture) {
                    theme.generateBackgroundTexture(function (currTheme) {
                        currTheme.generateAcrylicTextures(themeCallback);
                    });
                }
                else {
                    theme.generateAcrylicTextures(themeCallback);
                }
            }
            else if (enableNoiseTexture) {
                theme.generateBackgroundTexture(themeCallback);
            }
        }
        else if (enableNoiseTexture) {
            theme.generateBackgroundTexture(themeCallback);
        }
    };
    Theme.prototype.render = function () {
        var _this = this;
        var _a = this.props, theme = _a.theme, desktopBackgroundConfig = _a.desktopBackgroundConfig, children = _a.children, style = _a.style, className = _a.className, themeWillUpdate = _a.themeWillUpdate, forceGenerateAcrylicTextures = _a.forceGenerateAcrylicTextures, enableNoiseTexture = _a.enableNoiseTexture, enableGlobalThemeCSSText = _a.enableGlobalThemeCSSText, enableCDN = _a.enableCDN, attributes = __rest(_a, ["theme", "desktopBackgroundConfig", "children", "style", "className", "themeWillUpdate", "forceGenerateAcrylicTextures", "enableNoiseTexture", "enableGlobalThemeCSSText", "enableCDN"]);
        var currTheme = this.state.currTheme;
        desktopBackgroundConfig = desktopBackgroundConfig || desktopBgDefaultConfig;
        var enableRender = desktopBackgroundConfig.enableRender, renderToScreen = desktopBackgroundConfig.renderToScreen;
        var styles = getStyles(this);
        var classes = currTheme.prepareStyles({
            className: "theme",
            styles: styles
        });
        return (React.createElement("div", __assign({}, attributes, { style: classes.root.style, className: currTheme.classNames(className, classes.root.className, currTheme.themeClassName) }),
            enableCDN && (React.createElement("link", { key: "not-change", rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/react-uwp/1.1.0/css/segoe-mdl2-assets.css" })),
            React.createElement("style", { type: "text/css", ref: function (styleEl) { return _this.styleEl = styleEl; } }),
            enableRender && (renderToScreen ? React.createElement(RenderToBody_1.default, __assign({}, classes.desktopBackground)) : React.createElement("div", __assign({}, classes.desktopBackground))),
            React.createElement(RenderToBody_1.default, null,
                React.createElement(ToastWrapper_1.default, { toastEls: Array.from(currTheme.toasts.keys()).map(function (toast) { return toast.virtualRender(); }), ref: function (toastWrapper) { return _this.toastWrapper = toastWrapper; } })),
            children,
            React.createElement(GlobalRevealStore_1.default, { theme: currTheme })));
    };
    Theme.defaultProps = {
        desktopBackgroundConfig: desktopBgDefaultConfig,
        themeWillUpdate: themeCallback,
        forceGenerateAcrylicTextures: true,
        enableCDN: true,
        enableNoiseTexture: false,
        enableGlobalThemeCSSText: true
    };
    Theme.childContextTypes = {
        theme: PropTypes.object
    };
    return Theme;
}(React.Component));
exports.Theme = Theme;
function getStyles(context) {
    var currTheme = context.state.currTheme;
    var _a = context.props, style = _a.style, desktopBackgroundConfig = _a.desktopBackgroundConfig;
    desktopBackgroundConfig = desktopBackgroundConfig || desktopBgDefaultConfig;
    var enableRender = desktopBackgroundConfig.enableRender, renderToScreen = desktopBackgroundConfig.renderToScreen;
    var isInsideBg = enableRender && !renderToScreen;
    return {
        root: __assign({ position: "relative", overflow: isInsideBg ? "hidden" : void 0, fontSize: 14, fontFamily: currTheme.fonts.sansSerifFonts, color: currTheme.baseHigh, display: "inline-block", verticalAlign: "middle", background: currTheme.useFluentDesign ? "tranparent" : currTheme.altHigh, width: "100%", height: "100%" }, style),
        desktopBackground: {
            position: isInsideBg ? "absolute" : "fixed",
            zIndex: -1,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: (currTheme.useFluentDesign && currTheme.desktopBackgroundImage) ? currTheme.desktopBackground : currTheme.altHigh,
            pointerEvents: "none"
        }
    };
}
exports.default = Theme;
//# sourceMappingURL=index.js.map