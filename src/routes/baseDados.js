var express = require("express");
var router = express.Router();

var baseDadosController = require("../controllers/baseDadosController");

router.get("/paises", function(req, res){
    baseDadosController.getPais(req, res);
});

router.get("/continentes", function(req, res){
    baseDadosController.getContinente(req, res);
});

router.get("/vias", function(req, res){
    baseDadosController.getVia(req, res);
});

router.get("/federacoes", function(req, res){
    baseDadosController.getFederacaoBrasil(req, res);
});

router.get("/anos", function(req, res){
    baseDadosController.getAno(req, res);
});

module.exports = router;