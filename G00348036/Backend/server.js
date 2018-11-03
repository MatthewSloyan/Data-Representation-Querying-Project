/*var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

//MongoDB connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://Matthew_s97:deadrising2@ds141783.mlab.com:41783/datarepresentation';
mongoose.connect(mongoDB);

//using the interface variables 
var Schema = mongoose.Schema;
var postSchema = new Schema({
    title : String,
    content : String
})

var PostModel = mongoose.model('post', postSchema);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//welcome message
app.get('/', function (req, res) {
   res.send('Welcome to Data Representation & Querying\n');
})

//return JSON data when requested 
app.get('/api/posts', function (req, res) {

    PostModel.find(function(err, data){
        if (err){
            res.send(err);
        }
        res.json(data);
    });
})

app.get('/getposts/:title', function (req, res) {
    console.log("Get " + req.params.title + " Post");
    PostModel.findOne({ 'title': req.params.title },

    function (err, data) {
        if (err)
        return handleError(err);
        res.json(data);
    });
});

//PostModel.findOne({ title: 'Hi' }, function (err) {
    //if (err) return handleError(err);
    // deleted at most one post document
//});

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//POST method which console logs data passed up to the server
app.post('/api/posts', function (req, res) {
    console.log("Title = " + req.body.title);
    console.log("Content = " + req.body.content);

    //mongo post
    PostModel.create({
        title:req.body.title,
        content:req.body.content
    })
})


//server setup    
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
}) */
