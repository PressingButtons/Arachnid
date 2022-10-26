export function squareBuffer(gl, drawMethod = "STATIC_DRAW") {
    const buffer = gl.createBuffer( );
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, 
        new Float32Array([
            -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,  1.0,  1.0, -1.0 
        ]), 
        gl[drawMethod]
    );
    return buffer;
}

export function squareTextureBuffer(gl, drawMethod = "STATIC_DRAW") {
    const buffer = gl.createBuffer( );
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, 
        new Float32Array([
            -1.0, -1.0, 0.0, 0.0,
             1.0, -1.0, 1.0, 0.0,
            -1.0,  1.0, 0.0, 1.0,
            -1.0,  1.0, 0.0, 1.0,
             1.0,  1.0, 1.0, 1.0,
             1.0, -1.0, 1.0, 0.0 
        ]), 
        gl[drawMethod]
    );
    return buffer;
}
