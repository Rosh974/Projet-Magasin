var express = require('express');
var router = express.Router();

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/profiles/ajoutuser');
    }
};

var vends= require("../controllers/vendControllers");

//recuperer les ventes
router.get("/", vends.list);

//cree une vente
router.get("/ajout", requireLogin, vends.create);

//sauvegarder une vente. /!\ cest un POST 
router.post("/save", requireLogin, vends.save);

// editer une vente
router.get("/edit/:id", requireLogin, vends.edit);

// edit update.  /!\ cest un POST 
router.post("/update/:id", requireLogin, vends.update);

// supprimer une vente
router.get("/remove/:id", requireLogin, vends.remove);

//export du module router
module.exports = router;