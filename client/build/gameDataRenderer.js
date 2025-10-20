import { GameVector3 } from "./gameVector3.js";
import { debugPrint } from "./runtime.js";
export class GameDataRenderer {
    constructor() {
        this.gunlynAdded = false;
    }
    render(args) {
        const sceneController = args.sceneController;
        const gameData = args.gameData;
        debugPrint(`Render GameData: ${JSON.stringify(gameData)}`);
        this.renderScene({
            sceneController: sceneController,
            gameData: gameData
        });
        this.renderUI({
            sceneController: sceneController,
            gameData: gameData
        });
    }
    renderScene(args) {
        const sceneController = args.sceneController;
        if (!this.gunlynAdded) {
            this.gunlynAdded = true;
            sceneController.addModelAt({
                name: "Gunlyn",
                modelName: "com.demensdeum.gunlyn",
                position: new GameVector3({ x: -2, y: 0, z: -4 })
            });
        }
    }
    renderUI(args) {
        const sceneController = args.sceneController;
        debugPrint(sceneController);
    }
}
