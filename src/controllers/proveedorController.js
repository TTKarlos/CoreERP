const Proveedor = require('../models/proveedores');
const AppError = require("../utils/appError")
const { Op } = require("sequelize")

exports.getAll = async (req, res, next) => {
    try {
        const proveedores = await Proveedor.findAll()
        res.status(200).json({
            success: true,
            count: proveedores.length,
            data: proveedores,
            message: "Proveedores encontrados exitosamente!",
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

        // Verificar si ya existe otro proveedor con el mismo nombre o email
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

        // Verificar si el proveedor tiene productos asociados
        const productos = await proveedor.getProductos()
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

