import { GameApplication } from "./core/application/GameApplication.ts";
import "./styles.css";

new GameApplication().mount(document.querySelector("#root")!);
