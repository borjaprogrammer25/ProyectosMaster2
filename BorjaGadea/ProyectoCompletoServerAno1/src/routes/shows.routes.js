//importamos express
const express = require("express");

//creamos router para series
const showsRouter = express.Router();

//Traemos los controladores
const {
    getAllShows,
    getShowById,
    createShow,
    updateShow,
    deleteShow
} = require("../controllers/shows.controllers");

//Definimos las rutas del router (/shows)
showsRouter.get("/", getAllShows);
showsRouter.get("/:id", getShowById);
showsRouter.post("/", createShow);
showsRouter.put("/:id", updateShow);
showsRouter.delete("/:id", deleteShow);

module.exports = showsRouter;