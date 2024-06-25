import { Container, Graphics, Point, Text, TextStyle } from "pixi.js";
import { CONFIG } from "../../config";

export class BonusView {
    container: Container;

    constructor(parent: Container) {
        this.container = new Container();
        this.container.visible = false;
        parent.addChild(this.container);
        this.createBonus();
    }

    createBonus() {
        const background = new Graphics();
        background.rect(0, 0, CONFIG.game.reel_width, CONFIG.game.symbol_size); 
        background.fill( {color: 0x000000, alpha: 0.5} );
        
        this.container.addChild(background);

        const style = new TextStyle(CONFIG.textStyles.loader);
        const bonusText = new Text("BONUS!", style);
        bonusText.anchor.set(0.5);
        bonusText.position.set(background.width / 2, background.height / 2);        
        this.container.addChild(bonusText);
    }

    showBonus(position: Point) {
        this.container.position.set(CONFIG.game.reel_width * position.x, CONFIG.game.symbol_size * position.y);
        this.container.visible = true;
    }

    hideBonus() {
        this.container.visible = false;
    }
}