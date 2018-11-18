const fs = require('fs');
const path = require('path');

const requestHandler = (req, res) => {
	const { url, method } = req;
	const { statusCode } = res;
	console.log(`${method} ${url} ${statusCode}`);

	let filePath = '.' + url;
	if (filePath === './') {
		filePath = './public_html/index.html';
	}

	fs.exists(filePath, (exists) => {
		if (!exists) {
			res.statusCode = 404;
			res.end(`File ${filePath} not found!`);
		}

		const extension = path.extname(filePath);
		let contentType = 'text/html';
		switch (extension) {
			case '.js':
	            contentType = 'text/javascript';
	            break;
	        case '.css':
	            contentType = 'text/css';
	            break;
		}

		fs.readFile(filePath, (error, data) => {
			if (error) {
				res.statusCode = 500;
				res.end('Some server side error occured!');
			} else {
				res.writeHead(200, { 'Content-Type': contentType });
				res.end(data, 'utf-8');
			}
		})
	});

	if (url === '/submit' && method === 'POST') {
	    	// console.log('Hello World')
	    	res.write('Success!');
	    	res.end();
	    }
}

module.exports = requestHandler;