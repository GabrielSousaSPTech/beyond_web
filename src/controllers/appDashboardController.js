var appDashboardModel = require("../models/appDashboardModel")

function getBarChartAll(req, res) {
    appDashboardModel.getBarChartAll().then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getBarChartUF(req, res) {
    appDashboardModel.getBarChartUF().then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getBarChartPais(req, res) {
    appDashboardModel.getBarChartPais().then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getKpiTotal(req, res) {
    appDashboardModel.getKpiTotal().then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getKpiVariacaoAno(req, res) {
    appDashboardModel.getKpiVariacaoAno().then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

function getKpiVariacaoMes(req, res) {
    appDashboardModel.getKpiVariacaoMes().then(function (resultado) {
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