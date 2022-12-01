import State from "../arachnid_object/state.js";

export default class StepLoop extends State {

    #methods = new Set( );
    #keys = new Map( );
    #i = 0;
    #last_step;
    #runId;
    #step_log = [];
    #run_flag = false;

    constructor( ) {
        super('step_loop');
    }

    get methods( ) {return this.#methods}

    get average_frames_per_second( ) {
        const average = this.#step_log.reduce((a, b) => a + b) / this.#step_log.length;
        return Math.round(1000 / average);
    }

    #logStep(dt) {
        this.#step_log.unshift(dt);
        if(this.#step_log.length > 10) this.#step_log.pop( );
    }

    #loop(timestamp) {
        if(!this.#last_step) this.#last_step = timestamp;
        const dt = timestamp - this.#last_step;
        this.#logStep(dt);
        for(const method of this.#methods) method({dt: dt});
        this.#last_step = timestamp;
        if(this.#run_flag) this.#runId = requestAnimationFrame(this.#loop.bind(this));
        else console.log(this.#run_flag);
    }

    add(method) {
        if(this.#methods.has(method)) return;
        this.#methods.add(method);
        this.#keys.set(this.#i, method);
        this.#i ++;
        return this.#i - 1;
    }

    remove(id) {
        if(!this.#keys.has(id)) return;
        this.#methods.delete(this.#keys.get(id));
        this.#keys.delete(id);
    }

    run( ) {
        this.#run_flag = true;
        this.#runId = requestAnimationFrame(this.#loop.bind(this));
    }

    stop( ) {
        this.#run_flag = false;
        cancelAnimationFrame(this.#runId);
        this.#last_step = null;
    }
    

}
