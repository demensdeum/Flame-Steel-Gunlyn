import { Utils } from './utils.js';
export class MapCell {
    constructor() {
        // Left, Top, Right, Down
        this.frees = [true, true, true, true];
    }
    static generateMapCell(args) {
        let outputMapCell = new MapCell();
        outputMapCell.frees[0] = Utils.randomBool();
        outputMapCell.frees[1] = Utils.randomBool();
        outputMapCell.frees[2] = Utils.randomBool();
        outputMapCell.frees[3] = Utils.randomBool();
        outputMapCell.frees[args.fromDirection] = true;
        return outputMapCell;
    }
}
