const { faker } = require("@faker-js/faker")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const categorias = Array.from({ length: 5 }, () => ({
            nombre: faker.commerce.department(),
            descripcion: faker.lorem.sentence(),
            activo: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        }))

        await queryInterface.bulkInsert("Categorias", categorias, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Categorias", null, {})
    },
}

