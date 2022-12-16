import { Composer } from "telegraf";
import { RegistrationController } from "../controllers/RegistrationController.js";
import { BaseSceneInterface } from "../interfaces/WizardSceneInterface.js";

const registrationRouter = new Composer<BaseSceneInterface>();

registrationRouter.command('join', RegistrationController.signIn);

export default registrationRouter;