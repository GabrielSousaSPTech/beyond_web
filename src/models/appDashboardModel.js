var database = require("../database/config")

function getBarChartAll(filtro) {

    console.log("Filtro recebido bar all:", filtro);


    let yearClause = filtro.DATA_CHEGADA == 'null' ? 'WHERE YEAR(bd.DATA_CHEGADA) = 2024' : `WHERE YEAR(bd.DATA_CHEGADA) = ${filtro.DATA_CHEGADA.substring(0, 4)}`; // Condição fixa


    console.log("O filtro é: " + Object.entries(filtro));

    console.log("YearClause é: " + yearClause);

    console.log("Substring é: " + filtro.DATA_CHEGADA.substring(5, 7))

    let filterOption = "";

    let monthClause = filtro.DATA_CHEGADA.substring(5, 7)
    console.log("mes:", monthClause, monthClause == '')

    if (monthClause != "00" && monthClause != '') filterOption = `AND MONTH(bd.DATA_CHEGADA) = ${monthClause}`;

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 0; i < valoresFilter.length; i++) {
        if (valoresFilter[i][0] === 'DATA_CHEGADA') {
            continue;
        }
        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
    }

    console.log("filterOption é :" + filterOption)

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

    console.log("Executando a instrução SQL:", instrucaoSql);

    return database.executar(instrucaoSql)
}

function getBarChartUF(filtro) {
    let yearClause = filtro.DATA_CHEGADA == 'null' ? 'WHERE YEAR(bd.DATA_CHEGADA) = 2024' : `WHERE YEAR(bd.DATA_CHEGADA) = ${filtro.DATA_CHEGADA.substring(0, 4)}`; // Condição fixa

    let filterOption = "";

    let monthClause = filtro.DATA_CHEGADA.substring(5, 7)

    if (monthClause != "00" && monthClause != '') filterOption = `AND MONTH(bd.DATA_CHEGADA) = ${monthClause}`;

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 0; i < valoresFilter.length; i++) {
        if (valoresFilter[i][0] === 'DATA_CHEGADA') {
            continue;
        }
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
    let yearClause = filtro.DATA_CHEGADA == 'null' ? 'WHERE YEAR(bd.DATA_CHEGADA) = 2024' : `WHERE YEAR(bd.DATA_CHEGADA) = ${filtro.DATA_CHEGADA.substring(0, 4)}`; // Condição fixa

    let filterOption = "";

    let monthClause = filtro.DATA_CHEGADA.substring(5, 7)

    if (monthClause != "00" && monthClause != '') filterOption = `AND MONTH(bd.DATA_CHEGADA) = ${monthClause}`;

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 0; i < valoresFilter.length; i++) {
        if (valoresFilter[i][0] === 'DATA_CHEGADA') {
            continue;
        }
        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
    }

    const instrucaoSql = `
    SELECT
    PAIS,
    TOTAL_CHEGADAS
        FROM (
        SELECT
            p.NOME_PAIS AS PAIS,
            SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS,
            SUM(SUM(bd.CHEGADAS)) OVER (ORDER BY SUM(bd.CHEGADAS) DESC) AS RUNNING_TOTAL
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
        GROUP BY p.NOME_PAIS
        ORDER BY TOTAL_CHEGADAS DESC
        LIMIT 30
    ) subquery;`;

    console.log(instrucaoSql)

    return database.executar(instrucaoSql);
}

function getKpiTotal(filtro) {
    let yearClause = filtro.DATA_CHEGADA == 'null' ? 'WHERE YEAR(bd.DATA_CHEGADA) = 2024' : `WHERE YEAR(bd.DATA_CHEGADA) = ${filtro.DATA_CHEGADA.substring(0, 4)}`; // Condição fixa

    let filterOption = "";

    let monthClause = filtro.DATA_CHEGADA.substring(5, 7)

    if (monthClause != "00" && monthClause != '') filterOption = `AND MONTH(bd.DATA_CHEGADA) = ${monthClause}`;

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 0; i < valoresFilter.length; i++) {
        if (valoresFilter[i][0] === 'DATA_CHEGADA') {
            continue;
        }
        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
    }

    var instrucaoSql = `
    SELECT TOTAL_CHEGADAS
    FROM (
        SELECT @total := @total + bd.CHEGADAS AS TOTAL_CHEGADAS
        FROM (SELECT @total := 0) as total
        CROSS JOIN TB_BASE_DADOS bd
        JOIN FEDERACAO_BRASIL fb ON bd.FK_FEDERACAO_BRASIL = fb.ID_FEDERACAO_BRASIL
        JOIN CONTINENTE c ON bd.FK_CONTINENTE = c.ID_CONTINENTE
        JOIN PAIS p ON bd.FK_PAIS = p.ID_PAIS
        JOIN VIA v ON bd.FK_VIA = v.ID_VIA
        ${yearClause} 
        ${filterOption}
        ORDER BY bd.ID_BASE_DADOS
    ) subquery
    ORDER BY TOTAL_CHEGADAS DESC
    LIMIT 1;
    `

    console.log(instrucaoSql)

    return database.executar(instrucaoSql)
}

function getKpiVariacaoAno(filtro) {

    let yearClause = filtro.DATA_CHEGADA == 'null' ? `WHERE YEAR(bd.DATA_CHEGADA) IN (${new Date().getFullYear() - 2}, ${new Date().getFullYear() - 1})` : `WHERE YEAR(bd.DATA_CHEGADA) IN (${Number(filtro.DATA_CHEGADA.substring(0, 4)) - 1}, ${Number(filtro.DATA_CHEGADA.substring(0, 4))})`;

    console.log();

    let filterOption = "";

    let monthClause = filtro.DATA_CHEGADA.substring(5, 7)

    if (monthClause != "00" && monthClause != '') filterOption = `AND MONTH(bd.DATA_CHEGADA) = ${monthClause}`;

    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 0; i < valoresFilter.length; i++) {
        if (valoresFilter[i][0] === 'DATA_CHEGADA') {
            continue;
        }
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

    return database.executar(instrucaoSql)
}

function getKpiVariacaoMes(filtro) {
    let yearClause = filtro.DATA_CHEGADA == 'null' ? `WHERE YEAR(bd.DATA_CHEGADA) IN (${new Date().getFullYear() - 2}, ${new Date().getFullYear() - 1})` : `WHERE YEAR(bd.DATA_CHEGADA) IN (${Number(filtro.DATA_CHEGADA.substring(0, 4)) - 1}, ${Number(filtro.DATA_CHEGADA.substring(0, 4))})`;

    let yearClause2 = filtro.DATA_CHEGADA == 'null' ? `WHERE ano = ${new Date().getFullYear() - 1}` : `WHERE ano = ${filtro.DATA_CHEGADA.substring(0, 4)}`;


    let filterOption = "";



    const valoresFilter = Object.entries(filtro).filter(fk => fk[1] != 'null');

    for (let i = 0; i < valoresFilter.length; i++) {
        if (valoresFilter[i][0] === 'DATA_CHEGADA') {
            continue;
        }
        filterOption += ` AND bd.${valoresFilter[i][0]} = ${valoresFilter[i][1]}`
    }

    let monthClause = filtro.DATA_CHEGADA.substring(5, 7)

    if (monthClause != "00" && monthClause != '') {
        filterOption += ` AND MONTH(bd.DATA_CHEGADA) = ${monthClause}`;
    } else {
        filterOption += ' AND MONTH(DATA_CHEGADA) = MONTH(CURDATE())'
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
            ${filterOption} 
            GROUP BY 
                YEAR(DATA_CHEGADA), MONTH(DATA_CHEGADA)
    ) AS dados
        ${yearClause2} 
        ORDER BY ano;
    `

    return database.executar(instrucaoSql)
}

function getGraficoHistorico(filtro = {}) {
    console.log('Filtro recebido:', filtro);

    // Configurações
    const ANO_MIN = 1989;
    const ANO_MAX = 2024;
    const ANOS_PADRAO = 5;

    let whereConditions = [];

    // Processar anos
    if (!filtro.ANOS || filtro.ANOS === 'null' || filtro.ANOS === null) {
        // Últimos 5 anos (2020-2024)
        whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
    } else if (Array.isArray(filtro.ANOS)) {
        // Array de anos - validar e limitar
        const anosValidos = filtro.ANOS
            .map(ano => parseInt(ano))
            .filter(ano => !isNaN(ano) && ano >= ANO_MIN && ano <= ANO_MAX)
            .slice(0, 10); // Máximo 10 anos

        if (anosValidos.length > 0) {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) IN (${anosValidos.join(',')})`);
        } else {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
        }
    } else {
        // Ano único
        const ano = parseInt(filtro.ANOS);
        if (!isNaN(ano) && ano >= ANO_MIN && ano <= ANO_MAX) {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) = ${ano}`);
        } else {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) = ${ANO_MAX}`);
        }
    }

    // Processar outros filtros
    const camposValidos = ['FK_CONTINENTE', 'FK_PAIS', 'FK_VIA', 'FK_FEDERACAO_BRASIL'];

    camposValidos.forEach(campo => {
        const valor = filtro[campo];
        if (valor && valor !== 'null' && valor !== null && valor !== '') {
            const valorNum = parseInt(valor);
            if (!isNaN(valorNum) && valorNum > 0) {
                whereConditions.push(`bd.${campo} = ${valorNum}`);
            }
        }
    });

    // Montar query
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const sql = `
        SELECT 
            YEAR(bd.DATA_CHEGADA) AS ANO,
            MONTH(bd.DATA_CHEGADA) AS MES,
            c.NOME AS CONTINENTE,
            SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS
        FROM 
            TB_BASE_DADOS bd
        INNER JOIN 
            CONTINENTE c ON bd.FK_CONTINENTE = c.ID_CONTINENTE
        ${whereClause}
        GROUP BY 
            YEAR(bd.DATA_CHEGADA),
            MONTH(bd.DATA_CHEGADA),
            c.NOME
        ORDER BY 
            ANO, MES
        LIMIT 5000;
    `;

    console.log('SQL executado:', sql.replace(/\s+/g, ' ').trim());

    // Executar com tratamento de erro
    try {
        return database.executar(sql);
    } catch (error) {
        console.error('Erro na consulta histórico:', error.message);
        throw new Error(`Erro ao buscar dados históricos: ${error.message}`);
    }
}

function getKpiHistoricoTotal(filtro = {}) {
    console.log('Filtro recebido KPI Total:', filtro);

    // Configurações
    const ANO_MIN = 1989;
    const ANO_MAX = 2024;
    const ANOS_PADRAO = 5;

    let whereConditions = [];

    // Processar anos
    if (!filtro.ANOS || filtro.ANOS === 'null' || filtro.ANOS === null) {
        // Últimos 5 anos (2020-2024)
        whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
    } else if (Array.isArray(filtro.ANOS)) {
        // Array de anos - validar e limitar
        const anosValidos = filtro.ANOS
            .map(ano => parseInt(ano))
            .filter(ano => !isNaN(ano) && ano >= ANO_MIN && ano <= ANO_MAX)
            .slice(0, 10); // Máximo 10 anos

        if (anosValidos.length > 0) {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) IN (${anosValidos.join(',')})`);
        } else {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
        }
    } else {
        // Ano único
        const ano = parseInt(filtro.ANOS);
        if (!isNaN(ano) && ano >= ANO_MIN && ano <= ANO_MAX) {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) = ${ano}`);
        } else {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
        }
    }

    // Processar outros filtros
    const camposValidos = ['FK_CONTINENTE', 'FK_PAIS', 'FK_VIA', 'FK_FEDERACAO_BRASIL'];

    camposValidos.forEach(campo => {
        const valor = filtro[campo];
        if (valor && valor !== 'null' && valor !== null && valor !== '') {
            const valorNum = parseInt(valor);
            if (!isNaN(valorNum) && valorNum > 0) {
                whereConditions.push(`bd.${campo} = ${valorNum}`);
            }
        }
    });

    // Montar query
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const sql = `
        SELECT 
            SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS
        FROM 
            TB_BASE_DADOS bd
        ${whereClause}
        LIMIT 1;
    `;

    console.log('SQL KPI Total executado:', sql.replace(/\s+/g, ' ').trim());

    // Executar com tratamento de erro
    try {
        return database.executar(sql);
    } catch (error) {
        console.error('Erro na consulta KPI Total:', error.message);
        throw new Error(`Erro ao buscar KPI total: ${error.message}`);
    }
}

function getKpiHistoricoAno(filtro = {}) {
    console.log('Filtro recebido KPI Ano:', filtro);

    // Configurações
    const ANO_MIN = 1989;
    const ANO_MAX = 2024;
    const ANOS_PADRAO = 5;

    let whereConditions = [];

    // Processar anos
    if (!filtro.ANOS || filtro.ANOS === 'null' || filtro.ANOS === null) {
        // Últimos 5 anos (2020-2024)
        whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
    } else if (Array.isArray(filtro.ANOS)) {
        // Array de anos - validar e limitar
        const anosValidos = filtro.ANOS
            .map(ano => parseInt(ano))
            .filter(ano => !isNaN(ano) && ano >= ANO_MIN && ano <= ANO_MAX)
            .slice(0, 10); // Máximo 10 anos

        if (anosValidos.length > 0) {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) IN (${anosValidos.join(',')})`);
        } else {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
        }
    } else {
        // Ano único
        const ano = parseInt(filtro.ANOS);
        if (!isNaN(ano) && ano >= ANO_MIN && ano <= ANO_MAX) {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) = ${ano}`);
        } else {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
        }
    }

    // Processar outros filtros
    const camposValidos = ['FK_CONTINENTE', 'FK_PAIS', 'FK_VIA', 'FK_FEDERACAO_BRASIL'];

    camposValidos.forEach(campo => {
        const valor = filtro[campo];
        if (valor && valor !== 'null' && valor !== null && valor !== '') {
            const valorNum = parseInt(valor);
            if (!isNaN(valorNum) && valorNum > 0) {
                whereConditions.push(`bd.${campo} = ${valorNum}`);
            }
        }
    });

    // Montar query
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const sql = `
        SELECT  
            YEAR(bd.DATA_CHEGADA) AS ANO,
            SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS
        FROM  
            TB_BASE_DADOS bd
        ${whereClause}
        GROUP BY  
            YEAR(bd.DATA_CHEGADA)
        ORDER BY  
            TOTAL_CHEGADAS DESC
        LIMIT 1;
    `;

    console.log('SQL KPI Ano executado:', sql.replace(/\s+/g, ' ').trim());

    // Executar com tratamento de erro
    try {
        return database.executar(sql);
    } catch (error) {
        console.error('Erro na consulta KPI Ano:', error.message);
        throw new Error(`Erro ao buscar KPI por ano: ${error.message}`);
    }
}

function getKpiHistoricoMes(filtro = {}) {
    console.log('Filtro recebido KPI Mês:', filtro);

    // Configurações
    const ANO_MIN = 1989;
    const ANO_MAX = 2024;
    const ANOS_PADRAO = 5;

    let whereConditions = [];

    // Processar anos
    if (!filtro.ANOS || filtro.ANOS === 'null' || filtro.ANOS === null) {
        // Últimos 5 anos (2020-2024)
        whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
    } else if (Array.isArray(filtro.ANOS)) {
        // Array de anos - validar e limitar
        const anosValidos = filtro.ANOS
            .map(ano => parseInt(ano))
            .filter(ano => !isNaN(ano) && ano >= ANO_MIN && ano <= ANO_MAX)
            .slice(0, 10); // Máximo 10 anos

        if (anosValidos.length > 0) {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) IN (${anosValidos.join(',')})`);
        } else {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
        }
    } else {
        // Ano único
        const ano = parseInt(filtro.ANOS);
        if (!isNaN(ano) && ano >= ANO_MIN && ano <= ANO_MAX) {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) = ${ano}`);
        } else {
            whereConditions.push(`YEAR(bd.DATA_CHEGADA) BETWEEN ${ANO_MAX - ANOS_PADRAO + 1} AND ${ANO_MAX}`);
        }
    }

    // Processar outros filtros
    const camposValidos = ['FK_CONTINENTE', 'FK_PAIS', 'FK_VIA', 'FK_FEDERACAO_BRASIL'];

    camposValidos.forEach(campo => {
        const valor = filtro[campo];
        if (valor && valor !== 'null' && valor !== null && valor !== '') {
            const valorNum = parseInt(valor);
            if (!isNaN(valorNum) && valorNum > 0) {
                whereConditions.push(`bd.${campo} = ${valorNum}`);
            }
        }
    });

    // Montar query
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const sql = `
        SELECT  
            MONTH(bd.DATA_CHEGADA) AS MES,
            SUM(bd.CHEGADAS) AS TOTAL_CHEGADAS
        FROM  
            TB_BASE_DADOS bd
        ${whereClause}
        GROUP BY  
            MONTH(bd.DATA_CHEGADA)
        ORDER BY  
            TOTAL_CHEGADAS DESC
        LIMIT 1;
    `;

    console.log('SQL KPI Mês executado:', sql.replace(/\s+/g, ' ').trim());

    // Executar com tratamento de erro
    try {
        return database.executar(sql);
    } catch (error) {
        console.error('Erro na consulta KPI Mês:', error.message);
        throw new Error(`Erro ao buscar KPI por mês: ${error.message}`);
    }
}


module.exports = {
    getBarChartAll,
    getBarChartUF,
    getBarChartPais,
    getKpiTotal,
    getKpiVariacaoAno,
    getKpiVariacaoMes,
    getGraficoHistorico,
    getKpiHistoricoTotal,
    getKpiHistoricoAno,
    getKpiHistoricoMes
}