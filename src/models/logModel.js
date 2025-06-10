var database = require("../database/config");

function registrarLog(fkFunc, fkEmpresa, categoria, descricao) {
    var instrucao = `
        INSERT INTO TB_LOG (FK_FUNC, FK_EMPRESA, CATEGORIA, DESCRICAO)
        VALUES (${fkFunc}, ${fkEmpresa}, '${categoria}', '${descricao}');
    `;
    return database.executar(instrucao);
}

module.exports = {
    registrarLog
};
