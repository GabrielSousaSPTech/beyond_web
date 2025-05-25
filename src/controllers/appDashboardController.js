var appDashboardModel = require("../models/appDashboardModel")

function getBarChartAll(req, res) {
    appDashboardModel.getBarChartAll(req.query).then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getBarChartUF(req, res, filtro) {
    appDashboardModel.getBarChartUF(req.query.filtro).then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getBarChartPais(req, res, filtro) {

    const filtro1 = req.query.filtro || '';
    console.log("Filtro recebido:", filtro1);

    appDashboardModel.getBarChartPais(filtro1).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getKpiTotal(req, res, filtro) {
    appDashboardModel.getKpiTotal(req.query.filtro).then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getKpiVariacaoAno(req, res, filtro) {
    console.log("Controller variação ano: " + req.query.filtro)
    appDashboardModel.getKpiVariacaoAno(req.query.filtro).then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getKpiVariacaoMes(req, res, filtro) {
    appDashboardModel.getKpiVariacaoMes(req.query.filtro).then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

module.exports = {
    getBarChartAll,
    getBarChartUF,
    getBarChartPais,
    getKpiTotal,
    getKpiVariacaoAno,
    getKpiVariacaoMes
}