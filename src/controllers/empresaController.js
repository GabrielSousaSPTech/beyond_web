var empresaModel = require('../models/empresaModel');

function getByIdEmpresa(req, res){
    var idEmpresa = req.params.idEmpresa;

    empresaModel.getByIdEmpresa(idEmpresa).then(function (resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro);
    })
}

module.exports = {
    getByIdEmpresa
}