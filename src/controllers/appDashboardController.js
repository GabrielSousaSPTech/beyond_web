var appDashboardModel = require("../models/appDashboardModel")

function getBarChartAll(req, res) {
    appDashboardModel.getBarChartAll(req.query).then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getBarChartUF(req, res) {
    appDashboardModel.getBarChartUF(req.query).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getBarChartPais(req, res) {
    appDashboardModel.getBarChartPais(req.query).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getKpiTotal(req, res) {
    appDashboardModel.getKpiTotal(req.query).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getKpiVariacaoAno(req, res) {
    appDashboardModel.getKpiVariacaoAno(req.query).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getKpiVariacaoMes(req, res) {
    appDashboardModel.getKpiVariacaoMes(req.query).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    getBarChartAll,
    getBarChartUF,
    getBarChartPais,
    getKpiTotal,
    getKpiVariacaoAno,
    getKpiVariacaoMes
}