var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");

var enableHotReload = require("./hot-reload");

// Importando os controllers
var loginController = require("./controllers/loginController");
var cadastroController = require("./controllers/cadastroController");
var eventoController = require("./controllers/eventoController");

var autenticarMiddleware = require("./middlewares/autenticar");

const app = express();

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configurações do seu app Express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("Views path set to:", path.join(__dirname, "views"));

// Configuração de pasta pública
app.use(express.static(path.join(__dirname, "public")));


// Configuração do express-session
app.use(
  session({
    secret: "chave-super-secreta",
    resave: false,
    saveUninitialized: false,
  })
)

// Habilitar hot-reload
enableHotReload(app);

// Rotas

// Rota para a página inicial
app.get("/", loginController.exibirPaginaLogin);

// Rota para autenticar o usuário
app.post("/autenticar", loginController.autenticarUsuario)

// Rota para a página de cadastro
app.get("/criar-conta", cadastroController.exibirPaginaCadastro);

// Rota para criar um novo usuário
app.post("/criar-conta", cadastroController.adicionarUsuario)

// Rota para a página de lista de eventos
app.get("/eventos", autenticarMiddleware.protegerRotaUsuario, eventoController.exibirPaginaEventos);

// Rota para a página de criar evento
app.get("/criar-evento", autenticarMiddleware.protegerRotaAdmin,  eventoController.exibirPaginaCriarEvento);

// Rota para criar um novo evento
app.post("/criar-evento", autenticarMiddleware.protegerRotaAdmin, eventoController.adicionarEvento);

// Inicie o servidor
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
