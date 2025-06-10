var database = require("../database/config")

function insertFiltro(fkEmpresa, nome, data_chegada, fk_continente, fk_pais, fk_via,fk_federacao_brasil){
    var instrusaoSql = `INSERT INTO TB_FILTRO_DASHBOARD VALUES(default,?,?,?,?,?,?,?);`
    return database.executar(instrusaoSql, [fkEmpresa, nome, data_chegada,fk_continente,fk_pais,fk_via, fk_federacao_brasil])
}

function getFiltro(fkEmpresa){
    var instrusaoSql = `SELECT 
                            ID_FILTRO,
                            NOME,
                            DATA_CHEGADA,
                            FK_CONTINENTE,
                            FK_PAIS,
                            FK_VIA,
                            FK_FEDERACAO_BRASIL
                        FROM TB_FILTRO_DASHBOARD 
                        WHERE FK_EMPRESA = ?`
    return database.executar(instrusaoSql,[fkEmpresa])
}

function getByIdFiltro(idFiltro){
    var instrusaoSql = `SELECT 
                            NOME,
                            DATA_CHEGADA,
                            FK_CONTINENTE,
                            FK_PAIS,
                            FK_VIA,
                            FK_FEDERACAO_BRASIL
                        FROM TB_FILTRO_DASHBOARD 
                        WHERE ID_FILTRO = ?`
    return database.executar(instrusaoSql,[idFiltro])
}

function updateFiltro(idFiltro, nome, data_chegada, fk_continente, fk_pais, fk_via, fk_federacao_brasil){
    var instrucaoSql = `UPDATE TB_FILTRO_DASHBOARD
                        SET NOME = ?, DATA_CHEGADA = ?, FK_CONTINENTE = ?, FK_PAIS = ?, FK_VIA = ?, FK_FEDERACAO_BRASIL = ?
                        WHERE ID_FILTRO = ?`
                        console.log("ABACAXI",database.executar(instrucaoSql, [nome, data_chegada, fk_continente, fk_pais, fk_via,fk_federacao_brasil, idFiltro]))
    return database.executar(instrucaoSql, [nome, data_chegada, fk_continente, fk_pais, fk_via,fk_federacao_brasil, idFiltro])                
}

function deleteFiltro(idEvento){
    console.log(idEvento)
    var instrucaoSql = `DELETE FROM TB_FILTRO_DASHBOARD WHERE ID_FILTRO = ?`

    return database.executar(instrucaoSql, [idEvento])
}

module.exports = {
    getFiltro,
    getByIdFiltro,
    insertFiltro,
    updateFiltro,
    deleteFiltro
}