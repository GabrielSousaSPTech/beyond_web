const usuarioModel = require("../models/usuarioModel");
const logModel = require("../models/logModel");

function autenticar(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (!email || !senha) {
        return res.status(400).send("Email e/ou senha não preenchido(s).");
    }

    usuarioModel.autenticar(email, senha)
        .then(result => {
            if (result.length === 1) {
                const user = result[0];

                logModel.registrarLog(
                    user.ID_FUNC,
                    user.FK_EMPRESA,
                    'LOGIN',
                    `Usuário ${user.NOME} logou no sistema`
                ).catch(err => console.error("Erro no log de login:", err));

                res.json({
                    email: user.EMAIL,
                    nome: user.NOME,
                    idUsuario: user.ID_FUNC,
                    empresa: user.FK_EMPRESA,
                    foto: user.FOTO,
                    tipo: user.TIPO,
                    cpf: user.CPF
                });
            } else {
                res.status(403).send("Email e/ou senha inválido(s).");
            }
        })
        .catch(err => {
            console.error("Erro ao autenticar:", err.sqlMessage);
            res.status(500).json(err.sqlMessage);
        });
}

function cadastrar(req, res) {
    const { empresaCodeServer, nomeServer, emailServer, senhaServer, telefoneServer, cpfServer } = req.body;

    if (!nomeServer || !emailServer || !senhaServer || !telefoneServer || !empresaCodeServer || !cpfServer) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    usuarioModel.confirmarCodigo(empresaCodeServer)
        .then(result => {
            if (result.length === 1) {
                const idEmpresa = result[0].ID_EMPRESA;

                usuarioModel.cadastrar(emailServer, senhaServer, idEmpresa, nomeServer, telefoneServer, cpfServer)
                    .then((novoUsuario) => {
                        console.log(novoUsuario)
                        logModel.registrarLog(
                            novoUsuario.insertId,
                            idEmpresa,
                            'CADASTRO',
                            `Usuário ${nomeServer} foi cadastrado no sistema`
                        ).catch(err => console.error("Erro no log de cadastro:", err));

                        res.status(200).json(novoUsuario);
                    })
                    .catch(erro => {
                        console.error("Erro ao cadastrar:", erro);
                        res.status(500).json(erro.sqlMessage);
                    });
            } else {
                res.status(403).send("Código da empresa inválido.");
            }
        })
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function updateUsuario(req, res) {
    const idFuncionario = req.params.idFuncionario;
    const { NOME, CPF, EMAIL, TEL, FK_EMPRESA } = req.body;

    usuarioModel.updateUsuario(idFuncionario, NOME, CPF, EMAIL, TEL)
        .then(resultado => {
            logModel.registrarLog(
                idFuncionario,
                FK_EMPRESA,
                'UPDATE',
                `Usuário ${NOME} foi atualizado no sistema`
            ).catch(err => console.error("Erro no log de update:", err));

            res.status(200).json({ sucesso: true, resultado });
        })
        .catch(erro => {
            res.status(500).json({ sucesso: false, resultado: erro.sqlMessage });
        });
}

function autorizarUsuario(req, res) {
    const idUsuario = req.params.idUsuario;
    const { idPermissao, idEmpresa, nomeUsuario } = req.body;

    usuarioModel.autorizarUsuario(idUsuario, idPermissao)
        .then(resultado => {
            logModel.registrarLog(
                idUsuario,
                idEmpresa,
                'AUTORIZAR',
                `Usuário ${nomeUsuario} teve permissão alterada para ${idPermissao}`
            ).catch(err => console.error("Erro no log de autorização:", err));

            res.status(200).json(resultado);
        })
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

async function updateSenha(req, res) {
    try {
        const idFuncionario = req.params.idFuncionario;
        const { senhaAtual, senhaNova } = req.body;

        const resultado = await usuarioModel.getSenha(idFuncionario);
        const resultado2 = await usuarioModel.getByIdUsuario(idFuncionario);

        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ 
                sucesso: false, 
                message: 'Usuário não encontrado' 
            });
        }
       
        const senhaAtualBanco = resultado[0].SENHA;
        const fkEmpresa = resultado2[0].FK_EMPRESA;

        if (String(senhaAtualBanco).trim() === String(senhaAtual).trim()) {
            const resultadoUpdate = await usuarioModel.updateSenha(idFuncionario, senhaNova);

            await logModel.registrarLog(
                idFuncionario,
                fkEmpresa,
                'UPDATE_SENHA',
                `Usuário ID ${idFuncionario} alterou sua senha`
            ).catch(err => {
                console.error("Erro no log de senha:", err);
            });

            res.status(200).json({ 
                sucesso: true, 
                message: 'Senha atualizada com sucesso',
                resultado: resultadoUpdate 
            });

        } else {
            res.status(400).json({ 
                sucesso: false, 
                message: 'Senha atual incorreta' 
            });
        }

    } catch (erro) {
        res.status(500).json({ 
            sucesso: false, 
            message: 'Erro interno do servidor',
            erro: erro.message 
        });
    }
}


function getUsuario(req, res) {
    usuarioModel.getUsuario(req.params.fkEmpresa)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e.sqlMessage));
}

function getByIdUsuario(req, res) {
    usuarioModel.getByIdUsuario(req.params.idFuncionario)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e.sqlMessage));
}

function deleteUsuario(req, res) {
    const idFuncionario = req.params.idFuncionario;

    usuarioModel.getByIdUsuario(idFuncionario)
        .then(resultadoBusca => {
            const usuario = resultadoBusca[0];

            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            // Primeiro registra o log
            return logModel.registrarLog(
                idFuncionario,
                usuario.FK_EMPRESA,
                'DELETE',
                `Usuário ${usuario.NOME} (ID ${idFuncionario}) foi deletado do sistema`
            ).then(() => {
                // Depois de registrar o log, aí sim deleta
                return usuarioModel.deleteUsuario(idFuncionario);
            });
        })
        .then(resultadoDelete => {
            res.status(200).json(resultadoDelete);
        })
        .catch(erro => {
            console.error("Erro ao deletar usuário:", erro);
            res.status(500).json({ erro: erro.sqlMessage || erro.message });
        });
}


function getUsuarioEmAnalise(req, res) {
    usuarioModel.getUsuarioEmAnalise(req.params.fkEmpresa)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e.sqlMessage));
}

function getPermissoes(req, res) {
    usuarioModel.getPermissoes()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e.sqlMessage));
}

function getSenha(req, res) {
    usuarioModel.getSenha(req.params.idFuncionario)
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e.sqlMessage));
}


module.exports = {
    autenticar,
    cadastrar,
    getUsuario,
    getByIdUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioEmAnalise,
    autorizarUsuario,
    getPermissoes,
    updateSenha,
    getSenha,
    updateImagemUsuario
}
