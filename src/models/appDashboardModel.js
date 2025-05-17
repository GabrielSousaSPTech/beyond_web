var database = require("../database/config")

function getBarChartAll() {
    var instrucaoSql = `
    SELECT 
    YEAR(bd.DATA_CHEGADA) AS ANO,
    MONTH(bd.DATA_CHEGADA) AS MES,
    c.NOME AS CONTINENTE,
    SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS,
    SUM(SUM(bd.CHEGADAS)) OVER (PARTITION BY YEAR(bd.DATA_CHEGADA), MONTH(bd.DATA_CHEGADA)) AS TOTAL_MENSAL
    FROM 
        TB_BASE_DADOS bd
    JOIN 
        FEDERACAO_BRASIL fb ON bd.FK_FEDERACAO_BRASIL = fb.ID_FEDERACAO_BRASIL
    JOIN 
        CONTINENTE c ON bd.FK_CONTINENTE = c.ID_CONTINENTE
    JOIN 
        PAIS p ON bd.FK_PAIS = p.ID_PAIS
    JOIN 
        VIA v ON bd.FK_VIA = v.ID_VIA
    WHERE 
        YEAR(bd.DATA_CHEGADA) = 2024
    GROUP BY 
        YEAR(bd.DATA_CHEGADA),
        MONTH(bd.DATA_CHEGADA),
        c.NOME
    ORDER BY 
        ANO, MES, CONTINENTE;
        `

    return database.executar(instrucaoSql)
}

module.exports = {
    getBarChartAll
}