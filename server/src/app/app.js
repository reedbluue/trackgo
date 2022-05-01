import express from "express";
import dbModelsInit from "./connections/dbModelsInit.js";
import updateInterval from "./intervals/updateInterval.js";
import routes from "./routes/index.js";

const app = express();

dbModelsInit();

routes(app);

updateInterval(900000);

export default app;