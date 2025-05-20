var baseDadosModel = require("../models/baseDadosModel")

function getPais(req, res){
    baseDadosModel.getPais().then(function(resultado){
        res.status(201).json(resultado)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

function getContinente(req, res){
    baseDadosModel.getContinente().then(function(resultado){
        res.status(201).json(resultado)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

function getVia(req, res){
    baseDadosModel.getVia().then(function(resultado){
        res.status(201).json(resultado)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

function getFederacaoBrasil(req, res){
    baseDadosModel.getFederacaoBrasil().then(function(resultado){
        res.status(201).json(resultado)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

module.exports = {
    getPais,
    getContinente,
    getFederacaoBrasil,
    getVia
}