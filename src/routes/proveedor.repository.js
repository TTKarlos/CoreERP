const express = require('express')
const proveedorController = require("../controllers/proveedorController")
const auth = require("../middlewares/auth")
const validateRequest = require("../middlewares/validateRequest")
const proveedorSchema = require("../validations/proveedorSchema")

class ProveedorRepository {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get("/", auth,proveedorController.getAll);
        this.router.get("/:id", auth,proveedorController.getById);
        this.router.post("/", auth, validateRequest(proveedorSchema), proveedorController.create);
        this.router.put("/:id", auth, validateRequest(proveedorSchema), proveedorController.update);
        this.router.delete("/:id", auth, proveedorController.delete);
        this.router.get("/:id/productos", auth, proveedorController.getProductosByProveedor);
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = new ProveedorRepository();

