export declare function step0(x: number): 1 | 0;
export declare function step1(x: number): 1 | 0;
export declare function linear(x: number): number;
export declare function quad(x: number): number;
export declare function cubic(x: number): number;
export declare function poly(x: number): number;
export declare function sinIn(x: number): number;
export declare function circle(x: number): number;
export declare function exp(x: number): number;
export declare function elastic(x?: number): (t: number) => number;
export declare function back(x?: number): (t: number) => number;
export interface Easing {
    (x: number): number;
}
export declare function EasingIn(easing: Easing): Easing;
export declare function EasingOut(easing: Easing): Easing;
export declare function EasingInOut(easing: Easing): Easing;
export declare function bounceOut(x: number): number;
export declare function easeOutQuad(x: number): number;
export declare function easeInOutQuad(x: number): number;
export declare function easeInCubic(x: number): number;
export declare function easeOutCubic(x: number): number;
export declare function easeInOutCubic(x: number): number;
export declare function easeInQuart(x: number): number;
export declare function easeOutQuart(x: number): number;
export declare function easeInOutQuart(x: number): number;
export declare function easeInQuint(x: number): number;
export declare function easeOutQuint(x: number): number;
export declare function easeInOutQuint(x: number): number;
export declare function easeInSine(x: number): number;
export declare function easeOutSine(x: number): number;
export declare function easeInOutSine(x: number): number;
export declare function easeInExpo(x: number): number;
export declare function easeOutExpo(x: number): number;
export declare function easeInOutExpo(x: number): number;
export declare function easeInCirc(x: number): number;
export declare function easeOutCirc(x: number): number;
export declare function easeInOutCirc(x: number): number;
export declare function easeInElastic(x: number): number;
export declare function easeOutElastic(x: number): number;
export declare function easeInOutElastic(x: number): number;
export declare function easeInBack(x: number): number;
export declare function easeOutBack(x: number): number;
export declare function easeInOutBack(x: number): number;
export declare function easeInBounce(x: number): number;
export declare const easeOutBounce: typeof bounceOut;
export declare function easeInOutBounce(x: number): number;
