const express = require('express');
const productoController = require('../controllers/productoController');
const auth = require('../middlewares/auth');
const validateRequest = require('../middlewares/validateRequest');
const productoSchema = require('../validations/productoSchema');

class ProductoRepository {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', auth,productoController.getAll);
        this.router.get('/:id', auth,productoController.getById);
        this.router.post('/', auth, validateRequest(productoSchema), productoController.create);
        this.router.put('/:id', auth, validateRequest(productoSchema), productoController.update);
        this.router.delete('/:id', auth, productoController.delete);
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = new ProductoRepository();
