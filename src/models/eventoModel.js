var database = require("../database/config")

function getEventos(fkEmpresa){
    var instrucaoSql = `SELECT * FROM TB_EVENTOS
                         WHERE FK_EMPRESA = ?;`

    return database.executar(instrucaoSql, [fkEmpresa])
}

function getByIdEvento(idEvento){
    var instrucaoSql = `SELECT * FROM TB_EVENTOS WHERE ID_EVENTOS = ?`

    return database.executar(instrucaoSql, [ idEvento])
}

function insertEvento(fkEmpresa, nome, data_inicio, data_termino, descricao) {
    var instrucaoSql = `INSERT INTO TB_EVENTOS
                         VALUES(default,?,?,?,?,?);`

    return database.executar(instrucaoSql, [fkEmpresa,nome, data_inicio, data_termino, descricao])
}

function updateEvento(idEvento, fkEmpresa,nome, data_inicio, data_termino, descricao){
    var instrucaoSql = `UPDATE TB_EVENTOS 
                            SET NOME = ?, DATA_INICIO = ?, DATA_TERMINO = ?, DESCRICAO = ? 
                        WHERE FK_EMPRESA = ? AND ID_EVENTOS = ?;`

    return database.executar(instrucaoSql, [nome, data_inicio, data_termino, descricao, fkEmpresa, idEvento])
                        
}

function deleteEvento(fkEmpresa, idEvento){
    var instrucaoSql = `DELETE FROM TB_EVENTOS WHERE FK_EMPRESA =? AND ID_EVENTOS = ?;`

    return database.executar(instrucaoSql, [fkEmpresa, idEvento])
}

module.exports = {
    getEventos,
    getByIdEvento,
    insertEvento,
    updateEvento,
    deleteEvento
}