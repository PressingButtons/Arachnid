export default class State extends EventTarget{

    #substates = new Map( );
    #transitions = { };
    #current = null
    #name;
    #src;

    constructor(name, src) {
        super( );
        this.#name = name;
        this.#src = src || this;
    }

    get name( ) {
        return this.#name;
    }

    get current( ) {
        return this.#current;
    }

    get src( ) {
        return this.#src
    }

    #addState(state) {
        this.#substates.set(state.name, state);
        state.parent = this;
    }

    #removeState(state) {
        for(const transition_key in this.#transitions) {
            if(this.#transitions[transition_key] == state.name);
            delete this.#transitions[transition_key];
        }
        this.#substates.delete(state.name)
        state.parent = null;
    }

    #switchState(event) {
        if(!this.#transitions[event.type]) return;
        if(this.#current) this.#current.exitState( );
        this.#current = this.#substates.get(this.#transitions[event.type]);
        this.#current.enterState(event.detail);
    }

    setTransition(transition_key, state) {
        if(!this.#substates.has(state)) this.#addState(state);
        this.#transitions[transition_key] = state.name;
        state.parent = this;
        this.addEventListener(transition_key, this.#switchState.bind(this));
    }

    setTransitions(state_configuration) {
        for(const transition in state_configuration) this.setTransition(transition, state_configuration[transition]);
    }

    signal(name, config) {
        this.dispatchEvent(new CustomEvent(name, {detail: config}));
    }

    exitState( ) {

    }

    enterState(config) {

    }

    onUpdate(config) {

    }

    update(config) {
        this.onUpdate(config);
        if(this.#current) this.#current.update(config);
    }

}