import * as React from "react";
import * as PropTypes from "prop-types";
import { RevealEffectProps } from "../RevealEffect";
export interface DataProps {
    /**
     * Set custom icon string.
     */
    icon?: string;
    /**
     * Set custom icon style.
     */
    iconStyle?: React.CSSProperties;
    /**
     * Set rootElm hovered style.
     */
    hoverStyle?: React.CSSProperties;
    /**
     * Set label string.
     */
    label?: string;
    /**
     * Set label display position.
     */
    labelPosition?: "right" | "bottom" | "collapsed";
    /**
     * Set RevealEffect, check the styles/reveal-effect.
     */
    revealConfig?: RevealEffectProps;
}
export interface AppBarButtonButtonProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare class AppBarButtonButton extends React.Component<AppBarButtonButtonProps> {
    static defaultProps: AppBarButtonButtonProps;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default AppBarButtonButton;
