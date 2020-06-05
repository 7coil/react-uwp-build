import * as React from "react";
import * as PropTypes from "prop-types";
import { RevealEffectProps } from "../RevealEffect";
export interface DataProps {
    /**
     * The IconButton `onMouseEnter` will applied to `rootElm.style`.
     */
    hoverStyle?: React.CSSProperties;
    /**
     * The IconButton `onMouseDown` will applied to `rootElm.style`.
     */
    activeStyle?: React.CSSProperties;
    /**
     * The control IconButton size.
     */
    size?: number;
    /**
     * The control IconButton disabled.
     */
    disabled?: boolean;
    /**
     * Set RevealEffect, check the styles/reveal-effect.
     */
    revealConfig?: RevealEffectProps;
}
export interface IconButtonProps extends DataProps, React.HTMLAttributes<HTMLButtonElement> {
}
export declare class IconButton extends React.Component<IconButtonProps> {
    static defaultProps: IconButtonProps;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default IconButton;
