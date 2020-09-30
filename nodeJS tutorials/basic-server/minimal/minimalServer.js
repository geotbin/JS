const http = require('http');

// créatio du serveur
var server = http.createServer(
	(request, response) => {
		// création et envoi de la réponse
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('<h1>First minimal node server</h1>');
		response.write('<p>I am alive</p>');
		response.end('bye');
	}
);

// démarrage du serveur au port 8080
server.listen(8080);
