var express = require("express");
var router = express.Router();

var appDashboardController = require("../controllers/appDashboardController");

router.get("/graficoTendenciasPrincipal/:filtro?", function (req, res) {
    const filtro = req.params.filtro || '';
    console.log("routes principal: " + filtro)
    appDashboardController.getBarChartAll(req, res, filtro);
});

router.get("/graficoTendenciasUF/:filtro?", function (req, res) {
    const filtro = req.params.filtro || '';
    appDashboardController.getBarChartUF(req, res, filtro);
});

router.get("/graficoTendenciasPais/:filtro?", function (req, res) {
    const filtro = req.params.filtro || ''; // Obtém o filtro da URL (ex: /graficoTendenciasPais/c.NOME='EUROPA')
    console.log(`Esse é a urlrecebida: ${filtro}`)
    appDashboardController.getBarChartPais(req, res, filtro);
});

router.get("/kpiTotal/:filtro?", function (req, res) {
    const filtro = req.params.filtro || '';
    appDashboardController.getKpiTotal(req, res, filtro);
});

router.get("/kpiVariacaoAno/:filtro?", function (req, res) {
    const filtro = req.params.filtro || '';
    console.log("routes variação ano: " + filtro)
    appDashboardController.getKpiVariacaoAno(req, res, filtro);
});

router.get("/kpiVariacaoMes/:filtro?", function (req, res) {
    const filtro = req.params.filtro || '';
    appDashboardController.getKpiVariacaoMes(req, res, filtro);
});

module.exports = router;