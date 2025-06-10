const { registrarLog } = require('../controllers/logController'); // ajusta o caminho conforme tua pasta

app.post('/usuarios', (req, res) => {
    const { email, senha } = req.body;

    const sql = `SELECT * FROM TB_FUNCIONARIO WHERE EMAIL = ? AND SENHA = ?`;
    db.query(sql, [email, senha], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send("Credenciais inválidas");
        }

        const user = results[0];

        registrarLog(user.ID_FUNC, user.FK_EMPRESA, 'LOGIN', `Usuário ${user.NOME} logou`);

        res.status(200).send(user);
    });
});