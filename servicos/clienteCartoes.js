const restify = require('restify-clients');

function ClienteCartoes() {
  this._cliente = restify.createJsonClient({url: 'http://localhost:3001', version: '~1.0'} );
}

ClienteCartoes.prototype.autoriza = function(cartao, callback) {
  this._cliente.post('/cartoes/autoriza', cartao, callback);
}

module.exports = function() {
  return ClienteCartoes;
}
