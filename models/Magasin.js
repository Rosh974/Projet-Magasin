var mongoose = require('mongoose');

var MagasinSchema = new mongoose.Schema({
    enseigne: String,
    adresse: String,
});



module.exports = mongoose.model("magasin", MagasinSchema);