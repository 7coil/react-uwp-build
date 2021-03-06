import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
}
export interface SplitViewPaneProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare class SplitViewPane extends React.Component<SplitViewPaneProps> {
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    rootElm: HTMLDivElement;
    render(): JSX.Element;
}
export default SplitViewPane;
