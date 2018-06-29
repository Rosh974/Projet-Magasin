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
          res.render("../views/produit/index",{produits:produit, test:"toto"} );
      } 
  });
};



// Affiche 1 produit par son id

// produitController.index = function(req, res) {
//   Produit.findOne({_id:req.params.id}).exec(function(err, produit){
//       if(err){
//           console.log('Error : ', err);
//       }else{
//           res.render("../views/index",{produit:produit});
//       } 
//   });
// };


//redirection à la page de creation de produit


//enregistrement des legumes


//edition d'un produit par son id




//export du module
module.exports = produitController;