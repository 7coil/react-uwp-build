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
exports.TreeView = void 0;
var React = require("react");
var PropTypes = require("prop-types");
var RevealEffect_1 = require("../RevealEffect");
var Icon_1 = require("../Icon");
var emptyFunc = function () { };
var TreeView = /** @class */ (function (_super) {
    __extends(TreeView, _super);
    function TreeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            init: true
        };
        _this.setChooseItem = function (chooseTreeItem) {
            var _a = _this.props, onChooseTreeItem = _a.onChooseTreeItem, listSource = _a.listSource;
            if (_this.state.chooseTreeItem && chooseTreeItem !== _this.state.chooseTreeItem) {
                _this.state.chooseTreeItem.visited = false;
            }
            chooseTreeItem.visited = true;
            if (chooseTreeItem.children) {
                chooseTreeItem.expanded = !chooseTreeItem.expanded;
            }
            _this.setState({ chooseTreeItem: chooseTreeItem, init: false });
            _this.props.onChooseTreeItem(chooseTreeItem);
        };
        _this.renderTree = function () {
            var theme = _this.context.theme;
            var prefixStyle = theme.prefixStyle;
            var _a = _this.props, iconDirection = _a.iconDirection, showFocus = _a.showFocus, itemHeight = _a.itemHeight, iconPadding = _a.iconPadding, itemPadding = _a.itemPadding, headerIcon = _a.headerIcon, itemIcon = _a.itemIcon, listSource = _a.listSource;
            var _b = _this.state, init = _b.init, chooseTreeItem = _b.chooseTreeItem;
            var styles = getStyles(_this);
            var renderList = (function (item, index, isChild, prevIndexArray) {
                var e_1, _a;
                if (prevIndexArray === void 0) { prevIndexArray = []; }
                var indexArray = prevIndexArray.concat(index);
                if (typeof item === "string" || typeof item === "number") {
                    var lastIndex = indexArray.splice(-1)[0];
                    var itemParent = listSource;
                    try {
                        for (var indexArray_1 = __values(indexArray), indexArray_1_1 = indexArray_1.next(); !indexArray_1_1.done; indexArray_1_1 = indexArray_1.next()) {
                            var numb = indexArray_1_1.value;
                            itemParent = itemParent.children ? itemParent.children[numb] : itemParent[numb];
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (indexArray_1_1 && !indexArray_1_1.done && (_a = indexArray_1.return)) _a.call(indexArray_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    var newData = { title: item };
                    if (itemParent.children) {
                        itemParent.children[lastIndex] = newData;
                    }
                    else {
                        itemParent[lastIndex] = newData;
                    }
                    item = newData;
                }
                var title = item.title, titleNode = item.titleNode, expanded = item.expanded, disabled = item.disabled, visited = item.visited, focus = item.focus, children = item.children, hidden = item.hidden, onClick = item.onClick, style = item.style, hoverStyle = item.hoverStyle;
                titleNode = title || titleNode;
                var behindElm = null;
                var haveChild = Array.isArray(children) && children.length !== 0;
                var isRight = iconDirection === "right";
                var isVisited = (visited && !haveChild) || (visited && init);
                var inlineStyles = hidden ? null : {
                    root: {
                        paddingLeft: isChild ? (isRight ? itemHeight / 2.8 : itemPadding || itemHeight * 2 / 3) : void 0
                    },
                    title: __assign({ color: disabled ? theme.baseLow : void 0 }, styles.title),
                    titleNode: __assign(__assign({ cursor: disabled ? "not-allowed" : "pointer", pointerEvents: disabled ? "none" : void 0, paddingLeft: isRight ? 0 : (haveChild ? iconPadding : itemHeight / 8), fontSize: itemHeight / 2.25, height: "100%", lineHeight: itemHeight + "px" }, styles.titleNode), style),
                    icon: {
                        cursor: disabled ? "not-allowed" : "pointer",
                        color: disabled ? theme.baseLow : void 0,
                        fontSize: itemHeight / 2,
                        lineHeight: itemHeight / 2 + "px",
                        width: itemHeight / 2,
                        height: itemHeight / 2,
                        flex: "0 0 auto",
                        zIndex: 1,
                        transform: "rotateZ(" + (expanded ? "-180deg" : (isRight ? "0deg" : "-90deg")) + ")"
                    },
                    behindBG: __assign({ cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.25s", zIndex: 0, background: (focus && showFocus) ? theme.accent : (isVisited ? theme.listAccentLow : "none") }, styles.behindBG),
                    child: haveChild ? theme.prefixStyle({
                        height: "auto",
                        overflow: expanded ? void 0 : "hidden",
                        opacity: expanded ? 1 : 0,
                        transform: "translateY(" + (expanded ? 0 : -10) + "px)",
                        transformOrigin: "top",
                        transition: "all .25s"
                    }) : void 0
                };
                var listStyles = hidden ? null : theme.prepareStyles({
                    className: "tree-view",
                    styles: inlineStyles
                });
                return hidden ? null : (React.createElement("div", __assign({}, listStyles.root, { key: "" + index }),
                    React.createElement("div", __assign({}, listStyles.title, { onMouseEnter: disabled ? void 0 : function (e) {
                            if (behindElm) {
                                Object.assign(behindElm.style, __assign({ background: isVisited ? theme.accent : theme.baseLow }, hoverStyle));
                            }
                        }, onMouseLeave: disabled ? void 0 : function (e) {
                            if (behindElm) {
                                Object.assign(behindElm.style, {
                                    background: isVisited ? theme.listAccentLow : "none"
                                });
                            }
                        } }),
                        React.createElement("div", __assign({ onClick: disabled ? void 0 : function (e) {
                                _this.setChooseItem(item);
                                if (onClick)
                                    onClick(e);
                            } }, listStyles.titleNode), titleNode),
                        haveChild ? headerIcon : itemIcon,
                        (headerIcon || itemIcon ? (headerIcon && itemIcon) : true) && haveChild && (React.createElement(Icon_1.default, __assign({ onClick: disabled ? void 0 : function (e) {
                                _this.setChooseItem(item);
                            } }, listStyles.icon), "ScrollChevronDownLegacy")),
                        React.createElement("div", { onClick: disabled ? void 0 : function (e) {
                                _this.setChooseItem(item);
                                if (onClick)
                                    onClick(e);
                            }, className: listStyles.behindBG.className, style: __assign(__assign({}, listStyles.behindBG.style), { background: (focus && showFocus) ? theme.accent : (isVisited ? theme.listAccentLow : "none") }), ref: function (elm) { return behindElm = elm; } },
                            React.createElement(RevealEffect_1.default, { effectRange: "self" }))),
                    haveChild && (React.createElement("div", __assign({}, listStyles.child), expanded && children.map(function (item, index) { return renderList(item, index, true, indexArray); })))));
            });
            return listSource.map(function (list, index) { return renderList(list, index); });
        };
        return _this;
    }
    TreeView.prototype.render = function () {
        var _a = this.props, listSource = _a.listSource, iconDirection = _a.iconDirection, itemHeight = _a.itemHeight, onChooseTreeItem = _a.onChooseTreeItem, itemPadding = _a.itemPadding, iconPadding = _a.iconPadding, showFocus = _a.showFocus, background = _a.background, headerIcon = _a.headerIcon, itemIcon = _a.itemIcon, className = _a.className, style = _a.style, attributes = __rest(_a, ["listSource", "iconDirection", "itemHeight", "onChooseTreeItem", "itemPadding", "iconPadding", "showFocus", "background", "headerIcon", "itemIcon", "className", "style"]);
        var styles = getStyles(this);
        return (React.createElement("div", __assign({}, attributes, this.context.theme.prepareStyle({
            style: styles.root,
            className: "tree-view",
            extendsClassName: className
        })), listSource ? this.renderTree() : null));
    };
    TreeView.defaultProps = {
        listSource: [],
        itemHeight: 32,
        iconPadding: 2,
        iconDirection: "left",
        onChooseTreeItem: emptyFunc,
        showFocus: true
    };
    TreeView.contextTypes = { theme: PropTypes.object };
    return TreeView;
}(React.Component));
exports.TreeView = TreeView;
function getStyles(treeView) {
    var context = treeView.context, _a = treeView.props, iconDirection = _a.iconDirection, itemHeight = _a.itemHeight, style = _a.style, background = _a.background;
    var isRight = iconDirection === "right";
    var theme = context.theme;
    var prefixStyle = theme.prefixStyle;
    return {
        root: prefixStyle(__assign({ 
            // ...(background ? { ...theme.acrylicTexture60.style, background } : theme.acrylicTexture60.style),
            fontSize: 14, overflowX: "hidden", overflowY: "auto", color: theme.baseMediumHigh, width: itemHeight * 10, padding: "0 16px" }, style)),
        title: prefixStyle({
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "100%",
            position: "relative",
            fontSize: 14,
            display: "flex",
            height: itemHeight,
            flexDirection: "row" + (isRight ? "" : "-reverse"),
            alignItems: "center",
            justifyContent: isRight ? "space-between" : "flex-end",
            transition: "all .25s 0s ease-in-out"
        }),
        titleNode: prefixStyle({
            pointerEvents: "none",
            color: "inherit",
            zIndex: 1,
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
        }),
        behindBG: {
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "400%",
            height: "100%"
        }
    };
}
exports.default = TreeView;
//# sourceMappingURL=index.js.map