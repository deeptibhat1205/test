const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();

var path = require('path')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://cipher:5223@cluster0.1kv1ue0.mongodb.net/medbase");

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/", function(req, res){
    
    const data = {
        patientID: req.body.pid,
        patientName: req.body.pname,
        report: req.body.rep,
        reportAnalysis: req.body.rint,
        reportType: req.body.upselect,
        img: req.body.upfile,
        uploadAnalysis: req.body.uint
    }

    db.collection('patient').insertOne(data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });
    return res.redirect('/')
})


app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/index.html");
})


app.get("/", function(req, res){
    res.set({
            "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("/");
})


app.listen(3000, function(){
    console.log("server is running on 3000");
 })