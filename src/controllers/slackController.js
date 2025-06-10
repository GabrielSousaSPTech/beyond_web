var slackModel = require('../models/slackModel')

function selectStatusSlack(req, res){
    slackModel.selectStatusSlack(req.params.idEmpresa).then(function(resultado){
        res.status(200).json(resultado)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

function updateStatusSlack(req, res) {
    const notificacaoStatus = req.body.notificacaoStatus;
    const idEmpresa = req.params.idEmpresa;

    slackModel.updateStatusSlack(notificacaoStatus, idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function selectByIdSlack(req, res){
    slackModel.selectByIdSlack(req.params.idEmpresa).then(function(resultado){
    res.status(200).json(resultado)
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage)
    })
}

function updateByIdSlack(req, res){
    const canal = req.body.canal;
    const idEmpresa = req.params.idEmpresa;
    console.log(canal, idEmpresa)

    slackModel.updateByIdSlack(canal, idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {selectStatusSlack, updateStatusSlack, selectByIdSlack, updateByIdSlack}