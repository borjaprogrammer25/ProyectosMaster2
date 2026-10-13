//importamos dotenv y lo arrancamos
require("dotenv").config();
const express = require("express");
const connect = require("./src/config/connect");

//nos conectamos con la base de datos
connect();
//definimos el puerto
const PORT = process.env.PORT;

//Creamos el servidor y lo añadimos al middleware y preparamos para poder recibir json
const server = express();
server.use(express.json());

//ruta de prueba
server.get("/", (req, res) => {
    return res.status(200).json({message: "API REST de prueba"});
});

//levantamos el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});