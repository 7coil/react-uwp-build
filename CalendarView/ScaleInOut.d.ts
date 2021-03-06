import * as React from "react";
export interface DataProps {
    [key: string]: any;
}
export interface ScaleInOutProps extends DataProps {
    appearAnimate?: boolean;
    childAttributes?: React.HTMLAttributes<HTMLDivElement>;
    enterDelay?: number;
    leaveDelay?: number;
    maxScale?: number;
    minScale?: number;
    mode?: "in" | "out" | "both";
    speed?: number;
}
export interface ScaleInOutState {
}
export default class ScaleInOut extends React.Component<ScaleInOutProps, ScaleInOutState> {
    static defaultProps: ScaleInOutProps;
    render(): JSX.Element;
}
