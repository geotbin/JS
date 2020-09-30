Pour inviter le bot sur votre discord, cliquez sur le lien ci-dessous:
https://discordapp.com/oauth2/authorize?client_id=551386901114781712&scope=bot&permissions=8

PRE-REQUIS :
    FFMPEG doit être installé sur votre ordinateur pour la commande $play (gestion de l'audio)

Commandes à utiliser:  
    npm install
    npm start

Les commandes suivantes peuvent être lancées depuis le chat discord: 
    - $play [lien youtube] pour jouer une vidéo youtube (uniquement si vous êtes dans un salon vocal)
    - $reply [message] pour une intéraction avec le bot
    - $help pour voir les commandes disponibles
    - $send [id] [message] pour envoyer un message privé à l'utilisateur qui a l'id spécifié


Remarque:
    Le token situé dans index.js correspond à mon bot discord. (avec le lien d'invitation)
    Si vous souhaitez créer le votre, vous devez :
        - remplacer le token par celui de votre application discord créée sur discordapp.com/developers
        - Copier le client ID de votre application
        - Créer un lien d'invitaiton grâce à https://discordapi.com/permissions.html (cochez administrateur et coller votre client ID)
        - Cliquez sur le lien créé et invitez le bot sur votre serveur discord