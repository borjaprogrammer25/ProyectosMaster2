const express = require("express");
const proveedoresRouter = express.Router();

const {
    getAllProveedores,
    getProveedorById,
    createProveedor,
    deleteProveedor,
    
} = require("../controllers/proveedores.controllers");

proveedoresRouter.get("/", getAllProveedores);
proveedoresRouter.get("/:id", getProveedorById);
proveedoresRouter.post("/", createProveedor);
proveedoresRouter.delete("/:id", deleteProveedor);

module.exports = proveedoresRouter;