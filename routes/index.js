
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.mockupApp = function(req, res){
  res.render('mockup/app', { title: 'Express' });
};