"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataURI2blob = void 0;
function dataURI2blob(dataURI) {
    var byteChars = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var arrayBf = new ArrayBuffer(byteChars.length);
    var intArr = new Uint8Array(arrayBf);
    for (var i = 0; i < byteChars.length; i++) {
        intArr[i] = byteChars.charCodeAt(i);
    }
    var blob = new Blob([arrayBf], { type: mimeString });
    return blob;
}
exports.dataURI2blob = dataURI2blob;
//# sourceMappingURL=dataURI2blob.js.map