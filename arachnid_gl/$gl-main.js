import { compile } from "./compile.js";

export default function defineGraphicsLibrary(pkg) {

    pkg.initGraphicsLibrary = function(_gl) {
        Object.defineProperty(pkg, "Graphics_Lib", {value: {
            context: _gl
        }});

        Object.defineProperties(pkg.Graphics_Lib, {
            compile: {
                value: compile
            }
        })
    }

}

