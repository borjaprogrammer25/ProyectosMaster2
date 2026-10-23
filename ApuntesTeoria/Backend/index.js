require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
connectDB();

const app = express();
app.use(express.json());

app.use("/saludar",(req, res, next) => {
    return res.status(404).json("Hola");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});