"use strict";
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
exports.handleScrollReveal = void 0;
function handleScrollReveal(theme) {
    var e_1, _a;
    try {
        for (var _b = __values(theme.scrollReveals), _c = _b.next(); !_c.done; _c = _b.next()) {
            var scrollReveal = _c.value;
            var rootElm = scrollReveal.rootElm, animated = scrollReveal.animated, setEnterStyle = scrollReveal.setEnterStyle, setLeaveStyle = scrollReveal.setLeaveStyle, _d = scrollReveal.props, topOffset = _d.topOffset, bottomOffset = _d.bottomOffset;
            if (!rootElm)
                return;
            var _e = rootElm.getBoundingClientRect(), top_1 = _e.top, height = _e.height;
            var innerHeight_1 = window.innerHeight;
            var isIn = false;
            if (height > innerHeight_1) {
                isIn = top_1 < innerHeight_1 - height * height && top_1 > -height * 0.5;
            }
            else {
                isIn = top_1 > 0 + topOffset && top_1 + height + bottomOffset < innerHeight_1;
            }
            if (isIn) {
                if (!animated) {
                    setEnterStyle();
                    scrollReveal.animated = true;
                }
            }
            else {
                if (animated) {
                    setLeaveStyle();
                    scrollReveal.animated = false;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.handleScrollReveal = handleScrollReveal;
//# sourceMappingURL=handleScrollReveal.js.map