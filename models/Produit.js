var mongoose = require('mongoose');

var ProduitSchema = new mongoose.Schema({
    nomproduit: String,
    type: String,
    prix: Number,
    quantite: Number
});

module.exports = mongoose.model("produit", ProduitSchema);