var express = require('express');
var router = express.Router();
var User = require("../controllers/userControllers");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/');
    }
};

//recuperer la liste des users
router.get("/", User.list);

//creer un login
router.get("/ajoutuser", User.create);

//enregistrer l'utilisateur
router.post("/save", User.save);

// route vers l'authentification
router.post('/auth', User.auth);

router.get('/logout', User.logout);

// supprimer un utilisateur
router.get("/remove/:id", requireLogin, User.remove);

//export du module router
module.exports = router;