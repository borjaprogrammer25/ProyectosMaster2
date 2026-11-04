const Videogame = require("../models/videogame.model");
const createError = require("../../utils/createError");

const getAllVideogames = async (req, res, next) => {
    try {
        const videogames = await Videogame.find();
        return res.status(200).json(videogames);
    } catch (error) {
        return next(error);
    }
};

const getVideogameById = async(req, res, next) => {
    try {
        const {id} = req.params;
        const videogameFound = await Videogame.findById(id);
        if(!videogameFound){
            return next(createError("Video juego no encontrado", 404));
        }
        return res.status(200).json(videogameFound);
    } catch(error) {
        return next(error);
    }
};

const createVideogame = async(req, res) => {
    try {
        const newVideogame = new Videogame(req.body);
        const createdVideogame = await newVideogame.save();
        return res.status(201).json(createdVideogame);
    } catch(error) {
        return next(error);
    }
};

const updateVideogame = async(req, res, next) => {
    try {
        const updatedVideogame = await Videogame.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true,
            runValidators: true,
            }
        );
        if(!updatedVideogame) {
            return next(createError("Video juego no encontrada", 404));
        }
        return res.status(200).json(updatedVideogame);
    } catch(error){
        return next(error);
    }
};

const deleteVideogame = async(req, res, next) => {
    try {
        const deletedVideogame = await Videogame.findByIdAndDelete(req.params.id);
        if(!deletedVideogame){
            return next(createError("Video juego no encontrado", 404));
        }
        return res.status(200).json(deletedVideogame);
    } catch(error){
        return next(error);
    }
};

module.exports = {
    getAllVideogames,
    getVideogameById,
    createVideogame,
    updateVideogame,
    deleteVideogame
};
