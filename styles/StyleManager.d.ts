/// <reference types="react" />
import { PseudoSelector } from "./PseudoSelectors";
export declare const replace2Dashes: (key: string) => string;
export declare const getStyleValue: (key: string, value: string) => string;
export declare type PseudoCSSProperties = {
    [K in PseudoSelector]?: React.CSSProperties;
};
export declare type CSSDirectProperties = {
    "@keyframes"?: {
        from?: React.CSSProperties;
        to?: React.CSSProperties;
        [key: string]: React.CSSProperties;
    };
    "@font-face"?: React.CSSProperties;
};
export interface CustomCSSProperties extends React.CSSProperties, PseudoCSSProperties {
    inlineStyle?: React.CSSProperties;
}
export interface StyleClasses {
    style?: CustomCSSProperties;
    className?: string;
}
export interface Sheet {
    rules?: Map<string, boolean>;
    CSSText?: string;
    className?: string;
    classNameWithHash?: string;
    id?: number;
}
export interface StyleManagerConfig {
    prefixClassName?: string;
}
export declare class StyleManager {
    prefixSelector: string;
    sheets: {
        [key: string]: Sheet;
    };
    resultCSSText: string;
    addedCSSText: {
        [key: string]: {
            CSSText?: string;
            rules?: Map<string, boolean>;
        };
    };
    allRules: Map<string, {
        isInserted?: boolean;
        ruleIndex?: number;
    }>;
    ruleIndList: number[];
    onAddCSSText(CSSText?: string): void;
    onAddRules(rules?: Map<string, boolean>): void;
    onRemoveRules(rules?: Map<string, boolean>): void;
    onRemoveCSSText(CSSText?: string): void;
    constructor(config?: StyleManagerConfig);
    getRules4allRules(rules: Map<string, boolean>, rule: string): void;
    cleanAllStyles(): void;
    cleanSheets: () => void;
    cleanCSSText(): void;
    style2CSSText: (style: React.CSSProperties) => string;
    sheetsToString: () => string;
    getAllCSSText: () => string;
    addStyle: (style: CustomCSSProperties, className?: string) => Sheet;
    addStyleWithSelector: (selector: string, style: React.CSSProperties) => void;
    addStylesWithSelector: (styles: {
        [selector: string]: import("react").CSSProperties;
    }) => void;
    addCSSText: (cssText: string) => void;
    removeCSSText: (cssText: string) => void;
    cssText2rules(cssText: string, onNewRule?: (rule?: string) => void): string[];
    setStyleToManager(config?: {
        style?: CustomCSSProperties;
        className?: string;
    }): StyleClasses;
    setStylesToManager(config?: {
        styles: {
            [key: string]: StyleClasses | CustomCSSProperties;
        };
        className?: string;
    }): {
        [key: string]: StyleClasses;
    };
    insertRule2el(styleEl: HTMLStyleElement, rule: string, index?: number): void;
    insertAllRule2el(styleEl: HTMLStyleElement): void;
    deleteRule2el(styleEl: HTMLStyleElement, rule: string): void;
    deleteAllRule2el(styleEl: HTMLStyleElement): void;
}
export default StyleManager;
