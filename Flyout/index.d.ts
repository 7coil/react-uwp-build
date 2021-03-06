import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
}
export interface FlyoutProps extends DataProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare class Flyout extends React.Component<FlyoutProps> {
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default Flyout;
