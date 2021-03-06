import * as React from "react";
import * as PropTypes from "prop-types";
export interface DataProps {
    date?: Date;
    direction?: "bottom" | "top";
    onChooseYear?: (year: number) => void;
    maxYear?: number;
    minYear?: number;
}
export interface YearPickerProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export default class YearPicker extends React.Component<YearPickerProps, {}> {
    static defaultProps: YearPickerProps;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>, isNow: boolean) => void;
    handleMouseLeave: (e: React.MouseEvent<HTMLButtonElement>, isNow: boolean) => void;
    getYearsArray: () => any[];
    render(): JSX.Element;
}
