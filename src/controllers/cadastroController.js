const usuarioModel = require('../models/usuarioModel')

// Responsável por renderizar a página de cadastro de usuários
function exibirPaginaCadastro(request, response) {
  response.render('cadastro');
}

// Responsável por adicionar um novo usuário
function adicionarUsuario(request, response) {
  console.log(request.body);

  // Extrair os dados do corpo da requisição
  const { nome, email, senha } = request.body;


  // Adicionar o usuário
  usuarioModel.adicionarUsuario(nome, email, senha)

  // Redirecionar para a página de login
  response.redirect('/');
}

module.exports = {
  exibirPaginaCadastro,
  adicionarUsuario
}