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

function getBarChartUF() {
    var instrucaoSql = `
    SELECT 
    fb.NOME AS FEDERACAO_BRASIL,
    SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS
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
        fb.NOME
    ORDER BY 
        TOTAL_CHEGADAS DESC;
        `

    return database.executar(instrucaoSql)
}

function getBarChartPais() {
    var instrucaoSql = `
  SELECT 
    p.NOME_PAIS AS PAIS,
    SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS
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
        p.NOME_PAIS
    ORDER BY 
        TOTAL_CHEGADAS DESC;
        `

    return database.executar(instrucaoSql)
}

function getKpiTotal() {
    var instrucaoSql = `
  SELECT 
    SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS
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
        YEAR(bd.DATA_CHEGADA) = 2024;
        `

    return database.executar(instrucaoSql)
}

function getKpiVariacaoAno() {
    var instrucaoSql = `
        SELECT 
            ano,
            total_chegadas,
            LAG(total_chegadas) OVER (ORDER BY ano) AS total_ano_anterior,
            ROUND(
                100.0 * (total_chegadas - LAG(total_chegadas) OVER (ORDER BY ano)) / 
                NULLIF(LAG(total_chegadas) OVER (ORDER BY ano), 0), 
                2
            ) AS variacao_percentual
        FROM (
            SELECT 
                YEAR(DATA_CHEGADA) AS ano,
                SUM(CHEGADAS) AS total_chegadas
            FROM 
                TB_BASE_DADOS
            WHERE 
                YEAR(DATA_CHEGADA) IN (2023, 2024)
            GROUP BY 
                YEAR(DATA_CHEGADA)
        ) AS totais_anual
        ORDER BY ano DESC LIMIT 1;
        `

    return database.executar(instrucaoSql)
}

function getKpiVariacaoMes() {
    var instrucaoSql = `
        SELECT 
            ano,
            mes,
            total_chegadas,
            total_mes_ano_anterior,
            ROUND(
                100.0 * (total_chegadas - total_mes_ano_anterior) / NULLIF(total_mes_ano_anterior, 0),
                2
            ) AS variacao_percentual
        FROM (
            SELECT 
                YEAR(DATA_CHEGADA) AS ano,
                MONTH(DATA_CHEGADA) AS mes,
                SUM(CHEGADAS) AS total_chegadas,
                LAG(SUM(CHEGADAS)) OVER (
                    PARTITION BY MONTH(DATA_CHEGADA)
                    ORDER BY YEAR(DATA_CHEGADA)
                ) AS total_mes_ano_anterior
            FROM 
                TB_BASE_DADOS
            WHERE 
                YEAR(DATA_CHEGADA) IN (2023, 2024)
                AND MONTH(DATA_CHEGADA) = MONTH(CURDATE())  -- Mês atual
            GROUP BY 
                YEAR(DATA_CHEGADA), MONTH(DATA_CHEGADA)
        ) AS dados
        WHERE ano = 2024
        ORDER BY ano;
         `

    return database.executar(instrucaoSql)
}

module.exports = {
    getBarChartAll,
    getBarChartUF,
    getBarChartPais,
    getKpiTotal,
    getKpiVariacaoAno,
    getKpiVariacaoMes
}