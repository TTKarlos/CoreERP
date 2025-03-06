const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Categoria = sequelize.define(
    "Categorias",
    {
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
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: false,
    },
)

Categoria.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.createdAt
    delete values.updatedAt
    return values
}

module.exports = Categoria

