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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
function createMergeFuncs(staticFunc) {
    if (staticFunc === void 0) { staticFunc = function () { }; }
    function mergeFuncs() {
        var e_1, _a, e_2, _b, e_3, _c;
        var funcs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            funcs[_i] = arguments[_i];
        }
        var _d = mergeFuncs, cacheFuncs = _d.cacheFuncs, cacheStaticFunc = _d.cacheStaticFunc;
        cacheFuncs = cacheFuncs || [];
        cacheStaticFunc = cacheStaticFunc || (function () { });
        try {
            for (var funcs_1 = __values(funcs), funcs_1_1 = funcs_1.next(); !funcs_1_1.done; funcs_1_1 = funcs_1.next()) {
                var originFunc = funcs_1_1.value;
                var func = originFunc;
                if (func.isMergedFunc) {
                    try {
                        for (var _e = (e_2 = void 0, __values(func.cacheFuncs)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var cacheFuncItem = _f.value;
                            var isSameFunc = false;
                            try {
                                for (var cacheFuncs_1 = (e_3 = void 0, __values(cacheFuncs)), cacheFuncs_1_1 = cacheFuncs_1.next(); !cacheFuncs_1_1.done; cacheFuncs_1_1 = cacheFuncs_1.next()) {
                                    var cacheFunc = cacheFuncs_1_1.value;
                                    if (cacheFunc === cacheFuncItem) {
                                        isSameFunc = true;
                                        break;
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (cacheFuncs_1_1 && !cacheFuncs_1_1.done && (_c = cacheFuncs_1.return)) _c.call(cacheFuncs_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            if (!isSameFunc) {
                                cacheFuncs = cacheFuncs.concat(cacheFuncItem);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                else {
                    cacheFuncs = cacheFuncs.concat(func);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (funcs_1_1 && !funcs_1_1.done && (_a = funcs_1.return)) _a.call(funcs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        mergeFuncs["cacheFuncs"] = cacheFuncs;
        mergeFuncs["cacheStaticFunc"] = cacheStaticFunc;
        function resultFunc() {
            var e_4, _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                for (var cacheFuncs_2 = __values(cacheFuncs), cacheFuncs_2_1 = cacheFuncs_2.next(); !cacheFuncs_2_1.done; cacheFuncs_2_1 = cacheFuncs_2.next()) {
                    var func = cacheFuncs_2_1.value;
                    func.apply(void 0, __spread(args));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (cacheFuncs_2_1 && !cacheFuncs_2_1.done && (_a = cacheFuncs_2.return)) _a.call(cacheFuncs_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            cacheStaticFunc.apply(void 0, __spread(args));
        }
        resultFunc["isMergedFunc"] = true;
        resultFunc["cacheFuncs"] = cacheFuncs;
        resultFunc["cacheStaticFunc"] = cacheStaticFunc;
        return resultFunc;
    }
    if (staticFunc["isMergedFunc"]) {
        mergeFuncs.cacheStaticFunc = staticFunc["cacheStaticFunc"];
        mergeFuncs.cacheFuncs = staticFunc["cacheFuncs"];
    }
    else if (!mergeFuncs.cacheStaticFunc) {
        mergeFuncs.cacheStaticFunc = staticFunc;
    }
    return mergeFuncs;
}
exports.default = createMergeFuncs;
var mergeFuncs = createMergeFuncs(staticFunc);
function staticFunc() { console.log("static", arguments[0]); }
var resultFunc = mergeFuncs(function (numb) { console.log(numb + 1); });
resultFunc = mergeFuncs(resultFunc, function (numb) { console.log(numb + 2); });
resultFunc = mergeFuncs(function (numb) { console.log(numb + 3); });
resultFunc = mergeFuncs(resultFunc);
resultFunc(0);
//# sourceMappingURL=createMergeFuncs.js.map