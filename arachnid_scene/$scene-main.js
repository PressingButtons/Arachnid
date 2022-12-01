import Camera from "./camera.js";

export default function defineScene(pkg) {

    Object.defineProperty(pkg, 'Scene', {value: { }});

    Object.defineProperties(pkg.Scene, {
        Camera: {
            value: Camera
        }
    })

}