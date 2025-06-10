var database = require("../database/config");

function registrarLog(fkFunc, fkEmpresa, categoria, descricao) {
    var instrucao = `
        INSERT INTO TB_LOG (FK_FUNC, FK_EMPRESA, CATEGORIA, DESCRICAO)
        VALUES (?, ?, ?, ?);
    `;
    return database.executar(instrucao, [fkFunc, fkEmpresa, categoria, descricao]);
}

function getLogsByFkEmpresa(fkEmpresa) {
    var instrucao = `
        SELECT * FROM TB_LOG WHERE FK_EMPRESA = ? ORDER BY DATA_HORA DESC limit 50;
    `;
    return database.executar(instrucao, [fkEmpresa]);
}

module.exports = {
    registrarLog,
    getLogsByFkEmpresa
};
