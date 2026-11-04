const mongoose = require("mongoose");

const TIPO_PAGO = ["Tarjeta", "Efectivo", "Transferencia", "Banco"];

const gastoDiarioEsquema = new mongoose.Schema({
  fechaGastoDiario: {type: Date, required: true, default:mongoose.now()}, 
  semanaGastoDiario: {type: Number, required: true, min:1, max:53},
  anio:{type: Date, required: true, min: 2026},
  idProveedor:{type: String, required: true},
  importe: {type: Number, required: true, default: 0},
  tipoPago:{type: String, required: true, enum: TIPO_PAGO},
  fechaPago:{type: Date, required: true},
}, {
    timestamps: true,
    versionKey: false
    }
);