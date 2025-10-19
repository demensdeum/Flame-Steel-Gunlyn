import { State } from './state.js'
import { debugPrint } from './runtime.js'

export class InGameState extends State {
    initialize() {
        debugPrint("Hello Flame Steel: Gunlyn: Initialize")
    }

    step() {
        debugPrint("Hello Flame Steel: Gunlyn: Step")
    }
}
