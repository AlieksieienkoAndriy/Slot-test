import { Container } from "pixi.js";

export interface IScene extends Container {
  update(): void;
  onResize(): void;
}