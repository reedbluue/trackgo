import { Composer } from "telegraf";
import { RegistrationController } from "../controllers/RegistrationController.js";
import { WizardSceneInterface } from "../interfaces/WizardSceneInterface.js";

const registrationRouter = new Composer<WizardSceneInterface>();

registrationRouter.command('join', RegistrationController.signIn);

export default registrationRouter;