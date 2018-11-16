var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MongoDB connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://Matthew:designwest43@ds145053.mlab.com:45053/data_representation_project';
mongoose.connect(mongoDB);

//PRODUCT
//using the interface variables 
var Schema = mongoose.Schema;
var productSchema = new Schema({
    title : String,
    platform : String,
    price : Number,
    description : String,
    link : String
})

var PostModel = mongoose.model('product', productSchema);

var SchemaCart = mongoose.Schema;
var CartSchema = new SchemaCart({ title: String, platform: String, price: Number });

//USER
//using the interface variables 
var SchemaUser = mongoose.Schema;
var productSchemaUser = new SchemaUser({
    firstName : String,
    lastName : String,
    email : String,
    userName : String,
    password : String,
    productsCart: [CartSchema],
    //productsCart: {
        //productsCart: { productsCart: any }
    //},
})

var PostModelUser = mongoose.model('user', productSchemaUser);

//coors setup
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
    
//server setup    
var server = app.listen(8081, function ()  {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })

//welcome message
app.get('/', function (req, res) {
   res.send('Welcome to Data Representation & Querying Project\n');
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

/* app.get('/getposts/:title', function (req, res) {
    console.log("Get " + req.params.title + " Post");
    PostModel.findOne({ 'title': req.params.title },

    function (err, data) {
        if (err)
        return handleError(err);
        res.json(data);
    });
}); */

//PostModel.findOne({ title: 'Hi' }, function (err) {
    //if (err) return handleError(err);
    // deleted at most one post document
//});

//POST method which console logs data passed up to the server
app.post('/api/posts', function (req, res) {
    console.log("Title = " + req.body.title);
    console.log("Platform = " + req.body.platform);
    console.log("Price = " + req.body.price);
    console.log("Description = " + req.body.description);
    console.log("Link = " + req.body.link);

    //mongo post
    PostModel.create({
        title:req.body.title,
        platform:req.body.platform,
        price:req.body.price,
        description:req.body.description,
        link:req.body.link
    })
    res.send('Product added');
})

//delete the data from the server using the id
app.delete('/api/posts/:id', function(req,res){
    PostModel.deleteOne({ _id: req.params.id },
    function (err) {});
})

//USER CODE
//POST method which console logs data passed up to the server
app.post('/api/users', function (req, res) {
    console.log("Title = " + req.body.firstName);
    console.log("Platform = " + req.body.lastName);
    console.log("Price = " + req.body.email);
    console.log("Description = " + req.body.userName);
    console.log("Link = " + req.body.password);
    console.log("Cart = " + req.body.productsCart);

    //mongo post
    PostModelUser.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
        productsCart:req.body.productsCart,
    })
    res.send('User added');
})

//return JSON data when requested 
app.get('/api/users', function (req, res) {

    PostModelUser.find(function(err, data){
        if (err){
            res.send(err);
        }
        res.json(data);
        console.log(data);
    });
})

app.get('/api/users/:id', function (req, res) {
    //console.log("Get " + req.params.userName + " Post");
    PostModelUser.findOne({ _id: req.params.id },

    function (err, data) {
        if (err){
            return handleError(err);
        }
        else {
            res.json(data);
        }
        
       // console.log("Get " + data);
    });
});

app.put('/api/users/:id', function(req,res){
    PostModelUser.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);

     console.log("Get " + data);
    });
});