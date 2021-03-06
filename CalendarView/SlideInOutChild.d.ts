import * as React from "react";
export interface DataProps {
    appearAnimate?: boolean;
    direction?: "left" | "right" | "top" | "bottom";
    distance?: string | number;
    enterDelay?: number;
    leaveDelay?: number;
    mode?: "in" | "out" | "both";
    speed?: number;
}
export interface SlideInChildProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export default class SlideInChild extends React.Component<SlideInChildProps, {}> {
    static defaultProps: {
        appearAnimate: boolean;
        direction: string;
        distance: string;
        enterDelay: number;
        leaveDelay: number;
        mode: string;
        speed: number;
    };
    enterTimer: number;
    leaveTimer: number;
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
