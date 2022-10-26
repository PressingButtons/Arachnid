import defineGraphicsLibrary from "./arachnid_gl/$gl-main.js";
import defineObjects from "./arachnid_object/$object-main.js";
import defineSystem from "./arachnid_system/$sysmain.js";

window.Arachnid = { };

defineSystem(Arachnid);
defineGraphicsLibrary(Arachnid);
defineObjects(Arachnid);