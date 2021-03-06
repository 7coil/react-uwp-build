import * as React from "react";
export interface DataProps {
    appearAnimate?: boolean;
    enterDelay?: number;
    leaveDelay?: number;
    maxScale?: number;
    minScale?: number;
    mode?: "in" | "out" | "both";
    speed?: number;
}
export interface ScaleInOutChildProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export default class ScaleInOutChild extends React.Component<ScaleInOutChildProps, {}> {
    static defaultProps: {
        appearAnimate: boolean;
        enterDelay: number;
        leaveDelay: number;
        maxScale: number;
        minScale: number;
        mode: string;
        speed: number;
    };
    enterTimer: any;
    leaveTimer: any;
    rootElm: HTMLDivElement;
    componentWillAppear: (callback: () => void) => void;
    componentDidAppear: () => void;
    componentWillEnter(callback: () => void): void;
    componentDidEnter(): void;
    componentWillLeave(callback: () => void): void;
    componentWillUnmount(): void;
    animate: (callback?: () => void) => void;
    initializeAnimation: (callback?: () => void, revers?: boolean) => void;
    render(): JSX.Element;
}
