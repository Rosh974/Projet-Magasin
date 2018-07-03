var express = require('express');
var router = express.Router();


var magasin = require("../controllers/produitsControllers");

//recuperer les produits
router.get("/", magasin.listMagasin);

//cree un magasin
router.get("/ajoutmagasin", magasin.createMagasin);

//sauvegarder un produit. /!\ cest un POST 
router.post("/save", magasin.saveMagasin);


//export du module router
module.exports = router;