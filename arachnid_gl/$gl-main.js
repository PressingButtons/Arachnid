import { compile } from "./compile.js";

export default function defineGraphicsLibrary(pkg, _gl) {

    Object.defineProperty(pkg, "Graphics_Lib", {value: {
        context: _gl
    }});

    Object.defineProperties(pkg.Graphics_Lib, {
        compile: {
            value: async function(url) {
                Arachnid.Graphics_Lib.shaders = await compile(_gl, url);
            }
        }
    });

}

