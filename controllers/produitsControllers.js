var mongoose = require('mongoose');

var produitController = {};

var ProduitSchema = new mongoose.Schema({
  nomproduit: String,
  type: String,
  quantite: Number,
  prix: Number,
});

// Liste les produits


//redirection à la page de creation de produit
produitController.create = function(req, res){
  res.render("../views/ajoutproduit");
}; 

//enregistrement des produits

produitController.save = function(req, res){
  var produit = new Produit(req.body);

  produit.save(function(err){
      if(err){
          console.log(err);
          res.render("../views/ajoutproduit");
      } else{
          console.log("creation produit OK");
          res.redirect("/index" + produit._id);
      } 
  });
};


//edition d'un produit par son id




//export du module
module.exports = mongoose.model("Produit", ProduitSchema);