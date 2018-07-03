var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendSchema = new mongoose.Schema({
    id_produit:[{ type: Schema.Types.ObjectId, ref: 'produit' }],
    id_magasin: [{ type: Schema.Types.ObjectId, ref: 'magasin' }]
});



module.exports = mongoose.model("Vend", vendSchema);