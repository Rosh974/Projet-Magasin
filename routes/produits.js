var express = require('express');
var router = express.Router();



// A MODIFIER SI BESOIN !!!

var produit = require("../controllers/produitsControllers");

//recuperer les produits
router.get("/", produit.list);

//cree un produit
router.get("/ajoutproduit", produit.create);

//sauvegarder un produit. /!\ cest un POST 
router.post("/save", produit.save);

// editer un produit
router.get("/edit/:id", produit.edit);

// edit update.  /!\ cest un POST 
router.post("/update/:id", produit.update);

// supprimer un produit
router.get("/remove/:id", produit.remove);

router.get("/produitslist", produit.produitslist);

//export du module router
module.exports = router;

