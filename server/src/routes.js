const AuthenticationController = require('./controllers/AuthenticationController');
const UsersController = require('./controllers/UsersController');
const ServicesController = require('./controllers/ServicesController');
const SuscribeController = require('./controllers/SuscribeController');
const NotificationsController = require('./controllers/NotificationsController');
const fs = require('fs')
const path = require('path');
const multer = require('multer');
const storageA = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('public/'))
            fs.mkdirSync('public/');
        if (!fs.existsSync('public/uploads/'))
            fs.mkdirSync('public/uploads/');
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(" ", ""))
    }
});
const storageB = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('public/'))
            fs.mkdirSync('public/');
        if (!fs.existsSync('public/avatars/'))
            fs.mkdirSync('public/avatars/');
        cb(null, 'public/avatars/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(" ", ""))
    }
});
const upload1 = multer({ storage: storageA });
const upload2 = multer({ storage: storageB });

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    }),
        app.get('/getusers',
            UsersController.getusers
        ),
        app.get('/getuniservicebycat',
            ServicesController.getuniservicebycat
        ),
        app.get('/getuniservicebyname',
            ServicesController.getuniservicebyname
        ),
        app.get('/getuniservicebyapproved',
            ServicesController.getuniservicebyapproved
        ),
        app.get('/getservices',
            ServicesController.getservices
        ),
        app.get('/getsuscribers',
            SuscribeController.getsuscribers
        ),
        app.get('/getnotifications',
            NotificationsController.getnotifications
        ),
        app.post('/getuserpass',
            UsersController.getuserpass
        ),
        app.get('/getuserper',
            UsersController.getuserper
        ),
        app.post('/login',
            AuthenticationController.login
        ),
        app.post('/resetpassLogin',
            AuthenticationController.resetpassLogin
        ),
        app.post('/insertusers',
            UsersController.insertusers
        ),
        app.post('/deleteusers',
            UsersController.deleteusers
        ),
        app.post('/updateusers',
            UsersController.updateusers
        ),
        app.post('/updateuserper',
            upload2.single('image'),
            UsersController.updateuserper
        ),
        app.post('/updateusernoti',
            UsersController.updateusernoti
        ),
        app.post('/resetpass',
            UsersController.resetpass
        ),
        app.post('/modpass',
            UsersController.modpass
        ),
        app.post('/insertservices',
            upload1.single('image'),
            ServicesController.insertservices
        ),
        app.post('/deleteservices',
            ServicesController.deleteservices
        ),
        app.post('/updateservices',
            upload1.single('image'),
            ServicesController.updateservices
        ),
        app.post('/insertnotifications',
            NotificationsController.insertnotifications
        ),
        app.post('/deletenotifications',
            NotificationsController.deletenotifications
        ),
        app.post('/suscribeservices',
            SuscribeController.suscribeservices
        ),
        app.post('/getreportsnoti',
            NotificationsController.getreportsnoti
        ),
        app.post('/getreportserv',
            ServicesController.getreportserv
        ),
        app.post('/getreportsusc',
            SuscribeController.getreportsusc
        ),
        app.post('/getreportsuser',
            UsersController.getreportsuser
        )
}   
