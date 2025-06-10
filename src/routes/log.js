var express = require("express");
var router = express.Router();
const logController = require('../controllers/logController'); 


router.get('/empresa/:idEmpresa/', (req, res) => {
    logController.getLogsByFkEmpresa(req, res);
});

module.exports = router;