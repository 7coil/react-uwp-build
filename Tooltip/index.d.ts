import * as React from "react";
import * as PropTypes from "prop-types";
import { Throttle } from "../utils/Throttle";
export interface DataProps {
    /**
     * Set Tooltip content.
     */
    content?: string;
    /**
     * Set ReactNode to replace content.
     */
    contentNode?: React.ReactNode;
    /**
     * Set Tooltip custom vertical position.
     */
    verticalPosition?: "top" | "bottom" | "center";
    /**
     * Set Tooltip custom horizontal position.
     */
    horizontalPosition?: "left" | "right" | "center";
    /**
     * Set Tooltip custom margin from `rootElm` (px).
     */
    margin?: number;
    /**
     * Set Tooltip auto close in showed some time.
     */
    autoClose?: boolean;
    /**
     * Set Tooltip auto close time (ms).
     */
    autoCloseTimeout?: number;
    /**
     * Set close delay by time (ms).
     */
    closeDelay?: number;
    /**
     * Set custom background.
     */
    background?: string;
}
export interface TooltipProps extends DataProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare class Tooltip extends React.Component<TooltipProps> {
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    static defaultProps: TooltipProps;
    rootElm: HTMLDivElement;
    tooltipElm: HTMLSpanElement;
    showTooltip: boolean;
    atuoCloseTimer: any;
    showThrottle: Throttle;
    toggleShow: (e?: React.MouseEvent<HTMLDivElement>) => void;
    hideThrottle: Throttle;
    closeDelayTimer: any;
    toggleHide: (e?: React.MouseEvent<HTMLDivElement>) => void;
    getBaseStyle: (showTooltip?: boolean, positionStyle?: React.CSSProperties) => React.CSSProperties;
    getTooltipStyle: () => React.CSSProperties;
    getTooltipClasses(): import("../styles/StyleManager").StyleClasses;
    render(): JSX.Element;
}
export default Tooltip;
