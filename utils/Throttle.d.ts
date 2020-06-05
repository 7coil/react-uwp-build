export declare const frameMS: number;
export declare const loweFrameMS: number;
export declare const highFrameMS: number;
export declare function getNow(): number;
export interface ThrottleProps {
    timeMS?: number;
    runFunc?: Function;
}
export declare class Throttle {
    prevRuntime: number;
    timeMS: number;
    enableRunFunc: boolean;
    runFunc: Function;
    remainTime: number;
    constructor(props?: ThrottleProps);
    shouldFunctionRun: () => boolean;
    runOnceTime: any;
    runOnceByThrottle: (method: Function) => void;
    runTimer: any;
    startRunFunc: (...args: any[]) => void;
    endRunFunc: () => void;
}
