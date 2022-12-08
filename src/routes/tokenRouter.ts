import { Composer } from "telegraf";
import { AdminController } from "../controllers/AdminController.js";
import { RegistrationController } from "../controllers/RegistrationController.js";
import { adminValidation } from "../middlewares/adminValidation.js";

const tokenRouter = new Composer();

tokenRouter.command('join', RegistrationController.signIn);
tokenRouter.command('inviteToken', adminValidation, AdminController.geraToken);
tokenRouter.command('resetTokens', adminValidation, AdminController.resetaTokens);

export default tokenRouter;