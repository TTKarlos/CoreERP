const { faker } = require("@faker-js/faker")

class ProveedorFactory {
    static create(overrides = {}) {
        const defaultProveedor = {
            nombre: faker.company.name().substring(0, 100),
            direccion: faker.location.streetAddress().substring(0, 200),
            telefono: faker.phone.number().substring(0, 20),
            email: faker.internet.email().substring(0, 100),
            activo: faker.datatype.boolean(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        return { ...defaultProveedor, ...overrides }
    }

    static createMany(count, overrides = {}) {
        return Array.from({ length: count }, () => this.create(overrides))
    }
}

module.exports = ProveedorFactory

