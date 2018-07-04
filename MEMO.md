# DANS LE TERMINAL :
1- Dans le repertoire de travail faire la commande suivante
***express mon_projet --view=ejs***

2- ***cd mon_projet && npm install***

3- ***npm install mongoose --save***

4- Changer le port dans le dossier "bin"


# DANS LE FICHIER APP.JS

```javascript
var mongoose = require('mongoose');
var url = "mongodb://localhost/<nom_de_la_base_de_donnees>";
mongoose.Promise = global.Promise;

mongoose.connect(url)
  .then(() =>  console.log('connection succesful'))
```

Créer une route vers la collection "produits"

```javascript
var produits = require("./routes/produits");
app.use("/produits", produits);
```

/!\ Quand c'est ok, ne plus toucher à app.js !

# FAIRE UN DOSSIER ROUTES AVCE 3 FICHIERS

1- INDEX.JS
```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Magasin' });
});

module.exports = router;
```

2- PRODUITS.JS avec toutes les routes qui renvoient aux fonctions (de controllers)
```javascript
var express = require('express');
var router = express.Router();

var produit = require("../controllers/produitsControllers");

router.get("/", produit.list);

//cree un produit
router.get("/ajoutproduit", produit.create);

//export du module router
module.exports = router;
```

3-USERS.JS
```javascript
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
```


# FAIRE UN DOSSIER MODELS 

avec un fichier Produit.js qui contient le modèle des éléments de la base de donnée: 
```javascript
var mongoose = require('mongoose');

var ProduitSchema = new mongoose.Schema({
    nomproduit: String,
    type: String,
    prix: Number,
    quantite: Number
});

module.exports = mongoose.model("produit", ProduitSchema);
```

# FAIRE UN DOSSIER CONTROLLERS

avec un fichier produitsControllers.js
qui comprend toutes les fonctions de mongoose (qui seront renvoyées dans les routes de produits.js)

Exemple:
```javascript
var mongoose = require('mongoose');

var produitController = {};
var Produit = require ("../models/Produit"); 

produitController.list = function(req, res) {
  Produit.find({}).exec(function(err, produit){
      if(err){
          console.log('Error : ', err);
      }else{
          console.log("->",produit);
          res.render("../views/produit/index",{produits:produit} );
      } 
  });
};

// Ne pas oublier l'export du module
module.exports = produitController;
```

# DANS LE DOSSIER VIEWS

Appeler les données de la base de données



# FAIRE LA JOINTURE ENTRE 2 COLLECTIONS

Schema pour faire le  lien entre deux collections (dans dossier Models, nouveau fichier vend.js)

```javascript

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendSchema = new mongoose.Schema({
    //recupere les id des collection produit et magasin
    id_produit:[{ type: Schema.Types.ObjectId, ref: 'produit' }],
    id_magasin: [{ type: Schema.Types.ObjectId, ref: 'magasin' }]
});



module.exports = mongoose.model("Vend", vendSchema);
```



liste vente (dans fichier vendController.js)

```javascript
vendController.list = function(req, res) {
    Vend.find({})

   // fonction qui dit qu'on prend tout les donnée qui son dans la collection produit par son ID
    .populate("id_produit")
     // fonction qui dit qu'on prend tout les donnée qui son dans la collection magasin par son ID
    .populate("id_magasin")
    // cela permet d'avoir toute les information qui sont dans la collection produit et magasin dans la nouvelle
    // collection  qui s'appel vends apres la jointure des 2 collecrtions
    .exec(function(err, vend){
        if(err){
            console.log('Error : ', err);
        }else{
            console.log("->",vend);
            res.render("../views/vend/index",{vend:vend} );
  
        } 
    });
  };
```

# Pour ajouter une vente en choisissant dans un MENU DEROULANT les éléments "produits" et "magasins" et faire la jointure sur ejs:

- Créer un nouveau fichier "produitslists.ejs"
- Créer une route dans produits.js : 
router.get("/produitslist", produit.produitslist);

- Créer la fonction dans produitsController:
```javascript
produitController.produitslist = function(req,res) {
    Produit.find({}).exec(function(err, produit){
        if(err){
            console.log('Error : ', err);
        }else{
            //console.log("->",produit);
            res.render("../views/produit/produitslist",{produits:produit} );
  
        } 
    });
}
```
- Créer le formulaire d'ajout d'une vente sur "ajout.ejs"
```javascript
            <form class="pb-4 mx-auto " action="/vends/save" method="POST">

                <div class="form-group">
                    <select id="selectproduit" name='id_produit'>
                    </select>
                    <button type="submit" class="btn btn-secondary my-5">Ajouter</button>
                </div>
            </form>
```
/!\ Ne pas oublier de rajouter le lien script du fichier produitslist.ejs:
<script src="/produits/produitslist"></script>


- Ajouter le javascript dans "produitslist.ejs":
```javascript
 var produits = "";

<% produits.forEach(function(element) {%>
    produits += "<option value='<%=element._id%>' ><%= element.nomproduit%></option>";

<% }); %>

$(document).ready(function() { 
    $("#selectproduit").html(produits);
});
```