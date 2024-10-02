function protegerRotaUsuario(request, response, next) {

  console.log('Usuário autenticado com sucesso!', request.session.usuario);
  if(request.session.usuario) {
    next();
  } else {
    response.redirect("/");
  }
}

function protegerRotaAdmin(request, response, next) {
  if(request.session.usuario && request.session.usuario.cargo == "admin") {
    next();
  } else {
    response.redirect("/");
  }
}

module.exports = {
  protegerRotaUsuario,
  protegerRotaAdmin
}