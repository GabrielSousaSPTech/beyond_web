var eventoModel = require("../models/eventoModel");

function getEvento(req, res){
    const id = req.params.fkEmpresa
    
        eventoModel.getEventos(id).then( function(resultado){
            res.status(201).json(resultado)
        }).catch( function(erro){
            res.status(500).json(erro.sqlMessage);
        })
    
}

function getByIdEvento(req, res){
    const id = req.params.idEvento
    
        eventoModel.getByIdEvento(id).then( function(resultado){
            res.status(201).json(resultado)
        }).catch( function(erro){
            res.status(500).json(erro.sqlMessage);
        })
    
}

function insertEvento(req, res){
    const fkEmpresa = req.body.fkEmpresa;
    const nome = req.body.nome;
    const data_inicio = req.body.data_inicio;
    const data_termino = req.body.data_termino;
    const descricao = req.body.descricao;
    const cor = req.body.cor;
    eventoModel.insertEvento(fkEmpresa, nome, data_inicio, data_termino, descricao, cor).then( function(resultado){
        res.status(201).json(resultado);
    }).catch( function (erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function updateEvento(req,res){
    const idEvento = req.params.idEvento;
    const nome = req.body.nome;
    const data_inicio = req.body.data_inicio;
    const data_termino = req.body.data_termino;
    const descricao = req.body.descricao;
    const cor = req.body.cor;

    console.log(req.params)

    console.log(idEvento, nome, data_inicio, data_termino, descricao, cor);

    eventoModel.updateEvento(idEvento, nome, data_inicio, data_termino, descricao, cor).then( function(resultado){
        res.status(201).json(resultado);
    }).catch( function (erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function deleteEvento(req, res){
    const idEvento = req.params.idEvento;
    

    eventoModel.deleteEvento(idEvento).then( function(resultado){
        res.status(201).json(resultado)
    }).catch( function (erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    getEvento,
    getByIdEvento,
    insertEvento,
    updateEvento,
    deleteEvento
}