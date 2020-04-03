
module.exports = function(app) {
  app.get('/pagamentos', function(req, resp) {
    console.log('Requisição GET interceptada na rota /pagamentos.')
    resp.send('OK.');
  });

  app.post('/pagamentos/pagamento', function(req, resp) {
    console.log('Requisição POST interceptada na rota /pagamentos/pagamento.')
    var pagamento = req.body;

    pagamento.status = "CRIADO";
    pagamento.data = new Date;

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado) {
      console.log('pagamento criado');
      resp.json(pagamento);
    });
  });

}
