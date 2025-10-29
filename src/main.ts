import { GameApplication } from "./core/application/GameApplication.ts"
import { Toolkit } from "./core/application/Toolkit.ts"
import "./styles.css"

new Toolkit().mount(document.querySelector("#root")!)
new GameApplication().mount(document.querySelector("#root")!)
