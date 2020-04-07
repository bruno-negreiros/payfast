
module.exports = function(app) {
  app.get('/pagamentos', function(req, resp) {
    console.log('Requisição GET interceptada na rota /pagamentos.')
    resp.send('OK.');
  });

  app.put('/pagamentos/pagamento/:id', function(req, resp) {
    const id = req.params['id'];
    var pagamento = {};
    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';

    pagamentoDao.atualiza(pagamento, function(erro, resultado) {
      if(erro) {
        resp.status(500).send(erro);
        return
      }
      resp.status(200).send(pagamento);
    });
  });

  app.post('/pagamentos/pagamento', function(req, resp) {
    console.log('Requisição POST interceptada na rota /pagamentos/pagamento.');

    req.assert('forma_de_pagamento', 'Obrigatório informar forma de pagamento.').notEmpty();
    req.assert('valor', 'Obrigatório informar o valor e o mesmo deve ser um decimal').notEmpty().isFloat();
    req.assert('moeda', 'Obrigatório informar a moeda e a mesma deve ter 3 caracteres').notEmpty().len(3,3);

    var errors = req.validationErrors();

    if (errors) {
      console.log('Erros na validação encontrados.');
      resp.status(400).send(errors);
      return;
    }
    console.log('Processando pagamento.');

    var pagamento = req.body;

    pagamento.status = "CRIADO";
    pagamento.data = new Date;

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado) {
      if (erro) {
        console.log('Erro ao salvar no banco: ' + erro);
        resp.status(500).send(erro);
      } else {
        console.log('pagamento criado');
        resp.status(201).json(pagamento);
        resp.location('/pagamentos/pagamento/' + resultado.insertId);
      }
    });
  });

}
