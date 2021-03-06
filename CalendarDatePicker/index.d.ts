import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../utils/AddBlurEvent";
import TextBox from "../TextBox";
export interface DataProps {
    /**
     * The HTMLAttributes `placeholder`.
     */
    placeholder?: string;
    /**
     * The Default Date.
     */
    defaultDate?: Date;
    /**
     * The Component style `width`.
     */
    width?: string | number;
    /**
     * The Component style `height`.
     */
    height?: string | number;
    /**
     * onChange date `callback`.
     */
    onChangeDate?: (date?: Date) => void;
}
export interface CalendarDatePickerProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface CalendarDatePickerState {
    currDate?: Date;
    isInit?: boolean;
    showCalendarView?: boolean;
}
export declare class CalendarDatePicker extends React.Component<CalendarDatePickerProps, CalendarDatePickerState> {
    static defaultProps: CalendarDatePickerProps;
    state: CalendarDatePickerState;
    addBlurEvent: AddBlurEvent;
    rootElm: HTMLDivElement;
    textBox: TextBox;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleShowCalendarView: (showCalendarView?: any) => void;
    handleChangeDate: (date: Date) => void;
    render(): JSX.Element;
}
export default CalendarDatePicker;
