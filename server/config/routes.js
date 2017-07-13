var mongoose = require('mongoose');
var User = mongoose.model('User')
var users= require('../controllers/users.js')
module.exports= function(app){
  app.get('/', function(req, res) {
    users.index(req,res);
  })
  app.post('/user/register', function(req, res) {
    users.register(req,res);
  })
  app.post('/user/login', function(req, res) {
    users.login(req,res);
  })
  app.get('/show', function(req,res){
    users.show(req,res);
  })
  // routes to redirect for to index page
  app.get('/user/register', function(req, res) {
    res.redirect('/')
  })
  app.get('/user/login', function(req, res) {
    res.redirect('/')
  })
  

}
