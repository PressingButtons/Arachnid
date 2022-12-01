export default class Physics {

    #gravity = 1;
    #bounds = [0, 0, 1000, 1000];

    constructor(config = { }) {
        if(config.gravity) this.#gravity = config.gravity;
        if(config.bounds) this.setBounds(...config.bounds);
    }

    get left_bound( ) {return this.#bounds[0]}
    set left_bound(n) {this.#bounds[0] = n}

    get right_bound( ) {return this.#bounds[2]}
    set right_bound(n) {this.#bounds[2] = n}

    get top_bound( ) {return this.#bounds[1]}
    set top_bound(n) {this.#bounds[1] = n}

    get bottom_bound( ) {return this.#bounds[3]}
    set bottom_bound(n) {this.#bounds[3] = n}

    get gravity( ) { return this.#gravity }
    set gravity(n) { this.#gravity = n}

    #bounds(object) {
        //left collision
        if(object.left <= this.left_bound) {
            object.left = this.left_bound;
            if(object.velocity.x < 0) object.velocity.x = 0;
            object.collisionLeft(true);
        } else object.collisionLeft(false);
        //collision right
        if(object.right >= this.right_bound) {
            object.right = this.right_bound;
            if(object.velocity.x > 0) object.velocity.x = 0;
            object.collisionRight(true);
        } else object.collisionRight(false);
        //collision bottom 
        if(object.bottom >= this.right_bound) {
            object.bottom = this.right_bound;
            if(object.velocity.y > 0) object.velocity.x = 0;
            object.collisionBottom(true);
        } else object.collisionBottom(false);
        //collision top 
        if(object.top <= this.top_bound) {
            object.top = this.top_bound;
            if(object.velocity.x < 0) object.velocity.x = 0;
            object.collisionTop(true);
        } else object.collisionTop(false);
    }

    #collide(object, objects) {

    }

    #move(dt, object) {
        object.x += object.velocity.x * dt;
        object.velocity.y += this.#gravity * dt;
        object.y += object.velocity.y;
    }

    setBounds(left, top, right, bottom) {
        this.left_bound = left;
        this.right = right;
        this.top_bound = top;
        this.bottom_bound = bottom;
    }

    update( dt, objects ) {
        for(const object of objects) {
            this.#move(dt, object);
            this.#collide(object);
            this.#bounds(object);
        }
    }

}