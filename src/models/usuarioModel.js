const md5 = require("md5");

// Importando a conexão com o banco de dados
const pool = require("../config/banco-de-dados");

const usuarios = [];

function adicionarUsuario(nome, email, senha) {
  // usuarios.push({
  //   id: Date.now(),
  //   nome: nome,
  //   email: email,
  //   senha: md5(senha),
  //   criadoEm: new Date()
  // })

  // console.log(usuarios)

  // Criptografando a senha do usuário
  const senhaCriptografada = md5(senha);

  // Adiciona um novo usuário no banco de dados
  pool
    .query(
      `INSERT INTO usuarios(nome, email, senha, criadoEm) VALUES ('${nome}', '${email}', '${senhaCriptografada}', NOW() )`
    )
    .then(() => {
      console.log("DEU CERTO");
    })
    .catch((error) => {
      console.error("ERRO AO INSERIR DADOS", error);
    });
}

module.exports = {
  adicionarUsuario,
};
