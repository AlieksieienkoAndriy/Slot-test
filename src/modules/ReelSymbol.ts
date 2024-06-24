import { Sprite, Texture } from 'pixi.js';

export class ReelSymbol {
  view!: Sprite;

  constructor(texture: Texture | string) {
    if (typeof texture === 'string' && texture.endsWith('.json')) {
      // this.view = new Spine(texture);
    } else {
      this.view = new Sprite(texture as Texture);
    }
  }

  setTexture(texture: Texture) {
    if (this.view instanceof Sprite) {
      this.view.texture = texture;
    }
  }
}