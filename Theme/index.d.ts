import * as React from "react";
import * as PropTypes from "prop-types";
import getTheme, { Theme as ThemeType } from "../styles/getTheme";
import ToastWrapper from "../Toast/ToastWrapper";
import { Throttle } from "../utils/Throttle";
export { getTheme };
export interface DataProps {
    /**
     * Set theme object. [ThemeType](https://github.com/myxvisual/react-uwp/blob/master/src/index.d.ts#L43), Usually use [getTheme](https://github.com/myxvisual/react-uwp/blob/master/src/styles/getTheme.ts#L28) function to get it.
     */
    theme?: ThemeType;
    /**
     * toggle desktopBackground show.
     */
    desktopBackgroundConfig?: {
        enableRender?: boolean;
        renderToScreen?: boolean;
    };
    /**
     * set theme will update callback.
     */
    themeWillUpdate?: (theme?: ThemeType) => void;
    /**
     * use canvas generate AcrylicTextures to replace CSS backdropFilter style.
     */
    forceGenerateAcrylicTextures?: boolean;
    /**
     * Use the Cloudflare Content Delivery Network.
     * Disable if you are going to provide your own copy.
     * @default true
     */
    enableCDN?: boolean;
    /**
     * Set noise texture style.
     */
    enableNoiseTexture?: boolean;
    enableGlobalThemeCSSText?: boolean;
}
export interface ThemeProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {
}
export interface ThemeState {
    currTheme?: ThemeType;
}
export declare class Theme extends React.Component<ThemeProps, ThemeState> {
    static defaultProps: ThemeProps;
    static childContextTypes: {
        theme: PropTypes.Requireable<object>;
    };
    cacheDarkAcrylicTextures: ThemeType;
    cacheLightAcrylicTextures: ThemeType;
    toastWrapper: ToastWrapper;
    styleEl: HTMLStyleElement;
    useUpdateTheme: boolean;
    getThemeFromProps(props: ThemeProps): ThemeType;
    handleThemeUpdate: (theme: ThemeType) => void;
    state: ThemeState;
    getChildContext(): {
        theme: ThemeType;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: ThemeProps): void;
    updateAllCSSToEl(): void;
    setStyleManagerUpdate(theme: ThemeType): void;
    mergeStyleManager(newTheme: ThemeType, prevTheme?: ThemeType): void;
    removeCSSText4theme(theme: ThemeType): void;
    addCSSText2theme(theme: ThemeType): void;
    setThemeHelper(theme: ThemeType, prevTheme?: ThemeType, themeCallback?: (currTheme?: ThemeType) => void): void;
    updateTheme: (currTheme: ThemeType) => void;
    scrollThrottle: Throttle;
    handleScrollReveal: (e?: Event) => void;
    render(): JSX.Element;
}
export default Theme;
