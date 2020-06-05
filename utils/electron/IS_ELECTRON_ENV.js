"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userAgent = (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase()) || "";
var isElectronEnv = userAgent.includes(" electron/");
exports.default = isElectronEnv;
//# sourceMappingURL=IS_ELECTRON_ENV.js.map