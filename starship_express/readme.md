# Projet Starship ver. EXPRESS 

## Développeurs : x & y

## Introduction : 
    # Principe du jeu
        -  Le joueur contrôle un vaisseau principal qui peut tirer des projectiles
        -  Le joueur peut choisir entre deux modes :
            * Normal :  la limite de projectiles à l'écran est de 15
                        les tirs sont tirés 1 à 1
            * Beastmode :  il n'y a aucune limite de projectiles
                           les projectiles sont envoyés 3 à 3 dans plusieurs directions
                          
    # Règles du jeu :
        -  A chaque fois qu'une soucoupe est touchée, celle-ci tombe et le score augmente de 200 points.
        -  A chaque fois qu'une soucoupe sort par la gauche de l'écran (elle n'a dont pas été touchée), 1000 points sont perdus.
        -  Arrivé à -2000 points, la partie est perdue et il faut recommencer.
    
   # INFORMATIONS:
	2 versions sont disponibles (webpack et express), le How To ci-dessous concerne la version EXPRESS.

    
## How To : 
        -  Récupérer le dépôt : > git clone git@gitlab-etu.fil.univ-lille1.fr:cavannac/cavannac_capron_js.git

        --- Commandes à effectuer dans le dossier cavannac_capron_js/ : ---
	-  npm install
	-  npm run / npm start
	-  Ouvrir Firefox (de préférence) et aller à l'adresse: localhost:3000

## Classes utilisées :
        -  Game : gère la partie active du jeu comme les mouvements et les dessins du canvas.
        -  Mobile : La base des objets du jeu (vaisseaux, tirs)
        -  Starship : gère le vaisseau, hérite de mobile.
        -  Saucer : gère les soucoupes volantes, hérite de mobile.
        -  Shoot : gère les tirs de Starship, hérite de mobile.
    
        