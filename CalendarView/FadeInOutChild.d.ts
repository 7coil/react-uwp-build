import * as React from "react";
export interface DataProps {
    appearAnimate?: boolean;
    enterDelay?: number;
    leaveDelay?: number;
    maxValue?: number;
    minValue?: number;
    mode?: "in" | "out" | "both";
    speed?: number;
}
export interface FadeInOutProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export default class FadeInOut extends React.Component<FadeInOutProps> {
    static defaultProps: {
        appearAnimate: boolean;
        enterDelay: number;
        leaveDelay: number;
        maxValue: number;
        minValue: number;
        mode: string;
        speed: number;
    };
    enterTimer: any;
    leaveTimer: any;
    displayStyleTimer: any;
    rootElm: HTMLSpanElement;
    componentWillAppear: (callback: () => void) => void;
    componentDidAppear: () => void;
    componentWillEnter(callback: () => void): void;
    componentDidEnter(): void;
    componentWillLeave(callback: () => void): void;
    componentDidLeave(): void;
    componentWillUnmount(): void;
    animate: (callback?: () => void) => void;
    initializeAnimation: (callback?: () => void, revers?: boolean) => void;
    render(): JSX.Element;
}
