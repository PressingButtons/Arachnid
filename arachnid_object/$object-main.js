import Camera from "./camera.js";
import State from "./state.js";

export default function defineObjects(pkg) {

    Object.defineProperty(pkg, 'Object', {value: { }});

    Object.defineProperties(pkg.Object, {
        Camera : {
            value: Camera
        },
        State: {
            value: State
        },

    })

}