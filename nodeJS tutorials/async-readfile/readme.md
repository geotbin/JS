Exemple code asynchrone, illustration du callback hell, introduction des promesses
==================================================================================

Plusieurs versions progressives.

Charger une version avec

```git checkout <tag>```

où `tag` peut prendre comme valeur :

* `v0` : version initiale   
  à l'ouverture `http://127.0.0.1:8080` le fichier `index.html` est lu de manière asynchrone et le callback envoie son contenu comme réponse
* `v1` : version avec fichier à charger passer dans l'url, par exemple `http://127.0.0.1:8080/data/index.html`
    + gestion erreur en cas de fichier non trouvé, par exemple `http://127.0.0.1:8080/data/truc.html`
    à tester en chargeant en parallèle un "gros" et un "petit" fichier  
* `v1.1` (branche `readsync`): version avec lecture de fichier synchrone pour comparaison avec la version précédente   
    comparer les tentatives de lecture en parallèle d'un "gros" et un "petit" fichier  
* `v2` : construction de la réponse en plusieurs parties : header/body/footer.   
    Chaque partie est lue dans un fichier de manière asynchrone, un fichier d'erreur est lu si le body n'est pas trouvé.   
    Cela mène à plusieurs imbrications d'appels asynchrones : mise en évidence du *callback hell*.   
    Essayer `http://127.0.0.1:8080/data/small` et `http://127.0.0.1:8080/data/nofile`.
* `v2.1`: utilisation de callbacks nommés pour simplifier le *callback hell*   
   les callbacks utilisés sont définis dans `scripts/contentReader.js`   
   Essayer `http://127.0.0.1:8080/data/small` et `http://127.0.0.1:8080/data/nofile`.
* `v3` : utilisation de promesses pour lire les fichiers de manière asynchrone   
  - logique séquentielle dans l'écriture du traitement : disparition du callback hell
  - simplification du code de `ContentReader`
* `v3.1` : utilisation de `Promise.resolve()` pour promisifier un code synchrone   
  Enrichissement de l'API de ContentReader pour un code serveur plus simple.
