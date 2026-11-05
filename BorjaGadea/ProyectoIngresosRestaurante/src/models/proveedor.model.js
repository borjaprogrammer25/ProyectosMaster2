const mongoose = require("mongoose");

const proveedorEsquema = new mongoose.Schema({
  idProveedor: {type: Number, required: true},
  cifProveedor: {type: String, required: true},
  nombreProveedor: {type: String, required: true},
  comercial: {type: String, required: true},
  telefono: {type: Number, required: true},
}, {
    timestamps: true,
    versionKey: false
    }
);