var database = require("../database/config");

function autenticar(email, senha) {
    var instrucaoSql = ` 
        SELECT  
            func.ID_FUNC,
            func.FK_EMPRESA,
            func.NOME,
            func.CPF,
            func.EMAIL,
            func.TEL,
            func.FOTO,
            func.STATUS_CADASTRO,
            func.FK_PERMISSAO,
            permissao.NOME as TIPO
        FROM TB_FUNCIONARIO func
        JOIN TB_PERMISSAO permissao
            ON func.FK_PERMISSAO = permissao.ID_PERMISSAO
        WHERE
            func.EMAIL = ? AND
            func.SENHA = ? AND
            func.STATUS_CADASTRO = ?;
    `;
    return database.executar(instrucaoSql, [email, senha, "ativo"]);
}

function cadastrar(email, senha, empresa, nome, telefone) {
    
    var instrucaoSql = `
        INSERT INTO TB_FUNCIONARIO (FK_EMPRESA, NOME, EMAIL, SENHA, TEL, STATUS_CADASTRO) 
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    //USE ESSE INSERT QUANDO ADICIONAR O CAMPO DE CPF NO FRONT
// var instrucaoSql = `
//         INSERT INTO TB_FUNCIONARIO (FK_EMPRESA, NOME, CPF, EMAIL, SENHA, TEL, STATUS_CADASTRO) 
//         VALUES (?, ?, ?, ?, ?, ?, ?);
//     `;

    return database.executar(instrucaoSql, [empresa, nome, email, senha, telefone, "analise"]);
}

function confirmarCodigo(codigo) {
    var instrucaoSql = `
        SELECT ID_EMPRESA FROM TB_EMPRESA WHERE CHAVE_ATIVACAO = ?;
    `;
    return database.executar(instrucaoSql, [codigo]);
}

function getUsuario(fkEmpresa) {
    var instrucaoSql = `
        SELECT 
            func.ID_FUNC,
            func.FK_EMPRESA,
            func.NOME,
            func.CPF,
            func.EMAIL,
            func.TEL,
            func.FOTO,
            func.STATUS_CADASTRO,
            func.FK_PERMISSAO,
            permissao.NOME as TIPO
        FROM TB_FUNCIONARIO func
        JOIN TB_PERMISSAO permissao ON func.FK_PERMISSAO = permissao.ID_PERMISSAO
        WHERE func.FK_EMPRESA = ? AND func.STATUS_CADASTRO = ?
    `;

    return database.executar(instrucaoSql, [fkEmpresa, "ativo"]);
}
function getSenha(idFuncionario) {
    var instrucaoSql = `
        SELECT SENHA
        FROM TB_FUNCIONARIO
        WHERE ID_FUNC = ?
    `;

    return database.executar(instrucaoSql, [idFuncionario]);
}


function getByIdUsuario(idFuncionario){
    var instrucaoSql = `SELECT 
                            func.ID_FUNC,
                            func.FK_EMPRESA,
                            func.NOME,
                            func.CPF,
                            func.EMAIL,
                            func.TEL,
                            func.FOTO,
                            func.STATUS_CADASTRO,
                            func.FK_PERMISSAO,
                            permissao.NOME as TIPO
                        FROM TB_FUNCIONARIO as func
                        JOIN TB_PERMISSAO permissao ON func.FK_PERMISSAO = permissao.ID_PERMISSAO
                        WHERE ID_FUNC = ?;`

    return database.executar(instrucaoSql, [idFuncionario])
}

function updateUsuario(idFuncionario, nome, cpf, email, tel){
    var instrucaoSql = `UPDATE TB_FUNCIONARIO
                        SET
                        NOME = ?,
                        CPF = ?,
                        EMAIL = ?,
                        TEL = ?
                        WHERE ID_FUNC = ?`
    return database.executar(instrucaoSql, [nome,cpf, email, tel, idFuncionario])
}

function updateSenha(idFuncionario, senha){
    var instrucaoSql = `UPDATE TB_FUNCIONARIO
                        SET
                        SENHA = ?
                        WHERE ID_FUNC = ?`
    return database.executar(instrucaoSql[idFuncionario, senha])
}

function deleteUsuario(idFuncionario){
    var instrucaoSql = `DELETE FROM TB_FUNCIONARIO WHERE ID_FUNC = ?`

    return database.executar(instrucaoSql, [idFuncionario])
}

function getUsuarioEmAnalise(fkEmpresa) {
    var instrucaoSql = `SELECT ID_FUNC, NOME, EMAIL FROM TB_FUNCIONARIO WHERE FK_EMPRESA = ? AND STATUS_CADASTRO = ?`

    return database.executar(instrucaoSql, [fkEmpresa, "analise"])
}

function autorizarUsuario(idFuncionario, idPermissao){
    console.log(idFuncionario, idPermissao)
    var instrucaoSql = `UPDATE TB_FUNCIONARIO
                        SET
                        STATUS_CADASTRO = ?,
                         FK_PERMISSAO = ?
                         WHERE ID_FUNC = ?`
    
    return database.executar(instrucaoSql, ["ativo", idPermissao, idFuncionario])
}

function getPermissoes(){
    var instrucaoSql = `SELECT * FROM TB_PERMISSAO;`
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrar,
    confirmarCodigo,
    getUsuario,
    getByIdUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioEmAnalise,
    autorizarUsuario,
    getPermissoes,
    updateSenha,
    getSenha
};
