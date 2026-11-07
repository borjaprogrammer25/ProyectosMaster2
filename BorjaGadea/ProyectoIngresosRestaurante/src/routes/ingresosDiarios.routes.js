const express = require("express");
const ingresosRouter = express.Router();

const {
    getAllIngresosDiarios,
    getIngresoById,
    createIngresoDiario,
    deleteIngresoDiario,
    buscarIngresoDiarioByDate,
    
} = require("../controllers/ingresosDiarios.controllers");

ingresosRouter.get("/", getAllIngresosDiarios);
ingresosRouter.get("/:id", getIngresoById);
ingresosRouter.post("/", createIngresoDiario);
ingresosRouter.delete("/:id", deleteIngresoDiario);
ingresosRouter.get("/:fecha", buscarIngresoDiarioByDate);

module.exports = ingresosRouter;