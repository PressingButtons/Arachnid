import { compile } from "./compile.js";
import * as DrawMethods from './draw.js';
import * as BufferDefinitions from './generate-buffer.js'; 

export default function defineGraphicsLibrary(pkg, _gl) {

    Object.defineProperty(pkg, "Graphics_Lib", {value: {
        context: _gl
    }});

    Object.defineProperties(pkg.Graphics_Lib, {
        compile: {
            value: async function(url) {
                Arachnid.Graphics_Lib.Shaders = await compile(_gl, url);
            }
        },
        clear: {
            value: function(red = 0, green = 0, blue = 0) {
                DrawMethods.clear(_gl, [red/255, green/255, blue/255, 1]);
            }
        },

        draw2DColor : {
            value: function(config) {
                DrawMethods.draw2DColor(
                    _gl, Arachnid.Graphics_Lib.Shaders['standard-color'], config.buffer, config.attributes, config.uniforms, config.vertices
                );
            }
        },

        SQUARE_BUFFER: {
            value: BufferDefinitions.squareBuffer(_gl)
        },

        SQUARE_TEXTURE_BUFFER: {
            value: BufferDefinitions.squareTextureBuffer(_gl)
        }

    });

}

