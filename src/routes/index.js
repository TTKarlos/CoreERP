const express = require('express');
const authRepository = require('./auth.repository');
const userRepository = require('./user.repository');
const testRepository = require('./test.repository');

class RepositoryIndex {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.use('/auth', authRepository.getRoutes());
        this.router.use('/users', userRepository.getRoutes());
        this.router.use('/test', testRepository.getRoutes());
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = new RepositoryIndex();