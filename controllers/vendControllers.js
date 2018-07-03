var Magasin = require ("../models/Magasin");
var Produit = require ("../models/Produit");
var mongoose = require('mongoose');

var vendController = {};

// associe un produit a un magasin
vendController.create = function(req, res){
  res.render("../views/vend/ajout");
}; 

//enregistrement des magasins

vendController.save = function(req, res){
  var vente = new Vend(req.body);
   
  vente.save(function(err){
      if(err){
          console.log(err);
          res.render("../views/vend/ajout");
      } else{
          console.log("creation vente OK");
          res.redirect("/" );
      } 
  });
};

// liste vente
vendController.list = function(req, res) {
    Produit.find({}).exec(function(err, produit){
        if(err){
            console.log('Error : ', err);
        }else{
            //console.log("->",produit);
            res.render("../views/vend/index",{produits:produit} );
  
        } 
    });
  };


//export du module
module.exports = vendController;