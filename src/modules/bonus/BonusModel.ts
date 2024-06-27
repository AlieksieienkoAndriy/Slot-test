import { Point } from "pixi.js";
import { CONFIG } from "../../config";

export class BonusModel {
  // Define the properties and methods related to bonus data
  activeBonuse: Point | null = null;

  addBonus(position: Point) {
    this.activeBonuse = position;
  }

  removeBonus() {
    this.activeBonuse = null;
  }

  checkBonus() {
    const isBonus = Boolean(Math.round(Math.random()));
    if (isBonus) {
      const position = new Point(
        Math.round(Math.random() * (CONFIG.game.reelsAmount - 1)),
        Math.round(Math.random() * (CONFIG.game.symbolsAmount - 1)))
      this.addBonus(position as Point);
    }
    return isBonus;
  }

  getBonuse() {
    return this.activeBonuse;
  }
}