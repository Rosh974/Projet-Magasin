var mongoose = require('mongoose');

var legumeController = {};

var ProduitSchema = new mongoose.Schema({
  nomproduit: String,
  type: String,
  quantite: Number,
  prix: Number,
});

// Liste les produits


//redirection à la page de creation de produit


//enregistrement des legumes


//edition d'un produit par son id




//export du module
module.exports = mongoose.model("Produit", ProduitSchema);