var mongoose = require('mongoose');

var produitController = {};
var Produit = require ("../models/Produit"); 


// Liste les produits

produitController.list = function(req, res) {
  Produit.find({}).exec(function(err, produit){
      if(err){
          console.log('Error : ', err);
      }else{
          console.log("->",produit);
          res.render("../views/produit/index",{produits:produit} );
      } 
  });
};



// Affiche 1 produit par son id

produitController.index = function(req, res) {
  Produit.findOne({_id:req.params.id}).exec(function(err, produit){
      if(err){
          console.log('Error : ', err);
      }else{
          res.render("../views/produit/modification",{produit:produit});
      } 
  });
};


//redirection à la page de creation de produit
produitController.create = function(req, res){
  res.render("../views/produit/ajoutproduit");
}; 

//enregistrement des produits

produitController.save = function(req, res){
  var produit = new Produit(req.body);

  produit.save(function(err){
      if(err){
          console.log(err);
          res.render("../views/produit/ajoutproduit");
      } else{
          console.log("creation produit OK");
          res.redirect("/produits" );
      } 
  });
};


//edition d'un produit par son id

produitController.edit = function(req, res){
    var produit = new Produit(req.body);

    Produit.findOne({_id:req.params.id}).exec(function(err, produit){
        if(err){
            console.log("Error ", err);
        } else{
            res.render("../views/produit/modification",{produit: produit} );
        } 
    });
};

//gestion de l'edition dun legume
produitController.update = function(req, res){
    console.log(req.params.id)
    console.log(req.body.prix)
    Produit.findByIdAndUpdate(req.params.id,{ $set :{nomproduit: req.body.nom, prix: req.body.prix, type:req.body.type, quantite:req.body.quantite} },{new: true}, function (err, produit){

        if (err){
            console.log(err);
            res.render("../views/produit/modification",{produit:req.body} );
        } 
        res.redirect("/produits");
        
    });
};

//export du module
module.exports = produitController;