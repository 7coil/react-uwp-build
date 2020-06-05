import * as easing from "d3-ease";
export declare function px2numb(px: string | null): number;
export declare function getBorderRadius(style: CSSStyleDeclaration): {
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
};
/**
 * Detect rectangle is overlap.
 * @param rect1 - DOMRect
 * @param rect2 - DOMRect
 */
export interface OverlapRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export declare function isRectangleOverlap(rect1: OverlapRect, rect2: OverlapRect): boolean;
/**
 * Detect cursor is inside to rect.
 * @param position The mouse cursor position.
 * @param rect The DOMRect.
 */
export declare function inRectInside(position: {
    left: number;
    top: number;
}, rect: DOMRect): boolean;
export declare function drawRadiusRect(ctx: CanvasRenderingContext2D, rect: {
    x: number;
    y: number;
    w: number;
    h: number;
}, radius: {
    borderTopLeftRadius: number;
    borderTopRightRadius: number;
    borderBottomLeftRadius: number;
    borderBottomRightRadius: number;
}): void;
export declare enum DrawType {
    Fill = 0,
    Stroke = 1
}
export declare function drawElement2Ctx(ctx: CanvasRenderingContext2D, element: HTMLElement, drawType?: DrawType, renderToScreen?: boolean): CanvasRenderingContext2D;
export declare function drawRectAtRange(ctx: CanvasRenderingContext2D, config: {
    x: number;
    y: number;
    scale: number;
    size: number;
}, fillStyle?: string | CanvasGradient | CanvasPattern): void;
export declare function createRadialGradient(ctx: CanvasRenderingContext2D, colorStr: string, timingFunc?: typeof easing.easeQuadInOut): {
    hslaStr: string;
    gradient: CanvasGradient;
};
export declare function drawBorder(config: {
    borderCanvas: HTMLCanvasElement;
    hoverSize: number;
    borderWidth: number;
    gradient: CanvasGradient;
    x: number;
    y: number;
}): void;
export declare function drawHover(config: {
    hoverCanvas: HTMLCanvasElement;
    hoverSize: number;
    gradient: CanvasGradient;
    x: number;
    y: number;
}): void;
export declare function updateCanvasRect(borderCanvasEl: HTMLCanvasElement): void;
