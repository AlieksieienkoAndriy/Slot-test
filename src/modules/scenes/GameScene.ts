import { Color, Container, FillGradient, Graphics, Text, TextStyle, Texture } from "pixi.js";
import { IScene } from "../../utils/types";
import { Reel } from "../Reel";
import { BonusController } from "../BonusController";
import { SceneManager } from "../SceneManager";
import { SpinAnimation } from "../SpinAnimation";

export class GameScene extends Container implements IScene {
  reels: Reel[] = [];
  reelContainer!: Container;
  spinButton!: Graphics;
  bonusController!: BonusController;


  constructor() {
    super();
    // this.interactive = true;
    this.reelContainer = new Container();
    this.addChild(this.reelContainer);

    this.createReels();
    this.createUI();
    this.createBonusController();
    this.setupInteractivity();
  }


  protected _createBackground() {

  }

  createReels() {
    const REEL_WIDTH = 160;
    const SYMBOL_SIZE = 150;
    const slotTextures = [
      Texture.from('eggHead'),
      Texture.from('flowerTop'),
      Texture.from('helmlok'),
      Texture.from('skully'),
    ];

    for (let i = 0; i < 5; i++) {
      const reel = new Reel(i * REEL_WIDTH, slotTextures, SYMBOL_SIZE);
      console.log(this.reelContainer);
      
      this.reelContainer.addChild(reel.container);
      this.reels.push(reel);
    }

    this.onResize();
  }

  createUI() {
    const margin = (SceneManager.app.screen.height - 150 * 3) / 2;
    const top = new Graphics().rect(0, 0, SceneManager.app.screen.width, margin).fill({ color: 0x0 });
    const bottom = new Graphics().rect(0, 150 * 3 + margin, SceneManager.app.screen.width, margin).fill({ color: 0x0 });

    const fill = new FillGradient(0, 0, 0, 36 * 1.7);
    const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());
    colors.forEach((number, index) => {
      const ratio = index / colors.length;
      fill.addColorStop(ratio, number);
    });

    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: { fill },
      stroke: { color: 0x4a1850, width: 5 },
      dropShadow: {
        color: 0x000000,
        angle: Math.PI / 6,
        blur: 4,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 440,
    });

    const playText = new Text('Spin the wheels!', style);
    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = SceneManager.app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    const headerText = new Text('PIXI MONSTER SLOTS!', style);
    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    this.addChild(top);
    this.addChild(bottom);

    this.spinButton = bottom;
  }

  createBonusController() {
    this.bonusController = new BonusController(this);
  }

  setupInteractivity() {
    this.spinButton.eventMode = 'static';
    this.spinButton.cursor = 'pointer';
    this.spinButton.addListener('pointerdown', this.startPlay.bind(this));
  }

  startPlay() {
    if (this.reels.some(reel => reel.isSpinning)) return;

    this.reels.forEach((reel, i) => {
      const extra = Math.floor(Math.random() * 3);
      const target = reel.position + 10 + i * 5 + extra;
      const time = 2500 + i * 600 + extra * 600;

      SpinAnimation.spin(reel, target, time, () => {
        if (i === this.reels.length - 1) {
          this.reelsComplete();
        }
      });
    });
  }

  reelsComplete() {
    // Handle what happens when reels complete their spin
  }

  update() {
    this.reels.forEach(reel => reel.update());
  }

  onResize() {
    const REEL_WIDTH = 160;
    const SYMBOL_SIZE = 150;
    const margin = (SceneManager.app.screen.height - SYMBOL_SIZE * 3) / 2;

    this.reelContainer.y = margin;
    this.reelContainer.x = (SceneManager.app.screen.width - REEL_WIDTH * 5) / 2;
  }


  // update(): void {

  // }
};