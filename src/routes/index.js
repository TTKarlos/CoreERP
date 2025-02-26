const express = require('express');
const authRepository = require('./auth.repository');
const userRepository = require('./user.repository');

class RepositoryIndex {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.use('/auth', authRepository.getRoutes());
        this.router.use('/users', userRepository.getRoutes());
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = new RepositoryIndex();