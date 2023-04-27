const http = require('http');
const static = require('node-static');

const fileServer = new static.Server();

const requestListener = function (request, response) {

  const isStaticURL = function (url) {
    return url === '/'
      || url.startsWith('/assets/')
      || url.startsWith('/json/');
  };

  // Serve static files.
  if (request.method === 'GET' && isStaticURL(request.url)) {

    fileServer.serve(request, response);
  }

  // Server should respond with not found in other cases.
  else {
    response.writeHead(404);
    response.end('404 Not found.');
  }
};

const server = http.createServer(requestListener);
server.listen(3000);
