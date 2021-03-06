"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var PropTypes = require("prop-types");
var Icon_1 = require("../Icon");
var IconButton_1 = require("../IconButton");
var Slider_1 = require("../Slider");
var Tooltip_1 = require("../Tooltip");
var Flyout_1 = require("../Flyout");
var FlyoutContent_1 = require("../FlyoutContent");
var ListView_1 = require("../ListView");
var emptyFunc = function () { };
var Control = /** @class */ (function (_super) {
    __extends(Control, _super);
    function Control() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showVolumeSlider: false,
            showPlaybackChoose: false
        };
        _this.toggleShowPlaybackChoose = function (showPlaybackChoose) {
            if (typeof showPlaybackChoose === "boolean") {
                if (showPlaybackChoose !== _this.state.showPlaybackChoose) {
                    _this.setState({ showPlaybackChoose: showPlaybackChoose });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    showPlaybackChoose: !prevState.showPlaybackChoose
                }); });
            }
        };
        _this.toggleShowVolumeSlider = function (showVolumeSlider) {
            if (typeof showVolumeSlider === "boolean") {
                if (showVolumeSlider !== _this.state.showVolumeSlider) {
                    _this.setState({ showVolumeSlider: showVolumeSlider });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    showVolumeSlider: !prevState.showVolumeSlider
                }); });
            }
        };
        _this.second2HHMMSS = function (second) {
            var s = (second % 60).toFixed(0);
            var m = parseInt("" + second / 60);
            m %= 60;
            var h = parseInt("" + second / 3600);
            if (s < 10)
                s = "0" + s;
            if (m < 10)
                m = "0" + m;
            if (h < 10)
                h = "0" + h;
            return h + ":" + m + ":" + s;
        };
        return _this;
    }
    Control.prototype.render = function () {
        var _this = this;
        var _a = this.props, displayMode = _a.displayMode, playing = _a.playing, played = _a.played, volume = _a.volume, playbackRate = _a.playbackRate, duration = _a.duration, playOrPauseAction = _a.playOrPauseAction, fullScreenAction = _a.fullScreenAction, skipBackAction = _a.skipBackAction, skipForwardAction = _a.skipForwardAction, onChangePlaybackRate = _a.onChangePlaybackRate, onChangeVolume = _a.onChangeVolume, onChangeSeek = _a.onChangeSeek, className = _a.className, attributes = __rest(_a, ["displayMode", "playing", "played", "volume", "playbackRate", "duration", "playOrPauseAction", "fullScreenAction", "skipBackAction", "skipForwardAction", "onChangePlaybackRate", "onChangeVolume", "onChangeSeek", "className"]);
        var _b = this.state, showPlaybackChoose = _b.showPlaybackChoose, showVolumeSlider = _b.showVolumeSlider;
        var theme = this.context.theme;
        played = played || 0;
        duration = duration || 0;
        var playedValue = played * duration;
        var isDefaultMode = displayMode === "default";
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            className: "media-player-control",
            styles: inlineStyles
        });
        var playButton = React.createElement(IconButton_1.default, { onClick: playOrPauseAction }, playing ? "Pause" : "Play");
        var playSlider = (React.createElement(Slider_1.default, { style: { width: "100%", padding: "0 16px" }, initValue: played || 0, minValue: 0, maxValue: 1, controllerWidth: 16, customControllerStyle: {
                width: 16,
                height: 16,
                marginTop: 4
            }, transition: "all .25s", onChangeValue: function (value) {
                onChangeSeek(Number(value.toFixed(1)));
            } }));
        var volumeButton = (React.createElement(Flyout_1.default, null,
            React.createElement(IconButton_1.default, { onClick: this.toggleShowVolumeSlider }, "Volume"),
            React.createElement(FlyoutContent_1.default, { style: theme.prefixStyle({
                    width: isDefaultMode ? void 0 : 30
                }), isControlled: true, show: showVolumeSlider, verticalPosition: "top", horizontalPosition: "right" },
                React.createElement(Slider_1.default, { displayMode: isDefaultMode ? "horizon" : "vertical", style: {
                        width: isDefaultMode ? 240 : 24,
                        height: isDefaultMode ? 24 : 120
                    }, onChangeValue: onChangeVolume, initValue: volume }))));
        var subtitleButton = (React.createElement(Tooltip_1.default, { content: "Subtitles" },
            React.createElement(IconButton_1.default, null, "Subtitles")));
        var moreLegacyButton = (React.createElement(Flyout_1.default, null,
            React.createElement(IconButton_1.default, { onClick: this.toggleShowPlaybackChoose }, "MoreLegacy"),
            React.createElement(FlyoutContent_1.default, { style: { width: 120, cursor: "pointer", padding: 0 }, isControlled: true, show: showPlaybackChoose, verticalPosition: "top", horizontalPosition: "left" },
                React.createElement(Tooltip_1.default, { style: { height: "auto", padding: 0, border: "none" }, margin: 0, horizontalPosition: "left", background: theme.chromeLow, contentNode: React.createElement(ListView_1.default, { background: theme.chromeLow, style: { width: 80 }, listSource: [{
                                itemNode: "2x",
                                onClick: function () {
                                    onChangePlaybackRate(2);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "1.5x",
                                onClick: function () {
                                    onChangePlaybackRate(1.5);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "1.25x",
                                onClick: function () {
                                    onChangePlaybackRate(1.25);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "Normal",
                                onClick: function () {
                                    onChangePlaybackRate(1);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "0.75x",
                                onClick: function () {
                                    onChangePlaybackRate(0.75);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }, {
                                itemNode: "0.5x",
                                onClick: function () {
                                    onChangePlaybackRate(0.5);
                                    _this.toggleShowPlaybackChoose(false);
                                }
                            }] }) },
                    React.createElement("div", { style: { padding: 8, width: 120 } },
                        React.createElement("span", null, "Playback Rate"),
                        React.createElement(Icon_1.default, null, "ScrollChevronRightLegacy")),
                    React.createElement(FlyoutContent_1.default, { margin: 0, style: { width: 60, padding: 0 }, verticalPosition: "top", horizontalPosition: "left" })))));
        return isDefaultMode ? (React.createElement("div", __assign({}, attributes, { className: theme.classNames(styles.root.className, className), style: styles.root.style }),
            React.createElement("div", __assign({}, styles.sliderContainer),
                playSlider,
                React.createElement("span", { style: { marginLeft: 16 } }, this.second2HHMMSS(playedValue)),
                React.createElement("span", { style: { float: "right", marginRight: 16 } }, this.second2HHMMSS(duration))),
            React.createElement("div", __assign({}, styles.controlsGroup),
                React.createElement("div", null,
                    volumeButton,
                    subtitleButton),
                React.createElement("div", null,
                    React.createElement(Tooltip_1.default, { content: "Skip Back", background: theme.chromeLow },
                        React.createElement(IconButton_1.default, { onClick: skipBackAction }, "SkipBack10")),
                    playButton,
                    React.createElement(Tooltip_1.default, { content: "Skip Forward", background: theme.chromeLow },
                        React.createElement(IconButton_1.default, { onClick: skipForwardAction }, "SkipForward30"))),
                React.createElement("div", null,
                    React.createElement(Tooltip_1.default, { content: "Full Screen", background: theme.chromeLow },
                        React.createElement(IconButton_1.default, { onClick: fullScreenAction }, "FullScreen")),
                    moreLegacyButton)))) : (React.createElement("div", __assign({}, styles.controlsGroup),
            playButton,
            playSlider,
            volumeButton,
            displayMode === "reset" ? subtitleButton : null,
            moreLegacyButton));
    };
    Control.defaultProps = {
        displayMode: "default",
        playOrPauseAction: emptyFunc,
        fullScreenAction: emptyFunc,
        skipBackAction: emptyFunc,
        skipForwardAction: emptyFunc,
        onChangePlaybackRate: emptyFunc,
        onChangeVolume: emptyFunc,
        onChangeSeek: emptyFunc
    };
    Control.contextTypes = { theme: PropTypes.object };
    return Control;
}(React.Component));
exports.default = Control;
function getStyles(mock) {
    var theme = mock.context.theme, _a = mock.props, displayMode = _a.displayMode, style = _a.style;
    var prefixStyle = theme.prefixStyle;
    var rootStyle = __assign({ fontSize: 14, color: theme.baseHigh, height: 96, width: "100%", position: "absolute", left: 0, bottom: 0, backgroundImage: "linear-gradient(transparent, " + theme.altMedium + ")", transition: "all .75s" }, style);
    return {
        root: prefixStyle(rootStyle),
        sliderContainer: {
            overflow: "hidden",
            position: "relative",
            height: 48
        },
        controlsGroup: prefixStyle(__assign(__assign({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }, (displayMode !== "default" ? {
            background: theme.altHigh
        } : void 0)), { height: 48 }))
    };
}
//# sourceMappingURL=Control.js.map