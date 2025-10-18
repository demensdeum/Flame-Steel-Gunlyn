import { float } from "./types.js"

export class GameVector3 {
    public x: float
    public y: float
    public z: float

    constructor(args: {
        x: float,
        y: float,
        z: float,
    })
    {
        this.x = args.x
        this.y = args.y
        this.z = args.z
    }

    public movedVector(
        toPosition: GameVector3,
        speed: float
    ) {
        const directionVector = toPosition.subtract(this)
        const normalizedDirection = directionVector.normalize()
        const step = normalizedDirection.multiply(speed)
        const distanceToTarget = this.distanceTo(toPosition)
        if (distanceToTarget <= step.length()) {
            return toPosition
        }        
        const newPosition = this.add(step)
        return newPosition        
    }

    public populate(
        sourceVector: GameVector3
    )
    {
        this.x = sourceVector.x
        this.y = sourceVector.y
        this.z = sourceVector.z
    }

    public add(otherVector: GameVector3) {
        return new GameVector3({
            x: this.x + otherVector.x,
            y: this.y + otherVector.y,
            z: this.z + otherVector.z
        }
        )
    }

    public subtract(otherVector: GameVector3) {
        return new GameVector3({
            x: this.x - otherVector.x,
            y: this.y - otherVector.y,
            z: this.z - otherVector.z
        })
    } 
    
    public multiply(scalar: float) {
        return new GameVector3({
            x: this.x * scalar,
            y: this.y * scalar,
            z: this.z * scalar
        })
    }

    public distanceTo(otherVector: GameVector3) {
        const dx = otherVector.x - this.x;
        const dy = otherVector.y - this.y;
        const dz = otherVector.z - this.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }   

    public length() {
        return Math.sqrt(
            this.x * this.x + 
            this.y * this.y + 
            this.z * this.z
        )
    }    

    public normalize() {
        const length = Math.sqrt(
            this.x * 
            this.x + 
            this.y * 
            this.y + 
            this.z * 
            this.z
        )
        if (length === 0) {
            return new GameVector3({
                x: 0,
                y: 0,
                z: 0
            });
        }
        return new GameVector3({
            x: this.x / length,
            y: this.y / length,
            z: this.z / length
        });
    }    

    public clone(): GameVector3 {
        return new GameVector3({
            x: this.x,
            y: this.y,
            z: this.z
        })
    }

    public printable(): string {
        return `x: ${this.x} | y: ${this.y} | z: ${this.z}`
    }
}
