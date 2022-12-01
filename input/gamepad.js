export default class Gamepad extends EventTarget {

    #buttons;
    #axes;

    constructor(config = { }) {
        super( );
        this.#buttons = new Array(20).fill(0).map(x => new GPButton(config))
        this.#axes = new Array(4).fill(0);
    }

    get buttons( ) {
        return this.#buttons
    }

    get axes( ) {
        return this.#axes;
    }

    #readButton(button, i) {
        if(!this.#buttons[i]) return;
        if(button.value > 0) this.#buttons[i].press(button.value);
        else this.#buttons[i].release( );
    }

    #readAxis(axis, i) {
        this.#axes[i] = axis;
    }

    read(gp) {
        for(const i in gp.buttons) this.#readButton(gp.buttons[i], i);
        for(const i in gp.axes) this.#readAxis(gp.axes[i], i);
    }

}

class GPButton extends EventTarget {

    static DEFAULT_HOLD_THRESHOLD = 1500;
    static DEFAULT_DBL_THRESHOLD = 350;

    #value;
    #press_time;
    #last_pressed;
    #hold;
    #dbl;
    #held = false;

    constructor(config = { }) {
        super( );
        this.#value = 0;
        this.#press_time = 0;
        this.#last_pressed = 0;
        this.#setConfig(config)
    }

    get held( ) {
        return this.#held
    }

    get value( ) {
        return this.#value
    }

    #setConfig(config) {
        this.#dbl = config.dbl || GPButton.DEFAULT_DBL_THRESHOLD;
        this.#hold = config.hold || GPButton.DEFAULT_HOLD_THRESHOLD;
    }

    #onPress(value, timestamp) {
        this.#value = value;
        if(timestamp - this.#last_pressed <= this.#dbl)
            this.dispatchEvent(new Event('double_press')); 
        this.#last_pressed = timestamp;
    }

    #update(timestamp) {
        if(this.#value == 0) return;
        this.#press_time += timestamp - this.#last_pressed;
        if(this.#press_time >= this.#hold) this.#held = true;
    }

    press(value = 1) {
        const timestamp = performance.now( );
        if(this.#value == 0) this.#onPress(value, timestamp);
        else this.#update(timestamp);
    }

    release( ) {
        this.#value = 0;
        this.#last_pressed = performance.now( );
    }

}
