const express = require("express");
const {
    getAllConsoles,
    getConsoleById,
    createConsole,
    updateConsole,
    deleteConsole
} = require("../controllers/consoles.controllers");

const router = express.Router();

router.get("/", getAllConsoles);
router.get("/:id", getConsoleById);
router.post("/", createConsole);
router.put("/:id", updateConsole);
router.delete("/:id", deleteConsole);

module.exports = router;