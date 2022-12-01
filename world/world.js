import State from "../objects/state.js";

export default class World extends State{

    #objects = new Set( );

    constructor(name) {
        super(`world:${name}`);
        this.setTransition('inactive', new Inactive(this));
        this.setTransition('active', new Active(this));
    }

    get objects( ) {return this.#objects }

    activate( ) { this.transition('active');}
    deactivate( ) {this.transition('inactive');}

    addObject(object) {
        this.#objects.add(object);
    }

}

class Inactive extends State {

    constructor(world) {
        super('inactive', world);
    }

}

class Active extends State {

    constructor(world) {
        super('active', world);
        this.setTransition('run', new Run(world));
        this.run( );
    }

    run( ) {this.transition('run')}

}


class Run extends State {

    constructor(world) {
        super('run', world);
    }

    onUpdate(config) {
        for(const object of this.src.objects) {
            object.update(config);
        }
    }

}

