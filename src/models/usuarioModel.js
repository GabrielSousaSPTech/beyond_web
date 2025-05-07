var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", email, senha);
    var instrucaoSql = `
        SELECT idUsuario, empresa, nome, email FROM usuarios WHERE email = ? AND senha = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email, senha]);
}

function cadastrar(email, senha, empresa, nome, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email, senha, empresa, nome, telefone);
    
    var instrucaoSql = `
        INSERT INTO usuarios (empresa, nome, email, senha, telefone) 
        VALUES (?, ?, ?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [empresa, nome, email, senha, telefone]);
}

function confirmarCodigo(codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function confirmarCodigo():", codigo);
    
    var instrucaoSql = `
        SELECT idEmpresa FROM empresa WHERE idEmpresa = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [codigo]);
}

module.exports = {
    autenticar,
    cadastrar,
    confirmarCodigo
};
