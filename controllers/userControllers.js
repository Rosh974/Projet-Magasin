var mongoose = require('mongoose');
var User = require("../models/user");
var bcrypt = require('bcrypt');
var session = require('express-session');

var userController = {};

userController.list = function (req, res) {
  User.find({}).exec(function (err, user) {
    if (err) {
      console.log('Error : ', err);
    } else {
      //console.log("->",produit);
      res.render("../views/users/index", { user: user });

    }
  });
};

// Créer un login
userController.create = function (req, res) {
  res.render("../views/users/connexion");
};


userController.save = function (req, res) {

  if (req.body.username &&
    req.body.password &&
    req.body.passwordConfirmation) {


    var user = new User(req.body);

    user.save(function (err) {
      if (err) {
        console.log(err);
        res.render("../views/users/connexion");
      } else {
        console.log("login OK");
        res.redirect("/profiles");
      }
    });
  };
}



//fonction qui recupere le username et le password et qui compare
// avec ce qu'il y'a en bdd

userController.auth = function (req, res) {
  var username = req.body.Username;
  var password = req.body.Password;
  
  User.findOne({ username: username }).exec(function (err, user) {
    if (!err && user) {
      bcrypt.compare(password, user.password, function (err, result) {
        console.log(result);
        if (result === true) {
          req.session.userId = user._id;
          req.session.Username = user.username;
          req.session.success = 'Connexion Reussie';
          res.redirect('/profiles');
        }else {
        //console.log(req.session.userName);
        res.redirect('/profiles/ajoutuser');
        };
      })
    
  } else {
      console.log("error =>", err);
      return res.redirect('/profiles/ajoutuser');
    }

  })
};

// fonction qui permet de destroy la session pour logout
userController.logout = function(req, res){
  if (req.session){
      // supprimer la session
      console.log(req.session);
      req.session.destroy(function(err){
          if(!err){
              res.redirect('/')
          }else {
              console.log("error => ", err);
          }
      })
  }
};

//suppression d'un utilisateur
userController.remove = function(req, res){
  console.log("userController",req.params.id)
  User.findByIdAndRemove(req.params.id, function (err, user){

      if (err){
          console.log(err);
          
      } 
      res.redirect("/profiles");
      
  });
};


//export du module
module.exports = userController;