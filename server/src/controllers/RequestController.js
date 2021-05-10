const Request = require('../models/Request');
const Mailer = require('../controllers/MailController');
var moment = require('moment');
var fs = require('fs');

function setEmailContent(Title, Content, htmlText) {
    let finalText = htmlText;
    finalText = htmlText.replace("{{EmailSubject}}", Title);
    finalText = finalText.replace("{{Content}}", Content);

    return finalText;
}

module.exports = {
    async requestservice(req, res) {
        const date = new Date().toISOString().substr(0, 10);

        let descripcionMail = "Se realizo una solicitud por <b>" + req.body.emailReq + "</b> del servicio <b>" + req.body.serviceName + "</b>";
        let note = req.body.note;

        try {
            if (note !== "") {
                descripcionMail = "Se realizo una solicitud por <b>" + req.body.emailReq + "</b> del servicio <b>" + req.body.serviceName + "</b><br><br>Nota: <b>" + note + "</b>"
            }

            const correoaux = await Request.findOne({ $and: [
                { emailReq: req.body.emailReq },
                { serviceReq: req.body.serviceName }
            ]});

            if (correoaux) {
                return res.status(403).send({
                    error: 'El correo electronico ingresado ya creo una solicitud para este servicio'
                })
            }
            else {
                let contents = fs.readFileSync('./src/templates/communications.html', 'utf8');

                let body = setEmailContent("Solicitud de servicio", descripcionMail, contents);

                let mailOptions = {
                    from: '"Portafolio Ciencias" <portafolioucv@gmail.com>',
                    to: req.body.autorMail,
                    subject: 'Solicitud nueva',
                    html: body,
                    attachments: [{
                        filename: 'UCV.png',
                        path: 'src/templates/UCV.png',
                        cid: 'UCV@portafolio.app'
                    },
                    {
                        filename: 'ciencia.png',
                        path: 'src/templates/ciencia.png',
                        cid: 'ciencia@portafolio.app'
                    }]
                };

                const task = new Request({
                    emailReq: req.body.emailReq,
                    dateReq: date,
                    serviceReq: req.body.serviceName,
                    noteReq: note
                });
                const request = await task.save();
                res.json(request.toJSON());

                Mailer.sendMails(mailOptions);
            }
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al solicitar un servicio'
            })
        }
    },
    async getrequests(req, res) {
        try {
            const requests = await Request.find();
            res.json(requests);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar las solicitudes'
            })
        }
    },
    async getreportreq(req, res) {
        try {
            let query = {};
            let requests;

            if (req.body.emailReq !== '' && req.body.emailReq !== undefined) {
                query['emailReq'] = { $regex: '.*' + req.body.emailReq + '.*', $options: 'i' };
            }
            if (req.body.dateReq !== '' && req.body.dateReq !== undefined) {
                query['dateReq'] = moment(req.body.dateReq, "DD/MM/YYYY").format("YYYY-MM-DDT00:00:00.000+00:00");
            }
            if (req.body.serviceReq !== '' && req.body.serviceReq !== undefined) {
                query['serviceReq'] = { $regex: '.*' + req.body.serviceReq + '.*', $options: 'i' };
            }
            if (req.body.noteReq !== '' && req.body.noteReq !== undefined) {
                query['noteReq'] = { $regex: '.*' + req.body.noteReq + '.*', $options: 'i' };
            }

            if (Object.keys(query).length === 0) {
                requests = await Request.find();
            }
            else {
                requests = await Request.find(query);
            }

            res.json(requests);
        } catch (err) {
            res.status(500).send({
                error: 'Ha ocurrido un error al buscar las solicitudes'
            })
        }
    }
}