//Creamos servidor express
const express = require("express");

//Importar nuestra función de conexión con la BD
const connect = require("./src/config/db");

//Importamos el router de las series
const showsRouter = require("./src/routes/shows.routes");

//Creamos servidor 
const server = express();

//Parseamos JSON en el servidor para poder trabajar con JSON
server.use(express.json());

//Nos conectamos con nuestro Cluster de MongoDB local
connect();

//Rutas
server.use("/shows", showsRouter);

//Definimos una ruta No encontrada
server.use((req, res) => {
    return res.status(404).json({message: "Ruta NO encontrada"});
});

//levantamos el servidor
server.listen(8080, () => {
    console.log("Servidor levantado en http://localhost:8080");
});
