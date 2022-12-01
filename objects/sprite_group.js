import ImageObject from "./image.js";
import Texture from "./texture.js";

export default class SpriteGroup {

    #gl;
    #textures = [ ];
    #image = new ImageObject( );

    constructor(gl) {
        this.#gl = gl;
    }

    get src( ) {
        return this.#image;
    }

    #slice(image, width, height) {
        for(let i = 0; i < image.height / height; i++) {
            for(let j = 0; j < image.width / width; j++ ) {
                const canvas = image.cutoutCanvas(j * width, i * height, width, height);
                const texture = new Texture(this.#gl);
                texture.texturize(canvas);
                this.#textures.push(texture);
            }
        } 
    }

    /**
     * 
     * @param {string} texture_url 
     * @param {int} width 
     * @param {int} height 
     * @returns Promise
     */

    async load(texture_url, width, height) {
        try {
            this.#textures = [];
            await this.#image.load(texture_url);
            this.#slice(this.#image, width, height);
        } catch (err) {
            throw err;
        }
    }

    /**
     * 
     * @param {int} num 
     * @returns Texture
     */
    
    getCell(num) {
        return this.#textures[num];
    }

}