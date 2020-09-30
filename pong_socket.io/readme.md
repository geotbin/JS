# Pong with Socket.io (ver. Express)

## Développeurs: x & y

## Principe du jeu
        -  2 raquettes, une balle
        -  Chaque joueur a une raquette et doit envoyer la balle derrière la raquette adverse
    pour marquer un point
	    - Ce jeu requiert 2 joueurs connectés en même temps. (socket.io)
	   
## How To : 
        -  Récupérer le dépôt : > https://gitlab-etu.fil.univ-lille1.fr/cavannac/node_js.git
 
        --- Commandes à effectuer dans le dossier node_js/ : ---
	-  npm install
	-  npm start
	-  Ouvrir Firefox (de préférence) avec 2 navigateurs différents
	- aller à l'adresse: localhost:3000

## Classes utilisées :
        -  Pong: gère la partie active du jeu comme les appels de mouvement, les dessins du canvas et le score.
        -  Mobile : La base des objets du jeu (ball, paddle)
        -  Network: gère toute la partie réseau de socket.io avec les écoutes, les emits...
        -  Paddle: gère les mouvements de la raquette ainsi que sa position sur le canva.
        -  Ball : gère les mouvements de la balle ainsi que sa position sur le canva.
        - theGame: script appelé par la page HTML, créé le jeu.
      
## Problèmes rencontrés: 
 
Le problème principal de ce jeu est lié à la raquette et à la balle. Je n'ai pas réussi à trouver le bon découpage de la raquette afin d'augmenter la précision de l'impact et du rebond. 
Le second problème est le temps de rafraîchissement du terrain. En effet, il est possible qu'une des 2 fenêtres détecte une sortie de map avant que l'autre l'affiche.

## Remarques:  
J'ai rencontré un problème lié à socket.io lors de mon développement; 
Lorsqu'une page web est rafraîchit (par le biais d'un F5 par exemple), le socket de cette page se connecte une seconde fois avant de s'être déconnecté (via la méthode socket.on('disconnect',..) en l’occurrence).
Ceci a provoqué un dysfonctionnement dans mon code, qui ajoute à chaque connexion le socket dans un tableau et le supprime lorsqu'il se déconnecte

J'ai résolu ce problème en modifiant l'initialisation du socket coté client.
J'ai remplacé **io()** par **io({transports: ['websocket'], upgrade: false})**


## Perspectives d'évolution:    
 
J'aimerai améliorer (ou refaire) toute la partie collision/rebond de ce jeu afin qu'il soit plus "jouable".
De plus, j'aimerai l'intégrer à l'application en cours de création (cf projet chat_socketio) et par la suite l'hoster et le rendre publique.