var express = require("express")
var router = express.Router();
var eventoController = require("../controllers/eventoController")

router.get("/all/:fkEmpresa", function(req, res){
    eventoController.getEvento(req, res);
})
router.get("/:idEvento", function(req, res){
    eventoController.getByIdEvento(req, res);
})

router.post("/create", function(req, res){
    eventoController.insertEvento(req, res);
})

router.put("/edit", function(req, res){
    eventoController.updateEvento(req, res);
})

router.delete("/delete/:fkEmpresa/:idEvento", function(req, res){
    eventoController.deleteEvento(req, res);
})

module.exports = router;