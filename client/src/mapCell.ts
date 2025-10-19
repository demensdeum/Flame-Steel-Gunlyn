import { int } from './types.js'
import { Utils } from './utils.js'

export class MapCell {
    // Left, Top, Right, Down
    public frees: boolean[] = [true, true, true, true]

    static generateMapCell(args: {
        fromDirection: int
    }): MapCell {
        let outputMapCell = new MapCell()

        outputMapCell.frees[0] = Utils.randomBool()
        outputMapCell.frees[1] = Utils.randomBool()
        outputMapCell.frees[2] = Utils.randomBool()
        outputMapCell.frees[3] = Utils.randomBool()

        outputMapCell.frees[args.fromDirection] = true

        return outputMapCell
    }
}
