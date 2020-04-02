const express = require('express');
const app = express();

app.listen(3000, function() {
  console.log('Servidor rodando na porta 3000!');
});

app.get('/teste', function(req, resp) {
  console.log('Requisição GET interceptada na rota /teste.')
  resp.send('OK.');
});
