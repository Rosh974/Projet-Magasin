var express = require('express');
var router = express.Router();


var vends= require("../controllers/vendControllers");

//recuperer les ventes
router.get("/", vends.list);

//cree une vente
router.get("/ajout", vends.create);

//sauvegarder une vente. /!\ cest un POST 
router.post("/save", vends.save);


//export du module router
module.exports = router;