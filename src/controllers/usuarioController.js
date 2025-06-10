var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Verificação dos campos vazios ou undefined
    if (email == undefined || email == "") {
        res.status(400).send("Seu email está undefined ou vazio!");
    } else if (senha == undefined || senha == "") {
        res.status(400).send("Sua senha está undefined ou vazia!");
    } else {
        // Chama a função de autenticação no modelo
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);
                console.log(resultadoAutenticar[0].email);

                if (resultadoAutenticar.length == 1) {
                    res.json({
                        email: resultadoAutenticar[0].EMAIL,
                        nome: resultadoAutenticar[0].NOME,
                        idUsuario: resultadoAutenticar[0].ID_FUNC,
                        empresa: resultadoAutenticar[0].FK_EMPRESA,
                        foto: resultadoAutenticar[0].FOTO,
                        tipo: resultadoAutenticar[0].TIPO,
                        cpf: resultadoAutenticar[0].CPF
                        
                    });
                } else if (resultadoAutenticar.length == 0) {
                    // Se não encontrar, retorna erro
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    // Se encontrar mais de um usuário, retorna erro
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var codigo = req.body.empresaCodeServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;
    var cpf = req.body.cpfServer;
    console.log("CPF: ", cpf)

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
   } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
   } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
   } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
   } else if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else {
        usuarioModel.confirmarCodigo(codigo)
            .then(function (resultadoCodigo) {
                console.log("AJUDA: "+resultadoCodigo[0]);
                if (resultadoCodigo.length == 0) {
                    res.status(403).send("Código inválido!");
                } else if (resultadoCodigo.length == 1) {
                    usuarioModel.cadastrar(`${email}`, `${senha}`, resultadoCodigo[0].ID_EMPRESA, `${nome}`, `${telefone}`, `${cpf}`)
                        .then(
                            function (resultado) {
                                res.json(resultado);
                            }
                        ).catch(
                            function (erro) {
                                console.log(erro);
                                console.log(
                                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                                    erro.sqlMessage
                                );
                                res.status(500).json(erro.sqlMessage);
                            }
                        );
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo código!");
                }
            }).catch(function (erro) {
                console.log("\nHouve um erro ao validar o código! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
        }
}

function getUsuario(req, res) {
    var fkEmpresa = req.params.fkEmpresa;

    usuarioModel.getUsuario(fkEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getByIdUsuario(req, res) {
    var idFuncionario = req.params.idFuncionario;

    usuarioModel.getByIdUsuario(idFuncionario).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function updateUsuario(req, res) {
    var idFuncionario = req.params.idFuncionario;
    var { NOME,CPF, EMAIL, TEL } = req.body;
    console.log("FUCK ANGULAR",req.body)
    console.log("NOME ", NOME)
    console.log("NOME ", CPF)
    console.log("NOME ", EMAIL)
    console.log("NOME ", TEL)
    console.log("id ", req.params)

    usuarioModel.updateUsuario(idFuncionario, NOME,CPF, EMAIL, TEL).then(function (resultado) {
        res.status(200).json({
            sucesso: true,
            resultado: resultado});
    }).catch(function (erro) {
        res.status(500).json({
            sucesso: false,
            resultado: erro.sqlMessage});
    });
}

function deleteUsuario(req, res) {
    var idFuncionario = req.params.idFuncionario;

    usuarioModel.deleteUsuario(idFuncionario).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function getUsuarioEmAnalise (req, res){
    var idEmpresa = req.params.fkEmpresa;

    usuarioModel.getUsuarioEmAnalise(idEmpresa).then(function (resultado){
        res.status(200).json(resultado);
    }).catch(function (erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function autorizarUsuario(req, res){
    var idUsuario = req.params.idUsuario;
    var idPermissao = req.body.idPermissao;
    console.log("resultado: ",req.body,req.query,req.params)

    usuarioModel.autorizarUsuario(idUsuario, idPermissao).then(function (resultado){
        res.status(200).json(resultado);
    }).catch(function (erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function getPermissoes(req, res) {
        console.log("AQUI")
    usuarioModel.getPermissoes().then(function(resultado){

        res.status(200).json(resultado);
    }).catch(function(erro){

        res.status(500).json(erro.sqlMessage);
    });
}

async function updateSenha(req, res) {
    try {
        const idFuncionario = req.params.idFuncionario;
        
        const resultado = await usuarioModel.getSenha(idFuncionario);
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ 
                sucesso: false, 
                message: 'Usuário não encontrado' 
            });
        }
        
        const senhaAtualBanco = resultado[0].SENHA;
        if (String(senhaAtualBanco).trim() === String(req.body.senhaAtual).trim()) {
            const resultadoUpdate = await usuarioModel.updateSenha(idFuncionario, req.body.senhaNova);
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

function getSenha(req, res) {
    const idFuncionario = req.params.idFuncionario;
    usuarioModel.getSenha(idFuncionario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function updateImagemUsuario(req, res) {
    const idFuncionario = req.params.idFuncionario;
    
    if (!req.file) {
        return res.status(400).json({
            erro: true,
            mensagem: "Nenhum arquivo foi enviado"
        });
    }
    
    const nomeArquivo = req.file.filename;
    
    usuarioModel.updateImagemUsuario(idFuncionario, nomeArquivo)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
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