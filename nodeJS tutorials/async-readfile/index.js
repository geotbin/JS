

const http = require('http');
const url = require('url');
const querystring = require('querystring');

// define a tools to read file parts and simplfy callback hell
const ContentReader = require('./scripts/contentReader');

// create server
var server = http.createServer(

	// requested file (in url) is supposed to be the body of a document
	// header and footer parts of the document are added from 'header_html' and 'footer_html' files
	// if requested (body) file does not exist 'error_html' is read and sent (footer part not added when error)
	// of course, all files are read asynchronously
	//
	// this leads to callback hell with up to 3 nested calls... code becomes rather difficult to read...

	(request, response) => {
		// extract path from url
		let path = url.parse(request.url).pathname;
		// removing leading '/'
		path = path.substring(1);

		let start = new Date();
		response.writeHead(200, {"Content-Type": "text/html"});

		let myReader = new ContentReader(response);

		myReader.prepareFile('data/header_html')
			.then( () => myReader.prepareFile(path) )
			.then( () => myReader.prepareFile('data/footer_html') )
			.catch( () => myReader.error() )
			.then( () => myReader.end() )
	}
);

// start server at port 8080
server.listen(8080);
