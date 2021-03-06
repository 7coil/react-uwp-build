"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddBlurEvent = /** @class */ (function () {
    function AddBlurEvent() {
        var _this = this;
        this.cleanEvent = function () {
            if (_this.clickListener) {
                document.documentElement.removeEventListener("click", _this.clickListener);
                _this.clickListener = null;
            }
            if (_this.keydownListener) {
                document.documentElement.removeEventListener("keydown", _this.keydownListener);
                _this.keydownListener = null;
            }
        };
        this.setConfig = function (config) {
            var addListener = config.addListener, blurCallback = config.blurCallback, clickIncludeElm = config.clickIncludeElm, clickExcludeElm = config.clickExcludeElm, blurKeyCodes = config.blurKeyCodes;
            if (addListener) {
                if (!_this.clickListener) {
                    _this.clickListener = function (e) {
                        if (clickIncludeElm) {
                            if (Array.isArray(clickIncludeElm) ? clickIncludeElm.some(function (elm) { return elm === e.target; }) : clickIncludeElm === e.target) {
                                _this.cleanEvent();
                                blurCallback(e);
                            }
                            return;
                        }
                        if (clickExcludeElm) {
                            if (Array.isArray(clickExcludeElm) ? clickExcludeElm.some(function (elm) { return elm.contains(e.target); }) : clickExcludeElm.contains(e.target)) {
                                return;
                            }
                            else {
                                _this.cleanEvent();
                                blurCallback(e);
                            }
                        }
                    };
                    document.documentElement.addEventListener("click", _this.clickListener);
                }
                if (!_this.keydownListener && blurKeyCodes) {
                    _this.keydownListener = function (e) {
                        var keyCode = e.keyCode;
                        if (blurKeyCodes.includes(keyCode)) {
                            blurCallback(e);
                        }
                        _this.cleanEvent();
                    };
                    document.documentElement.addEventListener("keydown", _this.keydownListener);
                }
            }
            else {
                _this.cleanEvent();
            }
        };
    }
    return AddBlurEvent;
}());
exports.default = AddBlurEvent;
//# sourceMappingURL=AddBlurEvent.js.map