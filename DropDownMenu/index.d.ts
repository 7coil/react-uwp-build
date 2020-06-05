import * as React from "react";
import * as PropTypes from "prop-types";
import AddBlurEvent from "../utils/AddBlurEvent";
import { RevealEffectProps } from "../RevealEffect";
export interface DataProps {
    /**
     * Set DropDownMenu values.
     */
    values?: string[];
    /**
     * `onChangeValue` callback.
     */
    onChangeValue?: (value: string) => void;
    /**
     * Set wrapper style.
     */
    wrapperStyle?: React.CSSProperties;
    /**
     * Set full width to DropDownMenu.
     */
    enableFullWidth?: boolean;
    /**
     * Set item style.
     */
    itemStyle?: React.CSSProperties;
    /**
     * Set item selected style.
     */
    itemSelectedStyle?: React.CSSProperties;
    /**
     * Set item hover style.
     */
    itemHoverStyle?: React.CSSProperties;
    /**
     * Set RevealEffect, check the styles/reveal-effect.
     */
    revealConfig?: RevealEffectProps;
    /**
     * replace default dropdown icon.
     */
    iconNode?: React.ReactNode;
}
export interface DropDownMenuProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Set default show value, `value` must is one of `values`, default is `values[0]`.
     */
    defaultValue?: string | string[];
}
export interface DropDownMenuState {
    showList?: boolean;
    currValue?: string | string[];
    currValues?: string[];
}
export declare const defaultStyle: React.CSSProperties;
export declare class DropDownMenu extends React.Component<DropDownMenuProps, DropDownMenuState> {
    static contextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    static defaultProps: DropDownMenuProps;
    context: {
        theme: ReactUWP.ThemeType;
    };
    state: DropDownMenuState;
    addBlurEvent: AddBlurEvent;
    rootElm: HTMLDivElement;
    itemHeight: string | number;
    addBlurEventMethod: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillReceiveProps(): void;
    componentWillUnmount(): void;
    updateItemHeight: (needUpdate?: boolean) => void;
    toggleShowList: (currentValue: string) => void;
    getValue: () => string | string[];
    render(): JSX.Element;
}
export default DropDownMenu;
