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

                if (resultadoAutenticar.length == 1) {
                    res.json({
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        idUsuario: resultadoAutenticar[0].idUsuario,
                        empresa: resultadoAutenticar[0].empresa,
                        telefone: resultadoAutenticar[0].telefone
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
                    usuarioModel.cadastrar(email, senha, resultadoCodigo[0].ID_EMPRESA, nome, telefone)
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

module.exports = {
    autenticar,
    cadastrar
}