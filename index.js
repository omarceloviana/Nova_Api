const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const { Server } = require('tls');
app.use(express.json({extended: true}));

const readFile = () => {
    const content = fs.readFileSynic('./data/itens.json','utf-8');
    return (JSON.parse(content));
}

const WriteFile = (content) => {
    const updateFile = JSON.stringify(content);
    fs.writeFileSync('./data/itens.json',updateFile,'utf-8');
}

router.get('/',function(req,res){
    const content = readFile();
    res.send(content);
});

router.post('/',function(req,res){
    const currentContent = readFile();
    const {id,nome,endereço,cep,data_de_nascimento} = req.body;
    currentContent.push({id,nome,endereço,cep,data_de_nascimento});
    fs.writeFile(currentContent);
    res.send(currentContent);
})

app.use(router);
app.listen(8080,function(){
    console.log('Servidor iniciado na porta 8080');
})

