var appDashboardModel = require("../models/appDashboardModel")

function getBarChartAll(req, res) {
    appDashboardModel.getBarChartAll().then(function (resultado) {
        res.status(200).json(resultado)
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage)
    })
}

module.exports = {
    getBarChartAll
}