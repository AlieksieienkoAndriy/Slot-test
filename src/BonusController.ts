import { Container } from 'pixi.js';

export class BonusController {
    view: Container;

    constructor(stage: Container) {
        this.view = new Container();
        stage.addChild(this.view);
    }

    bonusAppear(symbolPosition: number) {
        console.log(`Bonus appear at position: ${symbolPosition}`);
    }

    bonusCollect(symbolPosition: number) {
        console.log(`Bonus collected at position: ${symbolPosition}`);
    }
}