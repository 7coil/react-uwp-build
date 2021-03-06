import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    date?: Date;
    onChooseDay?: (date: Date) => void;
    direction?: "bottom" | "top";
    chooseISODates?: string[];
}
export interface DayPickerProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export default class DayPicker extends React.Component<DayPickerProps, {}> {
    static defaultProps: DayPickerProps;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, date: Date, isCurrMonth: boolean, isNow: boolean) => void;
    handleMouseLeave: (e: React.MouseEvent<HTMLButtonElement>, date: Date, isCurrMonth: boolean, isNow: boolean) => void;
    getDaysArray: () => {
        day?: number;
        isCurrMonth?: boolean;
        date?: Date;
    }[];
    render(): JSX.Element;
}
