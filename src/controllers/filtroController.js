var filtroModel = require("../models/filtroModel")


function getFiltro(req, res){
    const id = req.params.fkEmpresa

    filtroModel.getFiltro(id).then( function (resultado){
        res.status(201).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function getByIdFiltro(req, res){
    const id = req. params.idFiltro

    filtroModel.getByIdFiltro(id).then(function (resultado){
        res.status(201).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function insertFiltro(req, res){
    const fkEmpresa = req.body.fkEmpresa
    const nome = req.body.nome
    const data_chegada = req.body.data_chegada
    const fk_continente = req.body.fk_continente
    const fk_pais = req.body.fk_pais
    const fk_via = req.body.fk_via
    const fk_federacao_brasil = req.body.fk_federacao_brasil

    filtroModel.insertFiltro(fkEmpresa, nome, data_chegada, fk_continente, fk_pais, fk_via,fk_federacao_brasil).then(function(resultado){
        res.status(201).json(resultado);
    }).catch(function (erro){
        res.status(500).json(erro.sqlMessage)
    })
}

function updateFiltro(req, res){
    
    const idFiltro = req.body.idFiltro
    const nome = req.body.nome
    const data_chegada = req.body.data_chegada
    const fk_continente = req.body.fk_continente
    const fk_pais = req.body.fk_pais
    const fk_via = req.body.fk_via
    const fk_federacao_brasil = req.body.fk_federacao_brasil
    filtroModel.updateFiltro(idFiltro, nome, data_chegada, fk_continente, fk_pais, fk_via, fk_federacao_brasil).then(function(resultado){
        res.status(201).json(resultado);
    }).catch(function (erro){
        res.status(500).json(erro.sqlMessage)
    })
}

function deleteFiltro(req, res){
    const id = req.params.idFiltro

    filtroModel.deleteFiltro(id).then(function(resultado){
        res.status(201).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

module.exports = {
    getFiltro,
    getByIdFiltro,
    insertFiltro,
    updateFiltro,
    deleteFiltro
} 