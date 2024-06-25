import { Point } from "pixi.js";

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
      const position = {
        x: Math.round(Math.random() * 4),
        y: Math.round(Math.random() * 2)
      };

      this.addBonus(position as Point);
    }
    return isBonus;
  }

  getBonuse() {
      return this.activeBonuse;
  }
}