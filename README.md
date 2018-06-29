# Projet-Magasin

Création d'une application nommée "Magasin" en groupe de 3.

En tant que gérant je veux accéder à une liste afin de voir les produits disponibles, 
je veux pouvoir ajouter un produit afin de compléter ma liste et
je veux pouvoir modifier un produit afin de mettre à jour ma liste.


Répartition des tâches à accomplir :


- Créer la structure du dossier.   -->   Badrane

- Créer la structure views (index, create, edit, index, show).   -->   Badrane

- Tenir Github, créer un repository sur Git pour les pull request, effectuer les merges et gérer les conflits.   -->   Didier

- Initialiser le serveur et créer les routes.   -->   Anna

- Créer une base de donnée "projetmagasin".   -->   Didier

- Créer une collection " produit" --> [{"nom produit", "type", "quantité", "prix" }].   -->   Didier

- Créer la function pour voir la liste des produits.   -->   Didier

- Créer la function pour ajouter de nouveaux produits.   -->   Anna

- Créer un formulaire afin d'ajouter de nouveaux produits.   -->   Anna

- Créer une fonction pour modifier un produit.   -->   Badrane

- Créer une fonction pour supprimer un produit.   -->   Badrane


Créer la structure de dossier pour le projet :
- execution de la commande suivante :' express projet-magasin --view=ejs'
- ajout modul express, ejs, mongodb


Créer une base de donnée :
- 
use projetmagasin

- db.Produit.insert( { nom produit: "", type:"" , quantité: "", prix: "" } );

- db.Produit.find()

URI de connexion à la base : mongodb://localhost:27017/projetmagasin
LE PORT SE TROUVE DANS LE DOSSIER BIN www

{ nom produit: "pain", type:"alimantaire" , quantité: "10", prix: "1" }