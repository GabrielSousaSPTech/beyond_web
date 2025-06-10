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

function getGraficoHistorico(req, res) {
    appDashboardModel.getGraficoHistorico(req.query).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getKpiHistoricoTotal(req, res) {
    appDashboardModel.getKpiHistoricoTotal(req.query).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getKpiHistoricoAno(req, res) {
    appDashboardModel.getKpiHistoricoAno(req.query).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getKpiHistoricoMes(req, res) {
    appDashboardModel.getKpiHistoricoMes(req.query).then(function (resultado) {
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
    getKpiVariacaoMes,
    getGraficoHistorico,
    getKpiHistoricoTotal,
    getKpiHistoricoAno,
    getKpiHistoricoMes
}