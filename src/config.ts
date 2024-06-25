import { Texture } from "pixi.js";

export const CONFIG = {
  canvas: {
    width: 1280,
    height: 720
  },

  textStyles: {
    game: {
      fontFamily: "Arial",
      fontSize: 28,
      fill: "white",
    },

    popup: {
      fontFamily: "Arial",
      fontSize: 48,
      fill: "white",
      align: "center",
      lineHeight: 100,
    },

    rule: {
      fontFamily: "Arial",
      fontSize: 48,
      fill: "white",
      align: "center"
    },

    bitmapStyle: {
      fontName: 'Desyrel',
      fontSize: 35      
    },
  },

  game: {
    reel_width: 160,
    symbol_size: 150,
    
    textures: [] as Texture[],
  }
}