import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /** Set effectEnable type, default is both. */
    effectEnable?: "hover" | "border" | "both" | "disabled";
    /** Set hover size. */
    hoverSize?: number;
    /** Set hoverColor. */
    hoverColor?: string;
    /** Set hover borderWidth. */
    borderWidth?: number;
    /** Set borderColor. */
    borderColor?: string;
    /** Set effect enable range. */
    effectRange?: "self" | "others" | "all";
    /** Observer resize event. */
    observerResize?: boolean;
    /** addLister observerTransition by propertyName. */
    observerTransition?: string | string[];
}
export interface RevealEffectProps extends DataProps, React.HTMLAttributes<HTMLCanvasElement> {
}
export declare class RevealEffect extends React.Component<RevealEffectProps> {
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    parentEl: HTMLElement;
    parentElRect: DOMRect;
    currPosition: {
        clientX: number;
        clientY: number;
    };
    hoverCanvasEl: HTMLCanvasElement;
    borderCanvasEl: HTMLCanvasElement;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    updateDOMNode(): void;
    removeDOMNode(): void;
    render(): JSX.Element;
}
export default RevealEffect;
