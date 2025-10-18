import { Context } from "./context.js"
import { AuthorizeController } from "./authorizeController.js"
import { AuthorizeControllerDelegate } from "./authorizeControllerDelegte.js"
import { ServerInfoController } from "./serverInfoController.js"
import { ServerInfoControllerDelegate } from "./serverInfoControllerDelegate.js"
import { State } from "./state.js"
import { InGameState } from "./inGameState.js"
import { ServerInfoEntry } from "./serverInfoEntry.js"
import { Constants } from "./constants.js"
import { debugPrint, raiseCriticalError } from "./runtime.js"
import { DataFetchType } from "./dataFetchType.js"
import { GameVector3 } from "./gameVector3.js"
import { GameUtils } from "./gameUtils.js"

declare function _t(key: string): string
declare function _alert(args: {text: string, okCallback: ()=>void}): void

export class InitializationScreenState implements State,
                                         ServerInfoControllerDelegate,
                                         AuthorizeControllerDelegate {
    public name: string
    context: Context

    private readonly authorizeController = new AuthorizeController(this)
    private readonly serverInfoController = new ServerInfoController(this)
    private readonly dataFetchType: DataFetchType = DataFetchType.DEFAULT

    private trackCheckStarted = false
    private outputHeroUUID = "NONE"
    private confirmationWindowShowed = false

    constructor(
        name: string,
        context: Context
    )
    {
        debugPrint(this.authorizeController)
        debugPrint(InGameState)
        this.name = name
        this.context = context

        switch (this.dataFetchType) {
            case DataFetchType.DEFAULT:
                break
            case DataFetchType.MOCK:
                break
            case DataFetchType.MOCK_GEOLOCATION_ONLY:
                break
        }
    }

    initialize(): void {
        this.context.sceneController.switchSkyboxIfNeeded(
            {
                name: "com.demensdeum.white.box",
                environmentOnly: true
            }
        )

        this.context.sceneController.addModelAt({
            name: "kokeshi",
            modelName: "com.demensdeum.kokeshi",
            position: new GameVector3({x: 0, y: -1, z: -4}),
            rotation: new GameVector3({x: 0, y: 0, z: 0}),
        })

        this.context.sceneController.objectPlayAnimation(
            "kokeshi",
            "Плоскость.004|Scene"
        )
    }

    private showGeolocationPreloader() {
        const geolocationLoadingDiv = document.createElement('div')
        geolocationLoadingDiv.textContent = _t("GET_GEOLOCATION")
        geolocationLoadingDiv.style.color = "white"
        geolocationLoadingDiv.style.backgroundColor = 'rgba(128, 128, 128, 0.5)'  
        geolocationLoadingDiv.style.fontSize = "30px"
        geolocationLoadingDiv.style.padding = "22px"    

        this.context.sceneController.addCssPlaneObject(
            {
                name: "geolocationLoadingDiv",
                div: geolocationLoadingDiv,
                planeSize: {
                    width: 2,
                    height: 2
                },
                position: new GameVector3({
                        x: 0,
                        y: 0,
                        z: -5
                }),
                rotation: new GameVector3({x: 0, y: 0, z: 0}),
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
            },
        )              
    }

    step(): void {
        if (
            window.localStorage.getItem("gameRulesAccepted") != "YES" &&
            this.confirmationWindowShowed != true
        ) {
            this.confirmationWindowShowed = true
            this.context.sceneController.confirm({
                text: _t("WELCOME"),
                okCallback: () => {
                    window.localStorage.setItem("gameRulesAccepted", "YES")
                },
                cancelCallback: () => {
                    GameUtils.gotoWiki({locale: this.context.translator.locale})
                }
            })
        }
        else if (
            window.localStorage.getItem("gameRulesAccepted") == "YES" &&
            this.trackCheckStarted != true
        ) {
            this.trackCheckStarted = true
            this.serverInfoController.fetch()
            return
        }
    }

    serverInfoControllerDidFetchInfo(
        _: ServerInfoController,
        entries: ServerInfoEntry[]
    ) {
        const minimalClientVersion = entries.filter((a) => { return a.key == "minimal_client_version" })[0]?.value

        if (!minimalClientVersion) {
            _alert(
                {
                    text: "Server info get error, minimal_client_version is null",
                    okCallback: () => { GameUtils.gotoWiki({locale: this.context.translator.locale}) }
                }
            )
            return
        }
        if (parseInt(minimalClientVersion) > Constants.currentClientVersion) {
            _alert({
                    text: `${_t("CLIENT_IS_TOO_OLD")}: ${Constants.currentClientVersion} / ${minimalClientVersion}`,
                    okCallback: () => { GameUtils.gotoWiki({locale: this.context.translator.locale})}
            })
            return
        }

        this.showGeolocationPreloader()
    }

    authorizeControllerDidAuthorize(
        _: AuthorizeController,
        heroUUID: string
    ) {
        if (heroUUID) {
            this.outputHeroUUID = heroUUID
            debugPrint(this.outputHeroUUID)
        } else {
            raiseCriticalError("No output heroUUID!")
        }
    }

    authorizeControllerDidReceiveError(
        _: AuthorizeController,
        message: string
    ) {
        _alert({
            text:`AuthorizeController error: ${message}`,
            okCallback: ()=>{GameUtils.gotoWiki({locale:this.context.translator.locale})}
        })        
    }
}
