const AuthenticationController = require('./controllers/AuthenticationController');
const UsersController = require('./controllers/UsersController');
const path = require('path');

module.exports = (app) => {
    app.get('/', function(req, res) {
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
    app.post('/deleteusers', 
        UsersController.deleteusers
    ),
    app.post('/updateusers', 
        UsersController.updateusers
    ),
    app.post('/resetpass', 
        UsersController.resetpass
    )
}
