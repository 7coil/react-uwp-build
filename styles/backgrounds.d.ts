/// <reference types="react" />
export declare function paramCase(str: string): string;
export interface TagConfig {
    tag: string;
    attributes?: Object;
    children?: TagConfig[];
}
export declare function createTagString(tagConfig: TagConfig): string;
export declare function createFeDropShadow(attributes?: React.SVGAttributes<SVGFEDropShadowElement>): string;
export declare function getAttributesString(attribute: Object): string;
export declare function getProtrudingSquares(config: {
    mainColor: string;
    shadowColor: string;
    opacity: number;
}): string;
export interface StripedConfig {
    size?: number;
    primaryColor?: string;
    secondaryColor?: string;
    direction?: "ltr" | "rtl";
}
export declare function getStriped(config?: StripedConfig): string;
export declare function getDot(color?: string): string;
