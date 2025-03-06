const Productos = require("./productos")
const Proveedores = require("./proveedores")
const Categoria = require("./categoria")

Productos.belongsTo(Proveedores, { foreignKey: "proveedorId", as: "proveedor" })
Proveedores.hasMany(Productos, { foreignKey: "proveedorId", as: "productos" })

Productos.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" })
Categoria.hasMany(Productos, { foreignKey: "categoriaId", as: "productos" })

module.exports = {
    Productos,
    Proveedores,
    Categoria,
}

