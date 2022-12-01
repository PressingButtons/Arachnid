export default class Texture {

    #gl;
    #image;
    #texture;

    constructor(gl) {
        this.#gl = gl;
        this.#texture = gl.createTexture( );
    }

    get src( ) {
        return this.#image;
    }

    get texture( ) {
        return this.#texture;
    }

    #genMipMap(gl) {
        gl.generateMipMap(gl.TEXTURE_2D);
        return 'loaded-mip-map';
    }

    #setTexParameters(gl) {
        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return 'loaded';
    }

    load(url) {
        return loadImage(url).then(this.texturize.bind(this));
    }

    texturize(image) {
        this.#image = image;
        this.#gl.bindTexture(this.#gl.TEXTURE_2D, this.#texture);
        this.#gl.texImage2D(this.#gl.TEXTURE_2D, 0, this.#gl.RGBA, this.#gl.RGBA, this.#gl.UNSIGNED_BYTE, image);
        if(powerOf2(image.width) && powerOf2(image.height)) return this.#genMipMap(this.#gl);
        return this.#setTexParameters(this.#gl);   
    }

}

const powerOf2 = n => {
    return (n & (n - 1) == 0);
}

const loadImage = url => {
    return new Promise((resolve, reject) => {
        const image = new Image( );
        image.onload = event => resolve(image);
        image.onerror = event => reject(event);
        image.src = url;
    });
}