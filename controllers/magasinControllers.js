var Magasin = require ("../models/Magasin");
var mongoose = require('mongoose');

var magasinController = {};
// Liste les magasins

magasinController.listMagasin = function(req, res) {
    Magasin.find({}).exec(function(err, magasin){
        if(err){
            console.log('Error : ', err);
        }else{
            console.log("->",magasin);
            res.render("../views/magasin/indexmagasin",{magasin:magasin} );
        } 
    });
  };

//   créer un magasin
  magasinController.createMagasin = function(req, res){
    res.render("../views/magasin/ajoutmagasin");
  }; 
  
  //enregistrement des magasins
  
  magasinController.saveMagasin = function(req, res){
    var produit = new Magasin(req.body);
     
    produit.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/magasin/ajoutmagasin");
        } else{
            console.log("creation produit OK");
            res.redirect("/" );
        } 
    });
  };


  //export du module
module.exports = magasinController;