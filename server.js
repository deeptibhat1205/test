const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")

const app = express();

var path = require('path')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public','login')))
app.use(express.static(path.join(__dirname,'public','doctor')))
app.use(express.static(path.join(__dirname, 'public', 'patient')))
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://cipher:5223@cluster0.1kv1ue0.mongodb.net/medbase");

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


// Patient login forwarding
app.post("/patient-login", function(req, res){
    
    const hashedPatientPwd = bcrypt.hash(req.body.ploginpwd, 10)

    const patient_login_data = {
        ploginName: req.body.ploginname,
        ploginID: req.body.ploginid,
        ploginPWD: req.body.hashedPatientPwd
    }

    db.collection('patient').insertOne(patient_login_data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });
    return res.sendFile(path.join(__dirname,'public','patient','patient.html'))
})



// Doctors login forwarding
app.post("/", function(req, res){

    const hashedDoctorPwd = bcrypt.hash(req.body.dpwd, 10)

    const doctor_login_data = {
        doctorID: req.body.did,
        doctorPWD: hashedDoctorPwd
    }
    
    db.collection('doctors').insertOne(doctor_login_data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });
    return res.sendFile(path.join(__dirname,'public','doctor','doctor.html'))
})

app.post("/report-submit", function(req, res){

    const data = {
        patientID: req.body.pid,
        patientName: req.body.pname,
        report: req.body.rep,
        reportAnalysis: req.body.rint,
        reportType: req.body.upselect,
        img: req.body.upfile,
        uploadAnalysis: req.body.uint
    }

    db.collection('report').insertOne(data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });
    return res.redirect('/')
})


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,'public','login','login.html'));
})



// connectin the server
app.get("/", function(req, res){
    res.set({
            "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("/");
})


app.listen(3000, function(){
    console.log("server is running on 3000");
 })