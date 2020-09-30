const http = require('http');
const url = require('url');
const querystring = require('querystring');

// création du serveur
var server = http.createServer(
	(request, response) => {
		let name = "unknown";
		// décomposition de l'url
		let path = url.parse(request.url).pathname;
		let params = querystring.parse(url.parse(request.url).query);
		if ('name' in params) {
			name = params['name'];
		}

		// création et envoi de la réponse
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('<h1>Second node server</h1>');
		response.write('<p style="color:#AAA">url is '+ request.url +', path is '+path+'</p>');
		response.write('<p>hello '+name+'</p>');
		response.end();
	}
);

// démarrage du serveur au port 8080
server.listen(8080);
