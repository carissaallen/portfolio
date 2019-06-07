// server.js - portfolio route module

const express = require('express');
const port = process.env.PORT;
const app = express();
const router = express.Router();
const path = __dirname + '/views/';

app.use(express.static(__dirname)); // serves static files

router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});

router.get('/about', function(req, res) {
    res.sendFile(path + 'about.html');
});

router.get('/portfolio', function(req, res) {
    res.sendFile(path + 'portfolio.html');
});

router.get('/blog', function(req, res) {
    res.sendFile(path + 'blog.html');
});

router.get('/contact', function(req, res) {
    res.sendFile(path + 'contact.html');
});

app.use('/', router);
app.listen(port);

// future work: 
// should add error page to handle erroneous requests--
// router.get('*', function(req, res) {
//     res.sendFile('error.html');
// });

