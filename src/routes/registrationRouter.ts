import { Composer } from "telegraf";
import { RegistrationController } from "../controllers/RegistrationController.js";
import { WizardSceneInterface } from "../interfaces/WizardSceneInterface.js";

const registrationRouter = new Composer<WizardSceneInterface>();

registrationRouter.command('entrar', RegistrationController.signIn);

export default registrationRouter;