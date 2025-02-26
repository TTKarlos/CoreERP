const User = require('../models/User');
const { Op } = require('sequelize');


// Controller object to group all user-related functions
const userController = {
    // Get all users
    getAll: async (req, res, next) => {
        try {
            const users = await User.findAll();

            if (users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }

            res.status(200).json({
                success: true,
                count: users.length,
                data: users,
                message: 'Usuarios encontrados exitosamente !'
            });
        } catch (error) {
            next(new Error('Error fetching users: ' + error.message));
        }
    },

    // Get a single user by ID
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: `User with id ${id} not found` });
            }

            res.status(200).json({
                success: true,
                data: user,
                message: 'Usuario encontrado exitosamente !'
            });
        } catch (error) {
            next(new Error('Error fetching user: ' + error.message));
        }
    },

    // Create a new user
    create: async (req, res, next) => {
        try {
            const { username, email, password, firstName, lastName, role } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Please provide username, email and password' });
            }
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ username }, { email }]
                }
            });

            if (existingUser) {
                return res.status(400).json({ message: 'El usuario o el correo electrónico ya están registrados.' });
            }


            const user = await User.create({ username, email, password, firstName, lastName, role });

            res.status(201).json({
                success: true,
                data: user,
                message: 'Usuario creado exitosamente !'
            });
        } catch (error) {
            next(new Error('Error creating user: ' + error.message));
        }
    },

    // Update a user
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { username, email } = req.body;

            let user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: `User with id ${id} not found` });
            }

            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ username }, { email }]
                }
            });

            if (existingUser) {
                return res.status(400).json({ message: 'El usuario o el correo electrónico ya están registrados.' });
            }

            user = await user.update({ username, email });

            res.status(200).json({
                success: true,
                data: user,
                message: 'Usuario actualizado exitosamente !'
            });
        } catch (error) {
            next(new Error('Error updating user: ' + error.message));
        }
    },

    // Delete a user
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: `User with id ${id} not found` });
            }

            await user.destroy();

            res.status(200).json({
                success: true,
                message: `User with id ${id} deleted`
            });
        } catch (error) {
            next(new Error('Error deleting user: ' + error.message));
        }
    }
};

module.exports = userController;