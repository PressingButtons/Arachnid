import DataBuffer from "./data_buffer.js";

export default function defineSystem(pkg) {

    Object.defineProperty(pkg, "System", {value: { }});

    Object.defineProperties(pkg.System, {

        DataBuffer: {
            value: DataBuffer
        }

    });

}