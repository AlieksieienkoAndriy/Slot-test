import * as PIXI from "pixi.js";

export interface IScene extends PIXI.Container {
    update(): void;
    onResize(): void;
}