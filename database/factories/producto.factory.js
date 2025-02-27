const { faker } = require("@faker-js/faker")

class ProductFactory {
    static create(proveedorIds, categoriaIds, overrides = {}) {
        const defaultProduct = {
            nombre: faker.commerce.productName().substring(0, 50),
            descripcion: faker.commerce.productDescription().substring(0, 50),
            imagen: faker.image.url().substring(0, 50),
            categoriaId: faker.helpers.arrayElement(categoriaIds),
            proveedorId: faker.helpers.arrayElement(proveedorIds),
            precio: faker.number.int({ min: 100, max: 10000 }),
            stock: faker.number.int({ min: 0, max: 1000 }),
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        return { ...defaultProduct, ...overrides }
    }

    static createMany(count, proveedorIds, categoriaIds, overrides = {}) {
        return Array.from({ length: count }, () => this.create(proveedorIds, categoriaIds, overrides))
    }
}

module.exports = ProductFactory

