var express = require('express');
var router = express.Router();



// A MODIFIER SI BESOIN !!!

var produit = require("../controllers/produitsControllers");

//recuperer les produits
router.get("/", produit.list);

//voir un produit par son id
// router.get("/show/:id", produit.show);

//cree un produit
router.get("/ajoutproduit/:id", produit.create);

//sauvegarder un produit. /!\ cest un POST 
router.post("/save", produit.save);

//editer un produit
// router.get("/edit/:id", produit.edit);

//edit update.  /!\ cest un POST 
// router.post("/update/:id", produit.update);


//export du module router
module.exports = router;

