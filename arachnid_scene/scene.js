import State from "../arachnid_object/state.js";

export default class Scene extends State {

    #timeline;
    #objects = [];

    constructor(camera) {
        super('scene');
    }

    #createDrawRequest

    addObject(object) {
        this.#objects.push(object);
    }

    dumpGraphical( ) {
        let requests = [];
        for(const object of this.#objects) requests.push(object.draw_data);
    }

}