const keys = { };

export default function Keyboard( ) {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return {get values ( ) {return keys}}
}

//private functions 
const onKeyDown = event => {
    keys[event.key.toLowerCase( )] = true;
}

const onKeyUp = event => {
    keys[event.key.toLowerCase( )] = false;
}
