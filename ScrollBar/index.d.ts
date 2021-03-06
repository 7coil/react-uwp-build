import * as React from "react";
export interface DataProps {
    scrollBarStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
    thumbStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    showVerticalBar?: boolean;
    showHorizontalBar?: boolean;
    autoHide?: boolean;
    scrollSpeed?: number;
    iconNode?: any;
}
export interface ScrollBarProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ScrollBarState {
    mouseDowning?: boolean;
}
export default class ScrollBar extends React.Component<ScrollBarProps, ScrollBarState> {
    static defaultProps: ScrollBarProps;
    state: ScrollBarState;
    loopIconMouseDownTimeOut: any;
    translateX: number;
    translateY: number;
    refs: {
        view?: HTMLDivElement;
        thumb?: HTMLDivElement;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    addListeners: () => void;
    removeListeners: () => void;
    topIconClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    topIconMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    bottomIconClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    bottomIconMouseDown: () => void;
    iconMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
    scrollTopByStep: (toTop: boolean) => void;
    iconMouseDown: (toTop: boolean) => void;
    render(): JSX.Element;
}
