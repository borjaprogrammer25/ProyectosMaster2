const mongoose = require("mongoose");
const ingresoDiarioEsquema = new mongoose.Schema({
  fechaIngresoDiario: {type: Data, required: true}, 
  semanaIngresoDiario: {type: Number, required: true, min:1, max:53},
  anio:{type: Data, required: true, min: 2026},
  totalCajaEfectivo: {type: Number, required: true},
  totalCajaTarjeta: {type: Number, required: true},
  cajaB: {type: Number, required: false, default: 0},
  nPax: {type: Number, required: true},
  nPedidos: {type: Number, required: false, default: 0},
}, {
    timestamps: true,
    versionKey: false
    }
);

ingresoDiarioEsquema.pre('validate', function (next) {
  this.totalTickets = this.totalCajaEfectivo + this.totalCajaTarjeta;
  this.totalDia = this.totalTickets + (this.cajaB || 0);
  this.impuestos = this.totalTickets * 0,1;
  next();
});

const IngresoDiario = mongoose.model("IngresoDiario", ingresoDiarioEsquema);
module.exports = IngresoDiario;