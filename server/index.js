const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8000;

function requestHandler(request, response) {
    console.log(request.url);
    fs.readFile('index.html', 'utf8', (error, html) => {
        response.end(html);
    });
}

http.createServer(requestHandler)
    .listen(port, () => {
        console.log(`Server up on http://${host}:${port}`);
    });