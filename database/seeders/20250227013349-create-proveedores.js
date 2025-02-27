const ProveedorFactory = require("../factories/proveedor.factory")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const predefinedProveedores = [
      {
        nombre: "TechnoWorld",
        direccion: "Calle Innovación 123, Ciudad Tecnológica",
        telefono: "+34 911 234 567",
        email: "info@technoworld.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Moda Elegante",
        direccion: "Avenida del Estilo 456, Ciudad de la Moda",
        telefono: "+34 922 345 678",
        email: "contacto@modaelegante.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Hogar y Más",
        direccion: "Plaza del Confort 789, Villa Hogareña",
        telefono: "+34 933 456 789",
        email: "ventas@hogarymas.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Deportes Extremos",
        direccion: "Calle de la Aventura 101, Ciudad Deportiva",
        telefono: "+34 944 567 890",
        email: "info@deportesextremos.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Librería Sabiduría",
        direccion: "Paseo de los Libros 202, Villa Literaria",
        telefono: "+34 955 678 901",
        email: "pedidos@libreriasabiduria.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Alimentos Naturales",
        direccion: "Avenida Orgánica 303, Eco Ciudad",
        telefono: "+34 966 789 012",
        email: "ventas@alimentosnaturales.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Electro Innovación",
        direccion: "Calle del Futuro 404, Tecno Villa",
        telefono: "+34 977 890 123",
        email: "soporte@electroinnovacion.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Muebles Confort",
        direccion: "Bulevar del Descanso 505, Ciudad Mueble",
        telefono: "+34 988 901 234",
        email: "info@mueblesconfort.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Juguetes Felices",
        direccion: "Calle de la Diversión 606, Villa Infantil",
        telefono: "+34 999 012 345",
        email: "ventas@juguetesfelices.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Jardín Verde",
        direccion: "Avenida de las Flores 707, Ciudad Jardín",
        telefono: "+34 900 123 456",
        email: "info@jardinverde.com",
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const randomProveedores = ProveedorFactory.createMany(5)

    const allProveedores = [...predefinedProveedores, ...randomProveedores]

    await queryInterface.bulkInsert("Proveedores", allProveedores, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Proveedores", null, {})
  },
}

