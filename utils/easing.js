"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easeInOutBounce = exports.easeOutBounce = exports.easeInBounce = exports.easeInOutBack = exports.easeOutBack = exports.easeInBack = exports.easeInOutElastic = exports.easeOutElastic = exports.easeInElastic = exports.easeInOutCirc = exports.easeOutCirc = exports.easeInCirc = exports.easeInOutExpo = exports.easeOutExpo = exports.easeInExpo = exports.easeInOutSine = exports.easeOutSine = exports.easeInSine = exports.easeInOutQuint = exports.easeOutQuint = exports.easeInQuint = exports.easeInOutQuart = exports.easeOutQuart = exports.easeInQuart = exports.easeInOutCubic = exports.easeOutCubic = exports.easeInCubic = exports.easeInOutQuad = exports.easeOutQuad = exports.bounceOut = exports.EasingInOut = exports.EasingOut = exports.EasingIn = exports.back = exports.elastic = exports.exp = exports.circle = exports.sinIn = exports.poly = exports.cubic = exports.quad = exports.linear = exports.step1 = exports.step0 = void 0;
var pow = Math.pow;
var sqrt = Math.sqrt;
var sin = Math.sin;
var cos = Math.cos;
var PI = Math.PI;
var c1 = 1.70158;
var c2 = c1 * 1.525;
var c3 = c1 + 1;
var c4 = (2 * PI) / 3;
var c5 = (2 * PI) / 4.5;
function step0(x) {
    return x > 0 ? 1 : 0;
}
exports.step0 = step0;
function step1(x) {
    return x >= 1 ? 1 : 0;
}
exports.step1 = step1;
function linear(x) {
    return x;
}
exports.linear = linear;
function quad(x) {
    return Math.pow(x, 2);
}
exports.quad = quad;
function cubic(x) {
    return Math.pow(x, 3);
}
exports.cubic = cubic;
function poly(x) {
    return Math.pow(x, 3);
}
exports.poly = poly;
function sinIn(x) {
    return 1 - cos(x * PI / 2);
}
exports.sinIn = sinIn;
function circle(x) {
    return 1 - sqrt(1 - Math.pow(x, 2));
}
exports.circle = circle;
function exp(x) {
    return pow(2, 10 * (x - 1));
}
exports.exp = exp;
function elastic(x) {
    if (x === void 0) { x = 1; }
    var p = x * PI;
    return function (t) { return 1 - pow(cos(x * PI / 2), 3) * cos(x * p); };
}
exports.elastic = elastic;
function back(x) {
    if (x === void 0) { x = c1; }
    return function (t) { return Math.pow(t, 2) * ((x + 1) * t - x); };
}
exports.back = back;
function EasingIn(easing) {
    return easing;
}
exports.EasingIn = EasingIn;
function EasingOut(easing) {
    return function (t) { return 1 - easing(1 - t); };
}
exports.EasingOut = EasingOut;
function EasingInOut(easing) {
    return function (t) { return t < 0.5 ? (easing(t * 2) / 2) : (1 - easing((1 - t) * 2) / 2); };
}
exports.EasingInOut = EasingInOut;
function bounceOut(x) {
    var n1 = 7.5625;
    var d1 = 2.75;
    if (x < 1 / d1) {
        return n1 * Math.pow(x, 2);
    }
    else if (x < 2 / d1) {
        return n1 * (x -= (1.5 / d1)) * x + .75;
    }
    else if (x < 2.5 / d1) {
        return n1 * (x -= (2.25 / d1)) * x + .9375;
    }
    else {
        return n1 * (x -= (2.625 / d1)) * x + .984375;
    }
}
exports.bounceOut = bounceOut;
function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
}
exports.easeOutQuad = easeOutQuad;
function easeInOutQuad(x) {
    return x < 0.5 ?
        2 * x * x :
        1 - pow(-2 * x + 2, 2) / 2;
}
exports.easeInOutQuad = easeInOutQuad;
function easeInCubic(x) {
    return Math.pow(x, 3);
}
exports.easeInCubic = easeInCubic;
function easeOutCubic(x) {
    return 1 - pow(1 - x, 3);
}
exports.easeOutCubic = easeOutCubic;
function easeInOutCubic(x) {
    return x < 0.5 ?
        4 * Math.pow(x, 3) :
        1 - pow(-2 * x + 2, 3) / 2;
}
exports.easeInOutCubic = easeInOutCubic;
function easeInQuart(x) {
    return Math.pow(x, 4);
}
exports.easeInQuart = easeInQuart;
function easeOutQuart(x) {
    return 1 - pow(1 - x, 4);
}
exports.easeOutQuart = easeOutQuart;
function easeInOutQuart(x) {
    return x < 0.5 ?
        8 * Math.pow(x, 4) :
        1 - pow(-2 * x + 2, 4) / 2;
}
exports.easeInOutQuart = easeInOutQuart;
function easeInQuint(x) {
    return Math.pow(x, 5);
}
exports.easeInQuint = easeInQuint;
function easeOutQuint(x) {
    return 1 - pow(1 - x, 5);
}
exports.easeOutQuint = easeOutQuint;
function easeInOutQuint(x) {
    return x < 0.5 ?
        16 * Math.pow(x, 5) :
        1 - pow(-2 * x + 2, 5) / 2;
}
exports.easeInOutQuint = easeInOutQuint;
function easeInSine(x) {
    return 1 - cos(x * PI / 2);
}
exports.easeInSine = easeInSine;
function easeOutSine(x) {
    return sin(x * PI / 2);
}
exports.easeOutSine = easeOutSine;
function easeInOutSine(x) {
    return -(cos(PI * x) - 1) / 2;
}
exports.easeInOutSine = easeInOutSine;
function easeInExpo(x) {
    return x === 0 ? 0 : pow(2, 10 * x - 10);
}
exports.easeInExpo = easeInExpo;
function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - pow(2, -10 * x);
}
exports.easeOutExpo = easeOutExpo;
function easeInOutExpo(x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
        pow(2, 20 * x - 10) / 2 :
        (2 - pow(2, -20 * x + 10)) / 2;
}
exports.easeInOutExpo = easeInOutExpo;
function easeInCirc(x) {
    return 1 - sqrt(1 - pow(x, 2));
}
exports.easeInCirc = easeInCirc;
function easeOutCirc(x) {
    return sqrt(1 - pow(x - 1, 2));
}
exports.easeOutCirc = easeOutCirc;
function easeInOutCirc(x) {
    return x < 0.5 ?
        (1 - sqrt(1 - pow(2 * x, 2))) / 2 :
        (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
}
exports.easeInOutCirc = easeInOutCirc;
function easeInElastic(x) {
    return x === 0 ? 0 : x === 1 ? 1 :
        -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
}
exports.easeInElastic = easeInElastic;
function easeOutElastic(x) {
    return x === 0 ? 0 : x === 1 ? 1 :
        pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
}
exports.easeOutElastic = easeOutElastic;
function easeInOutElastic(x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
        -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 :
        pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
}
exports.easeInOutElastic = easeInOutElastic;
function easeInBack(x) {
    return c3 * Math.pow(x, 3) - c1 * Math.pow(x, 2);
}
exports.easeInBack = easeInBack;
function easeOutBack(x) {
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}
exports.easeOutBack = easeOutBack;
function easeInOutBack(x) {
    return x < 0.5 ?
        (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
        (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
exports.easeInOutBack = easeInOutBack;
function easeInBounce(x) {
    return 1 - bounceOut(1 - x);
}
exports.easeInBounce = easeInBounce;
exports.easeOutBounce = bounceOut;
function easeInOutBounce(x) {
    return x < 0.5 ?
        (1 - bounceOut(1 - 2 * x)) / 2 :
        (1 + bounceOut(2 * x - 1)) / 2;
}
exports.easeInOutBounce = easeInOutBounce;
//# sourceMappingURL=easing.js.map