import { Assets, Container, Graphics, Text } from "pixi.js";
import { Game } from "../Game";
import { manifest } from "../../assets";
import { GameScene } from "./GameScene";
import { CONFIG } from "../../config";
import { IScene } from "../../utils/types";

export class LoaderScene extends Container implements IScene {
  private loaderContainer!: Container;
  private loaderBar!: Container;
  private loaderBarFill!: Graphics;
  private progress!: Text;

  constructor() {
    super();

    this.loaderContainer = new Container();
    this.addChild(this.loaderContainer);

    this.createLoaderBar();
    this.createText();

    this.initializeLoader().then(() => {
      this.gameLoaded();
    })
  }

  private createLoaderBar() {
    const loaderBarWidth = Game.app.screen.width * 0.75;

    this.loaderBarFill = new Graphics()
      .rect(0, 0, loaderBarWidth, 30)
      .fill({ color: 0x008800 })

    this.loaderBarFill.scale.x = 0;

    const loaderBarBorder = new Graphics()
      .rect(0, 0, loaderBarWidth, 30)
      .stroke({ color: 0xffffff, width: 2 });

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(loaderBarBorder);
    this.loaderContainer.addChild(this.loaderBar);
  }

  private createText() {
    const text = new Text('Loading...', CONFIG.textStyles.loader);
    text.anchor.set(0.5);
    text.position.set(
      this.loaderBar.x + this.loaderBar.width / 2,
      this.loaderBar.y - 50
    );
    this.loaderContainer.addChild(text);

    this.progress = new Text('0%', CONFIG.textStyles.loader);
    this.progress.anchor.set(0.5);
    this.progress.position.set(
      this.loaderBar.x + this.loaderBar.width / 2,
      this.loaderBar.y + this.loaderBar.height / 2
    );
    this.loaderContainer.addChild(this.progress);
  }

  public async initializeLoader(): Promise<void> {
    await Assets.init(manifest);

    const bundleIds = (manifest.manifest as any).bundles.map((bundle: { name: any }) => bundle.name);
    await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
  }

  private downloadProgress(progressRatio: number): void {
    this.loaderBarFill.scale.x = progressRatio;
    this.progress.text = (progressRatio * 100).toFixed(0) + '%';
  }

  private gameLoaded(): void {
    Game.changeScene(new GameScene());
  }

  public update(): void {
  }

  public onResize() {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const appScreenW = Game.app.screen.width;
    const appScreenH = Game.app.screen.height;

    const scale = Math.max(screenW / appScreenW, screenH / appScreenH);

    const containerW = this.loaderBar.width * scale;
    const adaptScale = Math.min(1, screenW / containerW);

    this.loaderContainer.scale.set(adaptScale);
    this.loaderContainer.position.set(
      (appScreenW / 2) - (this.loaderContainer.width / 2),
      (appScreenH / 2) - (this.loaderContainer.height / 2)
    );
  }
}