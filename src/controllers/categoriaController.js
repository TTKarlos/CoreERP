const { Categoria, Productos } = require('../models');
const AppError = require("../utils/appError");
const { Op } = require("sequelize");

exports.getAll = async (req, res, next) => {
    try {
        const categorias = await Categoria.findAll({
            where: {
                activo: true
            }
        });

        res.status(200).json({
            success: true,
            count: categorias.length,
            data: categorias,
            message: "Categorías encontradas exitosamente!",
        });
    } catch (error) {
        next(new AppError("Error fetching categorías", 500));
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            return next(new AppError(`Categoría with id ${id} not found`, 404));
        }

        res.status(200).json({
            success: true,
            data: categoria,
            message: "Categoría encontrada exitosamente!",
        });
    } catch (error) {
        next(new AppError("Error fetching categoría", 500));
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nombre } = req.body;

        const existingCategoria = await Categoria.findOne({
            where: { nombre }
        });

        if (existingCategoria) {
            return next(new AppError("Ya existe una categoría con ese nombre", 400));
        }

        const categoria = await Categoria.create(req.body);

        res.status(201).json({
            success: true,
            data: categoria,
            message: "Categoría creada exitosamente!",
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return next(new AppError("Ya existe una categoría con ese nombre", 400));
        }
        next(new AppError("Error creating categoría", 500));
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return next(new AppError(`Categoría with id ${id} not found`, 404));
        }

        // Verificar si ya existe otra categoría con el mismo nombre
        if (nombre) {
            const existingCategoria = await Categoria.findOne({
                where: {
                    nombre,
                    id: { [Op.ne]: id }
                }
            });

            if (existingCategoria) {
                return next(new AppError("Ya existe una categoría con ese nombre", 400));
            }
        }

        await categoria.update(req.body);

        res.status(200).json({
            success: true,
            data: categoria,
            message: "Categoría actualizada exitosamente!",
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return next(new AppError("Ya existe una categoría con ese nombre", 400));
        }
        next(new AppError("Error updating categoría", 500));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return next(new AppError(`Categoría with id ${id} not found`, 404));
        }

        const productos = await Productos.findAll({
            where: {
                categoriaId: id
            }
        });

        if (productos && productos.length > 0) {
            return next(new AppError("No se puede eliminar la categoría porque tiene productos asociados", 400));
        }

        await categoria.destroy();

        res.status(200).json({
            success: true,
            message: `Categoría con id: ${id} eliminada exitosamente!`,
        });
    } catch (error) {
        next(new AppError("Error deleting categoría", 500));
    }
};

exports.softDelete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return next(new AppError(`Categoría with id ${id} not found`, 404));
        }

        await categoria.update({ activo: false });

        res.status(200).json({
            success: true,
            message: `Categoría con id: ${id} desactivada exitosamente!`,
        });
    } catch (error) {
        next(new AppError("Error deactivating categoría", 500));
    }
};

exports.getProductosByCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return next(new AppError(`Categoría with id ${id} not found`, 404));
        }

        const productos = await Productos.findAll({
            where: {
                categoriaId: id
            },
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['id', 'nombre']
                }
            ]
        });

        res.status(200).json({
            success: true,
            count: productos.length,
            data: productos,
            message: `Productos de la categoría ${categoria.nombre} encontrados exitosamente!`,
        });
    } catch (error) {
        next(new AppError("Error fetching productos por categoría", 500));
    }
};
