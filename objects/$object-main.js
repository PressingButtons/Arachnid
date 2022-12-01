import State from "./state.js";

export default function defineObjects(pkg) {

    Object.defineProperty(pkg, 'Object', {value: { }});

    Object.defineProperties(pkg.Object, {
        State: {
            value: State
        }
    })

}