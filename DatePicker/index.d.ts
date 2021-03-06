import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../utils/AddBlurEvent";
import ListView from "../ListView";
export interface DataProps {
    /**
     * Set default date.
     */
    defaultDate?: Date;
    /**
     * `onChangeDate` callback.
     */
    onChangeDate?: (date?: Date) => void;
    /**
     * Set can choose max year.
     */
    maxYear?: number;
    /**
     * Set can choose min year.
     */
    minYear?: number;
    /**
     * Set `Input` element height.
     */
    inputItemHeight?: number;
    /**
     * Set `Picker` element height.
     */
    pickerItemHeight?: number;
    /**
     * Set custom background.
     */
    background?: string;
}
export interface DatePickerProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface DatePickerState {
    showPicker?: boolean;
    currDate?: Date;
}
export declare class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    static defaultProps: DatePickerProps;
    state: DatePickerState;
    addBlurEvent: AddBlurEvent;
    rootElm: HTMLDivElement;
    prevDate: Date;
    monthListView: ListView;
    dateListView: ListView;
    yearListView: ListView;
    monthIndex: number;
    dateIndex: number;
    yearIndex: number;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    componentWillReceiveProps(nextProps: DatePickerProps): void;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleShowPicker: (showPicker?: any) => void;
    setDate: (date?: number, month?: number, year?: number) => void;
    render(): JSX.Element;
}
export default DatePicker;
