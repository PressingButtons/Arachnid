export default class DataBuffer {

    #data; 
    #offset = 0;
    #views = { };

    constructor(allocation) {
        if(allocation) this.preallocate(allocation);
    }

    get bytesAllocated( ) {
        return this.#offset; 
    }

    get bytesUnallocated( ) {
        return this.#data.byteLength - this.#offset;
    }

    get views( ) {
        return this.#views;
    }


    #nextByte(TypedArray) {
        if(TypedArray == Uint8Array || TypedArray == Int8Array) return;
        if(this.#offset % 2 != 0) this.#offset += 1;
    }

    addView(name, TypedArray, parameters) {
        this.#nextByte(TypedArray);
        const data = new TypedArray(this.#data, this.#offset, parameters.length);
        const components = createComponentObject(data, parameters);
        this.#offset = data.byteOffset + data.byteLength;
        this.#views[name] = {
            data: data,
            components: components
        }
    }

    addViews(details) {
        details = arrayify(details);
        sortViews(details);
        for(const detail of details) this.addView(...detail);
    }

    addTypedView(name, TypedArray, length) {
        this.#nextByte(TypedArray);
        this.#views[name] = new TypedArray(this.#data, this.#offset, length);
        this.#offset = this.#views[name].byteOffset + this.#views[name].byteLength;
    }

    addTypedViews(details) {
        details = arrayify(details);
        for(const detail of details) this.addTypedView(...detail);
    }

    bindAccess(name, object, prefixed = true) {
        const view = this.#views[name];
        if(prefixed) {
            Object.defineProperty(object, name, {value: { }});
            object = object[name];
        }

        for(const name in view.components) {
            Object.defineProperty(object, name, {
                get ( ) {return view.components[name]},
                set (n) {view.components[name] = n}
            });
        }
    }

    configure(details) {
        details = arrayify(details);
        const bytes = calculateByteLength(details);
        this.preallocate(bytes);
        sortViews(details);
        for(const detail of details) this.addView(...detail);
    }

    preallocate(bytes) {
        this.#data = new ArrayBuffer(bytes);
        this.#offset = 0;
    }

}

const arrayify = details => {
    if(details instanceof Array) return details; 
    let ar = [];
    for(const name in details) ar.push([name, ...details[name]]);
    return ar;
}

const calculateByteLength = details => {
    let bytes = 0;
    for(const detail of details) 
        bytes += detail[1].BYTES_PER_ELEMENT * detail[2].length;
    return bytes;
}

const createComponentObject = (data, names) => {
    let components = { };
    for(let i = 0, name; name = names[i]; i++) {
        Object.defineProperty(components, name, {
            get( ) {return data[i]},
            set(n) {data[i] = n},
            enumerable: true
        });
    }
    return components
}

const sortViews = views => {
    views.sort((a, b) => {
        return (b[1].BYTES_PER_ELEMENT) - (a[1].BYTES_PER_ELEMENT);
    });
}