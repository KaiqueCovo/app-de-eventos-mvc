const eventoModel = require('../models/eventoModel')

function exibirPaginaEventos(request, response) {

  const eventos = eventoModel.obterEventos();

  console.log('eventos', eventos)
  response.render("eventos", { eventos });
}

function exibirPaginaCriarEvento(request, response) {
  response.render("criarEvento");
}

function adicionarEvento(request, response) {
  const { titulo, local, data } = request.body;

  eventoModel.adicionarEvento(titulo, local, data);

  // response.redirect("/eventos");
}

module.exports = {
  exibirPaginaEventos,
  exibirPaginaCriarEvento,
  adicionarEvento
};
