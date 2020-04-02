
module.exports = function(app) {
  app.get('/teste', function(req, resp) {
    console.log('Requisição GET interceptada na rota /teste.')
    resp.send('OK.');
  });
}
