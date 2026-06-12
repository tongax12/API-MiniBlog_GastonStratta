require('dotenv').config();
const { loadEnvFile } = require('node:process');
const express = require('express');
const authorsRouter = require('./src/routes/authors.routes');
const postsRouter = require('./src/routes/posts.routes');
loadEnvFile('.env');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);

