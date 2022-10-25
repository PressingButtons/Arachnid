export default class Camera {

    #data = new Uint16Array(4);

    constructor(gl, size) {
        this.gl = gl;
        this.#data.set(size, 2);
    }
    
}