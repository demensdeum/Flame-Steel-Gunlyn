import { State } from './state.js';
import { debugPrint } from './runtime.js';
export class InGameState extends State {
    constructor() {
        super(...arguments);
        this.presentedPrompt = false;
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
        debugPrint("Hello Flame Steel: Gunlyn: Step");
        if (this.presentedPrompt != true) {
            this.presentedPrompt = true;
            const text = `State: ${JSON.stringify(this.context.gameData)}\nCommands: Move Left, Move Right, Move Up, Move Down, Attack, Heal`;
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
    }
    handleCommand(command) {
        debugPrint(`handleCommand: ${command}`);
    }
    sceneControllerDidPickSceneObjectWithName(controller, name) {
        debugPrint(controller);
        debugPrint(name);
    }
}
