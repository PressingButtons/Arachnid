import DataBuffer from "../objects/data_buffer.js";
import compile  from "./compile.js";

let mat4;

export default class GraphicsGL extends EventTarget {

    #gl;
    #shaders = { };
    #buffers = { };
    #current_program = null;
    #error_log = [];

    constructor(canvas, options) {
        super( );
        this.#gl = canvas.getContext('webgl', options);
        mat4 = window.glMatrix.mat4 || window.mat4;
        if(!mat4) throw 'Error - glmatrix library (mat4) not found!';
    }

    get gl( ) {return this.#gl}
    get shaders( ) {return this.#shaders};

    //private methods
    #currentShader( ) {
        return this.#shaders[this.#current_program];
    }

    #defineBuffer(gl, name, data, drawMethod) {
        const buffer = gl.createBuffer( );
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl[drawMethod]);
        this.#buffers[name] = buffer;
        return buffer;
    }

    #setBuffer(buffer_name) {
        if(this.#buffers[buffer_name])
            this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, this.#buffers[buffer_name]);
        else throw `Error - buffer[${buffer_name}] not predefined. Cannot perform draw request.`;
    }

    #setAttributes(attributes) {
        const program = this.#shaders[this.#current_program], gl = this.#gl;
        const BYTE_LENGTH = Float32Array.BYTES_PER_ELEMENT;
        for(const name in attributes) {
            const attribute = program.attributes[name];
            const data = attributes[name];
            gl.enableVertexAttribArray(attribute);
            gl.vertexAttribPointer(attribute, data.length, gl.FLOAT, false, data.stride * BYTE_LENGTH, data.offset * BYTE_LENGTH);
        }
    }

    #setTextures(textures) {
        let i = 0, gl = this.#gl;
        for(let uniform_name in textures) {
            const uniform = this.#currentShader().uniforms[uniform_name];
            const texture = textures[uniform_name];
            gl.activeTexture(gl.TEXTURE0 + i);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(uniform, i);
            i++;
        }
    }

    #setUniforms(uniforms) {
        const program = this.#shaders[this.#current_program], gl = this.#gl;
        for(const name in uniforms) {
            const uniform = program.uniforms[name];
            const data = uniforms[name];
            gl[data.method](uniform, ...data.parameters);
        }
    }

    #useProgram(program_name) {
        if(this.#current_program == program_name) return this.#shaders[program_name];
        else if(!this.#shaders.hasOwnProperty(program_name)) throw `Error - shader program [${program_name}] not defined to library.`;
        else {
            const gl = this.#gl;
            this.#current_program = program_name;
            this.#gl.useProgram(this.#shaders[program_name].program);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); 
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        }
    }

    //public methods 
    async compileShaders(details) {
        const shaders = await compile(this.#gl, details);
        Object.assign(this.#shaders, shaders);
    }

    //buffer methods

    defineBuffer(name, data, drawMethod = 'STATIC_DRAW') {
        return this.#defineBuffer(this.#gl, name, data, drawMethod);
    }

    deleteBuffer(name) {
        delete this.#buffers[name];
    }

    //rendering methods
    clear(color) {
        const gl = this.#gl;
        gl.clearColor(...color);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    }

    draw(details) {
        try {
            this.#useProgram(details.program);
            this.#setBuffer(details.buffer_name);
            this.#setAttributes(details.attributes);
            this.#setUniforms(details.uniforms);
            if(details.textures) this.#setTextures(details.textures);
            this.#gl.drawArrays(this.#gl[details.draw_mode], details.first_array, details.num_indices);   

        } catch (err) {
            this.#error_log.push(err);
            if(debug) this.dispatchEvent(new Event('draw_error'));
        }
    }
    //utility methods
    dumpErrors (start = 0) {
        if(start >= 0) return this.#error_log.slice(start);
        else return this.#error_log.slice(this.#error_log.length + start);
    }
}

