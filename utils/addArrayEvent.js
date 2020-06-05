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
var addEventListener_1 = require("./addEventListener");
function addArrayEvent(elm, events, func) {
    var e_1, _a;
    if (func === void 0) { func = function () { }; }
    try {
        for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
            var event_1 = events_1_1.value;
            addEventListener_1.default(elm, event_1, func);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.default = addArrayEvent;
//# sourceMappingURL=addArrayEvent.js.map