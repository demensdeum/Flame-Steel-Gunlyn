import * as THREE from "three"
import { GameVector3 } from "./gameVector3.js"

export class GameCssObject3D extends THREE.Object3D {
    isTop: boolean = true
    stickToCamera: boolean = true
    originalRotation: GameVector3 = new GameVector3({x: 0, y: 0, z: 0})
    originalPosition: GameVector3 = new GameVector3({x: 0, y: 0, z: 0})
}
