import * as React from "react";
import * as PropTypes from "prop-types";
import TextBox from "../TextBox";
export interface DataProps {
    /**
     * Control default `show password`.
     */
    defaultShowPassword?: boolean;
    /**
     * onChangeValue `callback`.
     */
    onChangeValue?: (value: string) => void;
    /**
     * Control PasswordBox `height` and `icon size`.
     */
    passwordBoxHeight?: number;
    placeholder?: string;
}
export interface PasswordBoxProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface PasswordBoxState {
    showPassword?: boolean;
}
export declare class PasswordBox extends React.Component<PasswordBoxProps, PasswordBoxState> {
    static defaultProps: PasswordBoxProps;
    state: PasswordBoxState;
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    context: {
        theme: ReactUWP.ThemeType;
    };
    textBox: TextBox;
    handleChange: (e?: any | React.SyntheticEvent<HTMLInputElement>) => void;
    getValue: () => string;
    setValue: (value: string) => string;
    toggleShowPassword: (showPassword?: any) => void;
    render(): JSX.Element;
}
export default PasswordBox;
