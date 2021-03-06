import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    /**
     * CalendarView defaultDate.
     */
    defaultDate?: Date;
    /**
     * init show mode.
     */
    pickerMode?: "year" | "month" | "day";
    /**
     * onChange date callback.
     */
    onChangeDate?: (date?: Date) => void;
    /**
     * if true, just select one highLight date item.
     */
    selectSingleDay?: boolean;
    /**
     * Set custom background.
     */
    background?: string;
}
export interface CalendarViewProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface CalendarViewState {
    viewDate?: Date;
    direction?: "bottom" | "top";
    chooseISODates?: string[];
    currPickerMode?: "year" | "month" | "day";
}
export declare class CalendarView extends React.Component<CalendarViewProps, CalendarViewState> {
    static defaultProps: CalendarViewProps;
    state: CalendarViewState;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    nextAction: () => void;
    prevAction: () => void;
    handleChooseDay: (date: Date) => void;
    onChooseMonth: (month: number) => void;
    onChooseYear: (year: number) => void;
    getTitle: () => string;
    togglePickerMode: (e: React.MouseEvent<HTMLParagraphElement> | "Year" | "Month" | "Day") => void;
    render(): JSX.Element;
}
export default CalendarView;
