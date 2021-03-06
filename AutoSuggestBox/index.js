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
exports.AutoSuggestBox = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var Icon_1 = require("../Icon");
var TextBox_1 = require("../TextBox");
var ListView_1 = require("../ListView");
var PseudoClasses_1 = require("../PseudoClasses");
var emptyFunc = function () { };
var AutoSuggestBox = /** @class */ (function (_super) {
    __extends(AutoSuggestBox, _super);
    function AutoSuggestBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.inputTimer = null;
        _this.checkLayerClick = function (e) {
            var typing = _this.state.typing;
            if (!_this.textBox.rootElm.contains(e.target)) {
                _this.setState({ showListSource: false });
            }
        };
        _this.checkLayerKeydown = function (e) {
            var keyCode = e.keyCode;
            var typing = _this.state.typing;
            if (_this.textBox.inputElm.matches(":focus") && keyCode === 27) {
                _this.setState({ showListSource: false });
            }
        };
        _this.toggleShowListSource = function (showListSource) {
            if (typeof showListSource === "boolean") {
                if (showListSource !== _this.state.showListSource) {
                    _this.setState({ showListSource: showListSource });
                }
            }
            else {
                _this.setState(function (prevState, prevProps) { return ({
                    showListSource: !prevState.showListSource
                }); });
            }
        };
        _this.showListSource = function () { return _this.setState({ showListSource: true }); };
        _this.handleChange = function (e) {
            var event;
            event = e;
            var value = event.currentTarget.value;
            _this.props.onChangeValue(value);
            clearTimeout(_this.inputTimer);
            _this.inputTimer = setTimeout(function () {
                if (value) {
                    _this.setState({ typing: true, showListSource: true });
                }
                else {
                    _this.setState({ typing: false, showListSource: false });
                }
            }, 150);
        };
        /**
         * `Get` input value method.
         */
        _this.getValue = function () { return _this.textBox.getValue(); };
        /**
         * `Set` input value method.
         */
        _this.setValue = function (value) { return _this.textBox.setValue(value); };
        /**
         * `Reset` input value method.
         */
        _this.handleButtonAction = function (e) {
            if (_this.state.typing) {
                _this.setValue("");
                _this.props.onChangeValue("");
                _this.setState({
                    typing: false,
                    showListSource: false
                });
                _this.textBox.inputElm.focus();
            }
            else {
                var value = _this.getValue();
                _this.props.searchAction(value);
                _this.props.onChangeValue(value);
            }
        };
        _this.handleChooseItem = function (index) {
            var chooseTimer = setTimeout(function () {
                _this.toggleShowListSource(false);
                clearTimeout(chooseTimer);
            }, 250);
            var item = _this.props.listSource[index];
            _this.setValue(typeof item === "object" ? item.props.value : item);
        };
        _this.handleInputKeyDown = function (e) {
            var keyCode = e.keyCode;
            var _a = _this.state, focusListSourceIndex = _a.focusListSourceIndex, showListSource = _a.showListSource;
            var searchAction = _this.props.searchAction;
            var listSourceSize;
            if (listSourceSize && showListSource) {
                switch (keyCode) {
                    case 38: {
                        if (focusListSourceIndex === void 0) {
                            _this.setState({ focusListSourceIndex: listSourceSize - 1 });
                        }
                        else {
                            focusListSourceIndex = focusListSourceIndex - 1;
                            if (focusListSourceIndex < 0)
                                focusListSourceIndex = focusListSourceIndex + listSourceSize;
                            _this.setState({ focusListSourceIndex: focusListSourceIndex % listSourceSize });
                        }
                        break;
                    }
                    case 40: {
                        if (focusListSourceIndex === void 0) {
                            _this.setState({ focusListSourceIndex: 0 });
                        }
                        else {
                            focusListSourceIndex = focusListSourceIndex + 1;
                            if (focusListSourceIndex > listSourceSize)
                                focusListSourceIndex = focusListSourceIndex - listSourceSize;
                            _this.setState({ focusListSourceIndex: focusListSourceIndex % listSourceSize });
                        }
                        break;
                    }
                    case 13: {
                        if (focusListSourceIndex === void 0) {
                            searchAction(_this.getValue());
                            _this.setState({ showListSource: false });
                        }
                        else {
                            _this.handleChooseItem(focusListSourceIndex);
                            _this.setState({ focusListSourceIndex: void 0 });
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            else {
                if (keyCode === 13) {
                    searchAction(_this.getValue());
                }
            }
        };
        return _this;
    }
    AutoSuggestBox.prototype.componentDidMount = function () {
        document.documentElement.addEventListener("click", this.checkLayerClick);
        document.documentElement.addEventListener("keydown", this.checkLayerKeydown);
    };
    AutoSuggestBox.prototype.componentWillUnmount = function () {
        document.documentElement.removeEventListener("click", this.checkLayerClick);
        document.documentElement.removeEventListener("keydown", this.checkLayerKeydown);
    };
    AutoSuggestBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, onChangeValue = _a.onChangeValue, searchAction = _a.searchAction, listSource = _a.listSource, iconSize = _a.iconSize, children = _a.children, className = _a.className, background = _a.background, attributes = __rest(_a, ["onChangeValue", "searchAction", "listSource", "iconSize", "children", "className", "background"]);
        var _b = this.state, typing = _b.typing, focusListSourceIndex = _b.focusListSourceIndex;
        var theme = this.context.theme;
        var inlineStyles = getStyles(this);
        var styles = theme.prepareStyles({
            styles: inlineStyles,
            className: "autosuggest-box"
        });
        return (React.createElement(TextBox_1.default, __assign({}, attributes, { style: inlineStyles.root, className: theme.classNames(className, styles.root.className), ref: function (textBox) { return _this.textBox = textBox; }, onClick: this.showListSource, onKeyDown: this.handleInputKeyDown, rightNode: React.createElement(PseudoClasses_1.default, { style: inlineStyles.icon, onClick: this.handleButtonAction },
                React.createElement(Icon_1.default, null, typing ? "CancelLegacy" : "Search")), background: background, onChange: this.handleChange }), listSource && listSource.length > 0 && (React.createElement(ListView_1.default, { ref: function (listView) { return _this.listView = listView; }, style: inlineStyles.listView, listSource: listSource.map(function (itemNode, index) { return ({
                itemNode: itemNode,
                focus: index === focusListSourceIndex
            }); }), listItemStyle: {
                fontSize: 12
            }, onChooseItem: this.handleChooseItem }))));
    };
    AutoSuggestBox.defaultProps = {
        background: "none",
        onChangeValue: emptyFunc,
        searchAction: emptyFunc,
        iconSize: 32
    };
    AutoSuggestBox.contextTypes = { theme: PropTypes.object };
    return AutoSuggestBox;
}(React.Component));
exports.AutoSuggestBox = AutoSuggestBox;
function getStyles(autoSuggestBox) {
    var context = autoSuggestBox.context, _a = autoSuggestBox.props, style = _a.style, iconSize = _a.iconSize, showListSource = autoSuggestBox.state.showListSource;
    var theme = context.theme;
    return {
        root: theme.prefixStyle(__assign(__assign({ display: "inline-block", verticalAlign: "middle" }, style), { position: "relative" })),
        listView: theme.prefixStyle({
            position: "absolute",
            width: "100%",
            top: "100%",
            left: 0,
            zIndex: 2,
            border: "1px solid " + theme.baseLow,
            transform: "translate3d(0, " + (showListSource ? 0 : "-10px") + ", 0)",
            opacity: showListSource ? 1 : 0,
            pointerEvents: showListSource ? void 0 : "none",
            transition: "all .25s"
        }),
        icon: {
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "pointer !important",
            height: iconSize,
            width: iconSize,
            color: "#a9a9a9",
            "&:hover": {
                color: theme.accent
            }
        }
    };
}
exports.default = AutoSuggestBox;
//# sourceMappingURL=index.js.map