var database = require("../database/config")

function getBarChartAll(filtro) {


    let yearClause = filtro || filtro.DATA_CHEGADA == 'null' ? 'WHERE YEAR(bd.DATA_CHEGADA) = 2024' : `WHERE YEAR(bd.DATA_CHEGADA) = ${filtro.DATA_CHEGADA.substring(0, 4)}`; // Condição fixa

    let filterOption = "";

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 1; i < valoresFilter.length; i++) {

        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
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
    ${yearClause} 
    ${filterOption}
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
    let yearClause = filtro || filtro.DATA_CHEGADA == 'null' ? 'WHERE YEAR(bd.DATA_CHEGADA) = 2024' : `WHERE YEAR(bd.DATA_CHEGADA) = ${filtro.DATA_CHEGADA.substring(0, 4)}`; // Condição fixa

    let filterOption = "";

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 1; i < valoresFilter.length; i++) {

        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
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
    ${yearClause} 
    ${filterOption}
    GROUP BY
    fb.NOME
    ORDER BY 
        TOTAL_CHEGADAS DESC;
    `

    return database.executar(instrucaoSql)
}

function getBarChartPais(filtro) {
    let yearClause = filtro || filtro.DATA_CHEGADA == 'null' ? 'WHERE YEAR(bd.DATA_CHEGADA) = 2024' : `WHERE YEAR(bd.DATA_CHEGADA) = ${filtro.DATA_CHEGADA.substring(0, 4)}`; // Condição fixa

    let filterOption = "";

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 1; i < valoresFilter.length; i++) {

        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
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
    ${yearClause} 
    ${filterOption}
    GROUP BY
    p.NOME_PAIS
    ORDER BY 
        TOTAL_CHEGADAS DESC 
    LIMIT 30; `;

    console.log("Query gerada:", instrucaoSql); // Verifique no console se o filtro está sendo incluído

    return database.executar(instrucaoSql);
}

function getKpiTotal(filtro) {
    let yearClause = filtro || filtro.DATA_CHEGADA == 'null' ? 'WHERE YEAR(bd.DATA_CHEGADA) = 2024' : `WHERE YEAR(bd.DATA_CHEGADA) = ${filtro.DATA_CHEGADA.substring(0, 4)}`; // Condição fixa

    let filterOption = "";

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 1; i < valoresFilter.length; i++) {

        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
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
    ${yearClause} 
    ${filterOption}
    `

    return database.executar(instrucaoSql)
}

function getKpiVariacaoAno(filtro) {

    let yearClause = filtro || filtro.DATA_CHEGADA == 'null' ? `WHERE YEAR(bd.DATA_CHEGADA) IN (${new Date().getFullYear() - 2}, ${new Date().getFullYear() - 1})` : `WHERE YEAR(bd.DATA_CHEGADA) IN (${Number(filtro.DATA_CHEGADA.substring(0, 4)) - 1}, ${Number(filtro.DATA_CHEGADA.substring(0, 4))})`;

    console.log();

    let filterOption = "";

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 1; i < valoresFilter.length; i++) {

        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
    }


    var instrucaoSql = `
    SELECT
    ano,
        total_chegadas,
        LAG(total_chegadas) OVER(ORDER BY ano) AS total_ano_anterior,
            ROUND(
                100.0 * (total_chegadas - LAG(total_chegadas) OVER(ORDER BY ano)) /
            NULLIF(LAG(total_chegadas) OVER(ORDER BY ano), 0),
            2
                ) AS variacao_percentual
    FROM(
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
                 ${yearClause} 
                 ${filterOption}
                GROUP BY 
                    YEAR(bd.DATA_CHEGADA)
    ) AS totais_anual
                ORDER BY ano DESC LIMIT 1;
    `

    console.log("sql variação ano: " + instrucaoSql)

    return database.executar(instrucaoSql)
}

function getKpiVariacaoMes(filtro) {
    let yearClause = filtro || filtro.DATA_CHEGADA == 'null' ? `WHERE YEAR(bd.DATA_CHEGADA) IN (${new Date().getFullYear() - 2}, ${new Date().getFullYear() - 1})` : `WHERE YEAR(bd.DATA_CHEGADA) IN (${Number(filtro.DATA_CHEGADA.substring(0, 4)) - 1}, ${Number(filtro.DATA_CHEGADA.substring(0, 4))})`;

    let yearClause2 = filtro || filtro.DATA_CHEGADA == 'null' ? `WHERE ano = ${new Date().getFullYear() - 1}` : `WHERE ano = ${filtro.DATA_CHEGADA.substring(0, 4)}`;

    console.log();

    let filterOption = "";

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 1; i < valoresFilter.length; i++) {

        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
    }



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
            ${yearClause} 
            ${filterOption} AND MONTH(DATA_CHEGADA) = MONTH(CURDATE())-- Mês atual
            GROUP BY 
                YEAR(DATA_CHEGADA), MONTH(DATA_CHEGADA)
    ) AS dados
        ${yearClause2} 
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