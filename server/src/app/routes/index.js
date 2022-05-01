import express from "express";
import trackRoutes from "./trackRoutes.js";

const routes = (app) => {
  app.route('/')
    .all((req, res) => {
      res.json({message: 'TrackGo API'})
    })

  app.use(
    express.json(),
    trackRoutes
    );
}

export default routes;