import { State } from './state.js'
import { debugPrint } from './runtime.js'
import { SceneController } from './sceneController.js'
import { SceneControllerDelegate } from './sceneControllerDelegate.js'
import { MapCell } from './mapCell.js'
import { Utils } from './utils.js'
import { int } from './types.js'
import { GameDataRenderer } from './gameDataRenderer.js'

export class InGameState extends State implements SceneControllerDelegate {
    private presentedPrompt = false
    private lastEnemyActionDate = 0
    private gameDataRenderer: GameDataRenderer = new GameDataRenderer()

    initialize(): void {
        debugPrint("Initialize Flame Steel: Gunlyn: Initialize")

        this.context.sceneController.delegate = this
        this.context.sceneController.switchSkyboxIfNeeded(
            {
                name: "com.demensdeum.blue.field",
                environmentOnly: false
            }
        )
    }

    render(): void {
        this.gameDataRenderer.render({gameData: this.context.gameData, sceneController: this.context.sceneController})
    }

    step(): void {
        // debugPrint("Hello Flame Steel: Gunlyn: Step")
        this.presentCommandPromptIfNeeded()
        this.enemiesStep()
        this.reviveIfNeeded()
        this.render()
    }

    doRevive(): void {
        this.context.gameData.currentHealth = this.context.gameData.maxHealth
    }

    reviveIfNeeded(): void {
        if (this.context.gameData.currentHealth > 0) {
            return
        }

        debugPrint("Gunlyn is broken... Reviving")

        this.doTeleport({putEnemy: false})
        this.doRevive()
    }

    doTeleport(args: {putEnemy: boolean}): void {
        if (args.putEnemy) {
            this.putEnemyRandomly()
        }
        else {
            this.context.gameData.enemyName = "NONE"
        }
        this.context.gameData.currentMapCell = MapCell.generateMapCell({fromDirection: 1})
        debugPrint("Teleported")
    }

    presentCommandPromptIfNeeded() {
        if (this.presentedPrompt == true) {
            return
        }
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

    enemiesStep() {
        if (this.context.gameData.enemyName == "NONE") {
            return
        }
        if (this.lastEnemyActionDate + 1000 + Utils.randomInt(2000) > Date.now()) {
            //debugPrint("Enemy waiting a cycle")
            return
        }
        if (this.context.gameData.enemyCurrentHealth < 1) {
            this.context.gameData.enemyName = "NONE"
            debugPrint("Enemy is dead")
        }
        if (Utils.randomBool()) {
            const enemyDamage = this.context.gameData.enemyMinAttack + Utils.randomInt(this.context.gameData.enemyMaxAttack)

            const armor = this.context.gameData.minArmor + Utils.randomInt(this.context.gameData.maxArmor)

            const damage = enemyDamage <= armor ? 0 : enemyDamage - armor

            this.context.gameData.currentHealth -= damage

            debugPrint(`Enemy attacking: armor (${armor}) - enemyDamage(${enemyDamage}) = damage(${damage})`)

            debugPrint(`Current health: ${this.context.gameData.currentHealth}`)
        }
        this.lastEnemyActionDate = Date.now()
    }

    giveHealthItems() {
        if (Utils.randomBool()) {
            return
        }
        this.context.gameData.healItemsCount +=  Utils.randomInt(3)
    }

    giveWeaponUpgrade() {
        if (Utils.randomBool()) {
            return
        }
        this.context.gameData.minAttack += 1 + Utils.randomInt(3)
        this.context.gameData.maxAttack += 1 + Utils.randomInt(3)
    }

    giveArmorUpgrade() {
        if (Utils.randomBool()) {
            return
        }
        this.context.gameData.minArmor += 1 + Utils.randomInt(3)
        this.context.gameData.maxArmor += 1 + Utils.randomInt(3)
    }

    giveSomethingRandomly() {
        this.giveHealthItems()
        this.giveWeaponUpgrade()
        this.giveArmorUpgrade()
    }

    putEnemyRandomly() {
        this.context.gameData.enemyName = "CLANKER"
        this.context.gameData.enemyMinAttack = 2
        this.context.gameData.enemyMaxAttack = 10 + Utils.randomInt(10)
        this.context.gameData.enemyMaxHealth = 2 + Utils.randomInt(5)
        this.context.gameData.enemyCurrentHealth = this.context.gameData.enemyMaxHealth
    }

    doHeal() {
        if(this.context.gameData.healItemsCount > 0) {
            this.context.gameData.healItemsCount -= 1
            this.context.gameData.currentHealth += 30
            if (this.context.gameData.currentHealth > this.context.gameData.maxHealth) {
                this.context.gameData.currentHealth = this.context.gameData.maxHealth
            }
        }
        else {
            debugPrint("CAN'T HEAL - NEED MORE HEALTH ITEMS")
        }
    }

    doMove(args: {direction: int}) {
        const direction = args.direction
        if (direction < 0) {
            return
        }

        if (direction >= this.context.gameData.currentMapCell.frees.length) {
            return
        }

        const fromDirections = [2,3,0,1]

        if (this.context.gameData.currentMapCell.frees[direction] == true) {
            this.context.gameData.currentMapCell = MapCell.generateMapCell({fromDirection: fromDirections[direction]})
            this.giveSomethingRandomly()
            this.putEnemyRandomly()
        }
        else {
            debugPrint(`CAN'T MOVE DIRECTION ${direction} - THERE IS WALL`)
        }
    }

    handleCommand(command: string) {
        debugPrint(`handleCommand: ${command}`)
        if (command == "ATTACK") {
            this.context.gameData.enemyCurrentHealth -= this.context.gameData.maxAttack
        }
        else if (command == "MOVE LEFT") {
            this.doMove({direction: 0 })
        }
        else if (command == "MOVE UP") {
            this.doMove({direction: 1 })
        }
        else if (command == "MOVE RIGHT") {
            this.doMove({direction: 2 })
        }
        else if (command == "MOVE DOWN") {
            this.doMove({direction: 3 })
        }
        else if (command == "HEAL") {
            this.doHeal()
        }
        else if (command == "TELEPORT") {
            this.doTeleport({putEnemy: Utils.randomBool()})
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
