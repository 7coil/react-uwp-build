import * as React from "react";
import * as PropTypes from "prop-types";
import { DataProps } from "./CustomAnimate";
export default class CustomAnimateChild extends React.Component<DataProps> {
    enterTimer: any;
    leaveTimer: any;
    displayStyleTimer: any;
    rootElm: HTMLSpanElement;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillAppear: (callback: () => void) => void;
    componentDidAppear: () => void;
    componentWillEnter(callback: () => void): void;
    componentWillLeave(callback: () => void): void;
    componentWillUnmount(): void;
    setEnterStyle: (callback?: () => void) => void;
    setLeaveStyle: (callback?: () => void, revers?: boolean) => void;
    getRootElmOrComponentStyle: (rootElm: any) => any;
    render(): JSX.Element;
}
