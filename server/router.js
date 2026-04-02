const controllers = require('./controllers');
const middleware = require('./middleware');

const router = (app) => {
    app.get('/login', controllers.Account.loginPage);
    app.post('/login', controllers.Account.login);

    app.get('/signup', controllers.Account.signupPage);
    app.post('/signup', controllers.Account.signup);

    app.get('/logout', controllers.Account.logout);

    app.get('/maker', controllers.Domo.makerPage);
    app.post('/maker', controllers.Domo.makeDomo);


    app.get('/', controllers.Account.loginPage);

    app.get('/', middleware.requiresSecure, middleware.requiresLogout, controllers.Account.loginPage);

}

module.exports = router;
