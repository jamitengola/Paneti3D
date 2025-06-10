// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3002;

// Serve arquivos estáticos da pasta atual
app.use(express.static(__dirname));

// Rota padrão para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
