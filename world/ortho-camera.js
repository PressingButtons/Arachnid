const mat4 = glMatrix.mat4;

export default class OrhtoCamera {

    #canvas;
    #scale = 1;
    #position = new Int16Array(3);
    #matrix = new Float32Array(16);

    constructor(canvas) {
        this.#canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }

    get width( ) {
        return this.#canvas.width;
    }

    get height( ) {
        return this.#canvas.height;
    }

    get scale( ) {
        return this.#scale;
    }

    set scale(n) {
        this.#scale = n;
    }

    get x( ) {return this.#position[0]}
    set x(n) {this.#position[0] = n}

    get y( ) {return this.#position[1]}
    set y(n) {this.#position[1] = n}

    get left( ) {return this.x - this.width * 0.5;}
    set left(n) {this.x = n + this.width * 0.5}

    get right( ) {return this.x + this.width * 0.5}
    set right(n) {this.x = n + this.width * 0.5}

    get top( ) {return this.y - this.height * 0.5}
    set top(n) {this.y = n + this.height * 0.5}

    get bottom( ) {return this.y + this.height * 0.5}
    set bottom(n) {this.y = n - this.height * 0.5}

    get projection( ) {
        mat4.ortho(this.#matrix, this.left, this.right, this.bottom, this.top, 1, -1);
        mat4.scale(this.#matrix, this.#matrix, [this.#scale, this.#scale, 1]);
        return this.#matrix
    }

}