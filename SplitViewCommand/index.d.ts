import * as React from "react";
import * as PropTypes from "prop-types";
import { RevealEffectProps } from "../RevealEffect";
export interface DataProps {
    /**
     * Set custom icon label.
     */
    label?: string;
    /**
     * Set custom icon.
     */
    icon?: string;
    /**
     * Set command is visited status.
     */
    visited?: boolean;
    /**
     * Set custom icon style.
     */
    iconStyle?: React.CSSProperties;
    /**
     * Use 10ft Design mode.
     */
    isTenFt?: boolean;
    /**
     * Set show label text.
     */
    showLabel?: boolean;
    /**
     * Set RevealEffect, check the styles/reveal-effect.
     */
    revealConfig?: RevealEffectProps;
}
export interface SplitViewCommandProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare class SplitViewCommand extends React.Component<SplitViewCommandProps> {
    static defaultProps: SplitViewCommandProps;
    displayName: "SplitViewCommand";
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default SplitViewCommand;
