const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Proveedores = sequelize.define("Proveedores", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

module.exports = Proveedores

