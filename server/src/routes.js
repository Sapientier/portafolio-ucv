const AuthenticationController = require('./controllers/AuthenticationController');
const UsersController = require('./controllers/UsersController');
const ServicesController = require('./controllers/ServicesController');
const NotificationsController = require('./controllers/NotificationsController');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    }),
        app.post('/login',
            AuthenticationController.login
        ),
        app.post('/insertusers',
            UsersController.insertusers
        ),
        app.get('/getusers',
            UsersController.getusers
        ),
        app.post('/getuserpass',
            UsersController.getuserpass
        ),
        app.post('/getuserper',
            UsersController.getuserper
        ),
        app.post('/deleteusers',
            UsersController.deleteusers
        ),
        app.post('/updateusers',
            UsersController.updateusers
        ),
        app.post('/updateuserper',
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
            upload.single('image'),
            ServicesController.insertservices
        ),
        app.get('/getservices',
            ServicesController.getservices
        ),
        app.post('/deleteservices',
            ServicesController.deleteservices
        ),
        app.post('/updateservices',
            upload.single('image'),
            ServicesController.updateservices
        ),
        app.post('/getuniservicebycat',
            ServicesController.getuniservicebycat
        ),
        app.post('/getuniservicebyname',
            ServicesController.getuniservicebyname
        ),
        app.post('/suscribeservices',
            ServicesController.suscribeservices
        ),
        app.post('/getnotifications',
            NotificationsController.getnotifications
        ),
        app.post('/insertnotifications',
            NotificationsController.insertnotifications
        ),
        app.post('/deletenotifications',
            NotificationsController.deletenotifications
        )
}   
