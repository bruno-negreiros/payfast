
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
      resp.status(200).json(pagamento);
      console.log('Pagamento confirmado.');
    });
  });

  app.delete('/pagamentos/pagamento/:id', function(req, resp) {
    const id = req.params.id;
    pagamento = {};
    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    pagamentoDao.atualiza(pagamento, function(erro, resultado) {
      if(erro) {
        resp.status(500).send(erro);
        return;
      }
      resp.status(204).json(pagamento);
      console.log('Pagamento cancelado.');
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
        pagamento.id = resultado.insertId;
        const response = {
          dadosPagamento: pagamento,
          links: [
            {
              href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
              rel: 'Confirmar',
              method: 'PUT'
            },
            {
              href: `http://localhost:3000/pagamentos/pagamento/${pagamento.id}`,
              rel: 'Cancelar',
              method: 'DELETE'
            }
          ]
        };

        console.log('Pagamento criado.');
        resp.location('/pagamentos/pagamento/' + pagamento.id // location tem que ser setado antes de enviar a resposta.
        resp.status(201).json(response);
      }
    });
  });

}
