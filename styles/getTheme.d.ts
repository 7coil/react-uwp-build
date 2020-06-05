/// <reference types="react" />
import { Toast } from "../Toast";
import { StyleManager, CustomCSSProperties, StyleClasses } from "./StyleManager";
import { getAcrylicTextureStyle, AcrylicConfig, isSupportBackdropFilter } from "./getAcrylicTextureStyle";
import { getThemeBaseCSS, getBaseCSS } from "./getBaseCSSText";
import { DataProps as RevealConfig } from "../RevealEffect";
export { getThemeBaseCSS, getBaseCSS };
export { getAcrylicTextureStyle, isSupportBackdropFilter };
export declare const fonts: {
    sansSerifFonts: string;
    segoeMDL2Assets: string;
};
export declare function darken(color: string, coefficient: number): string;
export declare function lighten(color: string, coefficient: number): string;
export interface AcrylicTexture {
    style?: React.CSSProperties;
    background?: string;
    tintColor?: string;
    blurSize?: number;
}
export interface ScrollRevealType {
    rootElm?: HTMLElement;
    animated?: boolean;
    setEnterStyle?: () => void;
    setLeaveStyle: () => void;
    props: {
        speed?: number;
        style?: React.CSSProperties;
        animatedStyle?: React.CSSProperties;
        children?: React.ReactElement<any>;
        topOffset?: number;
        bottomOffset?: number;
    };
}
export interface ThemeConfig {
    themeName?: "dark" | "light";
    accent?: string;
    useFluentDesign?: boolean;
    desktopBackgroundImage?: string;
    acrylicConfig?: {
        blurSize?: number;
    };
    materialBackground?: string;
    borderWidth?: number;
    revealConfig?: RevealConfig;
    useInlineStyle?: boolean;
}
export declare type ThemeName = "dark" | "light";
export declare class Theme {
    themeName?: ThemeName;
    accent?: string;
    useFluentDesign?: boolean;
    useInlineStyle?: boolean;
    desktopBackgroundImage?: string;
    fonts?: {
        sansSerifFonts: string;
        segoeMDL2Assets: string;
    };
    styleManager?: StyleManager;
    scrollReveals?: ScrollRevealType[];
    revealConfig: RevealConfig;
    currHoverSize: number;
    revealGradientMap: Map<string, CanvasGradient>;
    revealEffectMap: Map<HTMLCanvasElement, RevealConfig>;
    hoverBorderCanvas: HTMLCanvasElement;
    addBorderCanvas(borderCanvas: HTMLCanvasElement, revealConfig: RevealConfig): void;
    removeBorderCanvas(borderCanvas: HTMLCanvasElement): void;
    onAddBorderCanvas(borderCanvas?: HTMLCanvasElement, revealConfig?: RevealConfig): void;
    onRemoveBorderCanvas(borderCanvas?: HTMLCanvasElement): void;
    desktopBackground?: string;
    borderWidth: number;
    acrylicTextureCount?: number;
    haveAcrylicTextures?: boolean;
    materialTexture?: string;
    materialBackground?: string;
    acrylicTexture20?: AcrylicTexture;
    acrylicTexture40?: AcrylicTexture;
    acrylicTexture60?: AcrylicTexture;
    acrylicTexture80?: AcrylicTexture;
    acrylicTexture100?: AcrylicTexture;
    accentLighter1?: string;
    accentLighter2?: string;
    accentLighter3?: string;
    accentDarker1?: string;
    accentDarker2?: string;
    accentDarker3?: string;
    baseLow?: string;
    baseMediumLow?: string;
    baseMedium?: string;
    baseMediumHigh?: string;
    baseHigh?: string;
    altLow?: string;
    altMediumLow?: string;
    altMedium?: string;
    altMediumHigh?: string;
    altHigh?: string;
    listLow?: string;
    listMedium?: string;
    listAccentLow?: string;
    listAccentMedium?: string;
    listAccentHigh?: string;
    chromeLow?: string;
    chromeMediumLow?: string;
    chromeMedium?: string;
    chromeHigh?: string;
    chromeAltLow?: string;
    chromeDisabledLow?: string;
    chromeDisabledHigh?: string;
    chromeBlackLow?: string;
    chromeBlackMediumLow?: string;
    chromeBlackMedium?: string;
    chromeBlackHigh?: string;
    chromeWhite?: string;
    typographyStyles?: {
        header?: React.CSSProperties;
        subHeader?: React.CSSProperties;
        title?: React.CSSProperties;
        subTitle?: React.CSSProperties;
        subTitleAlt?: React.CSSProperties;
        base?: React.CSSProperties;
        baseAlt?: React.CSSProperties;
        body?: React.CSSProperties;
        captionAlt?: React.CSSProperties;
        caption?: React.CSSProperties;
    };
    zIndex?: {
        listView?: number;
        calendarView?: number;
        flyout?: number;
        tooltip?: number;
        dropDownMenu?: number;
        commandBar?: number;
        contentDialog?: number;
        mediaPlayer?: number;
        header?: number;
        toast?: number;
    };
    prefixStyle: <T>(style?: CustomCSSProperties & T) => React.CSSProperties;
    prepareStyle: (config?: {
        style?: CustomCSSProperties;
        className?: string;
        extendsClassName?: string;
    }, callback?: (theme?: Theme) => StyleClasses) => StyleClasses;
    prepareStyles: <T>(config?: {
        styles: T;
        className?: string;
    }, callback?: (theme?: Theme) => {
        [P in keyof T]: StyleClasses;
    }) => {
        [P in keyof T]: StyleClasses;
    };
    classNames?: (...classNames: string[]) => string;
    isDarkTheme?: boolean;
    toasts?: Map<Toast, boolean>;
    addToast?: (toast: Toast) => void;
    updateToast?: (toast: Toast) => void;
    removeToast?: (toast: Toast) => void;
    onToastsUpdate?: (toasts?: Toast[]) => void;
    getRevealConfig(prevConfig?: RevealConfig, newConfig?: RevealConfig): Required<RevealConfig>;
    updateTheme: (theme: Theme) => void;
    themeHash: number;
    themeClassName: string;
    getAcrylicTextureStyle: typeof getAcrylicTextureStyle;
    generateAcrylicTextures?: (themeCallback?: (theme?: Theme) => void) => void;
    generateBackgroundTexture?: (themeCallback?: (theme?: Theme) => void) => void;
    getBackgroundFromTexture(texture: string): string;
    mergeAcrylicStyles(blurSize: number): {
        acrylicTexture20Config: AcrylicConfig;
        acrylicTexture40Config: AcrylicConfig;
        acrylicTexture60Config: AcrylicConfig;
        acrylicTexture80Config: AcrylicConfig;
        acrylicTexture100Config: AcrylicConfig;
    };
    constructor(themeConfig?: ThemeConfig);
}
export default function getTheme(themeConfig?: ThemeConfig): Theme;
