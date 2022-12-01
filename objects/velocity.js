export default class Vector2D {

    #data = new Float32Array([0, 0]);

    constructor(x = 0, y = 0) {
        this.#data.set([x, y]);
    }

    get x( ) { return this.#data[0]; }
    set x(n) { this.#data[0] = n; } 

    get y( ) { return this.#data[1]; }
    set y(n) { this.#data[1] = n; }

    get components( ) {
        return this.#data;
    }

    get magnitude( ) {
        return Math.pow((this.x * this.x + this.y * this.y), 0.5);
    }

    get radians( ) {
        return Math.atan2(this.y, this.x);
    }

    get degress( ) {
        return (360 + Math.round(this.radians * 180 / Math.PI)) % 360;
    }


}