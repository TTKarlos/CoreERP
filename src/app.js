require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const sequelize = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const repositoryIndex = require('./routes/index');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', repositoryIndex.getRoutes());


app.use(errorHandler);

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(error => console.error('Error synchronizing database:', error));

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});