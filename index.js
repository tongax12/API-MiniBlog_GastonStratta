try {
  const { loadEnvFile } = require('node:process');
  loadEnvFile('.env');
} catch (error) {
  // en producción no hay .env, Railway usa sus propias variables
}

const app = require('./server');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server en puerto ${port}`));
