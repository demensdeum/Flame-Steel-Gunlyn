export class GameVector3 {
    constructor(args) {
        this.x = args.x;
        this.y = args.y;
        this.z = args.z;
    }
    movedVector(toPosition, speed) {
        const directionVector = toPosition.subtract(this);
        const normalizedDirection = directionVector.normalize();
        const step = normalizedDirection.multiply(speed);
        const distanceToTarget = this.distanceTo(toPosition);
        if (distanceToTarget <= step.length()) {
            return toPosition;
        }
        const newPosition = this.add(step);
        return newPosition;
    }
    populate(sourceVector) {
        this.x = sourceVector.x;
        this.y = sourceVector.y;
        this.z = sourceVector.z;
    }
    add(otherVector) {
        return new GameVector3({
            x: this.x + otherVector.x,
            y: this.y + otherVector.y,
            z: this.z + otherVector.z
        });
    }
    subtract(otherVector) {
        return new GameVector3({
            x: this.x - otherVector.x,
            y: this.y - otherVector.y,
            z: this.z - otherVector.z
        });
    }
    multiply(scalar) {
        return new GameVector3({
            x: this.x * scalar,
            y: this.y * scalar,
            z: this.z * scalar
        });
    }
    distanceTo(otherVector) {
        const dx = otherVector.x - this.x;
        const dy = otherVector.y - this.y;
        const dz = otherVector.z - this.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    length() {
        return Math.sqrt(this.x * this.x +
            this.y * this.y +
            this.z * this.z);
    }
    normalize() {
        const length = Math.sqrt(this.x *
            this.x +
            this.y *
                this.y +
            this.z *
                this.z);
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
    clone() {
        return new GameVector3({
            x: this.x,
            y: this.y,
            z: this.z
        });
    }
    printable() {
        return `x: ${this.x} | y: ${this.y} | z: ${this.z}`;
    }
}
