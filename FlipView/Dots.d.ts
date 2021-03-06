import * as React from "react";
import * as PropTypes from "prop-types";
export interface DotsProps {
    count: number;
    showControl: boolean;
    controlStyle: React.CSSProperties;
    controlContentStyle: React.CSSProperties;
    iconStyle: React.CSSProperties;
    handleSwipeToIndex?: (index?: number) => void;
    defaultFocusSwipeIndex?: number;
    toggleCanAutoSwipe?: (autoSwipe?: any) => void;
    currCanAutoSwipe?: boolean;
}
export interface DotsState {
    focusSwipeIndex?: number;
}
export declare class Dots extends React.Component<DotsProps, DotsState> {
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    state: DotsState;
    setFocusIndex: (focusSwipeIndex: number) => void;
    render(): JSX.Element;
}
export default Dots;
