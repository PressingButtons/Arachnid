import defineGraphicsLibrary from "./arachnid_gl/$gl-main.js";
import defineObjects from "./arachnid_object/$object-main.js";
import defineSystem from "./arachnid_system/$sysmain.js";

window.Arachnid = { };

Arachnid.init = function(canvas, shaderURL = 'native') {
    defineSystem(Arachnid);
    defineObjects(Arachnid);    
    defineGraphicsLibrary(Arachnid, canvas.getContext('webgl', {premultipliedAlpha: false}));
    return Arachnid.Graphics_Lib.compile('/Arachnid/arachnid_shaders/config.json');
}