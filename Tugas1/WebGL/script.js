var vertexShaderSource_1 =
    `attribute vec3 a_coords;
attribute vec3 a_colors;
attribute vec2 a_texCoords;
 uniform mat4 u_RotY;
uniform mat4 u_RotX;
uniform mat4 u_Scale;
uniform mat4 u_Trans;
uniform mat4 u_Pers;

varying vec2 v_texCoords;
void main() {

    mat4 M = u_Pers*u_Trans*u_RotX*u_RotY*u_Scale;
    gl_Position = M*vec4(a_coords, 1.0);
    
    v_texCoords = a_texCoords;
}`;


var fragmentShaderSource_1 =
    `precision mediump float;

uniform sampler2D u_sampler_texture;
varying vec2 v_texCoords;
void main() {
    vec4 color = texture2D( u_sampler_texture, v_texCoords );
    gl_FragColor = color;
}`;


var vertexShaderSource_2 =
    `attribute vec3 a_coords;
attribute vec3 a_colors;
attribute vec2 a_texCoords;
 uniform mat4 u_RotY;
uniform mat4 u_RotX;
uniform mat4 u_RotL;
uniform mat4 u_Scale;
uniform mat4 u_Trans;
uniform mat4 la_Trans;
uniform mat4 l_Trans;
uniform mat4 u_Pers;
varying vec3 v_color;
varying vec2 v_texCoords;
void main() {    
    mat4 M = u_Pers*la_Trans*u_RotX*u_RotY*l_Trans*u_RotL*u_Trans*u_Scale;
    gl_Position = M*vec4(a_coords, 1.0);
    v_color = a_colors;
    v_texCoords = a_texCoords;
}`;

var fragmentShaderSource_2 =
    `precision mediump float;
varying vec3 v_color;
uniform sampler2D u_sampler_texture;
varying vec2 v_texCoords;
void main() {
    vec4 color = texture2D( u_sampler_texture, v_texCoords );
    gl_FragColor = color;
}`;

var vertexShaderSource_3 =
    `attribute vec3 a_coords;
attribute vec3 a_colors;
attribute vec2 a_texCoords;
 uniform mat4 u_RotY;
uniform mat4 u_RotX;
uniform mat4 u_Scale;
uniform mat4 l_Trans;
uniform mat4 u_Trans;
uniform mat4 u_Pers;

varying vec2 v_texCoords;
void main() {

    mat4 M = u_Pers*u_Trans*u_RotX*u_RotY*l_Trans*u_Scale;
    gl_Position = M*vec4(a_coords, 1.0);
    
    v_texCoords = a_texCoords;
}`;


var fragmentShaderSource_3 =
    `precision mediump float;

uniform sampler2D u_sampler_texture;
varying vec2 v_texCoords;
void main() {
    vec4 color = texture2D( u_sampler_texture, v_texCoords );
    gl_FragColor = color;
}`;

var vertexShaderSource_4 =
    `attribute vec3 a_coords;
attribute vec3 a_colors;
attribute vec2 a_texCoords;
 uniform mat4 u_RotY;
uniform mat4 u_RotX;
uniform mat4 u_Scale;
uniform mat4 l_Trans;
uniform mat4 u_Trans;
uniform mat4 u_Pers;

varying vec2 v_texCoords;
void main() {

    mat4 M = u_Pers*u_Trans*u_RotX*u_RotY*l_Trans*u_Scale;
    gl_Position = M*vec4(a_coords, 1.0);
    
    v_texCoords = a_texCoords;
}`;


var fragmentShaderSource_4 =
    `precision mediump float;

uniform sampler2D u_sampler_texture;
varying vec2 v_texCoords;
void main() {
    vec4 color = texture2D( u_sampler_texture, v_texCoords );
    gl_FragColor = color;
}`;
// global declaration
var gl;
var a_coords_location;
var a_coords_buffer;
var a_colors_location;
var a_colors_buffer;

var a_texCoords_location;
var a_texCoords_buffer;
var textureObject;

var coords;
var colors;
var indices;
var check = 0;
var bufferInd;

var u_matrix_rotateX_location;
var u_matrix_rotateY_location;
var u_matrix_scale_location;
var u_matrix_trans_location;
var u_matrix_rotateLid_location;
var u_matrix_transL_location;
var u_matrix_transLa_location;
var u_matrix_pers_location;

var u_sampler_texture_location;

var thetaX = 45;
var thetaY = 45;
var rotateL = -45;

// < !--coords   a_coords_buffer   a_coords_location-- >
function passAttribData(data, att_buffer, loc) {
    gl.bindBuffer(gl.ARRAY_BUFFER, att_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(loc);
}

function translate(tx, ty, tz, loc) {
    var transMat = new Float32Array([1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        tx, ty, tz, 1.0]);
    gl.uniformMatrix4fv(loc, false, transMat);
}

function scale(sx, sy, sz, loc) {
    var scaleMat = new Float32Array([sx, 0.0, 0.0, 0.0,
        0.0, sy, 0.0, 0.0,
        0.0, 0.0, sz, 0.0,
        0.0, 0.0, 0.0, 1.0]);
    gl.uniformMatrix4fv(loc, false, scaleMat);
}

function rotate_X(thetaX, loc) {
    var rad = thetaX * Math.PI / 180;
    var rotateMatX = new Float32Array([1.0, 0.0, 0.0, 0.0,
        0.0, Math.cos(rad), Math.sin(rad), 0.0,
        0.0, -Math.sin(rad), Math.cos(rad), 0.0,
        0.0, 0.0, 0.0, 1.0]);
    gl.uniformMatrix4fv(loc, false, rotateMatX);
}

function rotate_Y(thetaY, loc) {
    var rad = -thetaY * Math.PI / 180;
    var rotateMatY = new Float32Array([Math.cos(rad), 0.0, -Math.sin(rad), 0.0,
        0.0, 1.0, 0.0, 0.0,
    Math.sin(rad), 0.0, Math.cos(rad), 0.0,
        0.0, 0.0, 0.0, 1.0]);
    gl.uniformMatrix4fv(loc, false, rotateMatY);
}


function perspective(aspect, fov, near, far, loc) {
    var pa = 1.0 / (aspect * Math.tan((fov / 2) * Math.PI / 180));
    var pb = 1.0 / (Math.tan((fov / 2) * Math.PI / 180));
    var pc = -(far + near) / (far - near);
    var pd = -(2.0 * far * near) / (far - near);

    var persMat = new Float32Array([pa, 0.0, 0.0, 0.0,
        0.0, pb, 0, 0.0,
        0.0, 0.0, pc, -1.0,
        0.0, 0.0, pd, 0.0]);
    gl.uniformMatrix4fv(loc, false, persMat);
}

function model() {
    coords = new Float32Array([  // Front face
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,

        // Back face
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,

        // Top face
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,

        // Bottom face
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,

        // Right face
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,

        // Left face
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5]);

    colors = new Float32Array([0.9, 0.3, 0.2,
        0.4, 0.5, 0.6,
        0.9, 0.3, 0.2,
        0.4, 0.5, 0.6,

        0.7, 0.2, 0.5,
        0.2, 0.5, 0.5,
        0.7, 0.2, 0.5,
        0.2, 0.5, 0.5,

        0.2, 0.2, 0.7,
        0.7, 0.2, 0.7,
        0.2, 0.2, 0.7,
        0.7, 0.2, 0.7,

        0.3, 0.9, 0.3,
        0.9, 0.9, 0.3,
        0.3, 0.9, 0.3,
        0.9, 0.9, 0.3,

        0.3, 0.4, 0.3,
        0.3, 0.9, 0.3,
        0.3, 0.4, 0.3,
        0.3, 0.9, 0.3,

        1.0, 0.2, 0.8,
        1.0, 0.2, 0.2,
        1.0, 0.2, 0.8,
        1.0, 0.2, 0.2,]);

    texCoords = new Float32Array([
        // Front face
        0.75, 0.75,
        0.75, 0.25,
        1.0, 0.25,
        1.0, 0.75,

        // Back face

        0.75, 0.25,
        1.0, 0.25,
        1.0, 0.75,
        0.75, 0.75,

        // Top face
        0.25, 0.75,
        0.25, 0.25,
        0.75, 0.25,
        0.75, 0.75,

        // Bottom face
        0.0, 0.25,
        0.0, 0.0,
        0.25, 0.0,
        0.25, 0.25,

        // Right face

        0.75, 0.25,
        1.0, 0.25,
        1.0, 0.75,
        0.75, 0.75,

        // Left face
        0.75, 0.75,
        0.75, 0.25,
        1.0, 0.25,
        1.0, 0.75,
    ]);

    texCoords2 = new Float32Array([
        // Front face
        0.2, 0.2,
        0.2, 0.2,
        0.2, 0.2,
        0.2, 0.2,

        // Back face
        1, 0,
        1, 1,
        0, 1,
        0, 0,

        // Top face
        0.25, 0.75,
        0.25, 0.25,
        0.75, 0.25,
        0.75, 0.75,

        // Bottom face
        0.2, 0.2,
        0.2, 0.2,
        0.2, 0.2,
        0.2, 0.2,

        // Right face

        0.2, 0.2,
        0.2, 0.2,
        0.2, 0.2,
        0.2, 0.2,

        // Left face
        0.2, 0.2,
        0.2, 0.2,
        0.2, 0.2,
        0.2, 0.2,
    ]);

    indices = new Uint8Array([
        0, 1, 2, 0, 2, 3,    // Front face
        4, 5, 6, 4, 6, 7,    // Back face
        8, 9, 10, 8, 10, 11,  // Top face
        12, 13, 14, 12, 14, 15, // Bottom face
        16, 17, 18, 16, 18, 19, // Right face
        20, 21, 22, 20, 22, 23  // Left face
    ]);
}

function draw_pages() {

    // call the necessary tranformation functions, e.g. rotate_Y(thetaY, u_matrix_rotateY_location_1);
    // call the necessary passAttribData() functions, e.g. passAttribData(coords, a_coords_buffer_1, a_coords_location_1);

    rotate_X(thetaX, u_matrix_rotateX_location);
    rotate_Y(thetaY, u_matrix_rotateY_location);
    scale(0.5, 0.1, 0.4, u_matrix_scale_location);
    translate(0.05, 0.16, -3.0, u_matrix_trans_location);
    perspective(1.0, 25.0, 1.0, 4.0, u_matrix_pers_location);

    passAttribData(coords, a_coords_buffer, a_coords_location);
    passAttribData(colors, a_colors_buffer, a_colors_location);

    gl.bindBuffer(gl.ARRAY_BUFFER, a_texCoords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_texCoords_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_texCoords_location);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInd);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.uniform1i(u_sampler_texture_location, 0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    gl.drawElements(gl.TRIANGLES, 3 * 12, gl.UNSIGNED_BYTE, 0);

}

function draw_topcover() {

    // call the necessary tranformation functions
    // call the necessary passAttribData() functions
    rotate_X(thetaX, u_matrix_rotateX_location);
    rotate_Y(thetaY, u_matrix_rotateY_location);
    scale(0.5, 0.02, 0.4, u_matrix_scale_location);
    translate(0.0, 0.0, 0.2, u_matrix_trans_location);
    rotate_X(rotateL, u_matrix_rotateLid_location);
    translate(0.0, 0.25, -0.2, u_matrix_transL_location);
    translate(0.05, 0.0, -3.0, u_matrix_transLa_location);
    perspective(1.0, 25.0, 1.0, 4.0, u_matrix_pers_location);


    passAttribData(coords, a_coords_buffer, a_coords_location);
    passAttribData(colors, a_colors_buffer, a_colors_location);

    gl.bindBuffer(gl.ARRAY_BUFFER, a_texCoords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_texCoords_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_texCoords_location);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInd);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.uniform1i(u_sampler_texture_location, 0);

    gl.drawElements(gl.TRIANGLES, 3 * 12, gl.UNSIGNED_BYTE, 0);

}

function draw_bottom() {

    // call the necessary tranformation functions, e.g. rotate_Y(thetaY, u_matrix_rotateY_location_1);
    // call the necessary passAttribData() functions, e.g. passAttribData(coords, a_coords_buffer_1, a_coords_location_1);

    rotate_X(thetaX, u_matrix_rotateX_location);
    rotate_Y(thetaY, u_matrix_rotateY_location);
    scale(0.53, 0.03, 0.42, u_matrix_scale_location);
    translate(0.05, 0.16, -3.0, u_matrix_trans_location);
    translate(0.0, -0.04, -0.001, u_matrix_transL_location);
    perspective(1.0, 25.0, 1.0, 4.0, u_matrix_pers_location);

    passAttribData(coords, a_coords_buffer, a_coords_location);
    passAttribData(colors, a_colors_buffer, a_colors_location);

    gl.bindBuffer(gl.ARRAY_BUFFER, a_texCoords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_texCoords_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_texCoords_location);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInd);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.uniform1i(u_sampler_texture_location, 0);

    gl.drawElements(gl.TRIANGLES, 3 * 12, gl.UNSIGNED_BYTE, 0);

}

function draw_side() {

    // call the necessary tranformation functions, e.g. rotate_Y(thetaY, u_matrix_rotateY_location_1);
    // call the necessary passAttribData() functions, e.g. passAttribData(coords, a_coords_buffer_1, a_coords_location_1);

    rotate_X(thetaX, u_matrix_rotateX_location);
    rotate_Y(thetaY, u_matrix_rotateY_location);
    scale(0.53, 0.10, 0.02, u_matrix_scale_location);
    translate(0.05, 0.15, -3.0, u_matrix_trans_location);
    translate(-0.002, 0.0, -0.2, u_matrix_transL_location);
    perspective(1.0, 25.0, 1.0, 4.0, u_matrix_pers_location);

    passAttribData(coords, a_coords_buffer, a_coords_location);
    passAttribData(colors, a_colors_buffer, a_colors_location);

    gl.bindBuffer(gl.ARRAY_BUFFER, a_texCoords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords2, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_texCoords_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_texCoords_location);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInd);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.uniform1i(u_sampler_texture_location, 0);

    gl.drawElements(gl.TRIANGLES, 3 * 12, gl.UNSIGNED_BYTE, 0);

}
function createProgram(gl, vertexShaderSource, fragmentShaderSource) {

    var vsh = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsh, vertexShaderSource);
    gl.compileShader(vsh);

    var fsh = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsh, fragmentShaderSource);
    gl.compileShader(fsh);

    var prog = gl.createProgram();
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);

    return prog;
}

function loadTexture(textureObject, imageID) {
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        document.getElementById(imageID));
}

function initGL_1() {
    var prog = createProgram(gl, vertexShaderSource_1, fragmentShaderSource_1);
    gl.useProgram(prog);

    // create necessary buffers for the crate
    // do necessary initGL parts for the crate

    a_coords_location = gl.getAttribLocation(prog, "a_coords");
    a_coords_buffer = gl.createBuffer();

    a_colors_location = gl.getAttribLocation(prog, "a_colors");
    a_colors_buffer = gl.createBuffer();

    a_texCoords_location = gl.getAttribLocation(prog, "a_texCoords");
    a_texCoords_buffer = gl.createBuffer();

    u_sampler_texture_location = gl.getUniformLocation(prog, "u_sampler_texture");
    textureObject = gl.createTexture();
    loadTexture(textureObject, "pageimage");

    bufferInd = gl.createBuffer();

    u_matrix_rotateX_location = gl.getUniformLocation(prog, "u_RotX");
    u_matrix_rotateY_location = gl.getUniformLocation(prog, "u_RotY");
    u_matrix_scale_location = gl.getUniformLocation(prog, "u_Scale");
    u_matrix_trans_location = gl.getUniformLocation(prog, "u_Trans");
    u_matrix_pers_location = gl.getUniformLocation(prog, "u_Pers");
}

function initGL_2() {
    prog = createProgram(gl, vertexShaderSource_2, fragmentShaderSource_2);
    gl.useProgram(prog);
    // create necessary buffers for the lid
    // do necessary initGL parts for the lid
    a_coords_location = gl.getAttribLocation(prog, "a_coords");
    a_coords_buffer = gl.createBuffer();

    a_colors_location = gl.getAttribLocation(prog, "a_colors");
    a_colors_buffer = gl.createBuffer();

    a_texCoords_location = gl.getAttribLocation(prog, "a_texCoords");
    a_texCoords_buffer = gl.createBuffer();

    u_sampler_texture_location = gl.getUniformLocation(prog, "u_sampler_texture");
    textureObject = gl.createTexture();
    loadTexture(textureObject, "coverimage");

    bufferInd = gl.createBuffer();

    u_matrix_rotateX_location = gl.getUniformLocation(prog, "u_RotX");
    u_matrix_rotateY_location = gl.getUniformLocation(prog, "u_RotY");
    u_matrix_scale_location = gl.getUniformLocation(prog, "u_Scale");
    u_matrix_trans_location = gl.getUniformLocation(prog, "u_Trans");
    u_matrix_rotateLid_location = gl.getUniformLocation(prog, "u_RotL");
    u_matrix_transL_location = gl.getUniformLocation(prog, "l_Trans");
    u_matrix_transLa_location = gl.getUniformLocation(prog, "la_Trans");
    u_matrix_pers_location = gl.getUniformLocation(prog, "u_Pers");
}

function initGL_3() {
    prog = createProgram(gl, vertexShaderSource_3, fragmentShaderSource_3);
    gl.useProgram(prog);

    // create necessary buffers for the crate
    // do necessary initGL parts for the crate

    a_coords_location = gl.getAttribLocation(prog, "a_coords");
    a_coords_buffer = gl.createBuffer();

    a_colors_location = gl.getAttribLocation(prog, "a_colors");
    a_colors_buffer = gl.createBuffer();

    a_texCoords_location = gl.getAttribLocation(prog, "a_texCoords");
    a_texCoords_buffer = gl.createBuffer();

    u_sampler_texture_location = gl.getUniformLocation(prog, "u_sampler_texture");
    textureObject = gl.createTexture();
    loadTexture(textureObject, "cover2");

    bufferInd = gl.createBuffer();
    u_matrix_transL_location = gl.getUniformLocation(prog, "l_Trans");
    u_matrix_rotateX_location = gl.getUniformLocation(prog, "u_RotX");
    u_matrix_rotateY_location = gl.getUniformLocation(prog, "u_RotY");
    u_matrix_scale_location = gl.getUniformLocation(prog, "u_Scale");
    u_matrix_trans_location = gl.getUniformLocation(prog, "u_Trans");
    u_matrix_pers_location = gl.getUniformLocation(prog, "u_Pers");
}

function initGL_4() {
    prog = createProgram(gl, vertexShaderSource_3, fragmentShaderSource_3);
    gl.useProgram(prog);

    // create necessary buffers for the crate
    // do necessary initGL parts for the crate

    a_coords_location = gl.getAttribLocation(prog, "a_coords");
    a_coords_buffer = gl.createBuffer();

    a_colors_location = gl.getAttribLocation(prog, "a_colors");
    a_colors_buffer = gl.createBuffer();

    a_texCoords_location = gl.getAttribLocation(prog, "a_texCoords");
    a_texCoords_buffer = gl.createBuffer();

    u_sampler_texture_location = gl.getUniformLocation(prog, "u_sampler_texture");
    textureObject = gl.createTexture();
    loadTexture(textureObject, "cover3");

    bufferInd = gl.createBuffer();
    u_matrix_transL_location = gl.getUniformLocation(prog, "l_Trans");
    u_matrix_rotateX_location = gl.getUniformLocation(prog, "u_RotX");
    u_matrix_rotateY_location = gl.getUniformLocation(prog, "u_RotY");
    u_matrix_scale_location = gl.getUniformLocation(prog, "u_Scale");
    u_matrix_trans_location = gl.getUniformLocation(prog, "u_Trans");
    u_matrix_pers_location = gl.getUniformLocation(prog, "u_Pers");
}
function init() {
    var canvas = document.getElementById("webglcanvas");
    gl = canvas.getContext("webgl");

    model();

    initGL_1();
    draw_pages();

    initGL_2();
    draw_topcover();

    initGL_3();
    draw_bottom();

    initGL_4();
    draw_side();


};


document.onkeydown = function (event) {
    if (event.keyCode == 37) { // left arrow
        thetaY = thetaY - 3;
        initGL_1();
        draw_pages();
        initGL_2();
        draw_topcover();
        initGL_3();
        draw_bottom();
        initGL_4();
        draw_side();

    }
    if (event.keyCode == 39) { // right arrow
        thetaY = thetaY + 3;
        initGL_1();
        draw_pages();
        initGL_2();
        draw_topcover();
        initGL_3();
        draw_bottom();
        initGL_4();
        draw_side();
    }
}
function movecover() {
    if (check == 0) {
        rotateL = rotateL - 3
        if (rotateL <= -100) {
            rotateL = -97
            check = 1;
        }
    }
    else if (check == 1) {
        rotateL = rotateL + 3;
        if (rotateL >= 3) {
            rotateL = 0
            check = 0;
        }
    }
    initGL_1();
    draw_pages();
    initGL_2();
    draw_topcover();
    initGL_3();
    draw_bottom();
    initGL_4();
    draw_side();
}