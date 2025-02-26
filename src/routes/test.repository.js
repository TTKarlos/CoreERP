const express = require('express');
const testController = require('../controllers/testController');

class TestRepository {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get('/', testController.test);
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = new TestRepository();