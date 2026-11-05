const express = require("express");
const connect = require("./src/config/db");
const ingresosRouter = require("./src/routes/ingresosDiarios.routes");
const server = express();
server.use(express.json());
connect();

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