import { Application } from "pixi.js";
import { IScene } from "../utils/types";
import { LoaderScene } from "./scenes/LoaderScene";
import { CONFIG } from "../config";

export class Game {
  private constructor() { /*this class is purely static*/ }

  static app: Application;
  static currentScene: IScene; 

  static async initialize() {
    Game.app = new Application();
    await Game.app.init({
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x1099bb,
      width: CONFIG.canvas.width,
      height: CONFIG.canvas.height
    });
    (document.getElementById('view') as HTMLElement).appendChild(Game.app.canvas);

    (globalThis as any).__PIXI_APP__ = Game.app;

    Game.app.ticker.add(Game.update)

    window.addEventListener('resize', Game.resize);
    Game.resize();

    Game.changeScene(new LoaderScene());
  }

  public static changeScene(newScene: IScene): void {
    if (Game.currentScene) {
      Game.app.stage.removeChild(Game.currentScene);
      Game.currentScene.destroy();
    }

    Game.currentScene = newScene;
    Game.app.stage.addChild(Game.currentScene);
  }

  public static resize(): void {
    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    const scale = Math.min(screenWidth / Game.app.screen.width, screenHeight / Game.app.screen.height); // canvas adapts to screen
    // const scale = Math.max(screenWidth / Game.width, screenHeight / Game.height); // canvas adapts to screen

    const enlargedWidth = Math.floor(scale * Game.app.screen.width);
    const enlargedHeight = Math.floor(scale * Game.app.screen.height);

    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;

    const canvasStyle = Game.app.canvas.style;

    canvasStyle!.width = `${enlargedWidth}px`;
    canvasStyle!.height = `${enlargedHeight}px`;
    (canvasStyle as any)!.marginLeft = (canvasStyle as any)!.marginRight = `${horizontalMargin}px`;
    (canvasStyle as any)!.marginTop = (canvasStyle as any)!.marginBottom = `${verticalMargin}px`;
  }

  private static update(): void {
    if (Game.currentScene) {
      Game.currentScene.update();
    }
  }
}

