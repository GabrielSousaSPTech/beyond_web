var express = require("express");
var router = express.Router();

var appDashboardController = require("../controllers/appDashboardController");

router.get("/graficoTendencias1", function (req, res) {
    appDashboardController.getBarChartAll(req, res);
});

module.exports = router;