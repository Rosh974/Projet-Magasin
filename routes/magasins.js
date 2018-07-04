var express = require('express');
var router = express.Router();


var magasin = require("../controllers/magasinControllers");

//recuperer la liste des magasins
router.get("/", magasin.list);

//creer un magasin
router.get("/ajoutmagasin", magasin.create);

//sauvegarder un magasin. /!\ cest un POST 
router.post("/save", magasin.save);

// editer un magasin
router.get("/edit/:id", magasin.edit);

// edit update.  /!\ cest un POST 
router.post("/update/:id", magasin.update);

// supprimer un magasin
router.get("/remove/:id", magasin.remove);

//export du module router
module.exports = router;