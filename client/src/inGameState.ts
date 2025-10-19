import { State } from './state.js'
import { debugPrint } from './runtime.js'
import { SceneController } from './sceneController.js'
import { SceneControllerDelegate } from './sceneControllerDelegate.js'
import { MapCell } from './mapCell.js'

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
            const text = `State: ${JSON.stringify(this.context.gameData)}\nCommands: MOVE LEFT, MOVE RIGHT, MOVE UP, MOVE DOWN, ATTACK, HEAL, TELEPORT`
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
        if (command == "ATTACK") {
            this.context.gameData.enemyCurrentHealth -= this.context.gameData.maxAttack
        }
        else if (command == "MOVE LEFT") {
            if (this.context.gameData.currentMapCell.frees[0] == true) {
                this.context.gameData.currentMapCell = MapCell.generateMapCell({fromDirection: 2})
            }
            else {
                debugPrint("CAN'T MOVE LEFT!!! THERE IS WALL ON THE LEFT!!!")
            }
        }
        else if (command == "MOVE UP") {
            if (this.context.gameData.currentMapCell.frees[1] == true) {
                this.context.gameData.currentMapCell = MapCell.generateMapCell({fromDirection: 3})
            }
            else {
                debugPrint("CAN'T MOVE UP!!! THERE IS WALL ON THE UP!!!")
            }
        }
        else if (command == "MOVE RIGHT") {
            if (this.context.gameData.currentMapCell.frees[2] == true) {
                this.context.gameData.currentMapCell = MapCell.generateMapCell({fromDirection: 0})
            }
            else {
                debugPrint("CAN'T MOVE RIGHT!!! THERE IS WALL ON THE RIGHT!!!")
            }
        }
        else if (command == "MOVE DOWN") {
            if (this.context.gameData.currentMapCell.frees[3] == true) {
                this.context.gameData.currentMapCell = MapCell.generateMapCell({fromDirection: 1})
            }
            else {
                debugPrint("CAN'T MOVE DOWN!!! THERE IS WALL ON THE DOWN!!!")
            }
        }
        else if (command == "HEAL") {
            if(this.context.gameData.healItemsCount > 0) {
                this.context.gameData.healItemsCount -= 1
                this.context.gameData.currentHealth += 30
                if (this.context.gameData.currentHealth > this.context.gameData.maxHealth) {
                    this.context.gameData.currentHealth = this.context.gameData.maxHealth
                }
            }
            else {
                debugPrint("CAN'T HEAL!!! NEED MORE HEALTH ITEMS!!!")
            }
        }
        else if (command == "TELEPORT") {
            this.context.gameData.currentMapCell = MapCell.generateMapCell({fromDirection: 1})
            debugPrint("Teleported")
        }
    }

    sceneControllerDidPickSceneObjectWithName(
        controller: SceneController,
        name: string
    ): void {
        debugPrint(controller)
        debugPrint(name)
    }
}
