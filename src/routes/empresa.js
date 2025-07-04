var express = require("express")
var router = express.Router();

var empresaController = require('../controllers/empresaController');

router.get("/:idEmpresa", function (req, res){
    empresaController.getByIdEmpresa(req, res);
})

router.get("/membros/:idEmpresa", function(req, res){
    empresaController.countMembros(req, res);
})

module.exports = router