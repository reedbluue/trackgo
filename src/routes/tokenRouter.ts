import { Composer } from "telegraf";
import { TokenController } from "../controllers/TokenController.js";
import { adminValidation } from "../middlewares/adminValidation.js";

const tokenRouter = new Composer();

tokenRouter.command('token', TokenController.validaToken);
tokenRouter.command('inviteToken', adminValidation, TokenController.geraToken);

export default tokenRouter;