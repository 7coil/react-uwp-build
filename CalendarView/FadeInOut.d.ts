import * as React from "react";
export interface DataProps {
    [key: string]: any;
}
export interface FadeInOutProps extends DataProps {
    appearAnimate?: boolean;
    childAttributes?: React.HTMLAttributes<HTMLDivElement>;
    enterDelay?: number;
    leaveDelay?: number;
    maxValue?: number;
    minValue?: number;
    mode?: "in" | "out" | "both";
    speed?: number;
}
export default class FadeInOut extends React.Component<FadeInOutProps> {
    static defaultProps: FadeInOutProps;
    render(): JSX.Element;
}
