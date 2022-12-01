export default class Cache {

    #cache = new Set( );
    #keys = new Map( );
    #i = 0;

    constructor( ) {

    }

    get keys( ) {
        return [...this.#keys.keys( )]
    }

    setItem(item) {
        if(this.#cache.has(item)) return;
        this.#cache.add(item);
        this.#keys.set(this.#i, item);
        this.#i++;
        return this.#i - 1;
    }

    getItem(id) {
        return this.#keys.get(id);
    }

    deleteItem(id) {
        if(!this.#keys.has(id)) return;
        this.#cache.delete(this.#keys.get(id));
        this.#keys.delete(id);
    }

    clear( ) {
        for(const entry of this.#keys.keys())
            this.deleteItem(entry);
    }

}
