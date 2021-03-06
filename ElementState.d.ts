import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    children?: React.ReactElement<any>;
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
    focusStyle?: React.CSSProperties;
    activeStyle?: React.CSSProperties;
    visitedStyle?: React.CSSProperties;
    disabledStyle?: React.CSSProperties;
    onHover?: (e?: any) => void;
    onFocus?: (e?: any) => void;
    onActive?: (e?: any) => void;
    onVisited?: (e?: any) => void;
    unHover?: (e?: any) => void;
    unFocus?: (e?: any) => void;
    unActive?: (e?: any) => void;
    unVisited?: (e?: any) => void;
    onMouseEnter?: (e?: any) => void;
    onMouseLeave?: (e?: any) => void;
    onMouseDown?: (e?: any) => void;
    onMouseUp?: (e?: any) => void;
    onClick?: (e?: any) => void;
}
export interface Attributes {
    [key: string]: any;
}
export interface ElementStateProps extends DataProps, Attributes {
}
export default class ElementState extends React.Component<ElementStateProps, {}> {
    static defaultProps: ElementStateProps;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    rootElm: HTMLElement;
    originStyle: CSSStyleDeclaration;
    visitedStyle: React.CSSProperties;
    componentDidMount(): void;
    componentDidUpdate(): void;
    setStyle: (style: React.CSSProperties) => void;
    hover: () => void;
    unHover: () => void;
    active: () => void;
    unActive: () => void;
    focus: () => void;
    unFocus: () => void;
    visited: () => void;
    unVisited: () => void;
    resetStyle: (resetVisited?: boolean) => void;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
}
