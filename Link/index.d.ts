import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    href?: string;
}
export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement>, DataProps {
}
export default class Link extends React.Component<LinkProps> {
    static defaultProps: LinkProps;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
