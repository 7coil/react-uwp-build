import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../utils/AddBlurEvent";
import SplitViewPane, { SplitViewPaneProps } from "./SplitViewPane";
export { SplitViewPane, SplitViewPaneProps };
export interface DataProps {
    displayMode?: "compact" | "overlay";
    expandedWidth?: number;
    defaultExpanded?: boolean;
    panePosition?: "left" | "right";
    paneStyle?: React.CSSProperties;
    onClosePane?: () => void;
    clickExcludeElms?: HTMLDivElement[];
}
export interface SplitViewProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface SplitViewState {
    expanded?: boolean;
}
export declare class SplitView extends React.Component<SplitViewProps, SplitViewState> {
    static defaultProps: SplitViewProps;
    state: SplitViewState;
    addBlurEvent: AddBlurEvent;
    rootElm: HTMLDivElement;
    componentWillReceiveProps(nextProps: SplitViewProps): void;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default SplitView;
