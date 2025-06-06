var database = require('../database/config');

function getByIdEmpresa(idEmpresa){
    var instrucaoSql = `SELECT
                             EMAIL, CHAVE_ATIVACAO 
                        FROM TB_EMPRESA
                        WHERE ID_EMPRESA = ?;`

    return database.executar(instrucaoSql, [idEmpresa])
}

module.exports = {
    getByIdEmpresa
}