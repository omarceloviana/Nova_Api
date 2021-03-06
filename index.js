const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});
app.use(express.json({ extended: true }));
//Ler no arquivo
const readFile = () => {
  const content = fs.readFileSync("./Data/itens.json", "utf-8");
  return JSON.parse(content);
};
//Escrever no arquivo
const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync("./Data/itens.json", updateFile, "utf-8");
};
//Rota GET para visualizar os dados do arquivo Json
router.get("/", function (req, res) {
  const content = readFile();
  res.send(content);
});

//Rota Post para inserir dados do arquivo Json
router.post("/", function (req, res) {
  const currentContent = readFile();
  const nome = req.body.nome;
  const endereço = req.body.endereço;
  const cep = req.body.cep;
  const nascimento = req.body.nascimento;
  const telefone = req.body.telefone;

  //Cria um id aleatório e diferente para cada objeto_
  const id = Math.random().toString(32).substr(2.9);
  currentContent.push({ id, nome, endereço, cep, nascimento, telefone });
  console.log(currentContent);
  writeFile(currentContent);
  res.send(currentContent);
});

//Rota PUT para alterar dados no arquivo Json
router.put("/:id", function (req, res) {
  const { id } = req.params;
  const nome = req.body.nome;
  const endereço = req.body.endereço;
  const cep = req.body.cep;
  const nascimento = req.body.nascimento;
  const telefone = req.body.telefone;

  const currentContent = readFile();
  const selectedItem = currentContent.findIndex((item) => item.id === id);

  const {
    id: cId,
    nome: cNome,
    endereço: cEndereço,
    cep: cCep,
    nascimento: cNascimento,
    telefone: cTelefone,
  } = currentContent[selectedItem];

  const newObject = {
    id: cId,
    nome: cNome ? nome : cNome,
    endereço: cEndereço ? endereço : cEndereço,
    cep: cCep ? cep : cCep,
    nascimento: cNascimento ? nascimento : cNascimento,
    telefone: cTelefone ? telefone : cTelefone,
  };

  currentContent[selectedItem] = newObject;
  writeFile(currentContent);
  res.send(currentContent);
});

//Rota DELETE para deletar dados do arquivo Json
router.delete("/:id", function (req, res) {
  const { id } = req.params;
  const currentContent = readFile();
  const selectedItem = currentContent.findIndex((item) => item.id === id);
  currentContent.splice(selectedItem, 1);
  writeFile(currentContent);
  res.send(true);
});
//Determina que a aplicação vai ser rodada na porta 8080
app.use(router);
app.listen(8080, function () {
  console.log("Servidor iniciado na porta 8080");
});
