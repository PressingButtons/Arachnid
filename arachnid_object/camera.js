import DataBuffer from "../arachnid_system/data_buffer.js";
import State from "./state.js";

export default class Camera extends State {

    #data;

    constructor(config) {
        this.#data = new DataBuffer(40);
        this.#data.createViews([[
            ['position', Int16Array, ['x', 'y', 'z']],
            ['size', Uint16Array, ['width', 'height']],
            ['rotation', Float32Array, ['x', 'y', 'z']],
            ['fov', Float32Array, ['value']],
            ['frustram', Float32Array, ['near', 'far']],
            ['brightness', Uint8Array, ['value']],
            ['tint', Float32Array, ['red', 'green', 'blue', 'alpha']]
        ]])
    }

    //position
    get x( ) {return this.#data.position.x}
    set x(n) {this.#data.position.x = n}

    get y( ) {return this.#data.position.y}
    set y(n) {this.#data.position.y = n}

    get z( ) {return this.#data.position.z}
    set z(n) {this.#data.position.z = n}

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

    get zNear( ) {return this.#data.frustram.near}
    set zNear(n) {this.#data.frustram.near = n}

    get zFar( ) {return this.#data.frustram.far}
    set zFar(n) {this.#data.frustram.far = n}

    //size
    get width( ) {return this.#data.size[0]}
    
    get height( ) {return this.#data.size[1]}

}