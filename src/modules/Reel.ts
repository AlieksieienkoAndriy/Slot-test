import { Container, Sprite, Texture, BlurFilter } from 'pixi.js';

export class Reel {
    container: Container;
    symbols: Sprite[] = [];
    position: number = 0;
    previousPosition: number = 0;
    blur: BlurFilter;
    isSpinning: boolean = false;

    constructor(x: number, textures: Texture[], symbolSize: number) {
        this.container = new Container();
        this.container.x = x;
        this.blur = new BlurFilter();
        this.container.filters = [this.blur];

        for (let i = 0; i < 4; i++) {
            const symbol = new Sprite(textures[Math.floor(Math.random() * textures.length)]);
            symbol.y = i * symbolSize;
            symbol.scale.set(Math.min(symbolSize / symbol.width, symbolSize / symbol.height));
            symbol.x = Math.round((symbolSize - symbol.width) / 2);
            this.symbols.push(symbol);
            this.container.addChild(symbol);
        }
    }

    update() {
        const SYMBOL_SIZE = 150;
        this.blur.blurY = (this.position - this.previousPosition) * 8;
        this.previousPosition = this.position;

        for (let i = 0; i < this.symbols.length; i++) {
            const s = this.symbols[i];
            const prevy = s.y;

            s.y = ((this.position + i) % this.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
            if (s.y < 0 && prevy > SYMBOL_SIZE) {
                // Detect going over and swap a texture.
                // This should in proper product be determined from some logical reel.
                s.texture = Texture.from('https://pixijs.com/assets/eggHead.png');
                s.scale.set(Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height));
                s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
            }
        }
    }
}