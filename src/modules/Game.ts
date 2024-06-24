import { Application, Assets, Container, Graphics, Text, TextStyle, FillGradient, Color, Texture } from 'pixi.js';
import { Reel } from './Reel';
import { SpinAnimation } from './SpinAnimation';
import { BonusController } from './BonusController';

export class Game {
    app: Application;
    reels: Reel[] = [];
    reelContainer!: Container;
    spinButton!: Graphics;
    bonusController!: BonusController;

    constructor() {
        this.app = new Application();
        this.init().then(() => {
            this.createReels();
            this.createUI();
            this.createBonusController();
            this.setupInteractivity();
            this.app.ticker.add(() => this.update());
        });

        window.addEventListener('resize', this.onResize.bind(this));
    }

    async init() {
        await this.app.init({ background: '#1099bb', resizeTo: window });
        (document.getElementById('view') as HTMLElement).appendChild(this.app.canvas)

        this.reelContainer = new Container();
        this.app.stage.addChild(this.reelContainer);

        await Assets.load([
            'https://pixijs.com/assets/eggHead.png',
            'https://pixijs.com/assets/flowerTop.png',
            'https://pixijs.com/assets/helmlok.png',
            'https://pixijs.com/assets/skully.png',
        ]);
    }

    createReels() {
        const REEL_WIDTH = 160;
        const SYMBOL_SIZE = 150;
        const slotTextures = [
            Texture.from('eggHead'),
            Texture.from('flowerTop'),
            Texture.from('helmlok'),
            Texture.from('skully'),
        ];

        for (let i = 0; i < 5; i++) {
            const reel = new Reel(i * REEL_WIDTH, slotTextures, SYMBOL_SIZE);
            this.reelContainer.addChild(reel.container);
            this.reels.push(reel);
        }

        this.onResize();
    }

    createUI() {
        const margin = (this.app.screen.height - 150 * 3) / 2;
        const top = new Graphics().rect(0, 0, this.app.screen.width, margin).fill({ color: 0x0 });
        const bottom = new Graphics().rect(0, 150 * 3 + margin, this.app.screen.width, margin).fill({ color: 0x0 });

        const fill = new FillGradient(0, 0, 0, 36 * 1.7);
        const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());
        colors.forEach((number, index) => {
            const ratio = index / colors.length;
            fill.addColorStop(ratio, number);
        });

        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: { fill },
            stroke: { color: 0x4a1850, width: 5 },
            dropShadow: {
                color: 0x000000,
                angle: Math.PI / 6,
                blur: 4,
                distance: 6,
            },
            wordWrap: true,
            wordWrapWidth: 440,
        });

        const playText = new Text('Spin the wheels!', style);
        playText.x = Math.round((bottom.width - playText.width) / 2);
        playText.y = this.app.screen.height - margin + Math.round((margin - playText.height) / 2);
        bottom.addChild(playText);

        const headerText = new Text('PIXI MONSTER SLOTS!', style);
        headerText.x = Math.round((top.width - headerText.width) / 2);
        headerText.y = Math.round((margin - headerText.height) / 2);
        top.addChild(headerText);

        this.app.stage.addChild(top);
        this.app.stage.addChild(bottom);

        this.spinButton = bottom;
    }

    createBonusController() {
        this.bonusController = new BonusController(this.app.stage);
    }

    setupInteractivity() {
        this.spinButton.eventMode = 'static';
        this.spinButton.cursor = 'pointer';
        this.spinButton.addListener('pointerdown', this.startPlay.bind(this));
    }

    startPlay() {
        if (this.reels.some(reel => reel.isSpinning)) return;

        this.reels.forEach((reel, i) => {
            const extra = Math.floor(Math.random() * 3);
            const target = reel.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;

            SpinAnimation.spin(reel, target, time, () => {
                if (i === this.reels.length - 1) {
                    this.reelsComplete();
                }
            });
        });
    }

    reelsComplete() {
        // Handle what happens when reels complete their spin
    }

    update() {
        this.reels.forEach(reel => reel.update());
    }

    onResize() {
        const REEL_WIDTH = 160;
        const SYMBOL_SIZE = 150;
        const margin = (this.app.screen.height - SYMBOL_SIZE * 3) / 2;

        this.reelContainer.y = margin;
        this.reelContainer.x = (this.app.screen.width - REEL_WIDTH * 5) / 2;
    }
}

// new Game();