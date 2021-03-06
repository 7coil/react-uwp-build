import * as React from "react";
export interface DataProps {
    [key: string]: any;
}
export interface SlideInOutProps extends DataProps {
    appearAnimate?: boolean;
    childAttributes?: React.HTMLAttributes<HTMLDivElement>;
    children?: React.ReactElement<any>;
    direction?: "left" | "right" | "top" | "bottom";
    distance?: string | number;
    enterDelay?: number;
    leaveDelay?: number;
    mode?: "in" | "out" | "both";
    speed?: number;
    style?: React.CSSProperties;
}
export interface SlideInOutState {
}
export default class SlideInOut extends React.Component<SlideInOutProps, SlideInOutState> {
    static defaultProps: SlideInOutProps;
    render(): JSX.Element;
}
