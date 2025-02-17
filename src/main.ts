import GameEngine from "./GameEngine.ts";
import "./styles.css";

const appNode = document.querySelector<HTMLDivElement>("#app")!;

const engine = new GameEngine();

appNode.append(engine.init());
