const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

class UserRepository {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', auth, userController.getAll);
        this.router.get('/:id', auth, userController.getById);
        this.router.post('/', auth, userController.create);
        this.router.put('/:id', auth, userController.update);
        this.router.delete('/:id', auth, userController.delete);
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = new UserRepository();