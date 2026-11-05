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

//buscar por fechaIngresoDiario

//buscar por semanaIngresoDiario

//buscar por anio


module.exports = {getAllIngresosDiarios, getIngresoById, createIngresoDiario};