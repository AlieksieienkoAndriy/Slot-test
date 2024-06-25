import * as PIXI from "pixi.js";

export const manifest: PIXI.AssetInitOptions = {
    manifest: {
      bundles: [
        {
          name: "images",
          assets: {
            "eggHead": "https://pixijs.com/assets/eggHead.png",
            "flowerTop": "https://pixijs.com/assets/flowerTop.png",
            "helmlok": "https://pixijs.com/assets/helmlok.png",
            "skully": "https://pixijs.com/assets/skully.png"
          }
        },
      ]
    }
  }