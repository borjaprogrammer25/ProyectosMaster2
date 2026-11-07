require("dotenv").config();
const express = require("express");
const connect = require("./src/config/db");
const ingresosRouter = require("./src/routes/ingresosDiarios.routes");
const server = express();
server.use(express.json());
connect();

const PORT = process.env.PORT;

//Rutas
//ruta de prueba
server.get("/", (req, res) => {
    return res.status(200).json({message: "API REST de prueba para aplicacion restaurante"});
});

server.use("/ingresos", ingresosRouter);

//Middleware de errores generales
server.use((error, req, res) => {
    return res.status(error.status || 500).json({
        message: error.message,
    });
});

server.listen("8080", () => {
    console.log("Servidor levantado en http://localhost:8080");
});