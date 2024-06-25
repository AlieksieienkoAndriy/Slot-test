import { Container, Texture } from "pixi.js";
import { Reel } from "./Reel";
import { CONFIG } from "../config";
import { Game } from "./Game";
import { SpinAnimation } from "./SpinAnimation";


export class Reels {
  reels: Reel[] = [];
  reelContainer: Container;

  constructor() {
    this.reelContainer = new Container();
    this.addReels();
  }

  addReels() {
    for (let i = 0; i < 5; i++) {
      const reel = new Reel(i * CONFIG.game.reel_width, CONFIG.game.symbol_size);
      
      this.reelContainer.addChild(reel.container);
      this.reels.push(reel);
    }
  }

  play() {
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
    console.log('Reels completed');    
  }

  onResize() {
    const margin = (Game.app.screen.height - CONFIG.game.symbol_size * 3) / 2;

    this.reelContainer.y = margin;
    this.reelContainer.x = (Game.app.screen.width - CONFIG.game.reel_width * 5) / 2;
  }

  update() {
    this.reels.forEach(reel => reel.update());
  }
}