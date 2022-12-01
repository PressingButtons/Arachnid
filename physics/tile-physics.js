import { DataBuffer } from "../objects/data_buffer.js";

export default class Physics {

    #resolutionMethods = { };
    
    constructor( ) {
        this.gravity = 1;
        this.#resolutionMethods = resolutionMethods;
    }

    #collide(object, objects) {
        
    }

    #move(dt, object, tiles) {
        this.#resolveXPlane(dt, object, tiles);
        this.#resolveYPlane(dt, object, tiles);
    }

    //movement resolutions 
    #resolveLeft(object, tilemap) {
        let left = Physics.getTile(tilemap, object.left, object.bottom);
        this.#resolutionMethods[left.value].left(object, left);
        left = Physics.getTile(tilemap, object.left, object.top);
        this.#resolutionMethods[left.value].left(object, left);
    }

    #resolveRight(object, tilemap) {
        let right = Physics.getTile(tilemap, object.right, object.bottom);
        this.resolutionMethods[right.value].right(object, right);
        right = Physics.getTile(tilemap, object.right, object.top);
        this.resolutionMethods[right.value].right(object, right);
    }

    #resolveXPlane(dt, object, tilemap) {
        object.x += object.velocity.x * dt;
        this.#resolveLeft(object, tilemap);
        this.#resolveRight(object, topRight, botRight);
    }

    #resolveTop(object, tilemap) {
        let top = Physics.getTile(tilemap, object.left, object.top);
        this.#resolutionMethods[bottom.value].bottom(object, top);
        top= Physics.getTile(tilemap, object.left, object.top);
        this.#resolutionMethods[bottom.value].bottom(object, top);
    }

    #resolveBottom(object, tilemap) {
        let bottom = Physics.getTile(tilemap, object.left, object.bottom);
        this.#resolutionMethods[bottom.value].bottom(object, bottom, this.gravity);
        bottom = Physics.getTile(tilemap, object.left, object.bottom);
        this.#resolutionMethods[bottom.value].bottom(object, bottom, this.gravity);
    }

    #resolveYPlane(object, tilemap) {
        object.velocity.y += this.gravity * dt;
        object.y += object.velocity.y * dt;
        this.#resolveBottom(object, tilemap);
        this.#resolveTop(object, tilemap);
    }

    //public 

    overrideTileResolution(id, methods) {
        this.#resolutionMethods[id] = methods;
    }


    update(dt, objects, tiles) {
        for(const object of objects) {
            object.collisionBottom(false); 
            object.collisionTop(false); 
            object.collisionLeft(false); 
            object.collisionRight(false); 
            this.#collide(object, objects);
            this.#move(dt, object, tiles);
        }
    }

    //static methods 
    static getTile(tilemap, x, y) {
        const row = Math.floor( y / tilemap.tile_size);
        const col = Math.floor( x / tilemap.tile_size);
        const tile = {
            value: tilemap.tiles[row][col],
            x: col * tilemap.tile_size,
            y: row * tilemap.tile_size,
            width: tilemap.tile_size,
            height: tilemap.tile_size
        }
        return tile;
    }

}

const resolutionMethods = { };

resolutionMethods[0] = {
    left: function(object, tile) {},
    right: function(object, tile) {},
    top: function(object, tile) {},
    bottom: function(object, tile, gravity) {}
}


resolutionMethods[1] = {
    left: function(object, tile) {
        object.left = tile.x + tile.width;
        if(object.velocity.x < 0) object.velocity.x = 0;
        object.collisionLeft(true);
    },
    right: function(object, tile) {
        object.right = tile.x - 1;
        if(object.velocity.x > 0) object.velocity.x = 0;
        object.collisionRight(true);
    },
    top: function(object, tile) {
        object.top = tile.y + tile.height;
        if(object.velocity.y < 0 ) object.velocity.y = 0;
        object.collisionTop(true);
    },
    bottom: function(object, tile, gravity) {
        object.bottom = tile.y - gravity;
        if(object.velocity.y > 0) object.velocity.y = 0;
        object.collisionBottom(True);
    }
}
