"use strict";
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
exports.Theme = exports.lighten = exports.darken = exports.fonts = exports.isSupportBackdropFilter = exports.getAcrylicTextureStyle = exports.getBaseCSS = exports.getThemeBaseCSS = void 0;
var tinyColor = require("tinycolor2");
var createHash = require("murmurhash-js/murmurhash3_gc");
var prefixAll_1 = require("./prefixAll");
var StyleManager_1 = require("./StyleManager");
var generateAcrylicTexture_1 = require("./generateAcrylicTexture");
var getAcrylicTextureStyle_1 = require("./getAcrylicTextureStyle");
Object.defineProperty(exports, "getAcrylicTextureStyle", { enumerable: true, get: function () { return getAcrylicTextureStyle_1.getAcrylicTextureStyle; } });
Object.defineProperty(exports, "isSupportBackdropFilter", { enumerable: true, get: function () { return getAcrylicTextureStyle_1.isSupportBackdropFilter; } });
var WebGLRender_1 = require("../utils/WebGLRender");
var getBaseCSSText_1 = require("./getBaseCSSText");
Object.defineProperty(exports, "getThemeBaseCSS", { enumerable: true, get: function () { return getBaseCSSText_1.getThemeBaseCSS; } });
Object.defineProperty(exports, "getBaseCSS", { enumerable: true, get: function () { return getBaseCSSText_1.getBaseCSS; } });
exports.fonts = {
    sansSerifFonts: "Segoe UI, Microsoft YaHei, Open Sans, sans-serif, Hiragino Sans GB, Arial, Lantinghei SC, STHeiti, WenQuanYi Micro Hei, SimSun",
    segoeMDL2Assets: "Segoe MDL2 Assets"
};
function darken(color, coefficient) {
    var hsl = tinyColor(color).toHsl();
    hsl.l = hsl.l * (1 - coefficient);
    return tinyColor(hsl).toRgbString();
}
exports.darken = darken;
function lighten(color, coefficient) {
    var hsl = tinyColor(color).toHsl();
    hsl.l = hsl.l + (100 - hsl.l) * coefficient;
    return tinyColor(hsl).toRgbString();
}
exports.lighten = lighten;
var defaultAcrylicConfig = { blurSize: 12 };
var Theme = /** @class */ (function () {
    function Theme(themeConfig) {
        var _this = this;
        this.scrollReveals = [];
        this.revealGradientMap = new Map();
        this.revealEffectMap = new Map();
        this.getAcrylicTextureStyle = getAcrylicTextureStyle_1.getAcrylicTextureStyle;
        themeConfig = themeConfig || {};
        var themeName = themeConfig.themeName, accent = themeConfig.accent, useFluentDesign = themeConfig.useFluentDesign, useInlineStyle = themeConfig.useInlineStyle, desktopBackgroundImage = themeConfig.desktopBackgroundImage, acrylicConfig = themeConfig.acrylicConfig, borderWidth = themeConfig.borderWidth, revealConfig = themeConfig.revealConfig, materialBackground = themeConfig.materialBackground;
        themeName = themeName || "dark";
        accent = accent || "#0078D7";
        useFluentDesign = useFluentDesign === void 0 ? false : useFluentDesign;
        useInlineStyle = useInlineStyle === void 0 ? false : useInlineStyle;
        acrylicConfig = acrylicConfig || defaultAcrylicConfig;
        borderWidth = borderWidth === void 0 ? 2 : borderWidth;
        acrylicConfig.blurSize = acrylicConfig.blurSize === void 0 ? defaultAcrylicConfig.blurSize : defaultAcrylicConfig.blurSize;
        var blurSize = acrylicConfig.blurSize;
        if (materialBackground)
            this.materialBackground = materialBackground;
        this.themeHash = createHash(JSON.stringify(themeConfig));
        this.themeClassName = "react-uwp-" + this.themeHash;
        var isDarkTheme = themeName === "dark";
        var baseHigh = isDarkTheme ? "#fff" : "#000";
        var altHigh = isDarkTheme ? "#000" : "#fff";
        var baseHighColor = tinyColor(baseHigh);
        var altHighColor = tinyColor(altHigh);
        var accentColor = tinyColor(accent);
        var altMediumLow = altHighColor.setAlpha(0.4).toRgbString();
        var altMedium = altHighColor.setAlpha(0.6).toRgbString();
        var altMediumHigh = altHighColor.setAlpha(0.8).toRgbString();
        // theme base config.
        Object.assign(this, {
            themeName: themeName,
            accent: accent,
            useFluentDesign: useFluentDesign,
            useInlineStyle: useInlineStyle,
            desktopBackgroundImage: desktopBackgroundImage
        });
        // theme base styles.
        Object.assign(this, {
            themeName: themeName,
            fonts: exports.fonts,
            useInlineStyle: Boolean(useInlineStyle),
            useFluentDesign: useFluentDesign,
            desktopBackground: "url(" + desktopBackgroundImage + ") no-repeat fixed top left / cover",
            desktopBackgroundImage: desktopBackgroundImage,
            haveAcrylicTextures: false,
            acrylicTextureCount: 0,
            acrylicTexture20: {},
            acrylicTexture40: {},
            acrylicTexture60: {},
            acrylicTexture80: {},
            acrylicTexture100: {},
            scrollReveals: [],
            borderWidth: borderWidth,
            accent: accent,
            accentLighter1: lighten(accentColor.toHexString(), 0.5),
            accentLighter2: lighten(accentColor.toHexString(), 0.7),
            accentLighter3: lighten(accentColor.toHexString(), 0.9),
            accentDarker1: darken(accentColor.toHexString(), 0.5),
            accentDarker2: darken(accentColor.toHexString(), 0.7),
            accentDarker3: darken(accentColor.toHexString(), 0.9),
            baseLow: baseHighColor.setAlpha(0.2).toRgbString(),
            baseMediumLow: baseHighColor.setAlpha(0.4).toRgbString(),
            baseMedium: baseHighColor.setAlpha(0.6).toRgbString(),
            baseMediumHigh: baseHighColor.setAlpha(0.8).toRgbString(),
            baseHigh: baseHigh,
            altLow: altHighColor.setAlpha(0.2).toRgbString(),
            altMediumLow: altMediumLow,
            altMedium: altMedium,
            altMediumHigh: altMediumHigh,
            altHigh: altHigh,
            listLow: baseHighColor.setAlpha(0.1).toRgbString(),
            listMedium: baseHighColor.setAlpha(0.2).toRgbString(),
            listAccentLow: accentColor.setAlpha(0.6).toRgbString(),
            listAccentMedium: accentColor.setAlpha(0.8).toRgbString(),
            listAccentHigh: accentColor.setAlpha(0.9).toRgbString(),
            chromeLow: isDarkTheme ? "#171717" : "#f2f2f2",
            chromeMediumLow: isDarkTheme ? "#1f1f1f" : "#ececec",
            chromeMedium: isDarkTheme ? "#2b2b2b" : "#e6e6e6",
            chromeHigh: isDarkTheme ? "#767676" : "#ccc",
            chromeAltLow: isDarkTheme ? "#f2f2f2" : "#171717",
            chromeDisabledLow: isDarkTheme ? "#858585" : "#7a7a7a",
            chromeDisabledHigh: isDarkTheme ? "#333" : "#ccc",
            chromeBlackLow: tinyColor("#000").setAlpha(0.2).toRgbString(),
            chromeBlackMediumLow: tinyColor("#000").setAlpha(0.4).toRgbString(),
            chromeBlackMedium: tinyColor("#000").setAlpha(0.8).toRgbString(),
            chromeBlackHigh: "#000",
            chromeWhite: "#fff",
            isDarkTheme: isDarkTheme,
            typographyStyles: {
                header: {
                    fontWeight: "lighter",
                    fontSize: 46,
                    lineHeight: "56px"
                },
                subHeader: {
                    fontWeight: "lighter",
                    fontSize: 34,
                    lineHeight: "40px"
                },
                title: {
                    fontWeight: "lighter",
                    fontSize: 24,
                    lineHeight: "28px"
                },
                subTitle: {
                    fontWeight: "normal",
                    fontSize: 20,
                    lineHeight: "24px"
                },
                subTitleAlt: {
                    fontWeight: "normal",
                    fontSize: 18,
                    lineHeight: "20px"
                },
                base: {
                    fontWeight: 300,
                    fontSize: 15,
                    lineHeight: "20px"
                },
                baseAlt: {
                    fontWeight: "bold",
                    fontSize: 15,
                    lineHeight: "20px"
                },
                body: {
                    fontWeight: 200,
                    fontSize: 15,
                    lineHeight: "20px"
                },
                captionAlt: {
                    fontWeight: "lighter",
                    fontSize: 13,
                    lineHeight: "16px"
                },
                caption: {
                    fontWeight: "lighter",
                    fontSize: 12,
                    lineHeight: "14px"
                }
            },
            zIndex: {
                listView: 10,
                calendarView: 20,
                dropDownMenu: 102,
                commandBar: 200,
                tooltip: 201,
                flyout: 202,
                contentDialog: 300,
                header: 301,
                mediaPlayer: 2147483647,
                toast: 310
            }
        });
        // set reveal config, by colors after.
        this.revealConfig = this.getRevealConfig(revealConfig);
        // theme styleManager.
        this.styleManager = new StyleManager_1.StyleManager();
        var prefixStyle = prefixAll_1.default();
        Object.assign(this, {
            prefixStyle: prefixStyle,
            prepareStyle: function (config) {
                if (!_this.styleManager)
                    return;
                var extendsClassName = config.extendsClassName, managerConfig = __rest(config, ["extendsClassName"]);
                if (_this.useInlineStyle) {
                    if (extendsClassName) {
                        managerConfig.className += " " + extendsClassName;
                    }
                    return managerConfig;
                }
                else {
                    var styleClasses = _this.styleManager.setStyleToManager(managerConfig);
                    if (extendsClassName) {
                        styleClasses.className += " " + extendsClassName;
                    }
                    return styleClasses;
                }
            },
            prepareStyles: function (config) {
                if (!_this.styleManager)
                    return;
                if (_this.useInlineStyle) {
                    var styles = config.styles;
                    var result = {};
                    for (var key in styles) {
                        result[key] = { style: styles[key] };
                    }
                    return result;
                }
                else {
                    var styleClasses = _this.styleManager.setStylesToManager(config);
                    return styleClasses;
                }
            },
            classNames: function () {
                var classNames = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    classNames[_i] = arguments[_i];
                }
                return classNames.filter(function (className) { return Boolean(className); }).reduce(function (prev, curr) { return prev + " " + curr; });
            }
        });
        var _a = this.mergeAcrylicStyles(blurSize), acrylicTexture20Config = _a.acrylicTexture20Config, acrylicTexture40Config = _a.acrylicTexture40Config, acrylicTexture60Config = _a.acrylicTexture60Config, acrylicTexture80Config = _a.acrylicTexture80Config, acrylicTexture100Config = _a.acrylicTexture100Config;
        // generateAcrylicTextures method.
        var generateAcrylicTextures = function (themeCallback) {
            _this.acrylicTextureCount = 0;
            var callback = function (acrylicTextureUrl, key, isCanvasFilter) {
                var backgrounds = [];
                backgrounds.push(_this.getBackgroundFromTexture(acrylicTextureUrl) + " left top / cover no-repeat fixed");
                if (_this.materialTexture) {
                    backgrounds.push(_this.getBackgroundFromTexture(_this.materialTexture) + " left top repeat fixed");
                }
                if (_this.materialBackground) {
                    backgrounds.push(_this.materialBackground);
                }
                var background = backgrounds.join(", ");
                _this.acrylicTextureCount += 1;
                var style = {
                    background: background,
                    backgroundBlendMode: "overlay"
                };
                switch (key) {
                    case 2: {
                        Object.assign(_this.acrylicTexture20, {
                            tintColor: acrylicTexture20Config.tintColor,
                            style: style,
                            background: background,
                            blurSize: blurSize
                        });
                        break;
                    }
                    case 4: {
                        Object.assign(_this.acrylicTexture40, {
                            tintColor: acrylicTexture40Config.tintColor,
                            style: style,
                            background: background,
                            blurSize: blurSize
                        });
                        break;
                    }
                    case 6: {
                        Object.assign(_this.acrylicTexture60, {
                            tintColor: acrylicTexture60Config.tintColor,
                            style: style,
                            background: background,
                            blurSize: blurSize
                        });
                        break;
                    }
                    case 8: {
                        Object.assign(_this.acrylicTexture80, {
                            tintColor: acrylicTexture80Config.tintColor,
                            style: style,
                            background: background,
                            blurSize: blurSize
                        });
                        break;
                    }
                    case 10: {
                        Object.assign(_this.acrylicTexture100, {
                            tintColor: acrylicTexture100Config.tintColor,
                            style: style,
                            background: background,
                            blurSize: blurSize
                        });
                        break;
                    }
                    default: {
                        break;
                    }
                }
                if (_this.acrylicTextureCount === 5) {
                    if (themeCallback)
                        themeCallback(_this);
                }
            };
            generateAcrylicTexture_1.default({
                image: _this.desktopBackgroundImage,
                tintColor: acrylicTexture20Config.tintColor,
                blurSize: blurSize,
                callback: function (image, isCanvasFilter) { return callback(image, 2, isCanvasFilter); }
            });
            generateAcrylicTexture_1.default({
                image: _this.desktopBackgroundImage,
                tintColor: acrylicTexture40Config.tintColor,
                blurSize: blurSize,
                callback: function (image, isCanvasFilter) { return callback(image, 4, isCanvasFilter); }
            });
            generateAcrylicTexture_1.default({
                image: _this.desktopBackgroundImage,
                tintColor: acrylicTexture60Config.tintColor,
                blurSize: blurSize,
                callback: function (image, isCanvasFilter) { return callback(image, 6, isCanvasFilter); }
            });
            generateAcrylicTexture_1.default({
                image: _this.desktopBackgroundImage,
                tintColor: acrylicTexture80Config.tintColor,
                blurSize: blurSize,
                callback: function (image, isCanvasFilter) { return callback(image, 8, isCanvasFilter); }
            });
            generateAcrylicTexture_1.default({
                image: _this.desktopBackgroundImage,
                tintColor: acrylicTexture100Config.tintColor,
                blurSize: blurSize,
                callback: function (image, isCanvasFilter) { return callback(image, 10, isCanvasFilter); }
            });
        };
        // add generateBackgroundTexture method to theme.
        this.generateBackgroundTexture = function (callback) {
            var webGLRender = new WebGLRender_1.WebGLRender({ fragmentSource: WebGLRender_1.getNoiseFrag(_this.isDarkTheme ? { r: "1.", g: "1.", b: "1." } : { r: "0.", g: "0.", b: "0." }), width: screen.availWidth, height: screen.availHeight });
            webGLRender.render();
            webGLRender.toUrl(function (url) {
                _this.materialTexture = url;
                _this.mergeAcrylicStyles(blurSize);
                if (callback)
                    callback(_this);
                webGLRender.cleanup();
                webGLRender = null;
            });
        };
        // Add to generateAcrylicTextures method to theme.
        this.generateAcrylicTextures = generateAcrylicTextures;
        // toasts storage.
        Object.assign(this, {
            toasts: new Map(),
            addToast: function (toast) {
                if (!_this.toasts.has(toast)) {
                    _this.toasts.set(toast, true);
                }
                if (_this.onToastsUpdate) {
                    _this.onToastsUpdate(Array.from(_this.toasts.keys()));
                }
            },
            updateToast: function (toast) {
                if (_this.toasts.has(toast)) {
                    _this.toasts.set(toast, true);
                }
                if (_this.onToastsUpdate) {
                    _this.onToastsUpdate(Array.from(_this.toasts.keys()));
                }
            },
            removeToast: function (toast) {
                if (_this.toasts.has(toast)) {
                    _this.toasts.delete(toast);
                }
                if (_this.onToastsUpdate) {
                    _this.onToastsUpdate(Array.from(_this.toasts.keys()));
                }
            }
        });
    }
    Theme.prototype.addBorderCanvas = function (borderCanvas, revealConfig) {
        if (!this.revealEffectMap.get(borderCanvas)) {
            this.onAddBorderCanvas(borderCanvas, revealConfig);
        }
        this.revealEffectMap.set(borderCanvas, revealConfig);
    };
    Theme.prototype.removeBorderCanvas = function (borderCanvas) {
        if (this.revealEffectMap.get(borderCanvas)) {
            this.onRemoveBorderCanvas(borderCanvas);
        }
        this.revealEffectMap.delete(borderCanvas);
    };
    Theme.prototype.onAddBorderCanvas = function (borderCanvas, revealConfig) { };
    Theme.prototype.onRemoveBorderCanvas = function (borderCanvas) { };
    Theme.prototype.getRevealConfig = function (prevConfig, newConfig) {
        var defaultConfig = {
            effectEnable: "both",
            hoverSize: 100,
            hoverColor: this.isDarkTheme ? this.baseLow : this.altLow,
            borderWidth: this.borderWidth,
            borderColor: this.isDarkTheme ? this.baseMediumHigh : this.altMediumHigh,
            effectRange: "all",
            observerResize: false,
            observerTransition: ""
        };
        if (prevConfig) {
            if (newConfig) {
                defaultConfig = __assign({}, prevConfig);
            }
            else {
                newConfig = prevConfig;
            }
            for (var key in newConfig) {
                var value = newConfig[key];
                if (value !== void 0) {
                    defaultConfig[key] = newConfig[key];
                }
            }
        }
        return defaultConfig;
    };
    Theme.prototype.getBackgroundFromTexture = function (texture) {
        return "url(" + texture + ")";
    };
    Theme.prototype.mergeAcrylicStyles = function (blurSize) {
        var _a = this, materialTexture = _a.materialTexture, materialBackground = _a.materialBackground;
        var backgrounds = [];
        if (materialBackground) {
            backgrounds.push(materialBackground);
        }
        if (materialTexture) {
            backgrounds.push(this.getBackgroundFromTexture(materialTexture));
        }
        var background = backgrounds.join(", ");
        var acrylicTexture20Config = {
            tintColor: this.useFluentDesign ? this.altMediumHigh : this.chromeLow,
            blurSize: blurSize,
            background: background
        };
        var acrylicTexture40Config = {
            tintColor: this.useFluentDesign ? this.altMedium : this.chromeMedium,
            blurSize: blurSize,
            background: background
        };
        var acrylicTexture60Config = {
            tintColor: this.useFluentDesign ? this.altMediumLow : this.chromeMediumLow,
            blurSize: blurSize,
            background: background
        };
        var acrylicTexture80Config = {
            tintColor: this.useFluentDesign ? this.altLow : this.chromeHigh,
            blurSize: blurSize,
            background: background
        };
        var acrylicTexture100Config = {
            tintColor: "rgba(0, 0, 0, 0)",
            blurSize: blurSize,
            background: background
        };
        this.acrylicTexture20.style = getAcrylicTextureStyle_1.getAcrylicTextureStyle(acrylicTexture20Config, this.useFluentDesign);
        this.acrylicTexture40.style = getAcrylicTextureStyle_1.getAcrylicTextureStyle(acrylicTexture40Config, this.useFluentDesign);
        this.acrylicTexture60.style = getAcrylicTextureStyle_1.getAcrylicTextureStyle(acrylicTexture60Config, this.useFluentDesign);
        this.acrylicTexture80.style = getAcrylicTextureStyle_1.getAcrylicTextureStyle(acrylicTexture80Config, this.useFluentDesign);
        this.acrylicTexture100.style = getAcrylicTextureStyle_1.getAcrylicTextureStyle(acrylicTexture100Config, this.useFluentDesign);
        this.acrylicTexture20.background = this.acrylicTexture20.style.background;
        this.acrylicTexture40.background = this.acrylicTexture40.style.background;
        this.acrylicTexture60.background = this.acrylicTexture60.style.background;
        this.acrylicTexture80.background = this.acrylicTexture80.style.background;
        this.acrylicTexture100.background = this.acrylicTexture100.style.background;
        return {
            acrylicTexture20Config: acrylicTexture20Config,
            acrylicTexture40Config: acrylicTexture40Config,
            acrylicTexture60Config: acrylicTexture60Config,
            acrylicTexture80Config: acrylicTexture80Config,
            acrylicTexture100Config: acrylicTexture100Config
        };
    };
    return Theme;
}());
exports.Theme = Theme;
function getTheme(themeConfig) {
    var theme = new Theme(themeConfig);
    return theme;
}
exports.default = getTheme;
//# sourceMappingURL=getTheme.js.map