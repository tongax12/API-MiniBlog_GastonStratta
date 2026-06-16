
const { loadEnvFile } = require('node:process');
loadEnvFile('.env');
const app = require('./server');

const PORT = process.env.PORT || 3000;  

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);  
});