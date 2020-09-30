Exemple d'illustration des principes et problématiques asynchrones
============================================================

La méthode `window.setTimeout` est utilisée pour simuler les appels asynchrones.

Ouvrir `index.html` pour observer l'exécution des versions successives des scripts

Charger une version avec

```git checkout <tag>```

où `tag` peut prendre comme valeur :

* `v0` : appel asynchrone simple
* `v1` : deux appels synchrones en séquence   
  le second termine avant le premier
* `v2` : tentative d'enchainer un traitement séquentiellement après un appel asynchrone   
  ... ça ne fonctionne pas
* `v3` : résolution du problème précédent avec l'utilisation d'une fonction *callback*   
  l'enchainement du calcul après un appel asynchrone est géré par un appel à la fonction *callback*
* `v3.1` : premier aperçu du *callback hell*  
  "mise en séquence" de deux appels asynchrones
* `v3.2` : utilisation des paramètres du callback pour "transmettre" une valeur depuis le calcul asynchrone
* `v4` : première **promesse** (*promise*)   
  le callback exécuté après que le calcul asynchrone de la promesse ait été réalisé est fourni par `then`
* `v4.1` : exemple de promesse + utilisation de `reject`/`catch`   
  en cas de rejet (ou erreur) dans l'exécution de la promesse, le callback défini par `catch` est appelé
* `v4.2` : comparaison avec code avec callback écrit dans les versions v3, le gain ne semble pas du tout évident au premier abord
* `v4.3` : l'utilisation des promesse permet de simplifier le *callback hell*   
  Comparer le code de cette version avec celui de `asynchronev3-2.js` qui réalise le même calcul, avec les mêmes appels asynchrones.   
  On retrouve une écriture séquentielle plus "naturelle" pour enchainer des traitements asynchrones.
* `v4.4` : retour sur la gestion des "erreurs" :   
  - `catch` est *thenable*
  - les erreurs produites dans un `then` sont propagées et interceptées par la clause `catch`
