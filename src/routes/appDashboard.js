var express = require("express");
var router = express.Router();

var appDashboardController = require("../controllers/appDashboardController");

router.get("/graficoTendenciasPrincipal", function (req, res) {
    appDashboardController.getBarChartAll(req, res);
});

router.get("/graficoTendenciasUF", function (req, res) {
    appDashboardController.getBarChartUF(req, res);
});

router.get("/graficoTendenciasPais", function (req, res) {
    appDashboardController.getBarChartPais(req, res);
});

router.get("/kpiTotal", function (req, res) {
    appDashboardController.getKpiTotal(req, res);
});

router.get("/kpiVariacaoAno", function (req, res) {
    appDashboardController.getKpiVariacaoAno(req, res);
});

router.get("/kpiVariacaoMes", function (req, res) {
    appDashboardController.getKpiVariacaoMes(req, res);
});

router.get("/graficoHistorico", function (req, res) {
    appDashboardController.getGraficoHistorico(req, res);
});

router.get("/kpiHistoricoTotal", function (req, res) {
    appDashboardController.getKpiHistoricoTotal(req, res);
});

router.get("/kpiHistoricoAno", function (req, res) {
    appDashboardController.getKpiHistoricoAno(req, res);
});

router.get("/kpiHistoricoMes", function (req, res) {
    appDashboardController.getKpiHistoricoMes(req, res);
});

module.exports = router;