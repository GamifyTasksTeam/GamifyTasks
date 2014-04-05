
/*
 * GET home page.
 */

exports.tasks = function(req, res){
    res.render('tasks/tasks', { title: 'Gamify Tasks' });
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