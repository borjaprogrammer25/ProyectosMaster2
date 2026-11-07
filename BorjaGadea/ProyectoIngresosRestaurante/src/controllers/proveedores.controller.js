const Proveedor = require("../models/proveedor.model");
const createError = require("../utils/createError");

const getAllProveedores = async(req, res, next) => {
    try {
        const proveedores = await Provedor.find();
        return res.status(200).json(proveedores);
    } catch (error) {
        return next(error);
    }
};

//Metodo get para obtener un proveedor por id
const getProveedorById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const proveedor = await Proveedor.findById(id);
        if(!proveedor){
            return res
                    .status(404)
                    .json({message: "No se encuentra el proveedor con ese ID"});
        }
        return res.status(200).json(proveedor);
    } catch(error) {
        return next(error);
    }
};

//Crear un proveedor
const createProveedor = async(req, res, next) => {
    try {
        const newProveedor = new Proveedor(req.body);
        await newProveedor.save();
        return res.status(201).json(newProveedor);
    } catch(error) {
        return next(error);
    }
};

//Borrar Proveedor
const deleteProveedor = async(req, res, next) => {
    try {
        const deletedProveedor = await Proveedor.findByIdAndDelete(req.params.id);
        if(!deletedProveedor){
            return next(createError("Proveedor no encontrado", 404));
        }
        return res.status(200).json(deletedProveedor);
    } catch(error){
        return next(error);
    }
};

module.exports = { getAllProveedores, getProveedorById, createProveedor, deleteProveedor };