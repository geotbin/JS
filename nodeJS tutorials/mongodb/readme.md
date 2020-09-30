Introduction à MongoDb
=============================


Plusieurs versions progressives.

Charger une version avec

```git checkout <tag>```
où `tag` peut prendre comme valeur :
* `v0` : création du dépôt   
  `mongo-commmandes.txt` contient des exemples de commandes pour le shell `mongo`
  le fichier `books.csv` contient des données à importer avec `mongoimport` (voir commande dans `mongo-commmandes.txt`)   
  Il faut lancer le serveur **mongodb** pour effectuer les manipulations  :   
      ```mongodb --dbpath data```   
  (après création du dossier `data`)
* `v0.5` : mise en place de la configuration initiale :   
  * installation de *express* : `express --view=pug mongod` puis `cd mongod; npm install`
  * installation de *mongoose*  : `npm install mongoose`
  * création du dossier `controllers`
  * création des routes `index` et `error` et des contrôleurs associés
  * installation de ces routes dans `app.js`
  * pour la suite, ne pas oublier de lancer le serveur **mongodb** :   
    ```mongodb --dbpath data```
    Il faudra aussi lancer le serveur *Node/express* :
    ```npm run start```  ou ```nodemon```
    que l'on peut tester à l'adresse : `http://127.0.0.1:3000/`
* `v1` : mise en place d'un contrôleur pour créer et gérer la connexion à la bd   
  voir dans `./controllers/db.js` et son utilisation dans `app.js`   
  la trace de la connexion réussie peut se voir dans la console ("*db.js : connected to mongodb://localhost/dbbooks*")
* `v2` : définitions des **schémas** pour les documents de la bd. Voir dans `./models`.   
  * voir pour des exemples de syntaxe `./models/address.js` et `./models/person.js`    
Un schéma doit être compilé en un **modèle** et lié à une collection.   
  * voir le schéma et le modèle pour les livres dans `./models/books.js`
* `v3` : interaction avec la base de données   
  * ajout d'une route, d'un contrôleur et d'une vue : `./routes/books.js`, `./controllers/books.js` et `./view/books.pug`
  * intégration de la route dans `./app.js`
  * définition de la route pour `http://127.0.0.1/books` via la contrôleur `list` dans `./controllers/books.js` avec requête `Books.find()` sur le modèle défini (requête équivalente à "*`select * from books`*") puis affichage dans la vue du résultat fourni par la requête.   
  On note que les opérations de requêtes (`find()`) sont des **promessses**.
* `v3.1`: autres exemples avec `find()` et `findOne()`, voir dans `./controllers/books.js`   
  Tester les routes `/books/one`, `/books/dune`, `/books/yearv1`, `/books/yearv2` après avoir étudié les contrôleurs associés.
* `v3.2` : exemple avec `findById()`, voir dans `./controllers/books.js`   
  Tester les contrôleurs `detailsv1` et `detailsv2` à partir des liens accessibles depuis `/books` (voir code de la vue générée dans `./views/books.pug`)
* `v4` : exemple de requête de création `create()`, voir dans `./controllers/books.js`   
  * création d'une vue pour le formulaire côté client (`./views/createBook.pug`) et d'un script client pour une requête `fetch` : dans `./public/javascripts/create-book.js`
  * utilisation de la route `/books/create` avec les méthodes GET (formulaire) et POST (requête de création)
  * créer un libre et voir dans `/books` qu'il a été ajouté à la liste
* `v4.1` : validation des données par le schéma, gestion des erreurs de requêtes
  * voir schéma `./models/books.js`
  * essayer de créer un livre ou l'année n'est pas un nombre, ou le titre est absent
  * voir aussi l'application de la fonction `setDefaultCover()` si aucune image n'est fournie
* `v4.2` : meilleure gestion de l'erreur renvoyée suite la requête fetch, en particulier extraction du message, voir dans `./public/javascripts/create-book.js`
* `v4.3` : création de "sous-document" : utilisation de `save()` . Voir dans `./controllers/books.js`  
  * voir les routes `/books/adddetails` définies dans `./routes/books.js` et la vue `./views/addDetails.pug` et le code client `./public/javascripts/addDetails.js   `
  * voir les modifications du schema pour les livres dans `./models/books.js`
* `v5` : mise à jour de documents avec `update()` ou `findByIdAndUpdate()`. Voir dans `./controllers/books.js`   
  * voir les routes `/books/update/:bookid` définies dans `./routes/books.js`  et la vue `./views/updateBook.pug` et le code client `./public/javascripts/update-book .js`
* `v6` : suppression de documents avec `remove()` ou `findByIdAndRemove()`. Voir dans `./controllers/books.js`    
    * voir les routes `/books/delete/:bookid` définies dans `./routes/books.js`
* `v7` :  exemple d'API REST CRUD avec la route '/bookrest'   
    * voir la définition du contrôleur `./controllers/booksrest.js` et les routes associées dans `./routes/bookrest.js`
    * le code client défini dans `./public/javascript/usebookrest.js` attaque cette API (chargé depuis la vue `./views/bookrest.pug`)


faire ```git checkout master``` pour revenir sur la banche principale
