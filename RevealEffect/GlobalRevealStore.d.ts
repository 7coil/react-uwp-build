import * as React from "react";
import { Theme } from "../styles/getTheme";
import { Throttle } from "../utils/Throttle";
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";
export interface DataProps {
    theme: Theme;
}
export interface OverlapRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export interface GlobalRevealStoreProps extends DataProps {
}
export declare class GlobalRevealStore extends React.Component<GlobalRevealStoreProps> {
    currPosition: {
        clientX: number;
        clientY: number;
    };
    hoverBorderCanvas: HTMLCanvasElement;
    resizeObserver: ResizeObserverPolyfill;
    componentDidMount(): void;
    componentWillUnmount(): void;
    initAll(): void;
    unInitAll(): void;
    updatePosition(e: any): {
        clientX: number;
        clientY: number;
    };
    drawByBorderCanvas: (borderCanvas: HTMLCanvasElement, isHoverEl?: boolean) => void;
    globalDrawThrottle: Throttle;
    handleDrawGlobalEffect: (event: Event) => void;
    drawGlobalEffects: (event: Event) => void;
    showRenderCanvas(canvasEl: HTMLCanvasElement): boolean;
    cleanGlobalEffects: (e: Event) => void;
    addGlobalListeners(): void;
    removeGlobalListeners(): void;
    reflowPropertyNames: string[];
    transitionRunThrottle: Throttle;
    handleTransitionRun: (e: TransitionEvent) => void;
    handleTransitionEnd: (e: TransitionEvent) => void;
    render(): any;
}
export default GlobalRevealStore;
