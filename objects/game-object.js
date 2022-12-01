import State from "./state.js";
import Vector2D from "./velocity.js";

export default class GameObject extends State {

    #position = new Float32Array([0, 0, 0]);
    #rotation = new Float32Array([0, 0, 0]);
    #velocity = new Vector2D( );
    #size = new Float32Array([1, 1, 1]);

    #animator;
    #sprite;

    constructor(config) {
        super(config.name || "gameobject");
        if(config.size) this.#size.set(config.size);
        if(config.sprite) this.#sprite = config.sprite;
        if(config.animations) {
            this.#animator = new Arachnid.Animation 
            this.#animator.configure(config.animation);
        }
    }

    get sprite( ) {return this.#sprite;}
    get width( ) {return this.#size[0];}
    get height( ) {return this.#size[1];}
    get currentCell( ) {
        if(!this.#sprite) return null;
        if(!this.#animator) return this.#sprite.getCell(0).texture;
        this.#sprite.getCell(this.#animator.current.index).texture;
    }
    get velocity( ) { return this.#velocity}

    get x( ) {return this.#position[0]}
    set x(n) {this.#position[0] = n}

    get y( ) {return this.#position[1]}
    set y(n) {this.#position[1] = n}

    get rotationX( ) {return this.#rotation[0]}
    set rotationX(n) {this.#rotation[0] = n}

    get rotationY( ) {return this.#rotation[1]}
    set rotationY(n) {this.#rotation[1] = n}

    get rotationZ( ) {return this.#rotation[2]}
    set rotationZ(n) {this.#rotation[2] = n}

    get left( ) {return this.x;}
    set left(n) {this.x = n;}

    get right( ) {return this.x + this.width}
    set right(n) {this.x = n - this.width}

    get top( ) {return this.y}
    set top(n) {this.y = n}

    get bottom( ) {return this.y + this.height}
    set bottom(n) {this.y = n - this.height}


    getTransform(matrix) {
        return performTransform(matrix, this.#position, this.#rotation, this.#size);
    }

}

const performTransform = (matrix, translation, rotation, scale) => {
    const mat4 = glMatrix.mat4;
    mat4.fromTranslation(matrix, translation);
    mat4.rotateX(matrix, matrix, rotation[0]);
    mat4.rotateY(matrix, matrix, rotation[1]);
    mat4.rotateZ(matrix, matrix, rotation[2]);
    mat4.translate(matrix, matrix, [ -scale[0] * 0.5, -scale[1] * 0.5, 0]);
    mat4.scale(matrix, matrix, scale);
    return matrix;
}
