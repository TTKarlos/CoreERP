const ProductFactory = require("../factories/producto.factory")

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const [proveedorIds] = await queryInterface.sequelize.query("SELECT id FROM Proveedores;")

    const [categoriaIds] = await queryInterface.sequelize.query("SELECT id FROM Categorias;")

    const products = ProductFactory.createMany(
        50,
        proveedorIds.map((p) => p.id),
        categoriaIds.map((c) => c.id),
    )

    return queryInterface.bulkInsert("Productos", products)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Productos", null, {})
  },
}

