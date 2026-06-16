const express = require('express');
const app = express();
const authorsRouter = require('./src/routes/authors.routes');
const postsRouter = require('./src/routes/posts.routes');
const {errorHandler} = require('./src/middlewares/errorHandler')


app.use(express.json());

app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);

app.use(errorHandler);

module.exports = app;