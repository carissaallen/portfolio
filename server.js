// server.js - portfolio route module

const express = require('express');
const port = 3000 // process.env.PORT;
const app = express();
const path = __dirname + '/views/';

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/post", { useNewUrlParser: true });

var postSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: Date
 });
var Post = mongoose.model('Post', postSchema);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname)); // serves static files
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

app.get('/blog', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('blog', { posts: posts })
    });
});

app.get('/post', (req, res) => {
        res.render('post');
});

app.post('/add_post', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('/blog');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});


app.listen(port, () => {
    console.log(`Server listening on port...`);
});

// future work: 
// should add error page to handle erroneous requests--
// router.get('*', function(req, res) {
//     res.sendFile('error.html');
// });

