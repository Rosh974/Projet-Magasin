var express = require('express');
var router = express.Router();
var produit = require("../controllers/produitsControllers");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/');
    }
};

//recuperer les produits
router.get("/", produit.list);

//cree un produit
router.get("/ajoutproduit", produit.create);

//sauvegarder un produit. /!\ cest un POST 
router.post("/save", produit.save);

// editer un produit
router.get("/edit/:id",requireLogin, produit.edit);

// edit update.  /!\ cest un POST 
router.post("/update/:id", requireLogin, produit.update);

// supprimer un produit
router.get("/remove/:id", requireLogin, produit.remove);

router.get("/produitslist", produit.produitslist);

//export du module router
module.exports = router;

