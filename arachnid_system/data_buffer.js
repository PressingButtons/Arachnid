export default class DataBuffer {

    #data;
    #views;
    #offset;

    constructor(byteLength) {
        this.#data = new ArrayBuffer(byteLength);
        this.#views = { };
    }

    get bytesUsed( ) {
        return this.#offset;
    }

    get bytesUnallocated( ) {
        return this.#data.byteLength - this.#offset;
    }

    #sortViews(view_configs) {
        view_configs.sort((a, b) => {
            return (b[1].BYTES_PER_ELEMENT) - (a[1].BYTES_PER_ELEMENT);
        });
    }

    createView(name, TypedArray, parameters, pad = true) {
        if(this.#offset % 2 != 0 && pad) this.#offset ++;
        this.#views[name] = { data: new TypedArray(this.#data, this.#offset, parameters.length)}
        const data = this.#views[name].data;
        for(let i = 0; i < parameters.length; i++) {
            Object.defineProperty(this.#views[name], parameters[i], {
                get( ) {return data[i]},
                set(n) {data[i] = n}
            });
        }
        this.#offset = this.#views[name].data.byteOffset + this.#views[name].data.byteLength;
        this[name] = this.#views[name]; // public access to view
    }

    createViews(view_configs) {
        this.#sortViews(view_configs); //sort by bytes per element
        for(const config of view_configs) this.createView(...config, false);
    }

    unallocateView(name) {
        if(!this.#views[name]) return;
        const bytesFreed = this.#views[name].data.byteLength;
        delete this[name];
        delete this.#views[name];
        return bytesFreed;
    }

}