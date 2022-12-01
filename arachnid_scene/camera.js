import DataBuffer from "../arachnid_system/data_buffer.js";
import State from "../objects/state.js";

export default class Camera extends State {

    #data;

    constructor(width, height) {
        super('camera');
        this.#data = new DataBuffer(347);
        this.#data.createViews([
            ['position', Int16Array, ['x', 'y', 'z']],
            ['size', Uint16Array, ['width', 'height']],
            ['rotation', Float32Array, ['x', 'y', 'z']],
            ['fov', Float64Array, ['value']],
            ['frustram', Float32Array, ['near', 'far']],
            ['brightness', Uint8Array, ['value']],
            ['tint', Uint8Array, ['red', 'green', 'blue', 'alpha']]
        ]);
        this.tint(255, 255, 255, 255);
        this.brightness = 255;
        this.setFrustram(1, -1);
        this.width = width;
        this.height = height;
        this.fov = 45;
    }

    //position
    get x( ) {return this.#data.position.x}
    set x(n) {this.#data.position.x = n}

    get y( ) {return this.#data.position.y}
    set y(n) {this.#data.position.y = n}

    get z( ) {return this.#data.position.z}
    set z(n) {this.#data.position.z = n}

    get top( ) {return this.y - this.height /2}
    get left( ) {return this.x - this.width / 2}
    get right( ) {return this.x + this.width / 2}
    get bottom ( ) {return this.y + this.height / 2}

    //rotation
    get rx( ) {return this.#data.rotation.x}
    set rx(n) {this.#data.rotation.x = n}

    get ry( ) {return this.#data.rotation.y}
    set ry(n) {this.#data.rotation.y = n}

    get rz( ) {return this.#data.rotation.z}
    set rz(n) {this.#data.rotation.z = n}

    //viewing
    get fov( ) {return this.#data.fov.value}
    set fov(n) {this.#data.fov.value = n}

    get fov_radians( ) {
        return this.#data.fov.value * Math.PI / 180
    }

    get zNear( ) {return this.#data.frustram.near}
    set zNear(n) {this.#data.frustram.near = n}

    get zFar( ) {return this.#data.frustram.far}
    set zFar(n) {this.#data.frustram.far = n}

    get brightness( ) {return this.#data.brightness.value}
    set brightness(n) {this.#data.brightness.value = n}

    get aspect( ) {
        return this.width / this.height;
    }

    //size
    get width( ) {return this.#data.size.width}
    set width(n) {this.#data.size.width = n}

    get height( ) {return this.#data.height}
    set height(n) {this.#data.height = n}
    //private methods 

    //public methods 
    calibrate(fov, frustram, brightness, tint) {
        this.fov = fov;
        this.tint(...tint);
        this.brightness = brightness;
        this.#data.frustram.data.set(frustram);
    }

    dump( ) {
        return {
            size: [...this.#data.size.data],
            position: [...this.#data.position.data],
            rotation: [...this.#data.rotation.data],
            frustram: [...this.#data.frustram.data],
            fov: this.fov,
            brightness: this.brightness,
            tint: this.tint( )
        }
    }

    setFrustram(zNear, zFar) {
        this.#data.frustram.data.set([zNear, zFar])
    }

    tint(...color) {
        if(color) this.#data.tint.data.set(color);
        return [...this.#data.tint.data];
    }

    perspective(matrix) {
        glMatrix.mat4.perspective(matrix, this.fov_radians, this.aspect, this.zNear, this.zFar);
        return matrix;
    }

    orthogonal(matrix) {
        glMatrix.mat4.ortho(matrix, 0, this.width, this.height, 0, this.zNear, this.zFar);
        glMatrix.mat4.translate(matrix, matrix, this.#data.position.data);
        return matrix;
    }

}