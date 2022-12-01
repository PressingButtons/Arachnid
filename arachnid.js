// Objects
import { default as State } from './objects/state.js';
import { default as SpriteGroup } from './objects/sprite_group.js';
import { default as Texture } from './objects/texture.js';
import { default as DataBuffer } from './objects/data_buffer.js';
import Cache from './arachnid_system/cache.js';
import { default as Image } from './objects/image.js'; 
import GameObject from './objects/game-object.js';
import Animator from './animation/animator.js';
import Gamepad from './input/gamepad.js';
import Keyboard from './input/keyboard.js';
import MouseObject from './input/mouse.js';
import RigidBody from './objects/rigidbody.js';
import OrhtoCamera from './world/ortho-camera.js';

//libraries 
import { default as GraphicsGL } from './graphics/graphics-gl.js'

window.Arachnid = {
    State: State,
    SpriteGroup: SpriteGroup,
    Texture: Texture,
    DataBuffer: DataBuffer,
    GraphicsGL: GraphicsGL,
    Cache: Cache,
    Image: Image,
    GameObject: GameObject,
    Animator: Animator,
    Gamepad: Gamepad,
    Keyboard: Keyboard,
    Mouse: MouseObject,
    RigidBody: RigidBody,
    OrthoCamera: OrhtoCamera
}