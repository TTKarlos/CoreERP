module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categorias = [
      {
        nombre: "Electrónicos",
        descripcion: "Productos electrónicos y gadgets",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Ropa",
        descripcion: "Prendas de vestir y accesorios",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Hogar",
        descripcion: "Artículos para el hogar y decoración",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Deportes",
        descripcion: "Equipamiento y ropa deportiva",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Libros",
        descripcion: "Libros, revistas y material de lectura",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Alimentos",
        descripcion: "Productos alimenticios y bebidas",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await queryInterface.bulkInsert("Categorias", categorias, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categorias", null, {})
  },
}

