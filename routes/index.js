var express = require('express');
var router = express.Router();

// lien vers produitcontroller pour afficher la liste des produit dans index
var produit = require("../controllers/produitsControllers");

/* GET home page. */
router.get('/', produit.list2);

module.exports = router;
