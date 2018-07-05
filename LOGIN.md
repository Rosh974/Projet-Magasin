# Créer un formulaire de Login

- Créer un modèle de schema dans models -> user.js :
```javascript
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    passwordConfirmation: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
```

- Créer la route dans app.js:
```javascript
// routes profiles
var userSession = require("./routes/userSession");
app.use("/profiles", userSession);
```

 - Ajouter un fichier routes dans Routes -> userSession.js:
```javascript
var express = require('express');
var router = express.Router();

var User = require("../controllers/userControllers");

//recuperer la liste des users
router.get("/", User.list);

//creer un login
router.get("/ajoutuser", User.create);

//creer un login
router.post("/save", User.save);

//export du module router
module.exports = router;
```

- Ajouter les fonctions dans controllers -> userController.js

```javascript
var mongoose = require('mongoose');
var User = require("../models/user");
var userController = {};

userController.list = function(req, res) {
  User.find({}).exec(function(err, user){
      if(err){
          console.log('Error : ', err);
      }else{
          //console.log("->",produit);
          res.render("../views/users/index",{user:user} );
      } 
  });
};

// Créer un login
userController.create = function(req, res){
  res.render("../views/users/profile");
}; 

userController.save = function (req, res) {
  if (req.body.username &&
    req.body.password &&
    req.body.passwordConfirmation) {

    var user = new User(req.body);
    user.save(function (err) {
      if (err) {
        console.log(err);
        res.render("../views/users/profile");
      } else {
        console.log("login OK");
        res.redirect("/profiles");
      }
    });
  };
}
  //export du module
  module.exports = userController;
  ```

  - Ajouter les vues dans views -> users -> index.ejs (pour afficher la liste des users):
```javascript
  <% user.forEach(function(element) {%>
    <tr>
        <td>
            <%= element.username%>
```

- et dans connexion.ejs on ajoute le formulaire d'inscription:

```javascript
<form class= "col-lg-4 m-4" action="/profiles/save" method="POST">
    <h1>S'inscrire</h1>
        <div class="form-group">
            <label for="Username">username:</label>
            <input type="text" class="form-control" name="username">
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" name="password">
        </div>
        <div class="form-group">
            <label for="passwordConf">Confirm password:</label>
            <input type="password" class="form-control" name="passwordConfirmation">
            </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form> 

```

- Ajouter le hashage dans models -> user.js. 
/!\ Installer bcrypt et l'appeler:

```javascript
var bcrypt = require('bcrypt');

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });
```

# Créer des sessions utilisateurs (authentication)

- installer express-session et connect-mongo

- ajouter dans app. js (AVANT les autres routes produits, etc):

```javascript
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = mongoose.connection;

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
```

- Dans les vues, ajouter un formulaire de connexion, qui renvoit à la fonction d'authentification:
```javascript
<form class= "col-lg-4 m-4" action="/profiles/auth" method="POST">
  <h1>Se connecter</h1>
  <div class="form-group">
    <label for="Username">username:</label>
    <input type="text" class="form-control" name="Username">
  </div>
  <div class="form-group">
    <label for="password">Password:</label>
    <input type="password" class="form-control" name="Password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form> 
```

- Faire la route dans routes -> userSession.js

router.post('/auth', User.auth);

- Dans userController, ajouter la fonction qui recupere le username et le password et qui compare avec ce qu'il y'a en bdd

```javascript
userController.auth = function (req, res) {
  var username = req.body.Username;
  var password = req.body.Password;

  User.findOne({ username: username }).exec(function (err, user) {
    if (!err && user) {
      bcrypt.compare(password, user.password, function (err, result) {
        console.log(result);
        if (result === true) {
          req.session.userId = user._id;
          req.session.Username = user.username;
          req.session.success = 'Connexion Reussie';
          res.redirect('/profiles');
        }else {
        //console.log(req.session.userName);
        res.redirect('/profiles/ajoutuser');
        };
      })
  } else {
      console.log("error =>", err);
      return res.redirect('/profiles/ajoutuser');
    }
  })
};
```


