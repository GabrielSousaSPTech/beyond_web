const db = require('../database/config.js');

function registrarLog(idFunc, idEmpresa, categoria, descricao) {
    const sql = `
        INSERT INTO TB_LOG (FK_FUNC, FK_EMPRESA, CATEGORIA, DESCRICAO)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [idFunc, idEmpresa, categoria, descricao], (err, result) => {
        if (err) {
            console.error('Erro ao registrar log:', err);
        } else {
            console.log('✅ Log registrado: ' + descricao);
        }
    });
}

module.exports = { registrarLog };
