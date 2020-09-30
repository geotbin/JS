Introduction aux routes dans Express
====================================

Plusieurs versions progressives.

Charger une version avec  
```
  git checkout <tag>
```
où `tag` peut prendre comme valeur :

* `v0` : version initiale après création via `express-generator` :    
  `express --view=pug express`  
  ne pas oublier d'exécuter `npm install`  
  voir :  
  * `/bin/www`
  * `app.js`  

  exécuter `npm start` (ou `nodemon`)  
  puis tester `http://127.0.0.1:3000/`
* `v0.1` : version avec `public/images/timoleon.jpg` pour tester le middleware *static*  
  essayer `http://127.0.0.1:3000/images/timoleon.jpg`
* `v1` : version avec un middleware trivial pour la route **/first**   
  consulter  `http://127.0.0.1:3000/first`
* `v1.1` : exemple de chainage de middleware avec l'utilisation de `next()`  
  consulter  `http://127.0.0.1:3000/first`
* `v2` : création d'une route **/books**  
  voir :  
  * route définie dans `/routes/books`
  * mise en place de la route dans `app.js`

tester en consultant `http://127.0.0.1:3000/books` et `http://127.0.0.1:3000/books/best`
* `v2.1` : ajout d'un middleware utilisé par toutes les routes de `/books`  
  tester en consultant `http://127.0.0.1:3000/books` et `http://127.0.0.1:3000/books/best`  
  (NB : utilisation du moteur de vue *pug*)
* `v2.2` : différentes formes de routes
  * utilisation de patterns  
  essayer les différents patterns proposés dans `/routes/books.js` pour le chemin `/books/best`
  * utilisation de routes "paramétrées"  
  tester en consultant `http://127.0.0.1:3000/books/details/1` (ou `/2`, `/3`, `/4`)
* `v2.3` : séparation des préoccupations : introduction de contrôleurs pour gérer la logique des routes  
voir :
  * `/controllers/books.js` contrôleur pour le router `/routes/books.js`
  * mise en place d'un router et de son contrôleur pour la gestion des erreurs (`error.js`)
* `v2.4` : exemples de méthodes de `response`  
  voir  
  * réponse au format json  
  voir définition de `details` dans `/controllers/books.js`  
  tester en consultant `http://127.0.0.1:3000/books/details/1`
  * `sendFile()` et `download()`  
  voir dans `/controllers/example.js`  
  tester en consultant `http://127.0.0.1:3000/example/sendfile` et `http://127.0.0.1:3000/example/download`
* `v2.5` : illustration d'utilisation du moteur de vue *pug*  
  voir les éléments suivant en testant les vues associées dans le navigateur, consulter également les contrôleurs associés pour identifier les *locals* passés en paramètre de `res.render()`
  * différents éléments de syntaxe dans `views/about.pug`
  * notion de *block* que peuvent "surcharger" les templates enfant, voir `/views/layout.pug`
  * héritage de template avec surcharge (voir `/views/index.pug`) ou extension (`append/prepend`) (voir `/views/booklayout.pug`)
  * utilisation des propriétés fournies lors de l'appel de `res.render()`, voir `/views/index.pug`
  * template par itération `each ... in ...`,  voir `/views/books.pug`
  * interpolation de code javascript `#{ ... }`, voir `/views/books.pug`
  * code javascript, voir `/views/users.pug`
  * création de *mixin* réutilisable dans les différents templates  
    voir `/views/booklayout.pug`,  et son utilisation, voir `/views/bookdetail.pug` et `/views/bestbook.pug`
* `v3` : utilisation de `fetch` pour une requête asynchrone du client vers le serveur, voir `/books`   
  * appel à `fetch` dans `/public/javascripts/bookdetails.js` chargé par `/views/books.pug`
  * réponse du serveur dans contrôleur `/controllers/books.js` voir `details`
* `v3.1` : utilisation de `Response.ok` pour gérer le statut de la réponse
  * voir dans `/public/javascripts/bookdetails.js`
  * voir `/controllers/books.js` dans `details` l'émission du statut 404 de la réponse
  * un "faux" livre a été ajouté dans `/views/books.pug` pour produire l'erreur 404
* `v3.2` : exemples de requêtes `fetch` avec des options   
  * voir la mise en place de l'option dans `getDetails` de `/public/javascripts/bookdetails.js`
  * voir l'exemple de requêtes `PUT` dans `/public/javascripts/bookdetails.js` avec `updateTitle`
   et voir côté serveur la mise en place correspondante de la route  `put` dans `/routes/books.js` et du contrôleur associé `/controllers/books.js`
* `v3.3` : tester les problèmes des requêtes CORS :   
  * charger la page avec `http://localhost:3000/books` alors que dans `/public/javascripts/bookdetails.js` la requête `fetch` se fait sur `http://127.0.0.1:3000/books/details/`
  * la différence des url de base empêche la requêt (lors du survol d'un livre de la table). Voir les messages dans la console du navigateur
* `v3.3.5` : utilisation du middleware `cors` pour permettre les requêtes cross-origin
  * voir dans `app.js` l'installation du middleware `cors` et la possibilité de définir son propre middleware

faire ```git checkout master``` pour revenir sur la banche principale
