var express = require('express');
var router = express.Router();


var vends= require("../controllers/vendControllers");

//recuperer les produits
router.get("/", vends.list);

//cree un magasin
router.get("/ajout", vends.create);

//sauvegarder un produit. /!\ cest un POST 
router.post("/save", vends.save);


//export du module router
module.exports = router;