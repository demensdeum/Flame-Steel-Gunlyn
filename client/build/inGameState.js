import { State } from './state.js';
import { debugPrint } from './runtime.js';
import { MapCell } from './mapCell.js';
import { Utils } from './utils.js';
export class InGameState extends State {
    constructor() {
        super(...arguments);
        this.presentedPrompt = false;
        this.lastEnemyActionDate = 0;
    }
    initialize() {
        debugPrint("Hello Flame Steel: Gunlyn: Initialize");
        this.context.sceneController.delegate = this;
        this.context.sceneController.switchSkyboxIfNeeded({
            name: "com.demensdeum.blue.field",
            environmentOnly: false
        });
    }
    step() {
        // debugPrint("Hello Flame Steel: Gunlyn: Step")
        this.presentCommandPromptIfNeeded();
        this.enemiesStep();
    }
    presentCommandPromptIfNeeded() {
        if (this.presentedPrompt == true) {
            return;
        }
        this.presentedPrompt = true;
        const text = `State: ${JSON.stringify(this.context.gameData)}\nCommands: MOVE LEFT, MOVE RIGHT, MOVE UP, MOVE DOWN, ATTACK, HEAL, TELEPORT`;
        debugPrint(text);
        const self = this;
        this.context.sceneController.prompt({
            text: text,
            value: "command",
            okCallback: (command) => {
                self.presentedPrompt = false;
                self.handleCommand(command);
            },
            cancelCallback: () => {
                self.presentedPrompt = false;
                debugPrint("cancel");
            }
        });
    }
    enemiesStep() {
        if (this.context.gameData.enemyName == "NONE") {
            return;
        }
        if (this.lastEnemyActionDate + 1000 + Utils.randomInt(2000) > Date.now()) {
            //debugPrint("Enemy waiting a cycle")
            return;
        }
        if (Utils.randomBool()) {
            const enemyDamage = this.context.gameData.enemyMinAttack + Utils.randomInt(this.context.gameData.enemyMaxAttack);
            const armor = this.context.gameData.minArmor + Utils.randomInt(this.context.gameData.maxArmor);
            const damage = enemyDamage <= armor ? 0 : enemyDamage - armor;
            this.context.gameData.currentHealth -= damage;
            debugPrint(`Enemy attacking: armor (${armor}) - enemyDamage(${enemyDamage}) = damage(${damage})`);
            debugPrint(`Current health: ${this.context.gameData.currentHealth}`);
        }
        this.lastEnemyActionDate = Date.now();
    }
    giveHealthItems() {
        if (Utils.randomBool()) {
            return;
        }
        this.context.gameData.healItemsCount += Utils.randomInt(3);
    }
    giveWeaponUpgrade() {
        if (Utils.randomBool()) {
            return;
        }
        this.context.gameData.minAttack += 1 + Utils.randomInt(3);
        this.context.gameData.maxAttack += 1 + Utils.randomInt(3);
    }
    giveArmorUpgrade() {
        if (Utils.randomBool()) {
            return;
        }
        this.context.gameData.minArmor += 1 + Utils.randomInt(3);
        this.context.gameData.maxArmor += 1 + Utils.randomInt(3);
    }
    giveSomethingRandomly() {
        this.giveHealthItems();
        this.giveWeaponUpgrade();
        this.giveArmorUpgrade();
    }
    putEnemyRandomly() {
        this.context.gameData.enemyName = "CLANKER";
        this.context.gameData.enemyMinAttack = 2;
        this.context.gameData.enemyMaxAttack = 10 + Utils.randomInt(10);
        this.context.gameData.enemyMaxHealth = 2 + Utils.randomInt(5);
        this.context.gameData.enemyCurrentHealth = this.context.gameData.enemyMaxHealth;
    }
    handleCommand(command) {
        debugPrint(`handleCommand: ${command}`);
        if (command == "ATTACK") {
            this.context.gameData.enemyCurrentHealth -= this.context.gameData.maxAttack;
        }
        else if (command == "MOVE LEFT") {
            if (this.context.gameData.currentMapCell.frees[0] == true) {
                this.context.gameData.currentMapCell = MapCell.generateMapCell({ fromDirection: 2 });
                this.giveSomethingRandomly();
                this.putEnemyRandomly();
            }
            else {
                debugPrint("CAN'T MOVE LEFT!!! THERE IS WALL ON THE LEFT!!!");
            }
        }
        else if (command == "MOVE UP") {
            if (this.context.gameData.currentMapCell.frees[1] == true) {
                this.context.gameData.currentMapCell = MapCell.generateMapCell({ fromDirection: 3 });
                this.giveSomethingRandomly();
                this.putEnemyRandomly();
            }
            else {
                debugPrint("CAN'T MOVE UP!!! THERE IS WALL ON THE UP!!!");
            }
        }
        else if (command == "MOVE RIGHT") {
            if (this.context.gameData.currentMapCell.frees[2] == true) {
                this.context.gameData.currentMapCell = MapCell.generateMapCell({ fromDirection: 0 });
                this.giveSomethingRandomly();
                this.putEnemyRandomly();
            }
            else {
                debugPrint("CAN'T MOVE RIGHT!!! THERE IS WALL ON THE RIGHT!!!");
            }
        }
        else if (command == "MOVE DOWN") {
            if (this.context.gameData.currentMapCell.frees[3] == true) {
                this.context.gameData.currentMapCell = MapCell.generateMapCell({ fromDirection: 1 });
                this.giveSomethingRandomly();
                this.putEnemyRandomly();
            }
            else {
                debugPrint("CAN'T MOVE DOWN!!! THERE IS WALL ON THE DOWN!!!");
            }
        }
        else if (command == "HEAL") {
            if (this.context.gameData.healItemsCount > 0) {
                this.context.gameData.healItemsCount -= 1;
                this.context.gameData.currentHealth += 30;
                if (this.context.gameData.currentHealth > this.context.gameData.maxHealth) {
                    this.context.gameData.currentHealth = this.context.gameData.maxHealth;
                }
            }
            else {
                debugPrint("CAN'T HEAL!!! NEED MORE HEALTH ITEMS!!!");
            }
        }
        else if (command == "TELEPORT") {
            this.context.gameData.currentMapCell = MapCell.generateMapCell({ fromDirection: 1 });
            debugPrint("Teleported");
        }
    }
    sceneControllerDidPickSceneObjectWithName(controller, name) {
        debugPrint(controller);
        debugPrint(name);
    }
}
