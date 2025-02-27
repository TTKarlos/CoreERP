const Productos = require("../models/productos")
const AppError = require("../utils/appError")

exports.getAll = async (req, res, next) => {
    try {
        const productos = await Productos.findAll()

        res.status(200).json({
            success: true,
            count: productos.length,
            data: productos,
            message: "Productos encontrados exitosamente!",
        })
    } catch (error) {
        next(new AppError("Error fetching productos", 500))
    }
}

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const producto = await Productos.findByPk(id)

        if (!producto) {
            return next(new AppError(`Producto with id ${id} not found`, 404))
        }

        res.status(200).json({
            success: true,
            data: producto,
            message: "Producto encontrado exitosamente!",
        })
    } catch (error) {
        next(new AppError("Error fetching producto", 500))
    }
}

exports.create = async (req, res, next) => {
    try {
        const producto = await Productos.create(req.body)

        res.status(201).json({
            success: true,
            data: producto,
            message: "Producto creado exitosamente!",
        })
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return next(new AppError("Ya existe un producto con ese nombre", 400))
        }
        next(new AppError("Error creating producto", 500))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params

        const producto = await Productos.findByPk(id)
        if (!producto) {
            return next(new AppError(`Producto with id ${id} not found`, 404))
        }

        await producto.update(req.body)

        res.status(200).json({
            success: true,
            data: producto,
            message: "Producto actualizado exitosamente!",
        })
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return next(new AppError("Ya existe un producto con ese nombre", 400))
        }
        next(new AppError("Error updating producto", 500))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params

        const producto = await Productos.findByPk(id)
        if (!producto) {
            return next(new AppError(`Producto with id ${id} not found`, 404))
        }

        await producto.destroy()

        res.status(200).json({
            success: true,
            message: `Producto con id: ${id} eliminado exitosamente!`,
        })
    } catch (error) {
        next(new AppError("Error deleting producto", 500))
    }
}

