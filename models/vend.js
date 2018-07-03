var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendSchema = new mongoose.Schema({
    id_produit:[{ type: Schema.Types.ObjectId, ref: 'Produit' }]
    id_magasin: [{ type: Schema.Types.ObjectId, ref: 'Magasin' }]
});



module.exports = mongoose.model("Vend", vendSchema);