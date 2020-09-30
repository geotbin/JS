Introduction à webpack
======================

Plusieurs versions progressives.

Charger une version avec `git checkout <tag>` où `tag` peut prendre comme valeur :
* `v0` : projet node créé
* `v1` : webpack installé, fichiers sourcesgit du projet dans *src*  
    voir les deux scripts chargés dans `src/index.html`
* `v1.5` : ajout du dossier `dist` et mise en place des modules *CommonJS*  
  voir :
  *  script chargé dans `dist/index.html`
  *  `exports` dans `src/add.js`
  *  `require` dans `src/main.js`
* `v2` : utilisation de `webpack.config.js`  
  voir dans `package.json` ajout d'une cible dans `scripts` pour `npm run`
  tester `mode : 'production'` et comparer les bundles (taille, code)
* `v3` : utilisation de `file-loader` pour charger les images  
  voir le `require` sur l'image dans `src/main.js`
* `v4` : utilisation de `css-loader` pour charger les feuilles de style  
  voir
  * suppression du fichier `css/theStyle.css` (et donc dans `index.html` )
  * `require` des feuilles de style spécifiques dans `main.js` et `add.js` : vers une notion de "module"
* `v5` : utilisation des modules `es6`
* `v6` : aides au développement de webpack  
  * `eval-source-map`
  * mode `watch`
  * `webpack-dev-server` : rechargement à chaud


Retour à la version "complète" par `git checkout master`
