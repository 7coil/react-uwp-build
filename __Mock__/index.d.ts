import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
}
export interface MockProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface MockState {
}
export declare class Mock extends React.Component<MockProps, MockState> {
    static defaultProps: MockProps;
    state: MockState;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default Mock;
