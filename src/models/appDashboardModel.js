var database = require("../database/config")

function getBarChartAll(filtro) {

    console.log("esse é o filtro gráfico principal: " + filtro)

    let whereClause = 'WHERE YEAR(bd.DATA_CHEGADA) = 2024'; // Condição fixa

    if (filtro) {
        if (filtro.includes("YEAR(bd.DATA_CHEGADA)")) {
            whereClause = `WHERE ${filtro}`;
        } else {
            whereClause += ` AND ${filtro}`;
        }

    }
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
    ${whereClause} 
    GROUP BY 
        YEAR(bd.DATA_CHEGADA),
        MONTH(bd.DATA_CHEGADA),
        c.NOME
    ORDER BY 
        ANO, MES, CONTINENTE;
        `

    return database.executar(instrucaoSql)
}

function getBarChartUF(filtro) {
    let whereClause = 'WHERE YEAR(bd.DATA_CHEGADA) = 2024'; // Condição fixa

    if (filtro) {
        if (filtro.includes("YEAR(bd.DATA_CHEGADA)")) {
            whereClause = `WHERE ${filtro}`;
        } else {
            whereClause += ` AND ${filtro}`;
        }

    }
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
    ${whereClause} 
    GROUP BY 
        fb.NOME
    ORDER BY 
        TOTAL_CHEGADAS DESC;
        `

    return database.executar(instrucaoSql)
}

function getBarChartPais(filtro) {
    let whereClause = 'WHERE YEAR(bd.DATA_CHEGADA) = 2024'; // Condição fixa

    if (filtro) {
        if (filtro.includes("YEAR(bd.DATA_CHEGADA)")) {
            whereClause = `WHERE ${filtro}`;
        } else {
            whereClause += ` AND ${filtro}`;
        }

    }

    const instrucaoSql = `
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
    ${whereClause} 
    GROUP BY 
        p.NOME_PAIS
    ORDER BY 
        TOTAL_CHEGADAS DESC 
    LIMIT 30;`;

    console.log("Query gerada:", instrucaoSql); // Verifique no console se o filtro está sendo incluído

    return database.executar(instrucaoSql);
}

function getKpiTotal(filtro) {
    let whereClause = 'WHERE YEAR(bd.DATA_CHEGADA) = 2024'; // Condição fixa

    if (filtro) {
        if (filtro.includes("YEAR(bd.DATA_CHEGADA)")) {
            whereClause = `WHERE ${filtro}`;
        } else {
            whereClause += ` AND ${filtro}`;
        }

    }

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
    ${whereClause} 
        `

    return database.executar(instrucaoSql)
}

function getKpiVariacaoAno(filtro) {

    console.log("filtro variação ano: " + filtro)

    let whereClause = 'WHERE YEAR(bd.DATA_CHEGADA) IN (2023, 2024)'; // Condição fixa

    if (filtro) {
        if (filtro.includes("YEAR(bd.DATA_CHEGADA)")) {
            const regex = /YEAR\(bd\.DATA_CHEGADA\)=(\d{4})/;
            const match = filtro.match(regex);
            const anoOriginal = parseInt(match[1], 10);
            const anoAnterior = anoOriginal - 1;
            const novaParte = `YEAR(bd.DATA_CHEGADA) IN (${anoAnterior}, ${anoOriginal})`;
            const filtroRefeito = filtro.replace(regex, novaParte);

            whereClause = `WHERE ${filtroRefeito}`;
        } else {
            whereClause += ` AND ${filtro}`;
        }

    }
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
                    YEAR(bd.DATA_CHEGADA) AS ano,
                    SUM(bd.CHEGADAS) AS total_chegadas
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
                ${whereClause} 
                GROUP BY 
                    YEAR(bd.DATA_CHEGADA)
            ) AS totais_anual
                ORDER BY ano DESC LIMIT 1;
        `

    console.log("sql variação ano: " + instrucaoSql)

    return database.executar(instrucaoSql)
}

function getKpiVariacaoMes(filtro) {
    console.log("filtro variação mês: " + filtro)

    let whereClause = 'WHERE YEAR(bd.DATA_CHEGADA) IN (2023, 2024)';
    let whereClause2 = 'WHERE ano = 2024';

    if (filtro) {
        if (filtro.includes("YEAR(bd.DATA_CHEGADA)")) {
            const regex = /YEAR\(bd\.DATA_CHEGADA\)=(\d{4})/;
            const match = filtro.match(regex);
            const anoOriginal = parseInt(match[1], 10);
            const anoAnterior = anoOriginal - 1;
            const novaParte = `YEAR(bd.DATA_CHEGADA) IN (${anoAnterior}, ${anoOriginal})`;
            const filtroRefeito = filtro.replace(regex, novaParte);

            whereClause = `WHERE ${filtroRefeito}`;
            whereClause2 = `WHERE ano = ${anoOriginal}`
        } else {
            whereClause += ` AND ${filtro}`;
        }

    }

    whereClause += ` AND MONTH(DATA_CHEGADA) = MONTH(CURDATE())-- Mês atual`

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
    FROM(
        SELECT 
                YEAR(DATA_CHEGADA) AS ano,
        MONTH(DATA_CHEGADA) AS mes,
        SUM(CHEGADAS) AS total_chegadas,
        LAG(SUM(CHEGADAS)) OVER(
            PARTITION BY MONTH(DATA_CHEGADA)
                    ORDER BY YEAR(DATA_CHEGADA)
        ) AS total_mes_ano_anterior
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
            ${whereClause} 
            GROUP BY 
                YEAR(DATA_CHEGADA), MONTH(DATA_CHEGADA)
    ) AS dados
        ${whereClause2} 
        ORDER BY ano;
    `
    console.log("sql variação mês: " + instrucaoSql)

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