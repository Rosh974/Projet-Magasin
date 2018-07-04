var express = require('express');
var router = express.Router();


var magasin = require("../controllers/magasinControllers");

//recuperer la liste des magasins
router.get("/", magasin.list);

//creer un magasin
router.get("/ajoutmagasin", magasin.create);

//sauvegarder un magasin. /!\ cest un POST 
router.post("/save", magasin.save);


//export du module router
module.exports = router;