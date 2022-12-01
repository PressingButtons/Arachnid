import { compile } from "./compile.js";
import * as Render from './render.js';

export class GraphicsLibrary {

    #gl;
    #shaders;
    #buffers = new Map( );
    #currentShader;

    constructor(canvas, options = { }) {
        this.#gl = canvas.getContext('webgl', options);
    }

    get gl( ) {return this.#gl}

    get shaders( ) {return this.#shaders}

    get buffer_list( ) {
        return this.#buffers.keys( );
    }

    //private functions
    #useShader(shader) {
        if(this.#currentShader != shader) {
            this.#gl.useProgram(shader.program);
            this.#currentShader = shader;
        }
        return shader;
    }
    //public functions
    async compileShaders(url) {
        this.#shaders = { };
        if(!url) url = '/arachnid/arachnid_shaders/config.json';
        let shaders = await compile(this.gl, url)
        Object.assign(this.#shaders, shaders);
    }

    createBuffer(name, data, drawMethod = "STATIC_DRAW") {
        const buffer = this.#gl.createBuffer( ), gl = this.#gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl[drawMethod]);
        this.#buffers.set(name, buffer);
    }

    getBuffer(name) {
        return this.#buffers.get(name);
    }

    //drawing methods 
    clear(...color) {
        color = [].concat.apply([], color);
        Render.clear(this.gl, color);
    }

    drawWorld(world, texture_cache) {
        Render.drawWorld(this.gl, world, this.#shaders, this.#buffers, texture_cache);
    }

}
