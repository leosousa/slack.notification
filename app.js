// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

import express from "express";

const app = express();
app.use(express.json());

app.get('', (request, response) => {
    response.send('ok');
});

app.listen(3000, () => {
    console.log('Servidor iniciado')
})