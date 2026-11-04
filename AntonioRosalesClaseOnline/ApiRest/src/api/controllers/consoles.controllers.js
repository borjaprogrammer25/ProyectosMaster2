const Console = require("../models/console.model");
const createError = require("../../utils/createError");

const getAllConsoles = async (req, res, next) => {
    try {
        const consoles = await Console.find();
        return res.status(200).json(consoles);
    } catch (error) {
        return next(error);
    }
};

const getConsoleById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const consoleFound = await Console.findById(id);
        if(!consoleFound){
            return next(createError("Consola no encontrada", 404));
        }
        return res.status(200).json(consoleFound);
    } catch(error) {
        return next(error);
    }
};

const createConsole = async(req, res) => {
    try {
        const newConsole = new Console(req.body);
        const createdConsole = await newConsole.save();
        return res.status(201).json(createdConsole);
    } catch(error) {
        return next(error);
    }
};

const updateConsole = async(req, res, next) => {
    try {
        const updatedConsole = await Console.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true,
            runValidators: true,
            }
        );
        if(!updatedConsole) {
            return next(createError("Consola no encontrada", 404));
        }
        return res.status(200).json(updatedConsole);
    } catch(error){
        return next(error);
    }
};

const deleteConsole = async(req, res, next) => {
    try {
        const deletedConsole = await Console.findByIdAndDelete(req.params.id);
        if(!deletedConsole){
            return next(createError("Consola no encontrada", 404));
        }
        return res.status(200).json(deletedConsole);
    } catch(error){
        return next(error);
    }
};

module.exports = {
    getAllConsoles,
    getConsoleById,
    createConsole,
    updateConsole,
    deleteConsole
};