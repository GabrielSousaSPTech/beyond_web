var express = require("express");
var router = express.Router();
const upload = require('../services/imagemServices');
var usuarioController = require("../controllers/usuarioController");
var imagemServices = require("../services/imagemServices")
router.get("/permissoes", function(req, res){
    usuarioController.getPermissoes(req, res)
})
router.post("/cadastrar", function (req, res) {
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

router.get("/analise/:fkEmpresa", function (req, res){
    usuarioController.getUsuarioEmAnalise(req, res)
})

router.put("/autorizar/:idUsuario", function (req, res){
    usuarioController.autorizarUsuario(req, res)
})

router.put("/editSenha/:idFuncionario", function (req, res) {
    usuarioController.updateSenha(req, res);
});

router.put("/image/:idFuncionario", upload.single('foto'), function(req, res){
    usuarioController.updateImagemUsuario(req, res);
});



module.exports = router;