import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    date?: Date;
    direction?: "bottom" | "top";
    onChooseMonth?: (month: number) => void;
}
export interface MonthPickerProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export default class MonthPicker extends React.Component<MonthPickerProps, {}> {
    static defaultProps: MonthPickerProps;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, isNow: boolean) => void;
    handleMouseLeave: (e: React.MouseEvent<HTMLButtonElement>, isNow: boolean) => void;
    getMonthsArray: () => any[];
    render(): JSX.Element;
}
