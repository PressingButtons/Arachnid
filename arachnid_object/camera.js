export default class Camera {

    #data = new ArrayBuffer()

    constructor(gl, size) {
        this.gl = gl;
        this.#data.set(size, 2);
    }

}