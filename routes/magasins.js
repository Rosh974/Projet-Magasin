var express = require('express');
var router = express.Router();
var magasin = require("../controllers/magasinControllers");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/');
    }
};

//recuperer la liste des magasins
router.get("/", magasin.list);

//creer un magasin
router.get("/ajoutmagasin", magasin.create);

//sauvegarder un magasin. /!\ cest un POST 
router.post("/save", magasin.save);

// editer un magasin
router.get("/edit/:id", requireLogin, magasin.edit);

// edit update.  /!\ cest un POST 
router.post("/update/:id", requireLogin, magasin.update);

// supprimer un magasin
router.get("/remove/:id", requireLogin, magasin.remove);

router.get("/magasinslist", magasin.magasinslist);

//export du module router
module.exports = router;