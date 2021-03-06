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
exports.MarkdownRender = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var Prism = require("prismjs");
require("prismjs/components/prism-jsx.min.js");
var marked = require("marked");
var prismOkaidiaCSS_1 = require("./prismOkaidiaCSS");
var prismCoyCSS_1 = require("./prismCoyCSS");
var MarkdownRender = /** @class */ (function (_super) {
    __extends(MarkdownRender, _super);
    function MarkdownRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.updateThemeStyle = function () {
            var newCSSText = _this.props.CSSText;
            var theme = _this.context.theme;
            var CSSText = getCSSText(theme, "react-uwp-markdown-" + theme.themeName) + ("\n" + (theme.isDarkTheme ? prismOkaidiaCSS_1.default : prismCoyCSS_1.default)) + newCSSText || "";
            theme.styleManager.addCSSText(CSSText);
        };
        return _this;
    }
    MarkdownRender.prototype.componentWillMount = function () {
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
                try {
                    switch (lang) {
                        case "jsx": {
                            require("prismjs/components/prism-jsx.min.js");
                            break;
                        }
                        case "bash": {
                            require("prismjs/components/prism-bash.min.js");
                            break;
                        }
                        case "css": {
                            require("prismjs/components/prism-css.min.js");
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                catch (err) { }
            }
        });
    };
    MarkdownRender.prototype.componentDidMount = function () {
        this.updateThemeStyle();
    };
    MarkdownRender.prototype.componentDidUpdate = function () {
        this.updateThemeStyle();
    };
    MarkdownRender.prototype.render = function () {
        var _a = this.props, text = _a.text, className = _a.className, attributes = __rest(_a, ["text", "className"]);
        var theme = this.context.theme;
        return (React.createElement("div", null,
            React.createElement("div", __assign({}, attributes, { className: "react-uwp-markdown-" + theme.themeName + " " + (className || ""), dangerouslySetInnerHTML: { __html: marked(text) } }))));
    };
    MarkdownRender.contextTypes = { theme: PropTypes.object };
    return MarkdownRender;
}(React.Component));
exports.MarkdownRender = MarkdownRender;
exports.default = MarkdownRender;
function getCSSText(theme, className) {
    return ("." + className + " {\n  /** background: " + theme.chromeMedium + "; **/\n  color: " + theme.baseMediumHigh + ";\n  font-family: " + theme.fonts.sansSerifFonts.split(", ").map(function (font) { return "\"" + font + "\""; }).join(", ") + ";\n}\n\n." + className + " img {\n  display: block;\n  max-width: 100%;\n  margin: 0 auto;\n}\n\n." + className + " div {\n  letter-spacing: 0px;\n  margin: 0;\n  padding: 0 32px;\n  width: 100%;\n  height: 100%;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n\n." + className + " h1, ." + className + " h2, ." + className + " h3, ." + className + " h4, ." + className + " h5, ." + className + " h6 {\n  line-height: 1.8;\n  font-weight: 300;\n  margin: 16px 0 4px;\n  color: " + theme.baseHigh + ";\n}\n\n." + className + " p {\n  line-height: 1.6;\n  font-size: 14px;\n}\n\n." + className + " strong {\n  color: " + theme.baseHigh + ";\n  font-size: 16px;\n}\n\n." + className + " a {\n  font-size: inherit;\n  color: " + theme.accent + ";\n  font-weight: lighter;\n  text-decoration: none;\n  transition: all .25s;\n}\n\n." + className + " a:hover {\n  text-decoration: underline;\n}\n\n." + className + " h1 {\n  line-height: 2;\n  font-size: 24px;\n  border-bottom: 2px solid " + theme.listAccentMedium + ";\n}\n\n." + className + " h2 {\n  line-height: 2;\n  font-size: 20px;\n  border-bottom: 2px solid " + theme.listAccentMedium + ";\n}\n\n\n." + className + " h3 {\n  font-size: 18px;\n}\n\n." + className + " h4 {\n  font-size: 16px;\n}\n\n." + className + " h5 {\n  font-size: 15px;\n}\n\n." + className + " h6 {\n  font-size: 14px;\n}\n\n." + className + " hr {\n  margin: 8px 0;\n  border: 0;\n  width: 100%;\n  border-top: 1px solid " + theme.listAccentLow + ";\n}\n\n." + className + " ol > li {\n  margin-left: 12px;\n}\n\n." + className + " li {\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n." + className + " blockquote {\n  border-left: 4px solid " + theme.listAccentLow + ";\n  padding-left: 15px;\n  margin: 20px 0px 35px;\n}\n\n." + className + " .language-math {\n  font-size: 24px;\n  color: " + theme.baseHigh + ";\n}\n\n." + className + " .language-math pre {\n  margin: 6px 0 6px;\n  padding: 10px;\n  width: 100%;\n}\n\n." + className + " pre {\n  font-family: " + theme.fonts.sansSerifFonts.split(", ").map(function (font) { return "\"" + font + "\""; }).join(", ") + ";\n  background: none;\n  border: 1px solid " + theme.listLow + ";\n  border-left: 4px solid " + theme.listAccentMedium + ";\n  border-radius: 0;\n  padding: 12px;\n  margin: 10px 0;\n  font-size: 14px;\n  width: 100%;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n\n." + className + " code {\n  font-family: " + theme.fonts.sansSerifFonts.split(", ").map(function (font) { return "\"" + font + "\""; }).join(", ") + ";\n  font-size: inherit;\n  color: " + theme.accent + ";\n  padding: 0px 4px;\n  font-weight: inherit;\n}\n\n." + className + " p > code, ." + className + " h1 > code, ." + className + " h2 > code, ." + className + " h3 > code, ." + className + " h4 > code, ." + className + " h5 > code, ." + className + " h6 > code {\n  background: " + (theme.useFluentDesign ? theme.altMediumLow : theme.altMedium) + ";\n}\n\ncode[class*=\"language-\"], pre[class*=\"language-\"] {\n  " + (theme.isDarkTheme ? ("background: none;") : ("")) + "\n  text-shadow: none;\n  box-shadow: none;\n}\n\n." + className + " table {\n  width: 100%;\n}\n\n." + className + " table, ." + className + " td, ." + className + " th {\n  border-collapse: collapse;\n  border: 1px solid " + theme.altHigh + ";\n  padding: 10px;\n  / ** word-break: break-all; **/\n}\n\n." + className + " table tbody {\n  background: " + theme.baseLow + ";\n}\n\n." + className + " table tr:nth-child(1n) {\n  background: " + theme.altMedium + ";\n}\n\n." + className + " table tr:nth-child(2n) {\n  background: " + theme.altMediumHigh + ";\n}\n\n." + className + " th {\n  vertical-align: middle;\n  border-collapse: collapse;\n  padding: 12px;\n  color: #fff;\n  background: " + theme[theme.isDarkTheme ? "accentDarker1" : "accentLighter1"] + ";\n  border: 1px solid " + theme.altHigh + ";\n}\n\n." + className + " input[type=\"checkbox\"] {\n  width: 18px;\n  height: 18px;\n  vertical-align: middle;\n  opacity: .5;\n  pointer-events: none;\n}\n\n." + className + " li > label {\n  pointer-events: none;\n}\n\n." + className + " ul {\n  margin: 10px 20px;\n}\n ." + className + " .token.operator, ." + className + " .token.entity, ." + className + " .token.url, ." + className + " .token.variable {\n   background: none;\n }\n");
}
//# sourceMappingURL=index.js.map