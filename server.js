const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Serve tudo que estiver na pasta /public (HTML, CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal → entrega o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`💌 Servidor rodando em http://localhost:${PORT}`);
});
