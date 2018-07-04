var express = require('express');
var router = express.Router();


var vends= require("../controllers/vendControllers");

//recuperer les ventes
router.get("/", vends.list);

//cree un magasin
router.get("/ajout", vends.create);

//sauvegarder un produit. /!\ cest un POST 
router.post("/save", vends.save);

// editer un produit
// router.get("/edit/:id", vends.edit);

// edit update.  /!\ cest un POST 
// router.post("/update/:id", vends.update);

// supprimer un produit
// router.get("/remove/:id", vends.remove);

//export du module router
module.exports = router;