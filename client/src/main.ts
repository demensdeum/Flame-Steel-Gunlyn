import { CompanyLogoState } from "./companyLogoState.js"
import { InGameState } from "./inGameState.js"
import { Context } from "./context.js"
import { debugPrint } from "./runtime.js"

function main(options: {[key: string]: string} = {}) {
  const debugEnabled = options["debugEnabled"] === "true"

  const context = new Context(
      debugEnabled
  )
  
  const companyLogoState = new CompanyLogoState(
    {
      name: "CompanyLogo",
      context: context
    }
  )
  debugPrint(companyLogoState)

  const inGameState = new InGameState(
    {
      name: "InGameState",
      context: context
    }
  )

  const initialState = inGameState

  context.start(initialState)

  function step() {
      if (!context.isRunning) {
          return
      }
      context.step()
      requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

main()
