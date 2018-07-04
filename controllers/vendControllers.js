// on require le model magasin pour pouvoir faire les jointure entre magasin et produit
var Magasin = require ("../models/Magasin");
// on require le model produit pour pouvoir faire les jointure entre magasin et produit
var Produit = require ("../models/Produit");
// on require le model vend pour pouvoir créer la collection ou on va faire la jointure entre magasin et produit
var Vend = require ("../models/vend");
var mongoose = require('mongoose');

var vendController = {};

// associe un produit a un magasin
vendController.create = function(req, res){
  res.render("../views/vend/ajout");
}; 

//enregistrement des ventes

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
// voir commentaire dans memo.md
vendController.list = function(req, res) {
    Vend.find({})
    .populate("id_produit")
    .populate("id_magasin")
    .exec(function(err, vend){
        if(err){
            console.log('Error : ', err);
        }else{
            // console.log("->",vend);
            res.render("../views/vend/index",{vend:vend} );
  
        } 
    });
  };

  //edition d'une vente par son id

vendController.edit = function(req, res){
    var vend = new Vend(req.body);

    Vend.findOne({_id:req.params.id}).exec(function(err, vend){
        if(err){
            console.log("Error ", err);
        } else{
            res.render("../views/vend/modif",{vend: vend} );
        } 
    });
};

//gestion de l'edition dune vente
vendController.update = function(req, res){
    console.log(req.params.id);
    console.log(req.body.nom)
    Vend.findByIdAndUpdate(req.params.id,{ $set :{id_produit: req.body.nom, id_magasin: req.body.magasin} },{new: true}, function (err, vend){

        if (err){
            console.log(err);
            res.render("../views/vend/modif",{vend:req.body} );
        } 
        res.redirect("/vends");
        
    });
};


//suppression d'une vente
vendController.remove = function(req, res){
    console.log("vendController",req.params.id)
    Vend.findByIdAndRemove(req.params.id, function (err, vend){

        if (err){
            console.log(err);
            
        } 
        res.redirect("/vends");
        
    });
};



//export du module
module.exports = vendController;