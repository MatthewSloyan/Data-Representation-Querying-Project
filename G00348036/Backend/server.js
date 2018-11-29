//SERVER SETUP ===============

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

//Run Application on server
app.use("/", express.static(path.join(__dirname, "angular")));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "angular", "index.html"));
})

//PRODUCT SCHEMA ===============
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

//USER/CART SCHEMA ===============

//create a separate schema for the cart. It's an object that will be passed into the array
var SchemaCart = mongoose.Schema;
var CartSchema = new SchemaCart({ title: String, platform: String, price: Number });

//create another scheme for the user using the interface variables and pass in the above schema as an array
//to get a nested document
var SchemaUser = mongoose.Schema;
var productSchemaUser = new SchemaUser({
    firstName : String,
    lastName : String,
    email : String,
    userName : String,
    password : String,
    productsCart: [CartSchema],
})

var PostModelUser = mongoose.model('user', productSchemaUser);

//FUNCTIONS ===============

//PRODUCTS ===============

//return JSON data when requested, gets all products
app.get('/api/products', function (req, res) {

    PostModel.find(function(err, data){
        if (err){
            res.send(err);
        }
        res.json(data);
    });
})

//POST method which console logs data passed up to the server
app.post('/api/products', function (req, res) {

    //mongo post
    PostModel.create({
        title:req.body.title,
        platform:req.body.platform,
        price:req.body.price,
        description:req.body.description,
        link:req.body.link
    })
    res.status(201).json({message: "Product Created"});
    console.log("Product Created");
})

//delete the data from the server using the id
app.delete('/api/products/:id', function(req,res){
    PostModel.deleteOne({ _id: req.params.id },
    function (err) {});
})

//USERS ===============

//POST method which console logs data passed up to the server (adds a user)
app.post('/api/users', function (req, res) {

    //mongo post
    PostModelUser.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
        productsCart:req.body.productsCart,
    })
    res.status(201).json({message: "User Created"});
    console.log("User Created");
})

//return JSON data when requested (gets all users)
app.get('/api/users', function (req, res) {

    PostModelUser.find(function(err, data){
        if (err){
            res.send(err);
        }
        res.json(data);
    });
})

//get a specific user using the id
app.get('/api/users/:id', function (req, res) {
    PostModelUser.findOne({ _id: req.params.id },

    function (err, data) {
        if (err){
            return handleError(err);
        }
        else {
            res.json(data);
        }
    });
});

//update a specific user using the id
app.put('/api/users/:id', function(req,res){
    PostModelUser.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

//delete the user data from the server using the id
app.delete('/api/users/:id', function(req,res){
    PostModelUser.deleteOne({ _id: req.params.id },
    function (err) {});
})