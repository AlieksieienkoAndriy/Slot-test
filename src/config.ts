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
    herd: {
      groupLimit: 5,
      sheepAmount: {
        from: 10,
        to: 20
      },
      distance: 50
    },

    herdsman: {
      limitY: 220,
      startPos: {
        x: 1300,
        y: 800
      },      
      scale: 0.25,
      walkDuration: 1000
    },

    sheep: {
      limitY: 220,
      scale: 1.5,
      walkDuration: 1000
    }
  }
}