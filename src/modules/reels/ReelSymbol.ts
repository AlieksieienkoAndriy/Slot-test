import { Sprite, Texture } from 'pixi.js';

export class ReelSymbol {
  view!: Sprite;

  constructor(texture: Texture) {
    if (texture.constructor.name.includes('SkeletonData')) {
      // this.view = new Spine(texture);
    } else {
      this.view = new Sprite(texture);
    }
  }
}