//nos traemos el model Show
const Show = require("../models/show.model");

//Metodo get para obtener todas las series
const getAllShows = async(req, res) => {
    try {
        const shows = await Show.find();
        return res.status(200).json(shows);
    } catch(error) {
        return res.status(500).json({message: "Error obteniendo las series", error: error.message});
    }
};

//Metodo get para obtener una serie por id
const getShowById = async(req, res) => {
    try {
        const {id} = req.params;
        const show = await Show.findById(id);
        if(!show){
            return res
                    .status(404)
                    .json({message: "No se encuentra la serie con ese ID"});
        }
        return res.status(200).json(show);
    } catch(error) {
        return res.status(500).json({message: "Error obteniendo la serie", error: error.message});
    }
};

//Crear la serie
const createShow = async(req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        return res.status(201).json(newShow);
    } catch(error) {
        return res.status(500).json({message: "Error creando la serie", error: error.message});
    }
};

//update
const updateShow = async(req, res) => {
    try {
        const updatedShow = await Show.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true,
            runValidators: true,
            }
        );
        if(!updatedShow) {
            return res
                    .status(404)
                    .json({message: "Error actualizando la serie",
                        error: error.message
                    });
            return res.status(200).json(updatedShow);
        }
    } catch(error){
        return res.status(500).json({message: "Error al actualizar la serie", error: error.message});
    }
};

//borrar
//plan A donde esta hecho como todo el rato hacemos con mucha explicacion, mejor gastar plan B
/*const deleteShow = async(req, res) => {
    try {
        const deletedShow = await Show.findByIdAndDelete(req.params.id);
        if(!deletedShow) {
            return res
                    .status(404)
                    .json({message: "Error borrando la serie", 
                        error: error.message
                    });
        }
        return res.status(200).json(deletedShow)
    } catch(error){
        return res.status(500).json({message: "Error borrando la serie", error: error.message});
    }
};*/

//plan B -> Plan mas optimo para gastar
const deleteShow = async(req, res) => {
    try {
        const deletedShow = await Show.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Serie borrada correctamente"});
    } catch(error){
        return res.status(500).json({message: "Error borrando la serie", error: error.message});
    }
};

module.exports = {getAllShows, getShowById, createShow, updateShow, deleteShow};