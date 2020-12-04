const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
app.use(express.json({extended: true}));

const readFile = () => {
    const content = fs.readFileSync('./Data/itens.json','utf-8');
    return (JSON.parse(content));
}

const WriteFile = content => {
    const updateFile = JSON.stringify(content);
    fs.writeFileSync("./Data/itens.json",updateFile,"utf-8");
}

router.get('/',function(req,res){
    const content = readFile();
    res.send(content);
});

router.post('/',function(req,res){
    const currentContent = readFile();
    const nome = req.body.nome;
    const endereço = req.body.endereço;
    const cep = req.body.cep;
    const nascimento = req.body.nascimento;

    const id = Math.random().toString(32).substr(2.9);
    currentContent.push({nome,endereço,cep,nascimento});
    writeFile(currentContent);
    res.send(currentContent);
})

router.put('/:id',function(req,res){
    const {id} = req.params;
    const nome = req.body.nome;
    const endereço = req.body.endereço;
    const cep = req.body.cep;
    const nascimento = req.body.nascimento;
   
    const currentContent = readFile();
    const selectedItem = currentContent.findIndex ((item) => item.id === id);

    const {id: cId, nome: cNome, cep: cCep, nascimento: cNascimento} = currentContent[selectedItem];
    
    const newObject = {
        id: cId,
        nome: cNome ? nome: cNome,
        cep: cCep ? cep: cCep,
        nascimento: cNascimento ? nascimento: cNascimento,
    };

    currentContent[selectedItem] = newObject;
    writeFile(currentContent);
    res.send(newObject);
});

router.delete('/:id',function(req,res){
    const {id} = req.params;
    const currentContent = readFile();
    const selectedItem = currentContent.findIndex ((item) => item.id === id);
    currentContent.splice(selectedItem, 1);
    writeFile(currentContent);
    res.send(true);
})

app.use(router);
app.listen(8080,function(){
    console.log('Servidor iniciado na porta 8080');
})

