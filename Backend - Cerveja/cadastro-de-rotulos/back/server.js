const express = require ('express')
const bodyparser = require ('body-parser')
const { text } = require('body-parser')
const app = express ()

app.use (express.json())

app.get ("/", (req, res) => {
    res.send ("Ola")
})

app.post ("/envio", (req, res) => {
    const { nome, email, telefone, endereco, rotulo} = req.body

    if(!nome){
    res.status(400).send ("Insira seu nome")
    }

    if(!email){
    res.status(400).send ("Insira seu email")
    }

    if(!telefone){
    res.status(400).send ("Insira seu telefone")
    }

    if(!endereco){
    res.status(400).send ("Insira seu endereco")
    }

    if(!rotulo){
    res.status(400).send ("Insira seu rotulo")    
    }

})

app.listen (3000, () => console.log ("conectado"))
