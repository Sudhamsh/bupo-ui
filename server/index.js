const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);



app.use('/rest', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: false }));

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3002, () =>
    console.log('Express server is running on localhost:3002')
);