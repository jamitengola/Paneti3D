// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para logging de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configurar tipos MIME específicos
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  } else if (req.url.endsWith('.mp3')) {
    res.type('audio/mpeg');
  } else if (req.url.endsWith('.pdf')) {
    res.type('application/pdf');
  }
  next();
});

// Middleware para verificar a existência de PDFs
app.use((req, res, next) => {
  if (req.url.endsWith('.pdf')) {
    const pdfPath = path.join(__dirname, req.url);
    if (!fs.existsSync(pdfPath)) {
      console.error(`PDF não encontrado: ${pdfPath}`);
      return res.status(404).send('PDF não encontrado');
    }
  }
  next();
});

// Servir arquivos estáticos da pasta atual
app.use(express.static(__dirname, {
  maxAge: '1h',
  etag: true
}));

// Rota padrão para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).send();
});

// Rota de fallback para manipular 404
app.use((req, res) => {
  console.log(`404: ${req.url}`);
  res.status(404).send('Arquivo não encontrado');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
