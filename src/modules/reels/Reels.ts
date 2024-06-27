import { Container, Graphics } from "pixi.js";
import { Reel } from "./Reel";
import { CONFIG } from "../../config";
import { SpinAnimation } from "../SpinAnimation";
import { events } from "../../utils/events";
import { Game } from "../Game";

export class Reels {
  reels: Reel[] = [];
  reelContainer: Container;

  constructor() {
    this.reelContainer = new Container();
    this.addReels();
    this.createMask();
  }

  addReels() {
    for (let i = 0; i < CONFIG.game.reelsAmount; i++) {
      const reel = new Reel(i * CONFIG.game.reel_width, CONFIG.game.symbol_size);

      this.reelContainer.addChild(reel.container);
      this.reels.push(reel);
    }
  }

  createMask() {
    const mask = new Graphics()
      .rect(0, 0, this.reelContainer.width + 15, this.reelContainer.height - CONFIG.game.symbol_size)
      .fill({ color: 0xFFFFFF })

    this.reelContainer.mask = mask;
    this.reelContainer.addChild(mask);
  }

  play() {
    if (this.reels.some(reel => reel.isSpinning)) return;

    this.reels.forEach((reel, i) => {
      const extra = Math.floor(Math.random() * 3);
      const target = reel.position + 10 + i * 5 + extra;
      const time = CONFIG.game.spinDuration + (i + extra) * CONFIG.game.extraDuration;

      SpinAnimation.spin(reel, target, time, () => {
        if (i === this.reels.length - 1) {
          this.reelsComplete();
        }
      });
    });
  }

  reelsComplete() {
    window.dispatchEvent(events.checkBonusEvent);
  }

  onResize() {
    const margin = (Game.app.screen.height - CONFIG.game.symbol_size * 3) / 2;

    this.reelContainer.position.set(
      this.reelContainer.x = (Game.app.screen.width - CONFIG.game.reel_width * CONFIG.game.reelsAmount) / 2,
      margin
    )
  }

  update() {
    this.reels.forEach(reel => reel.update());
  }
}