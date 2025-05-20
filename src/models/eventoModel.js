var database = require("../database/config")

function getEventos(fkEmpresa){
    var instrucaoSql = `SELECT ID_EVENTOS, NOME, DESCRICAO, COR, DATA_INICIO, DATA_TERMINO FROM TB_EVENTOS WHERE FK_EMPRESA = ?;`

    return database.executar(instrucaoSql, [fkEmpresa])
}

function getByIdEvento(idEvento){
    var instrucaoSql = `SELECT 
                            NOME,
                            DESCRICAO,
                            COR,
                            DATA_INICIO,
                            DATA_TERMINO,
                        FROM TB_EVENTOS 
                        WHERE ID_EVENTOS = ?`

    return database.executar(instrucaoSql, [ idEvento])
}

function insertEvento(fkEmpresa, nome, data_inicio, data_termino, descricao, cor) {
    var instrucaoSql = `INSERT INTO TB_EVENTOS
                         VALUES(default,?,?,?,?,?,?);`

    return database.executar(instrucaoSql, [fkEmpresa,nome, data_inicio, data_termino, descricao, cor])
}

function updateEvento(idEvento, nome, data_inicio, data_termino, descricao, cor){
    var instrucaoSql = `UPDATE TB_EVENTOS 
                            SET NOME = ?, DATA_INICIO = ?, DATA_TERMINO = ?, DESCRICAO = ?, COR = ? 
                        WHERE ID_EVENTOS = ?;`

    return database.executar(instrucaoSql, [nome, data_inicio, data_termino, descricao,cor, idEvento])
                        
}

function deleteEvento(idEvento){
    var instrucaoSql = `DELETE FROM TB_EVENTOS WHERE ID_EVENTOS = ?;`

    return database.executar(instrucaoSql, [idEvento])
}

module.exports = {
    getEventos,
    getByIdEvento,
    insertEvento,
    updateEvento,
    deleteEvento
}