import { State } from "./state.js";
import { Utils } from "./utils.js";
import { debugPrint } from "./runtime.js";
import { MainMenuState } from "./mainMenuState.js";
import { GameVector3 } from "./gameVector3.js";
export class LocaleSelectorState extends State {
    constructor() {
        super(...arguments);
        this.switchMillisecondsTimeout = 30000;
        this.startDate = new Date();
    }
    initialize() {
        // const savedLocalization = window.localStorage.getItem("savedLocalization")
        // if (savedLocalization != null) {
        //     this.context.translator.locale = savedLocalization
        //     this.saveLocaleAndGoToInGameState()
        //     return
        // }
        this.context.sceneController.delegate = this;
        this.context.sceneController.switchSkyboxIfNeeded({
            name: "com.demensdeum.blue.field",
            environmentOnly: false
        });
        this.context.sceneController.addModelAt({
            name: "englishman",
            modelName: "com.demensdeum.croc1",
            position: new GameVector3({ x: 0.32, y: -0.35, z: -2.23 }),
            rotation: new GameVector3({ x: 0, y: Utils.degreesToRadians(120), z: 0 }),
        });
        this.context.sceneController.addModelAt({
            name: "russian",
            modelName: "com.demensdeum.cat1",
            position: new GameVector3({ x: -0.22, y: -0.35, z: -2.23 }),
            rotation: new GameVector3({ x: 0, y: Utils.degreesToRadians(200), z: 0 })
        });
        const russianButtonDiv = document.createElement('div');
        russianButtonDiv.textContent = "Русский";
        russianButtonDiv.style.color = "white";
        russianButtonDiv.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
        russianButtonDiv.style.fontSize = "30px";
        russianButtonDiv.style.padding = "22px";
        russianButtonDiv.onclick = () => { this.didSelectRussian(); };
        this.context.sceneController.addCssPlaneObject({
            name: "russianButton",
            div: russianButtonDiv,
            planeSize: {
                width: 2,
                height: 2
            },
            position: new GameVector3({
                x: -0.8,
                y: -2.35,
                z: -5
            }),
            rotation: new GameVector3({ x: 0, y: 0, z: 0 }),
            scale: new GameVector3({ x: 0.01, y: 0.01, z: 0.01 }),
            shadows: {
                receiveShadow: false,
                castShadow: false
            },
            display: {
                isTop: true,
                stickToCamera: true
            }
        });
        const englishButtonDiv = document.createElement('div');
        englishButtonDiv.textContent = "English";
        englishButtonDiv.style.color = "white";
        englishButtonDiv.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
        englishButtonDiv.style.fontSize = "30px";
        englishButtonDiv.style.padding = "22px";
        englishButtonDiv.onclick = () => { this.didSelectEnglish(); };
        this.context.sceneController.addCssPlaneObject({
            name: "englishButton",
            div: englishButtonDiv,
            planeSize: {
                width: 2,
                height: 2
            },
            position: new GameVector3({
                x: 1.2,
                y: -2.35,
                z: -5
            }),
            rotation: new GameVector3({
                x: 0,
                y: 0,
                z: 0,
            }),
            scale: new GameVector3({
                x: 0.01,
                y: 0.01,
                z: 0.01
            }),
            shadows: {
                receiveShadow: false,
                castShadow: false
            },
            display: {
                isTop: true,
                stickToCamera: true
            }
        });
    }
    didSelectRussian() {
        this.context.translator.locale = "ru";
        this.saveLocaleAndGoToInGameState();
    }
    didSelectEnglish() {
        this.context.translator.locale = "en";
        this.saveLocaleAndGoToInGameState();
    }
    step() {
        const diffMilliseconds = Math.abs((new Date().getTime() - this.startDate.getTime()));
        if (diffMilliseconds > this.switchMillisecondsTimeout) {
            this.context.translator.locale = "ru";
            this.saveLocaleAndGoToInGameState();
        }
    }
    saveLocaleAndGoToInGameState() {
        window.localStorage.setItem("savedLocalization", this.context.translator.locale);
        this.context.sceneController.removeAllSceneObjectsExceptCamera();
        const mainMenuState = new MainMenuState("MainMenuState", this.context);
        // @ts-ignore
        document.global_gameplay_mainMenuState = mainMenuState;
        this.context.transitionTo(mainMenuState);
    }
    sceneControllerDidPickSceneObjectWithName(_, name) {
        if (name == "russian") {
            this.context.translator.locale = "ru";
            this.saveLocaleAndGoToInGameState();
        }
        else if (name == "englishman") {
            this.context.translator.locale = "en";
            this.saveLocaleAndGoToInGameState();
        }
        else {
            debugPrint(`Unknown object picked: ${name}`);
        }
    }
}
