import GameObject from "./game-object.js";

export default class RigidBody extends GameObject {

    #body;
    #collision = {left: false, right: false, top: false, bottom: false}

    constructor(config) {
        super(config)
        this.#body = new RBody(...config.body);
    }

    get body( ) {
        return this.#body;
    }

    get left( ) {return this.x + this.body.left}
    set left(n) {this.x = n - this.#body.left}

    get right( ) {return this.x + this.body.right}
    set right(n) {this.x = n - this.body.right}

    get top( ) {return this.y + this.body.top}
    set top(n) {this.y = n - this.body.top}

    get bottom( ) {return this.y + this.body.bottom}
    set bottom(n) {this.y = n - this.body.bottom}

    get collisionLeft( ) {return this.#collision.left}
    set collisionLeft(bool) {this.#collision.left = bool}

    get collisionRight( ) {return this.#collision.right}
    set collisionRight(bool) {this.#collision.right = bool}

    get collisionTop( ) {return this.#collision.top}
    set collisionTop(bool) {this.#collision.top = bool}

    get collisionBottom( ) {return this.#collision.bottom}
    set collisionBottom(bool) {this.#collision.bottom = bool}

}

class RBody {

    #data = new Uint16Array(4);

    constructor(x = 0, y = 0, width = 1, height = 1) {
        this.#data[0] = x;
        this.#data[1] = y;
        this.#data[2] = width;
        this.#data[3] = height;
    }

    get x( ) {return this.#data[0]}
    set x(n) {this.#data[0] = n}

    get y( ) {return this.#data[1]}
    set y(n) {this.#data[1] = n}

    get width( ) {return this.#data[2]}
    set width(n) {this.#data[2] = n}

    get height( ) {return this.#data[3]}
    set height(n) {this.#data[3] = n}

    get left( ) {return this.x}
    get right( ) {return this.x + this.width}
    get top( ) {return this.y}
    get bottom( ) {return this.y + this.height}

}