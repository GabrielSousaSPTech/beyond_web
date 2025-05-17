var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    console.log(req.body);
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/all/:fkEmpresa", function (req, res) {
    
    usuarioController.getUsuario(req, res);
});

router.get("/:idFuncionario", function (req, res) {
    
    usuarioController.getByIdUsuario(req, res);
});

router.put("/edit/:idFuncionario", function (req, res) {
    usuarioController.updateUsuario(req, res);
});

router.delete("/delete/:idFuncionario", function (req, res) {
 
    usuarioController.deleteUsuario(req, res);
});

module.exports = router;