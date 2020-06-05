/// <reference types="react" />
import { isSupportBackdropFilter } from "../utils/browser/backdropFilterDetector";
export { isSupportBackdropFilter };
export interface AcrylicConfig {
    tintColor: string;
    blurSize: number;
    background?: string;
}
export declare function getAcrylicTextureStyle(config: AcrylicConfig, useFluentDesign?: boolean): import("react").CSSProperties;
