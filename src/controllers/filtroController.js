var filtroModel = require("../models/filtroModel")


function getFiltro(req, res) {
    const id = req.params.fkEmpresa

    filtroModel.getFiltro(id).then(function (resultado) {
        res.status(201).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function getByIdFiltro(req, res) {
    const id = req.params.idFiltro

    filtroModel.getByIdFiltro(id).then(function (resultado) {
        res.status(201).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function insertFiltro(req, res) {
    const fkEmpresa = req.body.FK_EMPRESA
    const nome = req.body.NOME
    let data_chegada = req.body.DATA_CHEGADA
    const fk_continente = req.body.FK_CONTINENTE
    const fk_pais = req.body.FK_PAIS
    const fk_via = req.body.FK_VIA
    const fk_federacao_brasil = req.body.FK_FEDERACAO_BRASIL

    const lastYear = new Date().getFullYear() - 1;
    const lastYearDate = `${lastYear}-00-01`;

    if (data_chegada == null || data_chegada == undefined || data_chegada == '' || data_chegada == lastYearDate) {
        data_chegada = null;
    }

    filtroModel.insertFiltro(fkEmpresa, nome, data_chegada, fk_continente, fk_pais, fk_via, fk_federacao_brasil).then(function (resultado) {
        res.status(201).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function updateFiltro(req, res) {   
    console.log("Rota de edição de filtro chamada");
    const fkEmpresa = req.body.FK_EMPRESA
    const nome = req.body.NOME
    let data_chegada = req.body.DATA_CHEGADA
    const fk_continente = req.body.FK_CONTINENTE
    const fk_pais = req.body.FK_PAIS
    const fk_via = req.body.FK_VIA
    const fk_federacao_brasil = req.body.FK_FEDERACAO_BRASIL
    const idFiltro = req.body.ID_FILTRO

    const lastYear = new Date().getFullYear() - 1;
    const lastYearDate = `${lastYear}-00-01`;

    if (data_chegada == null || data_chegada == undefined || data_chegada == '' || data_chegada == lastYearDate) {
        data_chegada = null;
    }

    console.log("Dados recebidos para atualização:", fkEmpresa, nome, data_chegada, fk_continente, fk_pais, fk_via, fk_federacao_brasil, idFiltro);


    filtroModel.updateFiltro(idFiltro, nome, data_chegada, fk_continente, fk_pais, fk_via, fk_federacao_brasil).then(function (resultado) {
        res.status(201).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function deleteFiltro(req, res) {
    const id = req.params.idFiltro

    filtroModel.deleteFiltro(id).then(function (resultado) {
        res.status(201).json(resultado);
    }).catch(function (erro) {
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