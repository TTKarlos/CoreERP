const { faker } = require("@faker-js/faker");

class ProductFactory {
    static create(overrides = {}) {
        const defaultProduct = {
            nombre: faker.commerce.productName().substring(0, 50),
            descripcion: faker.commerce.productDescription().substring(0, 50),
            imagen: faker.image.url().substring(0, 50),
            categoria: faker.commerce.department().substring(0, 50),
            proveedor: faker.company.name().substring(0, 50),
            precio: faker.number.int({ min: 100, max: 10000 }),
            stock: faker.number.int({ min: 0, max: 1000 }),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return { ...defaultProduct, ...overrides };
    }

    static createMany(count, overrides = {}) {
        return Array.from({ length: count }, () => this.create(overrides));
    }
}

module.exports = ProductFactory;
