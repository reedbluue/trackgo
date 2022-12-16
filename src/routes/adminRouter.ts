import { Composer } from "telegraf";
import { AdminController } from "../controllers/AdminController.js";
import { adminValidation } from "../middlewares/adminValidation.js";

const adminRouter = new Composer();

adminRouter.command('inviteToken', adminValidation, AdminController.geraToken);
adminRouter.command('resetTokens', adminValidation, AdminController.resetaTokens);
adminRouter.command('resetSessions', adminValidation, AdminController.resetaSessions);

export default adminRouter;