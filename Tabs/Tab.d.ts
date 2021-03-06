import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
}
export interface TabProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare class Tab extends React.Component<TabProps> {
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default Tab;
