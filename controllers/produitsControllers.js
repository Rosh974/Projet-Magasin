var mongoose = require('mongoose');

var produitController = {};
var Produit = require ("../models/Produit"); 


// Liste les produits

produitController.list = function(req, res) {
  Produit.find({}).exec(function(err, produit){
      if(err){
          console.log('Error : ', err);
      }else{
          //console.log("->",produit);
          res.render("../views/produit/index",{produits:produit} );

      } 
  });
};

produitController.list2 = function(req, res) {
    Produit.find({}).exec(function(err, produit){
        if(err){
            console.log('Error : ', err);
        }else{
            //console.log("->",produit);
            res.render("../views/index",{produits:produit, title: 'Magasin' } )
  
        } 
    });
  };


// Affiche 1 produit par son id

// produitController.index = function(req, res) {
//   Produit.findOne({_id:req.params.id}).exec(function(err, produit){
//       if(err){
//           console.log('Error : ', err);
//       }else{
//           res.render("../views/produit/modification",{produit:produit});
//       } 
//   });
// };


//redirection à la page de creation de produit
produitController.create = function(req, res){
  res.render("../views/produit/ajoutproduit");
}; 

//enregistrement des produits

produitController.save = function(req, res){
  var produit = new Produit(req.body);
    console.log(req.body);
    console.log(produit);
    if(req.body.une === "on"){
        produit.une = true;
    }else{
        produit.une = false; 
    }
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

//gestion de l'edition dun produit
produitController.update = function(req, res){
    console.log(req.params.id)
    console.log(req.body.prix)
    if (req.body.une == undefined){
        req.body.une = false;
    }else{
        req.body.une = true;
    }
    ;
    Produit.findByIdAndUpdate(req.params.id,{ $set :{nomproduit: req.body.nom, prix: req.body.prix, type:req.body.type, quantite:req.body.quantite, une: req.body.une} },{new: true}, function (err, produit){

        if (err){
            console.log(err);
            res.render("../views/produit/modification",{produit:req.body} );
        } 
        res.redirect("/produits");
        
    });
};


//suppression d'un produit
produitController.remove = function(req, res){
    Produit.findByIdAndRemove(req.params.id, function (err, produit){

        if (err){
            console.log(err);
            
        } 
        res.redirect("/produits");
        
    });
};


//export du module
module.exports = produitController;