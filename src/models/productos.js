const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ROLES } = require('../utils/constants');

const Productos = sequelize.define('Productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    proveedor: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});
module.exports = Productos;
