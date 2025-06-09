var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email, senha);
    var instrucaoSql = `
        SELECT ID_FUNC, FK_EMPRESA, NOME,CPF, EMAIL, FOTO, TIPO, CARGO FROM TB_FUNCIONARIO WHERE email = ? AND senha = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(email, senha, empresa, nome, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email, senha, empresa, nome, telefone);
    
    var instrucaoSql = `
        INSERT INTO TB_FUNCIONARIO (FK_EMPRESA, NOME, EMAIL, SENHA, TEL) 
        VALUES (?, ?, ?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [empresa, nome, email, senha, telefone]);
}

function confirmarCodigo(codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function confirmarCodigo():", codigo);
    
    var instrucaoSql = `
        SELECT ID_EMPRESA FROM TB_EMPRESA WHERE CHAVE_ATIVACAO = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [codigo]);
}

function getUsuario(fkEmpresa){
    var instrucaoSql = `SELECT * FROM TB_FUNCIONARIO WHERE FK_EMPRESA = ?`

    return database.executar(instrucaoSql, [fkEmpresa])
}

function getByIdUsuario(idFuncionario){
    var instrucaoSql = `SELECT * FROM TB_FUNCIONARIO WHERE ID_FUNC = ?;`

    return database.executar(instrucaoSql, [idFuncionario])
}

function updateUsuario(idFuncionario, nome, email, senha, tel){
    var instrucaoSql = `UPDATE TB_FUNCIONARIO
                        SET
                        NOME = ?,
                        EMAIL = ?,
                        SENHA = ?,
                        TEL = ?
                        WHERE ID_FUNC = ?`
    return database.executar(instrucaoSql, [nome, email, senha, tel, idFuncionario])
}

function deleteUsuario(idFuncionario){
    var instrucaoSql = `DELETE FROM TB_FUNCIONARIO WHERE = ?`

    return database.executar(instrucaoSql, [idFuncionario])
}

module.exports = {
    autenticar,
    cadastrar,
    confirmarCodigo,
    getUsuario,
    getByIdUsuario,
    updateUsuario,
    deleteUsuario
};
