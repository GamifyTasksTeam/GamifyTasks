
/*
 * GET home page.
 */

exports.app = function(req, res){
    res.render('app/app', { title: 'Gamify Tasks' });
};

exports.index = function(req, res){
    res.render('home', { title: 'Home - Gamify Tasks' });
};

exports.about = function(req, res){
    res.render('about', { title: 'About - Gamify Tasks' });
};

exports.contact = function(req, res){
    res.render('contact', { title: 'Contact - Gamify Tasks' });
};

exports.login = function(req, res){
    res.render('login', { title: 'Login - Gamify Tasks' });
};