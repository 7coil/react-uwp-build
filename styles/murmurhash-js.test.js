"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createHash = require("murmurhash-js/murmurhash3_gc");
var createHash2 = require("murmurhash-js/murmurhash2_gc");
var testObj = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
    cursor: "default",
    height: "100%",
    width: 200,
    overflow: "hidden",
    wordWrap: "normal",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    position: "relative",
    justifyContent: "space-between",
    background: "none",
    padding: 120
};
var now;
now = performance.now();
for (var i = 0; i < 100000; i++) {
    var str = JSON.stringify(testObj);
}
console.log(performance.now() - now);
now = performance.now();
for (var i = 0; i < 100000; i++) {
    var str = JSON.stringify(testObj);
    var hash = createHash(str);
}
console.log(performance.now() - now);
now = performance.now();
for (var i = 0; i < 100000; i++) {
    var str = JSON.stringify(testObj);
    var hash = createHash2(str);
}
console.log(performance.now() - now);
//# sourceMappingURL=murmurhash-js.test.js.map