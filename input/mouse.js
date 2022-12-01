const position = new Float32Array(2);

const mouseExport = {
    get x( ) {return position[0]},
    get y( ) {return position[1]},
    buttons: {0: false, 1: false, 2: false}
}

export default function MouseObject(element) {
    element.addEventListener('mousedown', mouseListener);
    element.addEventListener('mousedup', mouseListener);
    element.addEventListener('mousemove', mouseListener);
    element.addEventListener('mouseleave', mouseListener);
    element.addEventListener('wheel', mouseListener);
    return mouseExport;
}

const mouseListener = event => {
    const rect = event.target.getBoundingClientRect( );
    position[0] = event.clientX - rect.x;
    position[1] = event.clientY - rect.y;
    listenerMethods[event.type](event);
}


const listenerMethods = { };

listenerMethods.mousemove = event => {

}

listenerMethods.mouseleave = event => {

}

listenerMethods.mousedown = event => {
    mouseExport.buttons[event.button] = true;
}

listenerMethods.mouseup = event => {
    mouseExport.buttons[event.button] = false;
}

listenerMethods.wheel = event => {

}

