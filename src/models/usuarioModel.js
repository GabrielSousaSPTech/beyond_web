var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email, senha);
    var instrucaoSql = `
        SELECT ID_FUNC, FK_EMPRESA, NOME, EMAIL FROM TB_FUNCIONARIO WHERE email = ${email} AND senha = ${senha};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, email, senha);
}

function cadastrar(email, senha, empresa, nome, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email, senha, empresa, nome, telefone);
    
    var instrucaoSql = `
        INSERT INTO TB_FUNCIONARIO (FK_EMPRESA, NOME, EMAIL, SENHA, TEL) 
        VALUES (${empresa}, ${nome}, ${email}, ${senha}, ${telefone});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function confirmarCodigo(codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function confirmarCodigo():", codigo);
    
    var instrucaoSql = `
        SELECT ID_EMPRESA FROM TB_EMPRESA WHERE CHAVE_ATIVACAO = ${codigo};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    confirmarCodigo
};
