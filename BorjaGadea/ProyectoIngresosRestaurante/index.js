const express = require("express");
const connect = require("./src/config/db");
const ingresosRouter = require("./src/routes/ingresosDiarios.routes");
const server = express();
server.use(express.json());
connect();

server.use("/ingresos", ingresosRouter);

server.listen("8080", () => {
    console.log("Servidor levantado en http://localhost:8080");
});