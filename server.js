const express = require('express');
const app = express();
const authorsRouter = require('./src/routes/authors.routes');
const postsRouter = require('./src/routes/posts.routes');
const {errorHandler} = require('./src/middlewares/errorHandler')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./openapi.yaml');


app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/authors', authorsRouter);

app.use('/posts', postsRouter);

app.use(errorHandler);

module.exports = app;