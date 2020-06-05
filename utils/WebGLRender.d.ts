export interface WebGLRenderProps {
    vertexSource?: string;
    fragmentSource?: string;
    width?: number;
    height?: number;
}
export declare class WebGLRender {
    frags: string[];
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    width: number;
    height: number;
    buffers: {
        vertices?: WebGLBuffer;
        [key: string]: WebGLBuffer;
    };
    vertexSource: string;
    fragmentSource: string;
    constructor(props: WebGLRenderProps);
    init(): void;
    render(): void;
    setAttribs(): void;
    setUniforms(): void;
    clearAlpha(): void;
    cleanup(): void;
    toUrl(cb?: (url?: string) => void): void;
}
export declare const colorWheelFrag = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#define TWO_PI 6.28318530718\n\nuniform vec2 u_resolution;\n\n//  Function from I\u00F1igo Quiles\n//  https://www.shadertoy.com/view/MsS3Wc\nvec3 hsb2rgb( in vec3 c ){\n    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),\n                             6.0)-3.0)-1.0,\n                     0.0,\n                     1.0 );\n    rgb = rgb*rgb*(3.0-2.0*rgb);\n    return c.z * mix( vec3(1.0), rgb, c.y);\n}\n\nvoid main(){\n    vec2 st = gl_FragCoord.xy/u_resolution;\n    vec3 color = vec3(0.0);\n\n    // Use polar coordinates instead of cartesian\n    vec2 toCenter = vec2(0.5)-st;\n    float angle = atan(toCenter.y,toCenter.x);\n    float radius = length(toCenter)*2.0;\n\n    // Map the angle (-PI to PI) to the Hue (from 0 to 1)\n    // and the Saturation to the radius\n    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0));\n\n    gl_FragColor = vec4(color,1.0);\n}\n";
export declare const getNoiseFrag: (color: {
    r: string;
    g: string;
    b: string;
}) => string;
