const nodemailer = require("nodemailer");
const config = require("../config");

module.exports = {
    // async..await
    async sendMails(mailOptions) {
        // creamos objeto transporter reusable usando el SMTP de gmail
        let transporter = nodemailer.createTransport({
            service: "Hotmail",
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