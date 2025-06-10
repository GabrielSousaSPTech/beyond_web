var database = require('../database/config')

function selectStatusSlack(idEmpresa){
    var instrucaoSql = `SELECT NOTIFICACAO_STATUS
                        FROM TB_EMPRESA
                        WHERE ID_EMPRESA = ?;`
    return database.executar(instrucaoSql, [idEmpresa])
}

function updateStatusSlack(notificacaoStatus, idEmpresa){
    var instrucaoSql = `UPDATE TB_EMPRESA SET NOTIFICACAO_STATUS = ?
                        WHERE ID_EMPRESA = ?;`
    return database.executar(instrucaoSql, [notificacaoStatus, idEmpresa])
}

function selectByIdSlack(idEmpresa){
    var instrucaoSql = `SELECT ID_CANAL_SLACK
                        FROM TB_EMPRESA
                        WHERE ID_EMPRESA = ?;`
    return database.executar(instrucaoSql, [idEmpresa])
}

function updateByIdSlack(canal, idEmpresa){
    var instrucaoSql = `UPDATE TB_EMPRESA SET ID_CANAL_SLACK = ?
                        WHERE ID_EMPRESA = ?;`;
    return database.executar(instrucaoSql, [canal, idEmpresa])
}

module.exports = {selectStatusSlack, updateStatusSlack, selectByIdSlack, updateByIdSlack}