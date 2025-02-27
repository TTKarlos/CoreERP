const ProductFactory = require("../factories/producto.factoy")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = ProductFactory.createMany(50) // Create 50 products
    return queryInterface.bulkInsert("Productos", products)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Productos", null, {})
  },
}

