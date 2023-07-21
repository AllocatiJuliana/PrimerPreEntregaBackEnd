import { Router } from "express";

export const viewRouter = Router();

viewRouter.get("/", (req, res) => {
  const data = "juliana";

  res.render("home", {
    data,
  });
});

viewRouter.get("/realTimeProducts", (req, res) => {
  const data = "juliana";

  res.render("realTimeProducts", {
    data,
  });
});
