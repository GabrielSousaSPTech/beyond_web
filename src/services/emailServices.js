const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

async function sendEmail(to, codigo) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Bem-vindo! Aqui está a chave de ativação da sua organização',
    html: `
    <div style="font-family: Outfit; color: #333;">
      <h2>🚀 Sua organização foi criada com sucesso!</h2>
      <p>Olá,</p>
      <p>Use o código abaixo para ativar sua organização no sistema:</p>
      <h1 style="color: #3E5744;">${codigo}</h1>
      <p>Copie esse código e cole na tela de ativação.</p>
      <br>
      <p>Se você não solicitou esse código, apenas ignore este e-mail.</p>
      <hr style="margin: 32px 0;">
      <p style="font-size: 12px; color: #888;">
        Este é um e-mail automático. Por favor, não responda.
      </p>
      <p style="font-size: 12px; color: #888;">
        Beyond Analytics © ${new Date().getFullYear()}
      </p>
    </div>
  `
  });
}

module.exports = { sendEmail };
