import { colorBuffer, createBuffer } from "./graphic_buffer.js";
import DataBuffer from "../objects/data_buffer.js";


let gl, buffer, shaders;

const work_buffer = new DataBuffer(Float32Array.BYTES_PER_ELEMENT * 16 * 4);

work_buffer.addTypedViews({
    m0 : [Float32Array, 16],
    m1 : [Float32Array, 16],
    m2 : [Float32Array, 16],
    m3 : [Float32Array, 16],
});

/* create color buffer;

/* creating attributes */
/* ===========================================================================*/
const createAttribute = (length, stride, offset) => {
    return {length: length, stride: stride, offset: offset}
}
const attribute_defintions = {
    square_texture: {
        a_position: createAttribute(2, 4, 0),
        a_texCoord:  createAttribute(2, 4, 2)
    }
}

/* basic operation */
const basicOperation = (gl, shader, buffer, attributes, uniforms) => {
    gl.useProgram(shader.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    setAttributes(gl, shader, attributes);
    setUniforms(gl, shader, uniforms);
}

/* creating Uniforms */
/* ===========================================================================*/

const createUniform = (method, ...parameters) => {
    return {method: method, parameters: parameters}
}

const createObjectUniforms = (object, projection) => {
    const uniforms = { };
    uniforms.u_projection = createUniform('uniformMatrix4fv', false, projection);
    uniforms.u_transform = createUniform('uniformMatrix4fv', false, calcTransform(object.transform_data, work_buffer.views.m1));
    //uniforms.u_texMatrix = createUniform('uniformMatrix4fv', false, glMatrix.mat4.create( ));
    uniforms.u_texMatrix = createUniform('uniformMatrix4fv', false, calcTextureTransform(object.currentFrame, work_buffer.views.m2));
    uniforms.u_tint = createUniform('uniform4fv', object.getTint( ));
    return uniforms;
}

/*
createUniforms.color = function(object, projection) {
    uniforms.u_projection = createUniform('uniformMatrix4fv', false, projection);
    uniforms.u_transform = createUniform('uniform4fv', false, getObjectTransform(object));
    uniforms.u_color = createUniform('uniform4fv', object.color);
    return uniforms;
}

*/

/* setting textures */
const setTexture = (gl, texture, uniform, index) => {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(uniform, index);
}

//utility functions 
const calcProjection = (camera, matrix) => {
    return glMatrix.mat4.ortho(matrix, camera.left, camera.right, camera.bottom, camera.top, 1, -1)
}

const calcTransform = (data, matrix) => {
    const mat4 = glMatrix.mat4;
    mat4.fromTranslation(matrix, data.position);
    mat4.rotateX(matrix, matrix, data.rotation[0]);
    mat4.rotateY(matrix, matrix, data.rotation[1]);
    mat4.rotateZ(matrix, matrix, data.rotation[2]);
    mat4.translate(matrix, matrix, [-data.size[0] * 0.5, -data.size[1] * 0.5, 0]);
    mat4.scale(matrix, matrix, [...data.size, 1]);
    return matrix;
}

const calcTextureTransform = (data, matrix) => {
    const mat4 = glMatrix.mat4;
    mat4.fromTranslation(matrix, data.position);
    mat4.scale(matrix, matrix, data.scale);
    return matrix;
}

//
const useProgram = (gl, program) => {
    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

/* Public Exports */
export function clear(gl, color) {
    gl.clearColor(...color);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
}

export function drawObject(gl, shader, object, projection, buffer) {
    useProgram(gl, shader.program);
    const uniforms = createObjectUniforms(object , projection);
    setTexture(gl, object.texture, shader.uniforms.u_texture, 0)
    basicOperation(gl, shader, buffer, attribute_defintions.square_texture, uniforms);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


export function drawWorld(gl, world, shaders, buffers) {
    clear(gl, world.color || [0, 0, 0, 1]);
    const projection = calcProjection(world.camera, work_buffer.views.m0);
    for(const object of world.objects) 
        drawObject(gl, shaders.standard_texture, object, projection, buffers.get('texture_buffer'));
}

/* Private Methods */
const setAttributes = (gl, program, attributes) => {
    const BYTE_LENGTH = Float32Array.BYTES_PER_ELEMENT;
    for(const name in attributes) {
        const attribute = program.attributes[name];
        const data = attributes[name];
        gl.enableVertexAttribArray(attribute);
        gl.vertexAttribPointer(attribute, data.length, gl.FLOAT, false, data.stride * BYTE_LENGTH, data.offset * BYTE_LENGTH);
    }
}

const setUniforms = (gl, program, uniforms) => {
    for(const name in uniforms) {
        const uniform = program.uniforms[name];
        const data = uniforms[name];
        gl[data.method](uniform, ...data.parameters);
    }
}

