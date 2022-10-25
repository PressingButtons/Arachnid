/* Public Exports */
export function draw2DTexture(gl, shader_program, buffer, textures, attributes, uniforms, vertices = 6) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    setAttributes(gl, shader_program, attributes);
    setUniforms(gl, shader_program, uniforms);
    setTextures(gl, textures);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices);
}

export function draw2DObject(gl, shader_program, object, camera) {
    const uniforms = object.assign({ }, object.matrices, camera.matrices);
    draw2DTexture(gl, shader_program, object.buffer, object.textures, object.attributes, uniforms);
}

/* Private Methods */
const setAttributes = (gl, program, attributes) => {
    const BYTE_LENGTH = Float32Array.BYTES_PER_ELEMENT;
    for(const name in attributes) {
        const attribute = program.attributes[name];
        const data = attributes[name];
        gl.enableVertexAttribArray(attribute);
        gl.vertexAttribPointer(attribute, data.size, gl.FLOAT, false, data.stride * BYTE_LENGTH, data.offset * BYTE_LENGTH);
    }
}

const setUniforms = (gl, program, uniforms) => {
    for(const name in uniforms) {
        const uniform = program.uniforms[name];
        const data = uniforms[name];
        gl[data.method](...data.properties);
    }
}
