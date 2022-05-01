import express from "express";
import TrackController from "../controllers/trackController.js";

const trackRoutes = express.Router();

trackRoutes
  .get('/track', TrackController.returnAll)
  .get('/track/:id', TrackController.returnById)
  .get('/track/:id/notificado', TrackController.notificado)
  .post('/track', TrackController.create)
  .put('/track/:id', TrackController.update)
  .delete('/track/:id', TrackController.remove);

export default trackRoutes;