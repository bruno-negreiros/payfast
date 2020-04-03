
module.exports = function(app) {
  app.get('/pagamentos', function(req, resp) {
    console.log('Requisição GET interceptada na rota /pagamentos.')
    resp.send('OK.');
  });

  app.post('/pagamentos/pagamento', function(req, resp) {
    resp.send('OK');
    console.log(req.body);
  });
}
