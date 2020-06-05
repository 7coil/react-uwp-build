"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoiseFrag = exports.colorWheelFrag = exports.WebGLRender = void 0;
var canvasHelper_1 = require("./canvasHelper");
var WebGLRender = /** @class */ (function () {
    function WebGLRender(props) {
        this.frags = [];
        this.width = 200;
        this.height = 200;
        this.buffers = {};
        // default vertex shader source.
        this.vertexSource = "#ifdef GL_ES\nprecision mediump float;\n#endif\nattribute vec2 a_position;\nvoid main() {\n  gl_Position = vec4(a_position, 0.0, 1.0);\n}";
        // default fragment shader source.
        this.fragmentSource = "#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec2 v_texcoord;\nvoid main(){\n  gl_FragColor = vec4(0.0);\n}";
        Object.assign(this, props);
        this.init();
    }
    WebGLRender.prototype.init = function () {
        if (!this.canvas)
            this.canvas = document.createElement("canvas");
        if (!this.gl) {
            this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
        }
        var gl = this.gl;
        if (!this.gl)
            return;
        if (!this.program)
            this.program = gl.createProgram();
        gl.clearDepth(1.0); // Clear everything.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the canvas before we start drawing on it.
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.DEPTH_TEST); // Enable depth testing.
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things.
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    };
    WebGLRender.prototype.render = function () {
        var _this = this;
        var _a = this, gl = _a.gl, program = _a.program, canvas = _a.canvas, width = _a.width, height = _a.height, vertexSource = _a.vertexSource, fragmentSource = _a.fragmentSource;
        canvas.width = width;
        canvas.height = height;
        var enableRunRender = [gl, program, canvas, width, height, vertexSource, fragmentSource].every(function (isExisted) { return Boolean(isExisted); });
        if (!enableRunRender)
            return;
        var shaderSources = [{ source: vertexSource, type: gl.VERTEX_SHADER }, { source: fragmentSource, type: gl.FRAGMENT_SHADER }];
        var glShaders = shaderSources.map(function (shaderSource) {
            var source = shaderSource.source, type = shaderSource.type;
            var glShader = gl.createShader(type);
            gl.shaderSource(glShader, source);
            gl.compileShader(glShader);
            return glShader;
        });
        glShaders.forEach(function (glShader) {
            gl.attachShader(_this.program, glShader);
        });
        gl.linkProgram(program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            var linkErrLog = gl.getProgramInfoLog(this.program);
            console.log(linkErrLog);
            this.cleanup();
            return;
        }
        this.setAttribs();
        glShaders.forEach(function (glShader) {
            gl.detachShader(_this.program, glShader);
            gl.deleteShader(glShader);
        });
        gl.viewport(0, 0, this.width, this.height);
        gl.useProgram(this.program);
        this.setUniforms();
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        this.cleanup();
    };
    WebGLRender.prototype.setAttribs = function () {
        var _a = this, gl = _a.gl, program = _a.program;
        var verticesLoc = gl.getAttribLocation(program, "a_position");
        this.buffers.vertices = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertices);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(verticesLoc);
        this.gl.vertexAttribPointer(verticesLoc, 2, gl.FLOAT, false, 0, 0);
    };
    WebGLRender.prototype.setUniforms = function () {
        var _a = this, gl = _a.gl, program = _a.program, width = _a.width, height = _a.height;
        var resolution = new Float32Array([width, height]);
        var resolutionLoc = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(resolutionLoc, resolution[0], resolution[1]);
    };
    WebGLRender.prototype.clearAlpha = function () {
        var gl = this.gl;
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(1, 1, 1, 1);
        gl.colorMask(false, false, false, true);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };
    WebGLRender.prototype.cleanup = function () {
        var _a = this, gl = _a.gl, program = _a.program, buffers = _a.buffers;
        if (!gl)
            return;
        gl.useProgram(null);
        if (buffers) {
            for (var key in buffers) {
                var buffer = buffers[key];
                if (buffer)
                    gl.deleteBuffer(buffer);
            }
        }
        if (program)
            gl.deleteProgram(program);
    };
    WebGLRender.prototype.toUrl = function (cb) {
        canvasHelper_1.toUrl(this.canvas, cb);
    };
    return WebGLRender;
}());
exports.WebGLRender = WebGLRender;
// @link https://thebookofshaders.com/edit.php#06/hsb-colorwheel.frag
exports.colorWheelFrag = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#define TWO_PI 6.28318530718\n\nuniform vec2 u_resolution;\n\n//  Function from I\u00F1igo Quiles\n//  https://www.shadertoy.com/view/MsS3Wc\nvec3 hsb2rgb( in vec3 c ){\n    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),\n                             6.0)-3.0)-1.0,\n                     0.0,\n                     1.0 );\n    rgb = rgb*rgb*(3.0-2.0*rgb);\n    return c.z * mix( vec3(1.0), rgb, c.y);\n}\n\nvoid main(){\n    vec2 st = gl_FragCoord.xy/u_resolution;\n    vec3 color = vec3(0.0);\n\n    // Use polar coordinates instead of cartesian\n    vec2 toCenter = vec2(0.5)-st;\n    float angle = atan(toCenter.y,toCenter.x);\n    float radius = length(toCenter)*2.0;\n\n    // Map the angle (-PI to PI) to the Hue (from 0 to 1)\n    // and the Saturation to the radius\n    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0));\n\n    gl_FragColor = vec4(color,1.0);\n}\n";
exports.getNoiseFrag = function (color) {
    return "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform vec2 u_resolution;\n\n// @link http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float random(vec2 co) {\n  highp float a = 12.9898;\n  highp float b = 78.233;\n  highp float c = 43758.5453;\n  highp float dt= dot(co.xy ,vec2(a,b));\n  highp float sn= mod(dt,3.14);\n  return fract(sin(sn) * c);\n}\n\nvoid main() {\n  vec2 st = gl_FragCoord.xy / u_resolution.xy;\n  st.x *= u_resolution.x / u_resolution.y;\n  float r = random(st * 1.);\n  gl_FragColor = vec4(" + color.r + ", " + color.g + ", " + color.b + ", r * .2);\n}\n";
};
//# sourceMappingURL=WebGLRender.js.map