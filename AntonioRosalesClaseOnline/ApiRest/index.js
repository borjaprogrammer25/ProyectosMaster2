//importamos dotenv y lo arrancamos
require("dotenv").config();
const express = require("express");
const connect = require("./src/config/connect");
const consolesRouter = require("./src/api/routes/consoles.routes");
const videogamesRouter = require("./src/api/routes/videogame.routes");

//nos conectamos con la base de datos
connect();
//definimos el puerto
const PORT = process.env.PORT;

//Creamos el servidor y lo añadimos al middleware y preparamos para poder recibir json
const server = express();
server.use(express.json());

//Rutas
//ruta de prueba
server.get("/", (req, res) => {
    return res.status(200).json({message: "API REST de prueba para Videojuegos y consolas"});
});

server.use("/consoles", consolesRouter);
server.use("/videogames", videogamesRouter);    

//Middleware ruta no encontrada
server.use((req, res) => {
    return res.status(404).json({message:"Route not found"});
});

//Middleware de errores generales
server.use((error, req, res) => {
    return res.status(error.status || 500).json({
        message: error.message,
    });
});

//levantamos el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});