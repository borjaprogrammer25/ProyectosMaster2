const IngresoDiario = require("../models/ingresoDiario.model");
const createError = require("../utils/createError");

const getAllIngresosDiarios = async(req, res, next) => {
    try {
        const ingresosDiarios = await IngresoDiario.find();
        return res.status(200).json(ingresosDiarios);
    } catch (error) {
        return next(error);
    }
};

//Metodo get para obtener un ingreso por id
const getIngresoById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const ingresoDiario = await IngresoDiario.findById(id);
        if(!ingresoDiario){
            return res
                    .status(404)
                    .json({message: "No se encuentra el ingreso con ese ID"});
        }
        return res.status(200).json(ingresoDiario);
    } catch(error) {
        return next(error);
    }
};

//Crear un ingreso
const createIngresoDiario = async(req, res, next) => {
    try {
        const newIngreso = new Ingreso(req.body);
        await newIngreso.save();
        return res.status(201).json(newIngreso);
    } catch(error) {
        return next(error);
    }
};

//Borrar ingresoDiario
const deleteIngresoDiario = async(req, res, next) => {
    try {
        const deletedIngresoDiario = await IngresoDiario.findByIdAndDelete(req.params.id);
        if(!deletedIngresoDiario){
            return next(createError("Ingreso no encontrado", 404));
        }
        return res.status(200).json(deletedIngresoDiario);
    } catch(error){
        return next(error);
    }
};

//buscar por fechaIngresoDiario
const buscarIngresoDiarioByDate = async (req, res, next) => {
  try {
    const { fecha } = req.params; // Captura la fecha de la URL (ej: /ingresos/2026-11-07)

    if (!fecha) {
      return res.status(400).json({ error: "La fecha es obligatoria" });
    }

    // 1. Convertir el texto recibido a objeto Date
    const fechaBusqueda = new Date(fecha);

    // 2. Validar que sea una fecha real
    if (isNaN(fechaBusqueda.getTime())) {
      return res.status(400).json({ error: "Formato de fecha inválido. Usa AAAA-MM-DD" });
    }

    // 3. Forzar las 00:00:00 en UTC para que coincida exactamente con tu Schema
    const fechaLimpia = new Date(Date.UTC(
      fechaBusqueda.getFullYear(),
      fechaBusqueda.getMonth(),
      fechaBusqueda.getDate()
    ));

    // 4. Buscar en la base de datos
    const ingreso = await IngresoDiario.findOne({ fechaIngresoDiario: fechaLimpia });

    if (!ingreso) {
      return res.status(404).json({ 
        mensaje: `No se encontraron ingresos para la fecha: ${fecha}` 
      });
    }

    // 5. Responder con el registro encontrado
    return res.status(200).json(ingreso);

  } catch (err) {
    return next(error);
  }
};

//buscar por semanaIngresoDiario

//buscar por anio

//buscar ingresos entre dos fechas


module.exports = {getAllIngresosDiarios, getIngresoById, createIngresoDiario, deleteIngresoDiario, buscarIngresoDiarioByDate};