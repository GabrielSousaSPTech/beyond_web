var services = require("../services/emailServices")

function sendEmail(req, res){
    var para = req.body.emailDestinatario
    var codigo = req.body.codigo
    services.sendEmail(para, codigo).then(function(){
        res.status(200).json({ message: 'Email enviado com sucesso' })
    }).catch(function(error){
        res.status(500).json({ error: 'Erro ao enviar email', detail: error })
    })
}

module.exports = {
    sendEmail
}