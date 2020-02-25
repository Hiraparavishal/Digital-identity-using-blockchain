var express = require("express");
var firebase = require("firebase");
var admin = require("firebase-admin");
var bodyParser = require("body-parser");
var randomstring = require("randomstring");
var router = express.Router();
var Blockchain = require('./blockchain1.js');
var Block = require('./blockchain2.js');
var blockchain = new Blockchain();
const serviceAccount = require("./sgh2020-b56ce-firebase-adminsdk-mwrnf-ebb7c66cd7.json");
var firebaseConfig = {
  apiKey: "AIzaSyD6PUvJDA32jUw2JeoLqd39rGau5dPj-18",
  authDomain: "sgh2020-b56ce.firebaseapp.com",
  databaseURL: "https://sgh2020-b56ce.firebaseio.com",
  projectId: "sgh2020-b56ce",
  storageBucket: "sgh2020-b56ce.appspot.com",
  messagingSenderId: "692087981842",
  appId: "1:692087981842:web:42c09081ce6e712a7e55cb",
  measurementId: "G-10X6YVWRZP"
};
router.get("/", function(req, res, next) {
  res.render("signup");
});
router.post("/Adduser", function(req, res, next) {
  var dgdtn = randomstring.generate();
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    var database = firebase.database();
    var ref = database.ref("Auth");
    var obj =  {
       firstname: req.body.fname,
       middlename:req.body.mname,
       lastname:req.body.lname,
       password:req.body.password,
       mobilenumber:req.body.mobile,
       digiditynumber:dgdtn
    }
    
    var result = ref.push(obj);
    setTimeout(function(){
      var data = {
        firstname: req.body.fname,
        middlename:req.body.mname,
        lastname:req.body.lname,
      }
      res.render("profile",{Data : data});
    },1000);
});
router.post("/AuthUser", function(req, res, next) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  var database = firebase.database();
  var ref = database.ref("Auth");
  ref
    .orderByChild("digiditynumber")
    .equalTo(req.body.digidity)
    .on(
      "child_added",
      function(snapshot) {
          
          var json = JSON.stringify(snapshot);
          var FinalJson=JSON.parse(json);
          if (FinalJson.password == req.body.password){
            
          res.render("profile",{});
          }else{
            res.render("login",{title : 'please enter valid username and password'});
          }
     },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
    setTimeout(function(){
      res.render("login",{title : 'please enter valid username and password'});
    },5000);

});
router.all("/login",function(req,res,next){
    res.render("login",{title:''});
})
router.all("/l",function(req,res,next){
  console.log("in");
  var firstname = sessionStorage.getItem("firstname");
  var middlename = sessionStorage.getItem("middlename");
  var lastname = sessionStorage.getItem("lastname");
  //console.log(firstname+middlename+lastname);
  console.log(firstname + middlename + lastname);
  console.log("out");
})
router.all("/addblock",function(req,res){
  console.log("in addblock");
  //console.log("data" + JSON.stringify(req.body));
  var json = JSON.parse(JSON.stringify(req.body));
  console.log(json);
  console.log("out addblock");  
  
blockchain.addBlock(new Block(json));
  
  console.log(JSON.stringify(blockchain,null,4));
})
router.all("/logout",function(req,res){
  res.render("signup");
})
module.exports = router;
