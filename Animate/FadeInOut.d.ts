import * as React from "react";
import { CustomAnimateProps as CustomAnimateProps } from "./CustomAnimate";
export interface DataProps extends CustomAnimateProps {
}
export declare class FadeInOut extends React.Component<DataProps> {
    static defaultProps: DataProps;
    render(): JSX.Element;
}
export default FadeInOut;
