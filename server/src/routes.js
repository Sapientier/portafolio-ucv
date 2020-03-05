const AuthenticationController = require('./controllers/AuthenticationController');
const UsersController = require('./controllers/UsersController');
const ServicesController = require('./controllers/ServicesController');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
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
        )
}
