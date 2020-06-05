"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThemeBaseCSS = exports.getBaseCSS = void 0;
function getBaseCSS(selectors) {
    if (selectors === void 0) { selectors = ""; }
    return selectors + " * {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n\n  -webkit-text-size-adjust: none;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n" + selectors + " *::after, " + selectors + " *::before {\n  box-sizing: border-box;\n}\n\n" + selectors + " input, " + selectors + " textarea {\n  box-shadow: none;\n  border-radius: none;\n}\n\n" + selectors + " *::-webkit-scrollbar:vertical {\n  width: 6px;\n}\n\n" + selectors + " *::-webkit-scrollbar:horizontal {\n  height: 6px\n}\n\n" + selectors + " *::-webkit-scrollbar {\n  -webkit-appearance: none\n}\n";
}
exports.getBaseCSS = getBaseCSS;
/**
 * @param theme
 * @param selectors
 * getBaseCSS(theme, ":scope")
 */
function getThemeBaseCSS(theme, selectors) {
    if (selectors === void 0) { selectors = ""; }
    var baseCSSText = selectors + " *::-webkit-scrollbar-track {\n  background-color: " + theme.chromeLow + ";\n}\n\n" + selectors + " *::-webkit-scrollbar-thumb {\n  background-color: " + theme.chromeHigh + ";\n}\n";
    return baseCSSText;
}
exports.getThemeBaseCSS = getThemeBaseCSS;
exports.default = getThemeBaseCSS;
//# sourceMappingURL=getBaseCSSText.js.map