import * as React from "react";
export interface RenderToBodyProps {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactElement<any>;
}
export default class RenderToBody extends React.Component<RenderToBodyProps> {
    rootElm: HTMLDivElement;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    renderComponent: () => void;
    unRenderComponent: () => void;
    getRootElement: () => HTMLDivElement;
    render(): any;
}
