const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Productos = sequelize.define("Productos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Categorias",
            key: "id",
        },
    },
    proveedorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Proveedores",
            key: "id",
        },
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Productos

