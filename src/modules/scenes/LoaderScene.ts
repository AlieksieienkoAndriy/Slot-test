import * as PIXI from "pixi.js";
import { SceneManager } from "../SceneManager";
import { manifest } from "../../assets";
import { GameScene } from "./GameScene";
import { CONFIG } from "../../config";
import { IScene } from "../../utils/types";

export class LoaderScene extends PIXI.Container implements IScene {
  private loaderBar!: PIXI.Container;
  private loaderBarBoder!: PIXI.Graphics;
  private loaderBarFill!: PIXI.Graphics;
  private progress!: PIXI.Text;

  constructor() {
    super();

    this.createLoaderBar();
    this.createText();

    this.initializeLoader().then(() => {
      this.gameLoaded();
    })
  }

  private createLoaderBar() {
    const loaderBarWidth = SceneManager.width * 0.75;

    this.loaderBarFill = new PIXI.Graphics()
      .rect(0, 0, loaderBarWidth, 30)
      .fill({ color: 0x008800 })
    
    this.loaderBarFill.scale.x = 0;

    this.loaderBarBoder = new PIXI.Graphics()    
      .rect(0, 0, loaderBarWidth, 30)
      .stroke({ color: 0xffffff, width: 2 });
      // .fill({ color: 0xffffff, alpha: 0 })

    this.loaderBar = new PIXI.Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    this.loaderBar.position.x = (SceneManager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (SceneManager.height - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);
  }

  private createText() {
    const text = new PIXI.Text('Loading...', CONFIG.textStyles.game);
    text.anchor.set(0.5);
    text.position.set(SceneManager.width / 2, this.loaderBar.y - 50);
    this.addChild(text);

    this.progress = new PIXI.Text('0%', CONFIG.textStyles.game);
    this.progress.anchor.set(0.5);
    this.progress.position.set(
      this.loaderBar.x + this.loaderBar.width / 2, 
      this.loaderBar.y + this.loaderBar.height / 2
    );
    this.addChild(this.progress);
  }

  public async initializeLoader(): Promise<void> {
    await PIXI.Assets.init(manifest);

    const bundleIds = (manifest.manifest as any).bundles.map((bundle: { name: any }) => bundle.name);
    await PIXI.Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
  }

  private downloadProgress(progressRatio: number): void {
    this.loaderBarFill.scale.x = progressRatio;
    this.progress.text = (progressRatio * 100).toFixed(0) + '%';
  }

  private gameLoaded(): void {
    SceneManager.changeScene(new GameScene());
    console.log('loaded...');
    
  }

  public update(): void {    
  }  
}