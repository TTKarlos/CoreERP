const express = require("express")
const categoriaController = require("../controllers/categoriaController");
const auth = require("../middlewares/auth")
const validateRequest = require("../middlewares/validateRequest")
const categoriaSchema = require("../validations/categoriaSchema")

class CategoriaRepository {
    constructor() {
        this.router = express.Router()
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.get("/", auth, categoriaController.getAll)
        this.router.get("/:id", auth, categoriaController.getById)
        this.router.post("/", auth, validateRequest(categoriaSchema), categoriaController.create)
        this.router.put("/:id", auth, validateRequest(categoriaSchema), categoriaController.update)
        this.router.delete("/:id", auth, categoriaController.delete)
        this.router.patch("/:id/soft-delete", auth, categoriaController.softDelete)
        this.router.get("/:id/productos", auth, categoriaController.getProductosByCategoria)
    }

    getRoutes() {
        return this.router
    }
}

module.exports = new CategoriaRepository()

