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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var IS_NODE_ENV_1 = require("./utils/nodeJS/IS_NODE_ENV");
var RenderToBody = /** @class */ (function (_super) {
    __extends(RenderToBody, _super);
    function RenderToBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootElm = IS_NODE_ENV_1.default ? null : document.createElement("div");
        _this.renderComponent = function () {
            var children = _this.props.children;
            if (children) {
                ReactDOM.unstable_renderSubtreeIntoContainer(_this, children, _this.rootElm);
            }
        };
        _this.unRenderComponent = function () {
            if (!_this.rootElm)
                return;
            ReactDOM.unmountComponentAtNode(_this.rootElm);
        };
        _this.getRootElement = function () { return _this.rootElm; };
        return _this;
    }
    RenderToBody.prototype.componentDidMount = function () {
        if (IS_NODE_ENV_1.default)
            this.rootElm = document.createElement("div");
        var _a = this.props, style = _a.style, className = _a.className;
        Object.assign(this.rootElm.style, style);
        if (className)
            this.rootElm.setAttribute("class", className);
        document.body.appendChild(this.rootElm);
        this.renderComponent();
    };
    RenderToBody.prototype.componentDidUpdate = function () {
        this.renderComponent();
        var _a = this.props, style = _a.style, className = _a.className;
        Object.assign(this.rootElm.style, style);
        if (className)
            this.rootElm.setAttribute("class", className);
    };
    RenderToBody.prototype.componentWillUnmount = function () {
        if (this.props.children) {
            this.unRenderComponent();
        }
        document.body.removeChild(this.rootElm);
        this.rootElm = null;
    };
    RenderToBody.prototype.render = function () {
        return null;
    };
    return RenderToBody;
}(React.Component));
exports.default = RenderToBody;
//# sourceMappingURL=RenderToBody.js.map