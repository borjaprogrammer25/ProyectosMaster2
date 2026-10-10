const mongoose = require("mongoose");

const connect = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/tvshowsbd");
        console.log("Conectando a la base de datos Mongo Compass");
    } catch(error) {
        console.error("Error conectando con la base de datos", error.message);
    }
};

module.exports = connect;