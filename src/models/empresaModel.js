var database = require('../database/config');

function getByIdEmpresa(idEmpresa){
    var instrucaoSql = `SELECT
                             EMAIL, CHAVE_ATIVACAO 
                        FROM TB_EMPRESA
                        WHERE ID_EMPRESA = ?;`

    return database.executar(instrucaoSql, [idEmpresa])
}

function countMembros(idEmpresa){
    var instrucaoSql = `SELECT COUNT(FK_EMPRESA) as quantidade FROM TB_FUNCIONARIO WHERE FK_EMPRESA = ? AND STATUS_CADASTRO = ?`

    return database.executar(instrucaoSql, [idEmpresa, 'ativo'])
}

module.exports = {
    getByIdEmpresa,
    countMembros
}
