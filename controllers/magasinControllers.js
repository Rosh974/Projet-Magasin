var Magasin = require ("../models/Magasin");
var mongoose = require('mongoose');

var magasinController = {};

// Lister les magasins
magasinController.list = function(req, res) {
    Magasin.find({}).exec(function(err, magasin){
        if(err){
            console.log('Error : ', err);
        }else{
            console.log("->",magasin);
            res.render("../views/magasin/index",{magasin:magasin} );
        } 
    });
  };

// Créer un magasin
  magasinController.create = function(req, res){
    res.render("../views/magasin/ajout");
  }; 
  
// Enregistrer le magasin créé
  
  magasinController.save = function(req, res){
    var magasin = new Magasin(req.body);
     
    magasin.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/magasin/ajout");
        } else{
            console.log("creation produit OK");
            res.redirect("/magasins" );
        } 
    });
  };



//edition d'un produit par son id

magasinController.edit = function(req, res){
    var magasin = new Magasin(req.body);

    Magasin.findOne({_id:req.params.id}).exec(function(err, magasin){
        if(err){
            console.log("Error ", err);
        } else{
            res.render("../views/magasin/edit",{magasin: magasin} );
        } 
    });
};

//gestion de l'edition dun produit
magasinController.update = function(req, res){
   
    Magasin.findByIdAndUpdate(req.params.id,{ $set :{enseigne: req.body.enseigne, adresse: req.body.adresse} },{new: true}, function (err, magasin){

        if (err){
            console.log(err);
            res.render("../views/magasin/edit",{magasin:req.body} );
        } 
        res.redirect("/magasins");
       
    });
};

//suppression d'un magasin
magasinController.remove = function(req, res){
    console.log("produitController",req.params.id)
    Magasin.findByIdAndRemove(req.params.id, function (err, magasin){

        if (err){
            console.log(err);
            
        } 
        res.redirect("/magasins");
        
    });
};


magasinController.magasinslist = function(req,res) {
    Magasin.find({}).exec(function(err, magasin){
        if(err){
            console.log('Error : ', err);
        }else{
            //console.log("->",produit);
            res.render("../views/magasin/magasinslist",{magasin:magasin} );
  
        } 
    });

}

  //export du module
module.exports = magasinController;