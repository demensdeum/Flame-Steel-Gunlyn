import { State } from './state.js'
import { debugPrint } from './runtime.js'
import { SceneController } from './sceneController.js'
import { SceneControllerDelegate } from './sceneControllerDelegate.js'

export class InGameState extends State implements SceneControllerDelegate {
    private presentedPrompt = false

    initialize(): void {
        debugPrint("Hello Flame Steel: Gunlyn: Initialize")

        this.context.sceneController.delegate = this
        this.context.sceneController.switchSkyboxIfNeeded(
            {
                name: "com.demensdeum.blue.field",
                environmentOnly: false
            }
        )
    }

    step(): void {
        debugPrint("Hello Flame Steel: Gunlyn: Step")

        if (this.presentedPrompt != true) {
            this.presentedPrompt = true
            const text = `State: ${JSON.stringify(this.context.gameData)}\nCommands: Move Left, Move Right, Move Up, Move Down, Attack, Heal`
            debugPrint(text)
            const self = this
            this.context.sceneController.prompt({
                text: text,
                value: "command",
                okCallback: (command)=>{
                    self.presentedPrompt = false
                    self.handleCommand(command)
                },
                cancelCallback: ()=>{
                    self.presentedPrompt = false
                    debugPrint("cancel")
                }
            })
        }
    }

    handleCommand(command: string) {
        debugPrint(`handleCommand: ${command}`)
    }

    sceneControllerDidPickSceneObjectWithName(
        controller: SceneController,
        name: string
    ): void {
        debugPrint(controller)
        debugPrint(name)
    }
}
