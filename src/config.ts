export const CONFIG = {
  canvas: {
    width: 1280,
    height: 720
  },

  textStyles: {
    loader: {
      fontFamily: "Arial",
      fontSize: 28,
      fill: "white",
    },

    game: {
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      stroke: { color: 0x4a1850, width: 5 },
      dropShadow: {
        color: 0x000000,
        angle: Math.PI / 6,
        blur: 4,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 440,
    },

    bonus: {
      fontFamily: "Arial",
      fontSize: 32,
      fill: "white",
    },
  },

  game: {
    reel_width: 160,
    symbol_size: 150,
    reelsAmount: 5,
    symbolsAmount: 3,
    spinDuration: 2500,    
    extraDuration: 600,    
  }
}