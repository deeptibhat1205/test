const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
// const cookieParser=require('cookie-parser')
// const session=require('express-session')

const app = express();

var path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public','home')))
app.use(express.static(path.join(__dirname,'public','doctor')))
app.use(express.static(path.join(__dirname, 'public', 'patient')))
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://cipher:5223@cluster0.1kv1ue0.mongodb.net/medbase");

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// app.use(cookieParser())

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(session({
//     secret:process.env.SESSION_SECRET,
//     saveUninitialized:true,
//     resave:false,
//     cookie:{
//         maxAge:oneDay
//     }
// }))

// Patient login forwarding
app.post("/patient-login", function(req, res){
    
    // const hashedPatientPwd = bcrypt.hash(req.body.ploginpwd, 10)

    const patient_login_data = {
        ploginName: req.body.ploginname,
        ploginID: req.body.ploginid,
        ploginPWD: req.body.ploginpwd
    }

    db.collection('patient').insertOne(patient_login_data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });
    return res.sendFile(path.join(__dirname,'public','patient','patientlogs.html'))
})



// Doctors login forwarding
app.post("/", function(req, res){

    // const hashedDoctorPwd = bcrypt.hash(req.body.dpwd, 10)

    const doctor_login_data = {
        doctorName: req.body.dname,
        doctorID: req.body.did,
        doctorPWD: req.body.dpwd
    }
    
    db.collection('doctors').insertOne(doctor_login_data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });
    return res.redirect('http://localhost:5000')
})

app.post("/report-submit", function(req, res){
    

    const data = {
        patientID: req.body.pid,
        patientName: req.body.pname,
        report: req.body.rep,
        reportAnalysis: req.body.rint,
        reportType: req.body.upselect,
        img: req.body.upfile,
        uploadAnalysis: req.body.uint,
        date: new Date(Date.now()).toISOString()
    }

    db.collection('report').insertOne(data, (err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted");
    });
    return res.redirect('/')
})


// retrieving data from database
app.get("/retrieve-data", function(req, res, next){


})




app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,'public','home','index.html'));
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