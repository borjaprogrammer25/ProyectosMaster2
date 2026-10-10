const express = require("express");
const connect = require("./src/config/db");
const server = express();
server.use(express.json());
connect();

server.listen("8080", () => {
    console.log("Servidor levantado en http://localhost:8080");
});