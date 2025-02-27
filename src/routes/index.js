const express = require("express")
const authRepository = require("./auth.repository")
const userRepository = require("./user.repository")
const productoRepository = require("./producto.repository")
const proveedorRepository = require("./proveedor.repository")

class RepositoryIndex {
    constructor() {
        this.router = express.Router()
        this.setupRoutes()
    }

    setupRoutes() {
        this.router.use("/auth", authRepository.getRoutes())
        this.router.use("/users", userRepository.getRoutes())
        this.router.use("/productos", productoRepository.getRoutes())
        this.router.use("/proveedores", proveedorRepository.getRoutes())
    }

    getRoutes() {
        return this.router
    }
}

module.exports = new RepositoryIndex()

