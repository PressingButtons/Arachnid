export default class ImageObject extends Image {

    constructor( ) {
        super( );
    }

    /**
     * 
     * @param {string} url 
     * @returns 
     */

    load(url) {
        return new Promise((resolve, reject) => {
            this.onload = event => resolve( );
            this.onerror = event => reject(event);
            this.src = url;
        });
    }

    /**
     * 
     * @param {int} x 
     * @param {int} y 
     * @param {int} width 
     * @param {int} height 
     * @param {boolean} smooth 
     * @returns canvas
     */

    cutoutCanvas(x, y, width, height, smooth = false) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').imageSmoothingEnabled = smooth;
        canvas.getContext('2d').drawImage(this, 0, 0);
        return canvas;
    }

}