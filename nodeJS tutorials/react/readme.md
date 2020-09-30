introduction à React.js
========================


Plusieurs versions progressives.

Lancer `npm start` puis consulter `http://127.0.0.1:3000`

Charger une version avec

```git checkout <tag>```
où `tag` peut prendre comme valeur :
* `v0` : configuration initiale   
  - installation via express : ```express --view=pug react``` puis ```npm install```
  - adaptation de l'installation "standard" d'express :   
    - suppression des références à `users.js`
    - ajout d'une route et d'un contrôleur pour '/' (`index.js`)
    - ajout d'une route et d'un contrôleur pour la gestion des erreurs (`errors.js`)
  - installation de webpack (conforme à exemple du cours)
    - ```npm install webpack webpack-cli --save-dev```
    - installation des loaders ```npm install --save-dev file-loader style-loader css-loader```
    - configuration de `webpack.config.js` (production de `bundle.js` dans `public/javascripts` à partir de `src/main.js`)
    - cible `npm run watch`
  - exécution de `nodemon` puis : ```http://127.0.0.1:3000```
* `v0.1` : exemple basique d'introduction à *React* : création d'un élément   
    voir `/src/main.js` (et point d'insertion dans `/public/index.html`)
* `v0.2` : second exemple avec plusieurs éléments toujours créés avec `React.createElement`   
  toujours dans `/src/main.js`
* `v0.3` : introduction de **jsx**, création des éléments React avec la syntaxe jsx
  * voir syntaxe dans `/src/main.js` (reprise exemple précédent avec syntaxe jsx)
  * nécessité de *transpilage* du code vers javascript : utilisation de **Babel**
    * installation des modules et loader, voir évolutions dans `package.json`
    * voir fichier de configuration `.babelrc`
    * voir exploitation via *webpack* avec ajout d'une règle dans `webpack.config.js` pour les fichiers `.js`
 * `v0.4` : premier composant ReactJs, composant sans état défini par une fonction
    * création du dossier `components`
    * voir `components/first.js` et son utilisation dans `src/main.js`
    * voir l'importation de la feuille de style du composant `styles/first.css` dans le composant
 * `v0.4.5` : second composant qui utilise à son tour un composant
    * voir `./components/Second.js`
 * `v0.5` : utilisation des propriétés (`props`) d'un composant
    * voir `./components/Person.js` et son utilisation dans `src/main.js`
 * `v0.5.5` : les valeurs de *props* peuvent être des objets (ici un Array)
    * voir `./components/PersonListing.js` et son utilisation dans `src/main.js` (NB : les données sont prises dans `data/persons.js`)
    * voir dans `./components/PersonListing.js` l'utilisation de l'opérateur *spread* pour simplifier l'écriture
 * `v0.6` : `props.children` désigne les composants enfants de l'élément    
    * voir `./components/personListing.js` et son utilisation dans `src/main.js`
 * `v1` : utilisation des *class* pour créer des composants
    * voir `./components/Person.js` et `./components/PersonListing.js`
 * `v1.1` : utilisation de *defaultProp* et *Prop-Types*, dans `./components/Person.js`
    * voir le code avec les erreurs dans `src/main.js` et les traces des erreurs générées dans la console du navigateur
 * `v2` : introduction des composants `./components/Book.js` et `./components/Rating.js`
    * version initiale sans état
 * `v2.1` : définition d'un composant à état : `./components/Rating.js`   
    * initialisation de <code>state</code> dans le constructeur
    * utilisation de <code>setState</code> pour modifier l'état
    * utilisation d'événement, voir <code>onClick</code>
    * un clic, déclenche la modification de l'état par <code>setState</code>, la vue est alors adaptée pour prendre en compte le nouvel état (via l'appel <code>selectSource()</code>)
 * `v2.2` : utilisation de *props* pour initialiser l'état   
    * voir `./components/star.js` et son utilisation dans `src/main.js`
 * `v2.3` : utilisation de `this.setState( (prevstate, props) => ... )` pour modifier l'état
    * voir `./components/star.js` et son utilisation dans `src/main.js`
 * `v2.4-bad` : création d'une collection de composants,
    * voir dans `./components/rating.js` : collection de composants *Star*
    * voir dans la console du navigateur le message d'erreur sur l'absence de propriété <code>key</code>
 * `v2.4-ok` : corrige le problème de l'absence de propriété <code>key</code> pour les éléments *Star* de la collection dans *Rating*
 * `v2.5` :  l'état doit être défini "au plus haut", les modifications vont toujours de haut en bas. Les modifications de l'état sont gérées par une fonction du composant parent qui transmet la fonction à ses composants enfants via une *prop*       
    * voir dans `./components/rating.js` : définition de <code>state</code> et passage de <code>handleStarClicked</code> via la prop <code>onStarClicked</code> du composant <code>Star</code>
    * dans `./components/rating.js`, un clic sur le composant se traduit pas un appel à la fonction fournie dans <code>this.props.onStarClicked</code> et donc transmis au composant parent
 * `v2.5.5` : reprise du composant *Book*, l'état peut toujours être géré par le composant *Rating* car pas d'incidence sur *Book*
 * `v2.6` : autre exemple de l'état "placé au plus haut". Introduction du composant *BookList*.   
    * déplacement de l'état dans `./components/booklist.js` car la valeur de *rating* sert pour l'affichage des livres et le calcul de la moyenne, polus d'tat dans le composant *Rating*
    * voir le passage de la fonction de mise à jour de l'état de *BookList* vers *Book* (`onBookChange`), puis de *Book* vers *Rating* (`onRatingChange`), et enfin, pour le clic, de *Rating* vers *Star* (`onStarClick`)
    * voir l'utilisation de l'operateur spread `...` pour "destructurer" un objet (dans `./components/booklist.js` et `./components/book.js`)
    * utilisation de `componentWillMount` dans `/components/booklist.js` pour l'initialisation de l'état ici
 * `v2.7` : utilisation  de l'attribut ref qui  définit un callback qui permet de créer un lien vers l'élément DOM créé par React
    * voir dans `/components/book.js` l'utilisation de <code>ref</code> dans le <code>span</code> qui contient le titre,
    on peut ensuite utiliser l'attribut <code>this.titleSpan</code> défini pour manipuler l'arbre DOM "classiquement" (dans <code>highlightTitle</code>)

faire ```git checkout master``` pour revenir à la dernière version
