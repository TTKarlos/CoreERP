const Productos = require("../models/productos")
const AppError = require("../utils/appError")


exports.getAll = async (req, res, next) => {
    try {
        const page = Number.parseInt(req.query.page) || 1
        const limit = Number.parseInt(req.query.limit) || 10

        const options = {
            page: page,
            paginate: limit,
            order: [["id", "ASC"]],
        }
        const { docs, pages, total } = await Productos.paginate(options)

        if (docs.length === 0 && total > 0) {
            return next(new AppError("Página vacía. No hay más productos disponibles.", 404))
        }


        res.status(200).json({
            success: true,
            count: docs.length,
            data: docs,
            message: "Productos encontrados exitosamente!",
            pagination: {
                totalItems: total,
                totalPages: pages,
                currentPage: page,
                itemsPerPage: limit,
                hasNextPage: page < pages,
                hasPrevPage: page > 1,
            },
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

