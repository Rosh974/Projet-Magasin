var Magasin = require ("../models/Magasin");
var Produit = require ("../models/Produit");
var Vend = require ("../models/vend");
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
          res.redirect("/vends" );
      } 
  });
};

// liste vente
vendController.list = function(req, res) {
    Vend.find({})
    .populate("id_produit")
    .populate("id_magasin")
    .exec(function(err, vend){
        if(err){
            console.log('Error : ', err);
        }else{
            console.log("->",vend);
            res.render("../views/vend/index",{vend:vend} );
  
        } 
    });
  };


//export du module
module.exports = vendController;