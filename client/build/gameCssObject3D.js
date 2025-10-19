import * as THREE from "three";
import { GameVector3 } from "./gameVector3.js";
export class GameCssObject3D extends THREE.Object3D {
    constructor() {
        super(...arguments);
        this.isTop = true;
        this.stickToCamera = true;
        this.originalRotation = new GameVector3({ x: 0, y: 0, z: 0 });
        this.originalPosition = new GameVector3({ x: 0, y: 0, z: 0 });
    }
}
