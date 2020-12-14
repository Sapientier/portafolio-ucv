const nodemailer = require("nodemailer");
const config = require("../config");

module.exports = {
    // async..await
    async sendMails(mailOptions) {
        // creamos objeto transporter reusable usando el SMTP de gmail
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true para 465, false para otros puertos
            auth: {
                user: config.authentication.email,
                pass: config.authentication.password
            }
        });

        // envia correos con el objeto transporter definido
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Correo enviado: " + info.response);
            }
        });
    }
}