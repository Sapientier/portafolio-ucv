const AuthenticationController = require('./controllers/AuthenticationController');
const UsersController = require('./controllers/UsersController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const path = require('path');

module.exports = (app) => {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    }),
    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register
    ),
    app.post('/login', 
        AuthenticationController.login
    ),
    app.get('/getusers', 
        UsersController.getusers
    ),
    app.post('/deleteusers', 
        UsersController.deleteusers
    ),
    app.post('/updateusers', 
        UsersController.updateusers
    )
}
