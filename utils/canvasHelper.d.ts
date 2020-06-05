export declare function toBlob(canvas: HTMLCanvasElement, callback?: (blob?: Blob) => void): void;
export declare function toUrl(canvas: HTMLCanvasElement, callback?: (imageUrl?: string) => void): void;
export declare function isSupportWebGL(): boolean;
export interface Point {
    x: number;
    y: number;
}
export declare function deg2rad(deg: number): number;
export declare function rad2deg(rad: number): number;
export declare function getRadEndPos(pos: Point, radius: number, rad: number): {
    x: number;
    y: number;
};
export declare function getRegularPolygon(center?: {
    x: number;
    y: number;
}, radius?: number, angleSize?: number): {
    rads: number[];
    angles: number[];
    points: Point[];
};
export declare function isPatternRegularPolygon(sides: number): boolean;
