const AuthenticationController = require('./controllers/AuthenticationController');
const UsersController = require('./controllers/UsersController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

module.exports = (app) => {
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
