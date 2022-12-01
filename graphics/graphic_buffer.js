let square_position_buffer,
    texture_buffer;

const createSquarePositionBuffer = gl => {
    return createBuffer(gl, new Float32Array([
        0.0, 0.0, 0.0, 1.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 1.0, 1.0, 0.0
    ]), "STATIC_DRAW");
}

const createTextureBuffer = gl => {
    return createBuffer(gl, new Float32Array([
        0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0
    ]), "STATIC_DRAW");
}

export function init(gl) {
    square_position_buffer = createSquarePositionBuffer(gl);
    texture_buffer = createTextureBuffer(gl);
}

export function squareBuffer(gl, drawMethod = "STATIC_DRAW") {
    const data = new Float32Array([
        -1.0, -1.0,  1.0, -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,  1.0,  1.0, -1.0 
    ]);
    return createBuffer(gl, data, drawMethod);
}

export function colorBuffer(gl, colors, vertex_count = 4) {
    let data = [ ];
    for(let i = 0; i < vertex_count; i++) 
        data.push(colors[i % colors.length]);
    return createBuffer(gl, new Float32Array[data], gl.STATIC_DRAW);
}

export function squareTextureBuffer(gl, drawMethod = "STATIC_DRAW") {
    const data = new Float32Array([
        -1.0, -1.0, 0.0, 0.0,
         1.0, -1.0, 1.0, 0.0,
        -1.0,  1.0, 0.0, 1.0,
        -1.0,  1.0, 0.0, 1.0,
         1.0,  1.0, 1.0, 1.0,
         1.0, -1.0, 1.0, 0.0 
    ]);
    return createBuffer(gl, data, drawMethod);
}

export function squareOrthogonicBuffer(gl, drawMethod = "STATIC_DRAW") {
    const data = new Float32Array([
        
    ]);
    return createBuffer(gl, data, drawMethod);
}


export function createBuffer(gl, data, drawMethod) {
    const buffer = gl.createBuffer( );
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl[drawMethod]);
    return buffer;
}