import { Scenes } from "telegraf";
import { BaseSceneInterface } from "../interfaces/WizardSceneInterface.js";
import { guestScene } from "./guestScene.js";
import { userScene } from "./userScene.js";

export const baseStage = new Scenes.Stage<BaseSceneInterface>([
  guestScene,
  userScene
], { ttl: 10 });