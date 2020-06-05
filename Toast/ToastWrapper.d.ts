import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    toastEls?: React.ReactElement<any>[];
}
export interface ToastWrapperProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ToastWrapperState {
    toastEls?: React.ReactElement<any>[];
}
export declare class ToastWrapper extends React.Component<ToastWrapperProps, ToastWrapperState> {
    state: ToastWrapperState;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    render(): JSX.Element;
}
export default ToastWrapper;
