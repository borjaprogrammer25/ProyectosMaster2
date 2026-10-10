const mongoose = require("mongoose");
const connect = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/lapericana_bd");
        console.log("Conectado a la base de datos del restaurante La Pericana");
    } catch (error) {
        console.error("Error conectando a la base de datos", error.message);
    }
};

module.exports = connect;