const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    const { nome, email, telefone, endereco, descricao} = req.body

    if(!nome){
        res.status(400).send("Insira seu nome")
    }

    if(!email){
        res.status(400).send("Insira seu email")
    }

    if(!telefone){
        res.status(400).send("Insira seu telefone")
    }

    if(!endereco){
        res.status(400).send("Insira seu endereco")
    }

    res.send(req.body)
})

module.exports = router