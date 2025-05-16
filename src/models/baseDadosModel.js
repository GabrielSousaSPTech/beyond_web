var database = require("../database/config")

function getParametros(){
    var instrucaoSql = ``

    return database.executar(instrucaoSql)
}

function getPais() {
    var instrucaoSql = `
        SELECT ID_PAIS AS id, NOME_PAIS AS nome FROM PAIS;
    `;
    return database.executar(instrucaoSql);
}

function getContinente() {
    var instrucaoSql = `
        SELECT ID_CONTINENTE AS id, NOME AS nome FROM CONTINENTE;
    `;
    return database.executar(instrucaoSql);
}

function getVia() {
    var instrucaoSql = `
        SELECT ID_VIA AS id, TIPO_VIA AS tipo FROM VIA;
    `;
    return database.executar(instrucaoSql);
}

function getFederacaoBrasil() {
    var instrucaoSql = `
        SELECT ID_FEDERACAO_BRASIL AS id, NOME AS nome FROM FEDERACAO_BRASIL;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    getPais,
    getContinente,
    getFederacaoBrasil,
    getVia
}