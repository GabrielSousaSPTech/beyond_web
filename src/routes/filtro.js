var express = require("express")
var router = express.Router()
var filtroController = require("../controllers/filtroController")

router.get("/all/:fkEmpresa", function(req, res){
    filtroController.getFiltro(req, res);
})

router.get("/:idFiltro", function(req, res){
    filtroController.getByIdFiltro(req, res);
})

router.post("/create", function(req, res){
    filtroController.insertFiltro(req, res);
})

router.put("/edit", function(req, res){
    filtroController.updateFiltro(req,res);
})

router.delete("/delete/:idFiltro", function(req, res){
    filtroController.deleteFiltro(req, res);
})


module.exports = router