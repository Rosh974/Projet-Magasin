var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// schema de la collection Vend
var vendSchema = new mongoose.Schema({
    // voir commentaire dans memo.md
    id_produit:[{ type: Schema.Types.ObjectId, ref: 'produit' }],
    id_magasin: [{ type: Schema.Types.ObjectId, ref: 'magasin' }]
});



module.exports = mongoose.model("Vend", vendSchema);