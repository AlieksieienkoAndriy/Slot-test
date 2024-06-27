import { Color, Container, FillGradient, Graphics, Text, TextStyle, TextStyleOptions } from "pixi.js";
import { IScene } from "../../utils/types";
import { BonusController } from "../bonus/BonusController";
import { Game } from "../Game";
import { CONFIG } from "../../config";
import { BonusModel } from "../bonus/BonusModel";
import { BonusView } from "../bonus/BonusView";
import { Reels } from "../reels/Reels";

export class GameScene extends Container implements IScene {
  gameContainer!: Container
  reels!: Reels;
  top!: Graphics;
  spinButton!: Graphics;
  bonusController!: BonusController;

  constructor() {
    super();

    this.gameContainer = new Container();
    this.addChild(this.gameContainer);

    this.createReels();
    this.createUI();
    this.createBonusController();
    this.setupInteractivity();

    this.onResize();
  }

  createReels() {
    this.reels = new Reels();
    this.gameContainer.addChild(this.reels.reelContainer);
  }

  createUI() {
    const margin = (Game.app.screen.height - CONFIG.game.symbol_size * 3) / 2;
    this.top = new Graphics()
      .rect(0, 0, Game.app.screen.width, margin)
      .fill({ color: 0x0 });
    const bottom = new Graphics()
      .rect(
        0, CONFIG.game.symbol_size * CONFIG.game.symbolsAmount + margin, 
        Game.app.screen.width, margin)
      .fill({ color: 0x0 });

    const fill = new FillGradient(0, 0, 0, 36 * 1.7);
    const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());
    colors.forEach((number, index) => {
      const ratio = index / colors.length;
      fill.addColorStop(ratio, number);
    });

    const style = new TextStyle(CONFIG.textStyles.game as Partial<TextStyleOptions>);
    style.fill = { fill };

    const playText = new Text('Spin the wheels!', style);
    playText.position.set(
      Math.round((bottom.width - playText.width) / 2),
      bottom.getBounds().top + Math.round((margin - playText.height) / 2)
    );    
    bottom.addChild(playText);

    const headerText = new Text('PIXI MONSTER SLOTS!', style);
    headerText.position.set(
      Math.round((this.top.width - headerText.width) / 2),
      Math.round((margin - headerText.height) / 2)
    );    
    this.top.addChild(headerText);

    this.gameContainer.addChild(this.top);
    this.gameContainer.addChild(bottom);

    this.spinButton = bottom;
  }

  createBonusController() {
    this.bonusController = new BonusController(new BonusModel(), new BonusView(this.reels.reelContainer));
  }

  setupInteractivity() {
    this.spinButton.eventMode = 'static';
    this.spinButton.cursor = 'pointer';
    this.spinButton.addListener('pointerdown', this.startPlay.bind(this));
  }

  startPlay() {
    this.bonusController.bonusCollect();
    this.reels.play();    
  }

  update() {
    this.reels.update();
  }

  onResize() {
    this.reels.onResize();

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const appScreenW = Game.app.screen.width;
    const appScreenH = Game.app.screen.height;

    const scale = Math.max(screenW / appScreenW, screenH / appScreenH);
    const containerW = this.reels.reelContainer.width * scale;
    const containerH = (this.reels.reelContainer.height + this.top.height + this.spinButton.height) * scale;    

    const adaptScale = Math.min(1, screenW / containerW, screenH / containerH);
    this.gameContainer.scale.set(adaptScale);
    this.gameContainer.position.set(
        (appScreenW / 2) - (this.gameContainer.width / 2), 
        (appScreenH / 2) - (this.gameContainer.height / 2)
    );
  }  
};