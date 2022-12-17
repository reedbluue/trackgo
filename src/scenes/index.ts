import { Scenes } from "telegraf";
import { WizardSceneInterface } from "../interfaces/WizardSceneInterface.js";
import { cadastroScene } from "./cadastroScene.js";
import { guestScene } from "./guestScene.js";
import { userScene } from "./userScene.js";

export const wizardStage = new Scenes.Stage<WizardSceneInterface>([
  guestScene,
  userScene,
  cadastroScene
], { ttl: 10 });