"use strict";
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleManager = exports.getStyleValue = exports.replace2Dashes = void 0;
var createHash = require("murmurhash-js/murmurhash3_gc");
var isUnitlessNumber_1 = require("../utils/react/isUnitlessNumber");
var PseudoSelectors_1 = require("./PseudoSelectors");
exports.replace2Dashes = function (key) { return key.replace(/[A-Z]/g, function ($1) { return "-" + $1.toLowerCase(); }); };
exports.getStyleValue = function (key, value) { return (typeof value === "number" && !isUnitlessNumber_1.default[key]) ? value + "px" : value; };
var StyleManager = /** @class */ (function () {
    function StyleManager(config) {
        var _this = this;
        this.sheets = {};
        this.resultCSSText = "";
        this.addedCSSText = {};
        this.allRules = new Map();
        this.ruleIndList = [];
        this.cleanSheets = function () {
            _this.sheets = {};
        };
        this.style2CSSText = function (style) {
            var cssText = "{ ";
            if (style) {
                for (var key in style) {
                    var value = style[key];
                    cssText += exports.replace2Dashes(key) + ": " + exports.getStyleValue(key, value) + ";";
                }
            }
            cssText += " }";
            return cssText;
        };
        this.sheetsToString = function () { return "" + Object.keys(_this.sheets).map(function (id) { return _this.sheets[id].CSSText; }).join(""); };
        this.getAllCSSText = function () { return _this.sheetsToString() + "\n" + _this.resultCSSText; };
        this.addStyle = function (style, className) {
            if (className === void 0) { className = ""; }
            var id = createHash(JSON.stringify(style));
            if (_this.sheets[id]) {
                return _this.sheets[id];
            }
            var classNameWithHash = "" + _this.prefixSelector + className + "-" + id;
            var CSSText = "";
            var mainCSSText = "";
            var pseudoCSSText = "";
            var rules = new Map();
            for (var styleKey in style) {
                if (PseudoSelectors_1.pseudoSelectorMap[styleKey] || styleKey.startsWith("&")) {
                    var extendsStyle = style[styleKey];
                    if (extendsStyle) {
                        var newExtendsCSSText = "." + classNameWithHash + styleKey.slice(1) + " " + _this.style2CSSText(extendsStyle);
                        _this.getRules4allRules(rules, newExtendsCSSText);
                        pseudoCSSText += newExtendsCSSText;
                    }
                }
                else {
                    if (style[styleKey] !== void 0) {
                        mainCSSText += exports.replace2Dashes(styleKey) + ": " + exports.getStyleValue(styleKey, style[styleKey]) + "; ";
                    }
                }
            }
            var currCSSText = "." + classNameWithHash + " { " + mainCSSText + " }";
            _this.getRules4allRules(rules, currCSSText);
            CSSText += currCSSText;
            CSSText += pseudoCSSText;
            _this.sheets[id] = { CSSText: CSSText, classNameWithHash: classNameWithHash, id: id, className: className, rules: rules };
            _this.onAddCSSText(currCSSText + pseudoCSSText);
            _this.onAddRules(rules);
            return _this.sheets[id];
        };
        this.addStyleWithSelector = function (selector, style) {
            var cssText = selector + " " + _this.style2CSSText(style);
            _this.addCSSText(cssText);
        };
        this.addStylesWithSelector = function (styles) {
            for (var selector in styles) {
                var style = styles[selector];
                var cssText = selector + " " + _this.style2CSSText(style);
                _this.addCSSText(cssText);
            }
        };
        this.addCSSText = function (cssText) {
            var hash = createHash(cssText);
            var shouldUpdate = !_this.addedCSSText[hash];
            if (shouldUpdate) {
                _this.resultCSSText += cssText;
                var rules_1 = new Map();
                _this.cssText2rules(cssText, function (currRule) {
                    _this.getRules4allRules(rules_1, currRule);
                });
                _this.addedCSSText[hash] = { CSSText: cssText, rules: rules_1 };
                _this.onAddCSSText(cssText);
                _this.onAddRules(rules_1);
            }
        };
        this.removeCSSText = function (cssText) {
            var hash = createHash(cssText);
            var shouldUpdate = _this.addedCSSText[hash];
            if (shouldUpdate) {
                _this.resultCSSText = _this.resultCSSText.replace(cssText, "");
                var rules_2 = new Map();
                _this.cssText2rules(cssText, function (currRule) {
                    _this.getRules4allRules(rules_2, currRule);
                });
                _this.onRemoveCSSText(cssText);
                _this.onRemoveRules(rules_2);
                delete _this.addedCSSText[hash];
            }
        };
        var prefixClassName = (config || {}).prefixClassName;
        this.prefixSelector = prefixClassName ? prefixClassName + "-" : "";
    }
    StyleManager.prototype.onAddCSSText = function (CSSText) { };
    StyleManager.prototype.onAddRules = function (rules) { };
    StyleManager.prototype.onRemoveRules = function (rules) { };
    StyleManager.prototype.onRemoveCSSText = function (CSSText) { };
    StyleManager.prototype.getRules4allRules = function (rules, rule) {
        if (this.allRules.get(rule)) {
            rules.set(rule, true);
        }
        else {
            rules.set(rule, false);
            this.allRules.set(rule, {
                isInserted: false
            });
        }
    };
    StyleManager.prototype.cleanAllStyles = function () {
        this.cleanSheets();
        this.cleanCSSText();
    };
    StyleManager.prototype.cleanCSSText = function () {
        this.addedCSSText = {};
        this.resultCSSText = "";
    };
    StyleManager.prototype.cssText2rules = function (cssText, onNewRule) {
        var currRule = "";
        var selectorTexts = [];
        var selectorTextIsEnd = false;
        var selectorTextIndex = 0;
        var rules = [];
        var leftBraces = 0;
        var textSize = cssText.length;
        for (var i = 0; i < textSize; i++) {
            var char = cssText[i];
            if (char === "{") {
                selectorTextIsEnd = true;
                leftBraces += 1;
            }
            if (selectorTextIsEnd) {
                currRule += char;
            }
            else {
                if (char === ",") {
                    selectorTextIndex += 1;
                }
                else {
                    if (selectorTexts[selectorTextIndex]) {
                        selectorTexts[selectorTextIndex] += char;
                    }
                    else {
                        selectorTexts[selectorTextIndex] = char;
                    }
                }
            }
            if (char === "}") {
                leftBraces -= 1;
                if (leftBraces === 0) {
                    selectorTexts.forEach(function (selectorText) {
                        if (onNewRule) {
                            onNewRule(selectorText + currRule);
                        }
                        rules.push(selectorText + currRule);
                    });
                    currRule = "";
                    selectorTexts = [];
                    selectorTextIsEnd = false;
                    selectorTextIndex = 0;
                }
            }
        }
        return rules;
    };
    StyleManager.prototype.setStyleToManager = function (config) {
        var newStyles = {};
        var _a = config || {}, style = _a.style, className = _a.className;
        var inlineStyle = style.inlineStyle, styleProperties = __rest(style, ["inlineStyle"]);
        className = className || "";
        var sheet = this.addStyle(styleProperties, className);
        newStyles = {
            className: sheet.classNameWithHash,
            style: inlineStyle
        };
        return newStyles;
    };
    StyleManager.prototype.setStylesToManager = function (config) {
        var e_1, _a;
        var newStyles = {};
        var className = config.className, styles = config.styles;
        className = className || "";
        var keys = Object.keys(styles);
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                var styleItem = styles[key];
                if (!styleItem)
                    continue;
                var isStyleClasses = styleItem.className || styleItem.style;
                var secondClassName = "-" + key;
                if (isStyleClasses) {
                    secondClassName = styleItem.className;
                    secondClassName = secondClassName ? "-" + secondClassName : "";
                    secondClassName = "-" + key + secondClassName;
                }
                var _b = styleItem, inlineStyle = _b.inlineStyle, styleProperties = __rest(_b, ["inlineStyle"]);
                var sheet = this.addStyle(styleProperties, "" + className + secondClassName);
                newStyles[key] = {
                    className: sheet.classNameWithHash,
                    style: inlineStyle
                };
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return newStyles;
    };
    StyleManager.prototype.insertRule2el = function (styleEl, rule, index) {
        if (rule && styleEl && !this.allRules.get(rule).isInserted) {
            var sheet = styleEl.sheet;
            var rules = sheet.rules || sheet.cssRules;
            var rulesSize = rules.length;
            var ruleIndex = index === void 0 ? rulesSize : index;
            if (!sheet)
                return;
            try {
                if ("insertRule" in sheet) {
                    sheet.insertRule(rule, ruleIndex);
                }
                else if ("appendRule" in sheet) {
                    sheet["appendRule"](rule);
                }
                else {
                    styleEl.textContent += rule;
                }
                this.ruleIndList.push(ruleIndex);
                this.allRules.set(rule, {
                    isInserted: true,
                    ruleIndex: ruleIndex
                });
            }
            catch (error) { }
        }
    };
    StyleManager.prototype.insertAllRule2el = function (styleEl) {
        var _this = this;
        this.allRules.forEach(function (value, rule) {
            if (!value.isInserted) {
                _this.insertRule2el(styleEl, rule);
            }
        });
    };
    StyleManager.prototype.deleteRule2el = function (styleEl, rule) {
        var sheetItem = this.allRules.get(rule);
        if (rule && styleEl && sheetItem) {
            var sheet = styleEl.sheet;
            var isInserted = sheetItem.isInserted, ruleIndex = sheetItem.ruleIndex;
            if (isInserted && sheet) {
                var index = this.ruleIndList.indexOf(ruleIndex);
                if (sheet[index]) {
                    sheet.deleteRule(index);
                }
                this.ruleIndList.splice(index, 1);
            }
            this.allRules.set(rule, {
                isInserted: false,
                ruleIndex: ruleIndex
            });
        }
    };
    StyleManager.prototype.deleteAllRule2el = function (styleEl) {
        var sheet = styleEl.sheet;
        var rules = sheet.rules || sheet.cssRules;
        var rulesSize = rules.length;
        var lastIndex = rulesSize - 1;
        for (var i = lastIndex; i > -1; i--) {
            sheet.deleteRule(i);
        }
        this.allRules = new Map();
        this.ruleIndList = [];
    };
    return StyleManager;
}());
exports.StyleManager = StyleManager;
exports.default = StyleManager;
//# sourceMappingURL=StyleManager.js.map