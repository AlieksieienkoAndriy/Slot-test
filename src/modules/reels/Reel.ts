import { Container, Sprite, Texture, BlurFilter } from 'pixi.js';
import { CONFIG } from '../../config';
import { ReelSymbol } from './ReelSymbol';

export class Reel {
    container: Container;
    symbols: Sprite[] = [];
    position: number = 0;
    previousPosition: number = 0;
    blur: BlurFilter;
    isSpinning: boolean = false;
    textures: Texture[]

    constructor(x: number, symbolSize: number) {
        this.container = new Container();
        this.container.x = x;
        this.blur = new BlurFilter();
        this.blur.blurX = 0;
        this.blur.blurY = 0;
        this.container.filters = [this.blur];

        this.textures = [
            Texture.from('eggHead'),
            Texture.from('flowerTop'),
            Texture.from('helmlok'),
            Texture.from('skully'),
          ];

        for (let i = 0; i < 4; i++) {
            const texture = this.textures[Math.floor(Math.random() * this.textures.length)];
            const symbol = new ReelSymbol(texture);
            symbol.view.y = i * symbolSize;
            symbol.view.scale.set(Math.min(symbolSize / symbol.view.width, symbolSize / symbol.view.height));
            symbol.view.x = Math.round((symbolSize - symbol.view.width) / 2);
            this.symbols.push(symbol.view);
            this.container.addChild(symbol.view);
        }
    }

    update() {
        const SYMBOL_SIZE = CONFIG.game.symbol_size;
        this.blur.blurY = (this.position - this.previousPosition) * 8;
        this.previousPosition = this.position;

        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = this.symbols[i];
            const prevy = symbol.y;

            symbol.y = ((this.position + i) % this.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
            if (symbol.y < 0 && prevy > SYMBOL_SIZE) {
                symbol.texture = this.textures[Math.floor(Math.random() * this.textures.length)];
                symbol.scale.set(Math.min(SYMBOL_SIZE / symbol.texture.width, SYMBOL_SIZE / symbol.texture.height));
                symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
            }
        }
    }
}