export default class Animator {

    #animations = new Map( );
    #host;
    #current = {
        animation: null,
        index: 0,
        time: 0
    }

    constructor(host, config) {
        this.#host = host;
        if(config) this.configure(config);
    }

    get current( ) {
        return Object.assign({ }, this.#current);
    }

    get currentAnimation( ) {
        return this.#animations.get(this.#current.animation);
    }

    get currentFrame( ) {
        return this.currentAnimation( ).frames[this.#current.index];
    }

    #clear( ) {
        for(const key of this.#animations.entries( ))
            this.#animations.delete(key);
    }


    #performCallback( ) {
        const callback = this.currentFrame( ).callback;
        if(this.#host[callback.name])
            this.#host[callback.name](...callback.params);
    }

    #update(time_interval) {
        const animation = this.currentAnimation( );
        this.#current.time += time_interval;
        if(this.#current.time >= this.currentFrame.duration) {
            this.#current.index ++;
            this.#current.time = 0;
            if(this.#current.index > this.currentAnimation.frames.length - 1)
                this.#current.index = 0;
            this.#performCallback( );
        }
    }

    configure(config) {
        this.#clear( );
        for(const key of config)
            this.#animations.set(key, config[key]);
    }

    /**
     * Method play
     * @param {string} name 
     * sets current animation if it exists
     */

    play(name) {
        if(!this.#animations.has(name) || this.#current.name == name) return;
        this.#current.name = name;
        this.#current.index = 0;
        this.#current.time = 0;
        this.currentAnimation.callback(this.#current.index);
    }

    removeAnimation(name) {
        this.#animations.delete(name);
    }

    run(time_interval) {
        if(this.#current.animation) this.#update(time_interval);
    }

}

