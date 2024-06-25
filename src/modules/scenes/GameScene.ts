import { Color, Container, FillGradient, Graphics, Text, TextStyle, TextStyleOptions, Texture } from "pixi.js";
import { IScene } from "../../utils/types";
import { BonusController } from "../BonusController";
import { Game } from "../Game";
import { CONFIG } from "../../config";
import { Reels } from "../Reels";

export class GameScene extends Container implements IScene {
  reels!: Reels;
  spinButton!: Graphics;
  bonusController!: BonusController;

  constructor() {
    super();

    this.createReels();
    this.createUI();
    this.createBonusController();
    this.setupInteractivity();

    this.onResize();
  }

  createReels() {
    this.reels = new Reels();
    this.addChild(this.reels.reelContainer);
  }

  createUI() {
    const margin = (Game.app.screen.height - CONFIG.game.symbol_size * 3) / 2;
    const top = new Graphics().rect(0, 0, Game.app.screen.width, margin).fill({ color: 0x0 });
    const bottom = new Graphics().rect(0, 150 * 3 + margin, Game.app.screen.width, margin).fill({ color: 0x0 });

    const fill = new FillGradient(0, 0, 0, 36 * 1.7);
    const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());
    colors.forEach((number, index) => {
      const ratio = index / colors.length;
      fill.addColorStop(ratio, number);
    });

    const style = new TextStyle(CONFIG.textStyles.game as Partial<TextStyleOptions>);
    style.fill = { fill };

    const playText = new Text('Spin the wheels!', style);
    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = Game.app.screen.height - margin + Math.round((margin - playText.height) / 2);
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
    this.reels.play();
  }

  update() {
    this.reels.update();
  }

  onResize() {
    this.reels.onResize();
  }  
};