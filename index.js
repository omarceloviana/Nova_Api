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
    writeFileSync("./Data/itens.json",updateFile,"utf-8");
}

router.get('/',function(req,res){
    const content = readFile();
    res.send(content);
});

router.post('/',function(req,res){
    const currentContent = readFile();
    const {id,nome,endereço,cep,data_de_nascimento} = req.body;
    const ident = Match.random().toString(32);
    currentContent.push({id,nome,endereço,cep,data_de_nascimento});
    writeFile(currentContent);
    res.send(currentContent);
})

router.put('/:id',function(req,res){

});

app.use(router);
app.listen(8080,function(){
    console.log('Servidor iniciado na porta 8080');
})

