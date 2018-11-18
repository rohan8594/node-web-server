const requestHandler = (req, res) => {
	const { url, method } = req;
	const { statusCode } = res;
	console.log(`${method} ${url} ${statusCode}`);

	if (url === '/') {
		res.write('hello world');
		res.end();
	}
}

module.exports = requestHandler;