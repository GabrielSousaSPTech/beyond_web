var logModel = require("../models/logModel");

function registrarLog(idFunc, idEmpresa, categoria, descricao) {
    logModel.registrarLog(idFunc, idEmpresa, categoria, descricao)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e.sqlMessage));
    
}

function getLogsByFkEmpresa(req, res) {
    logModel.getLogsByFkEmpresa(req.params.idEmpresa)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e.sqlMessage));
}

module.exports = { registrarLog, getLogsByFkEmpresa };
