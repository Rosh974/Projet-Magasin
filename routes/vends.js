var express = require('express');
var router = express.Router();


var vends= require("../controllers/vendControllers");

//recuperer les ventes
router.get("/", vends.list);

//cree une vente
router.get("/ajout", vends.create);

//sauvegarder une vente. /!\ cest un POST 
router.post("/save", vends.save);

// editer une vente
router.get("/edit/:id", vends.edit);

// edit update.  /!\ cest un POST 
router.post("/update/:id", vends.update);

// supprimer une vente
router.get("/remove/:id", vends.remove);

//export du module router
module.exports = router;