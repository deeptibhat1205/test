var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

const app = express();

var path = require('path')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://cipher:5223@cluster0.1kv1ue0.mongodb.net/medbase");

var db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

//schema

//  const patientSchema = {
//     patientID: String,
//     patientName: String,
//     report: String,
//     reportAnalysis: String,
//     reportType: String,
//     img: String,
//     uploadAnalysis: String
//  }

app.post("/", function(req, res){
    var patientID = req.body.pid;
    var patientName = req.body.pname;
    var report = req.body.rep;
    var reportAnalysis = req.body.rint;
    var reportType = req.body.upselect;
    var img = req.body.upfile;
    var uploadAnalysis = req.body.uint;

    var data = {
        "patientID": patientID,
        "patientName": patientName,
        "report": report,
        "reportAnalysis": reportAnalysis,
        "reportType": reportType,
        "img": img,
        "uploadAnalysis": uploadAnalysis
    }

    db.collection('patient').insertOne(data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });

})

// const Patient = mongoose.model("patient", patientSchema);

app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/index.html");
})


app.get("/", function(req, res){
    res.set({
            "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("/");
})

// app.post("/", function(req, res){
//      let newPatient = new Patient({
//         patientID: req.body.pid,
//         patientName: req.body.pname,
//         report: req.body.rep,
//         reportAnalysis: req.body.rint,
//         reportType: req.body.upselect,
//         img: req.body.upfile,
//         uploadAnalysis: req.body.uint
//      });


//     newPatient.save();
//     res.redirect('/');
// })


app.listen(3000, function(){
    console.log("server is running on 3000");
 })