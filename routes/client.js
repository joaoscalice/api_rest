var express = require('express')
var router = express.Router()

var ClientModel = require("../model/Clients")

let getClient = (req, res, next) => {
    let id = req.params.id
    let obj = ClientModel.getElementById(id)
    if (obj == null) {
        res.status(404).json({status: false, error:"Cliente não encontrado"})
    }
    req.client = obj
    next()
}

let validaNome = (req, res, next) => {
    let {nome} = req.body
    if (nome == undefined || nome == null || nome == "") {
        res.status(400).json({status: false, error: "O nome nao foi informado"})
    }

    if (nome.length < 3) {
        res.status(400).json({status: false, error: "O nome do cliente deve ser maior do que 3 caracters"})
    }

    req.nome = nome
    next()
}

let validaEmail = (req, res, next) => {
    let {email} = req.body
    if (email == undefined || email == null || email == "" || email.indexOf("@") == -1) {
        res.status(400).json({status: false, error: "O email nao foi informado ou inválido"})
    }

    if (email.length < 3) {
        res.status(400).json({status: false, error: "O email do cliente deve ser maior do que 3 caracters"})
    }

    req.email = email
    next()
}

let validaPhone = (req, res, next) => {
    let {celular} = req.body
    if (celular == undefined || celular == null || celular == "" || celular.length < 8) {
        res.status(400).json({status: false, error: "O telefone nao foi informado"})
    }

    req.celular = celular
    next()
}

router.get("/", (req, res) => {
    if (ClientModel.list() == ''){
        res.status(404).json({status: 404, error:"Nenhum cliente encontrado"})
    } 

    res.json({status: 200, Clients: ClientModel.list()})
})

router.get("/:id", getClient, (req, res) => {
    res.json({status: true, Client: req.client})
})

router.post("/", validaNome, validaEmail, validaPhone, (req, res) => {
    res.json({status:true, Client: ClientModel.new(req.nome, req.email, req.phone)})
})

router.put("/:id", validaNome, validaEmail, validaPhone, getClient,  (req, res) => {
    res.json({status:true, Client: ClientModel.update(req.client.id, req.nome, req.email, req.phone)})
})

router.delete("/:id", getClient, (req, res) => {
    ClientModel.delete(req.params.id)
    res.json({status: true, oldclient: req.client})
})

module.exports = router