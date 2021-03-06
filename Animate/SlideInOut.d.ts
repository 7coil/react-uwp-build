import * as React from "react";
import { CustomAnimateProps as CustomAnimateProps } from "./CustomAnimate";
export interface DataProps extends CustomAnimateProps {
    position?: string;
    direction?: "top" | "bottom" | "left" | "right";
}
export declare class ScaleInOut extends React.Component<DataProps> {
    static defaultProps: DataProps;
    render(): JSX.Element;
}
export default ScaleInOut;
