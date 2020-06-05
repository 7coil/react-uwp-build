export interface AcrylicTextureConfig {
    image: string;
    tintColor: string;
    blurSize?: number;
    callback?: (image?: string, isCanvasFilter?: boolean) => void;
}
export default function generateAcrylicTexture(config: AcrylicTextureConfig): void;
