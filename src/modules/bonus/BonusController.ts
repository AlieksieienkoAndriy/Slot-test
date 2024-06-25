import { Point } from "pixi.js";
import { BonusModel } from "./BonusModel";
import { BonusView } from "./BonusView";

export class BonusController {
    model: BonusModel;
    view: BonusView;

    constructor(model: BonusModel, view: BonusView) {
        this.model = model;
        this.view = view;

        this.addListeners();
    }

    addListeners() {
        window.addEventListener('check_bonus', this.checkBonus.bind(this));  
    }

    checkBonus() {
        if (this.model.checkBonus()) {
            this.bonusAppear(this.model.getBonuse() as Point);
        }
    }

    bonusAppear(symbolPosition: Point) {
        this.view.showBonus(symbolPosition);
    }

    bonusCollect() {
        this.model.removeBonus();
        this.view.hideBonus();
    }
}