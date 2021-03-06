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
exports.MediaPlayer = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var react_dom_1 = require("react-dom");
var RPlayer = require("react-player");
var Control_1 = require("./Control");
var ReactPlayer = RPlayer.default;
var emptyFunc = function () { };
var MediaPlayer = /** @class */ (function (_super) {
    __extends(MediaPlayer, _super);
    function MediaPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getProps2State = function (props) { return ({
            currShowControl: props.showControl,
            currPlaying: props.playing,
            currVolume: props.volume,
            currPlaybackRate: props.playbackRate
        }); };
        _this.state = Object.assign({
            currShowControl: false,
            currPlaying: false,
            currVolume: 0.8,
            currPlayed: 0,
            currLoaded: 0,
            currPlaybackRate: 1.0
        }, _this.getProps2State(_this.props));
        _this.showControlTimer = null;
        _this.mouseMoveTimer = null;
        _this.endTimer = null;
        _this.handleMouseEnter = function (e) {
            clearTimeout(_this.showControlTimer);
            _this.toggleShowControl(true);
            _this.props.onMouseEnter(e);
        };
        _this.handleMouseLeave = function (e) {
            _this.showControlTimer = setTimeout(function () {
                _this.toggleShowControl(false);
            }, 3500);
            _this.props.onMouseLeave(e);
        };
        _this.handleMouseMove = function (e) {
            clearTimeout(_this.mouseMoveTimer);
            clearTimeout(_this.showControlTimer);
            _this.mouseMoveTimer = setTimeout(function () {
                _this.toggleShowControl(true);
            }, 200);
            _this.showControlTimer = setTimeout(function () {
                _this.toggleShowControl(false);
            }, 3500);
            _this.props.onMouseMove(e);
        };
        _this.handleTouchStart = function (e) {
            _this.toggleShowControl(true);
            _this.props.onTouchStart(e);
        };
        _this.toggleShowControl = function (currShowControl) {
            if (typeof currShowControl === "boolean") {
                if (currShowControl !== _this.state.currShowControl) {
                    _this.setState({ currShowControl: currShowControl });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    currShowControl: !prevState.currShowControl
                }); });
            }
        };
        _this.togglePlaying = function (currPlaying) {
            if (typeof currPlaying === "boolean") {
                if (currPlaying !== _this.state.currPlaying) {
                    _this.setState({ currPlaying: currPlaying });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    currPlaying: !prevState.currPlaying
                }); });
            }
        };
        _this.handleFullScreenAction = function () {
            if (_this.state.fullScreenMode) {
                _this.existFullscreen();
            }
            var rootElm = react_dom_1.findDOMNode(_this.reactPlayer).children[0];
            if (rootElm.requestFullscreen) {
                rootElm.requestFullscreen();
            }
            else if (rootElm.msRequestFullscreen) {
                rootElm.msRequestFullscreen();
            }
            else if (rootElm.mozRequestFullScreen) {
                rootElm.mozRequestFullScreen();
            }
            else if (rootElm.webkitRequestFullscreen) {
                rootElm.webkitRequestFullscreen();
            }
            _this.setState({ currShowControl: true });
        };
        _this.existFullscreen = function () {
            var document = window.document;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        };
        _this.handleKeyDown = function (e) {
            if (e.keyCode === 13 || e.keyCode === 27) {
                _this.existFullscreen();
            }
        };
        _this.exitFullScreen = function () {
            var document = window.document;
            var haveFullScreenElm = document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null;
            if (haveFullScreenElm) {
                _this.setState(function (prevState, prevProps) { return ({ fullScreenMode: !_this.state.fullScreenMode }); });
            }
        };
        _this.handleEnded = function () {
            _this.endTimer = setTimeout(function () {
                _this.setState({
                    currPlaying: false,
                    currShowControl: true,
                    played: 0
                });
            }, 1000);
        };
        return _this;
    }
    MediaPlayer.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(Object.assign(this.state, this.getProps2State(nextProps)));
    };
    MediaPlayer.prototype.componentDidMount = function () {
        document.documentElement.addEventListener("keydown", this.handleKeyDown, false);
        document.documentElement.addEventListener("webkitfullscreenchange", this.exitFullScreen, false);
        document.documentElement.addEventListener("mozfullscreenchange", this.exitFullScreen, false);
        document.documentElement.addEventListener("fullscreenchange", this.exitFullScreen, false);
        document.documentElement.addEventListener("MSFullscreenChange", this.exitFullScreen, false);
    };
    MediaPlayer.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener("keydown", this.handleKeyDown, false);
        document.documentElement.removeEventListener("webkitfullscreenchange", this.exitFullScreen, false);
        document.documentElement.removeEventListener("mozfullscreenchange", this.exitFullScreen, false);
        document.documentElement.removeEventListener("fullscreenchange", this.exitFullScreen, false);
        document.documentElement.removeEventListener("MSFullscreenChange", this.exitFullScreen, false);
        clearTimeout(this.mouseMoveTimer);
        clearTimeout(this.showControlTimer);
        clearTimeout(this.endTimer);
    };
    MediaPlayer.prototype.componentWillUpdate = function () {
        clearTimeout(this.showControlTimer);
    };
    MediaPlayer.prototype.render = function () {
        var _this = this;
        var _a = this.props, width = _a.width, height = _a.height, url = _a.url, playing = _a.playing, loop = _a.loop, controls = _a.controls, volume = _a.volume, playbackRate = _a.playbackRate, progressFrequency = _a.progressFrequency, soundcloudConfig = _a.soundcloudConfig, youtubeConfig = _a.youtubeConfig, vimeoConfig = _a.vimeoConfig, fileConfig = _a.fileConfig, onReady = _a.onReady, onStart = _a.onStart, onPlay = _a.onPlay, onPause = _a.onPause, onBuffer = _a.onBuffer, onEnded = _a.onEnded, onError = _a.onError, onDuration = _a.onDuration, onProgress = _a.onProgress, showControl = _a.showControl, displayMode = _a.displayMode, className = _a.className, attributes = __rest(_a, ["width", "height", "url", "playing", "loop", "controls", "volume", "playbackRate", "progressFrequency", "soundcloudConfig", "youtubeConfig", "vimeoConfig", "fileConfig", "onReady", "onStart", "onPlay", "onPause", "onBuffer", "onEnded", "onError", "onDuration", "onProgress", "showControl", "displayMode", "className"]);
        var _b = this.state, currShowControl = _b.currShowControl, currPlaying = _b.currPlaying, currVolume = _b.currVolume, currPlayed = _b.currPlayed, currLoaded = _b.currLoaded, currPlaybackRate = _b.currPlaybackRate, duration = _b.duration, played = _b.played, fullScreenMode = _b.fullScreenMode;
        var theme = this.context.theme;
        var styles = getStyles(this);
        var styleClasses = theme.prepareStyle({
            className: "media-player",
            style: styles.root,
            extendsClassName: className
        });
        return (React.createElement("div", __assign({ ref: function (rootElm) { return _this.rootElm = rootElm; } }, attributes, { onMouseEnter: this.handleMouseEnter, onMouseMove: this.handleMouseMove, onMouseLeave: this.handleMouseLeave, onTouchStart: this.handleTouchStart }, styleClasses),
            React.createElement(ReactPlayer, __assign({}, {
                width: width,
                height: height,
                url: url,
                playing: playing,
                loop: loop,
                controls: controls,
                volume: volume,
                playbackRate: playbackRate,
                progressFrequency: progressFrequency,
                soundcloudConfig: soundcloudConfig,
                youtubeConfig: youtubeConfig,
                vimeoConfig: vimeoConfig,
                fileConfig: fileConfig,
                onReady: onReady,
                onStart: onStart,
                onPlay: onPlay,
                onPause: onPause,
                onBuffer: onBuffer,
                onEnded: onEnded,
                onError: onError,
                onDuration: onDuration,
                onProgress: onProgress
            }, { onEnded: this.handleEnded, onPlay: function () { return _this.setState({ currPlaying: true }); }, onPause: function () { return _this.setState({ currPlaying: false }); }, ref: function (reactPlayer) { return _this.reactPlayer = reactPlayer; }, volume: currVolume, playing: currPlaying, playbackRate: currPlaybackRate, onProgress: function (state) { return _this.setState({ played: state.played }); }, onDuration: function (duration) { return _this.setState({ duration: duration }); } })),
            React.createElement(Control_1.default, { duration: duration, played: played, displayMode: displayMode, style: {
                    opacity: currShowControl ? 1 : 0,
                    zIndex: fullScreenMode ? theme.zIndex.mediaPlayer : void 0,
                    position: fullScreenMode ? "fixed" : "absolute"
                }, fullScreenAction: this.handleFullScreenAction, playing: currPlaying, playOrPauseAction: function () { return _this.setState(function (prevState, prevProps) { return ({ currPlaying: !prevState.currPlaying }); }); }, volume: currVolume, onChangeVolume: function (currVolume) {
                    _this.setState({ currVolume: currVolume });
                }, onChangePlaybackRate: function (currPlaybackRate) {
                    _this.setState({ currPlaybackRate: currPlaybackRate });
                }, onChangeSeek: function (seek) { return _this.reactPlayer.seekTo(seek); }, skipBackAction: function () {
                    var currPlayed = played - 0.01;
                    _this.setState({ played: currPlayed });
                    _this.reactPlayer.seekTo(currPlayed);
                }, skipForwardAction: function () {
                    var currPlayed = played + 0.03;
                    _this.setState({ played: currPlayed });
                    _this.reactPlayer.seekTo(currPlayed);
                } })));
    };
    MediaPlayer.defaultProps = {
        displayMode: "default",
        width: 640,
        height: 360,
        loop: false,
        showControl: true,
        playing: false,
        volume: 0.8,
        playbackRate: 1.0,
        onTouchStart: emptyFunc,
        onMouseEnter: emptyFunc,
        onMouseLeave: emptyFunc,
        onMouseMove: emptyFunc
    };
    MediaPlayer.contextTypes = { theme: PropTypes.object };
    return MediaPlayer;
}(React.Component));
exports.MediaPlayer = MediaPlayer;
function getStyles(mock) {
    var theme = mock.context.theme, style = mock.props.style, fullScreenMode = mock.state.fullScreenMode;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(fullScreenMode ? {
            pointerEvents: "all",
            position: "fixed",
            display: "inline-block",
            width: "100%",
            height: "100%",
            fontSize: 14,
            color: theme.baseHigh,
            background: theme.altHigh
        } : __assign({ pointerEvents: "all", position: "relative", display: "inline-block", fontSize: 14, color: theme.baseHigh, background: theme.altHigh }, style))
    };
}
exports.default = MediaPlayer;
//# sourceMappingURL=index.js.map