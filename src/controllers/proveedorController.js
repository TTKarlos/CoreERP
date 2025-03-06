const Proveedor = require('../models/proveedores');
const Producto = require('../models/productos');
const AppError = require("../utils/appError")
const { Op } = require("sequelize")
const {Categoria, Productos} = require("../models");

exports.getAll = async (req, res, next) => {
    try {
        const page = Number.parseInt(req.query.page) || 1
        const limit = Number.parseInt(req.query.limit) || 10

        const options = {
            page: page,
            paginate: limit,
            order: [["id", "ASC"]],
        }

        const { docs, pages, total } = await Proveedor.paginate(options)

        if (docs.length === 0 && total > 0) {
            return next(new AppError("Página vacía. No hay más proveedores disponibles.", 404))
        }

        res.status(200).json({
            success: true,
            count: docs.length,
            data: docs,
            message: "Proveedores encontrados exitosamente!",
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
        next(new AppError("Error fetching proveedores", 500))
    }
}


exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const proveedor = await Proveedor.findByPk(id)

        if (!proveedor) {
            return next(new AppError(`Proveedor with id ${id} not found`, 404))
        }

        res.status(200).json({
            success: true,
            data: proveedor,
            message: "Proveedor encontrado exitosamente!",
        })
    } catch (error) {
        next(new AppError("Error fetching proveedor", 500))
    }
}

exports.create = async (req, res, next) => {
    try {
        const { nombre, email } = req.body

        const existingProveedor = await Proveedor.findOne({
            where: {
                [Op.or]: [{ nombre }, { email }],
            },
        })

        if (existingProveedor) {
            return next(new AppError("El nombre o email del proveedor ya está registrado", 400))
        }

        const proveedor = await Proveedor.create(req.body)

        res.status(201).json({
            success: true,
            data: proveedor,
            message: "Proveedor creado exitosamente!",
        })
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return next(new AppError("Ya existe un proveedor con ese nombre o email", 400))
        }
        next(new AppError("Error creating proveedor", 500))
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { nombre, email } = req.body

        const proveedor = await Proveedor.findByPk(id)
        if (!proveedor) {
            return next(new AppError(`Proveedor with id ${id} not found`, 404))
        }

        if (nombre || email) {
            const existingProveedor = await Proveedor.findOne({
                where: {
                    [Op.or]: [nombre ? { nombre } : null, email ? { email } : null].filter(Boolean),
                    id: { [Op.ne]: id },
                },
            })

            if (existingProveedor) {
                return next(new AppError("El nombre o email del proveedor ya está registrado", 400))
            }
        }

        await proveedor.update(req.body)

        res.status(200).json({
            success: true,
            data: proveedor,
            message: "Proveedor actualizado exitosamente!",
        })
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return next(new AppError("Ya existe un proveedor con ese nombre o email", 400))
        }
        next(new AppError("Error updating proveedor", 500))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params

        const proveedor = await Proveedor.findByPk(id)
        if (!proveedor) {
            return next(new AppError(`Proveedor with id ${id} not found`, 404))
        }

        const productos = await Producto.findAll({
                where: {
                    proveedorId: id,
                },
            })
        if (productos && productos.length > 0) {
            return next(new AppError("No se puede eliminar el proveedor porque tiene productos asociados", 400))
        }
        await proveedor.destroy()

        res.status(200).json({
            success: true,
            message: `Proveedor con id: ${id} eliminado exitosamente!`,
        })
    } catch (error) {
        next(new AppError("Error deleting proveedor", 500))
    }
}

exports.getProductosByProveedor = async (req, res, next) => {
    try {
        const { id } = req.params
        const page = Number.parseInt(req.query.page) || 1
        const limit = Number.parseInt(req.query.limit) || 10

        const proveedor = await Proveedor.findByPk(id)
        if (!proveedor) {
            return next(new AppError(`Proveedor with id ${id} not found`, 404))
        }

        const options = {
            page: page,
            paginate: limit,
            where: { proveedorId: id },
            include: [
                {
                    model: Proveedor,
                    as: "proveedor",
                    attributes: ["id", "nombre"],
                },
            ],
            order: [["id", "ASC"]],
        }

        const { docs, pages, total } = await Productos.paginate(options)

        if (docs.length === 0 && total > 0) {
            return next(new AppError("Página vacía. No hay más productos disponibles para este proveedor.", 404))
        }

        res.status(200).json({
            success: true,
            count: docs.length,
            data: docs,
            message: `Productos del proveedor ${proveedor.nombre} encontrados exitosamente!`,
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
        next(new AppError("Error fetching productos por proveedor", 500))
    }
}

