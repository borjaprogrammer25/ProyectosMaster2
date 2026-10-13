const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado con la base de datos");
    } catch (error) {
        console.error("Error conectando a la base de datos", error.message);
    }
}

module.exports = connect;