# Shop with ReactJS (db Mongod)

## Développeurs : x & y

## Informations
        -  Site marchand permettant d'ajouter différents produits à son panier afin de les acheter (modifier le stock)
        -  Option permettant de vider le panier complètement / d'un item indésirable
        - Option valider permettant de simuler l'achat (mise à jour des stocks)
	    - Partie ADMIN (CRUD en /admin) permettant de lister, ajouter, modifier et supprimer des items
	   
## How To : 
    -  Récupérer le dépôt : > https://gitlab-etu.fil.univ-lille1.fr/cavannac/node_js.git
            
    ## Commandes à effectuer dans le dossier node_js/shop_react ##
            
        
    - Il faut tout d'abbord lancer la base de données MONGODB: 
        - Soit en ligne de commande à la racine du projet : mongod --dbpath ./data
        - Via le logiciel MongoDB Compass Community (localhost:27017)
            
    -  Une fois l'initialisation de la base de données, vous pouvez lancer le fichier import_database.sh situé dans le dossier ) afin d'importer les données dans la base
    -  Alternative: lancer la commande 'mongoimport -d shopDB -c shops --type csv --file ./public/data/catalog.csv --headerline' à la racine du projet
    
    -  npm install
    -  npm run watch dans un premier terminal
    -  nodemon dans un second terminal
    
    -  Ouvrir Firefox (de préférence) et aller à l'adresse localhost:3002
    	

## Difficultés rencontrées:  

- Upload des images dans la base de données (via Multer)
- Modification d'item déjà existant (CRUD edit)


## Perspectives d'évolution:    
 
- Modification du design du catalogue pour le SHOP.
- Système de d'inscription/connexion pour la partie ADMIN
- Système anti-concurrence (2 achats en même temps avec des items identiques)