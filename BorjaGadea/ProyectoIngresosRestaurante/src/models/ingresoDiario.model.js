const mongoose = require("mongoose");
const ingresoDiarioEsquema = new mongoose.Schema({
  fechaIngresoDiario: {type: Date, required: true, default:mongoose.now()}, 
  semanaIngresoDiario: {type: Number, required: true, min:1, max:53},
  anio:{type: Date, required: true, min: 2026},
  totalCajaEfectivo: {type: Number, required: true},
  totalCajaTarjeta: {type: Number, required: true},
  cajaB: {type: Number, required: false, default: 0},
  nPax: {type: Number, required: true},
  nPedidos: {type: Number, required: false, default: 0},
  totalTickets: { type: Number },
  totalDia: { type: Number },
  impuestos: { type: Number },
}, {
    timestamps: true,
    versionKey: false
    }
);

ingresoDiarioEsquema.pre('validate', function () {
  const redondear = (n) => Math.round(n * 100) / 100;

  this.totalTickets = redondear(this.totalCajaEfectivo + this.totalCajaTarjeta);
  this.totalDia = redondear(this.totalTickets + (this.cajaB || 0));
  this.impuestos = redondear(this.totalTickets - this.totalTickets / 1.1); // IVA incluido

  // Año y semana ISO a partir de la fecha
  const f = new Date(this.fechaIngresoDiario);
  const jueves = new Date(Date.UTC(f.getFullYear(), f.getMonth(), f.getDate()));
  jueves.setUTCDate(jueves.getUTCDate() + 4 - (jueves.getUTCDay() || 7));
  const inicioAnio = new Date(Date.UTC(jueves.getUTCFullYear(), 0, 1));
  this.anio = jueves.getUTCFullYear();
  this.semanaIngresoDiario = Math.ceil(((jueves - inicioAnio) / 86400000 + 1) / 7);
});

const IngresoDiario = mongoose.model("IngresoDiario", ingresoDiarioEsquema);
module.exports = IngresoDiario;