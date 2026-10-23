const express = require("express");
const ingresosRouter = express.Router();

const {
    getAllIngresosDiarios,
    getIngresoById,
    createIngresoDiario,

    
} = require("../controllers/ingresosDiarios.controllers");

ingresosRouter.get("/", getAllIngresosDiarios);
ingresosRouter.get("/:id", getIngresoById);
ingresosRouter.post("/", createIngresoDiario);

module.exports = ingresosRouter;