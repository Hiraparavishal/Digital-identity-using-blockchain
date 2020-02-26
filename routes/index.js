var express = require("express");
var firebase = require("firebase");
var admin = require("firebase-admin");
var bodyParser = require("body-parser");
var randomstring = require("randomstring");
var router = express.Router();
var Blockchain = require('./blockchain1.js');
var Block = require('./blockchain2.js');
var mergeJSON = require("merge-json") ;
const Nexmo = require('nexmo');
var blockchain = new Blockchain();
var dgdtn = randomstring.generate({
  length: 12,
  charset: 'numeric'
});
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
  res.render("home");
});
router.get("/signup", function(req, res, next) {
  res.render("signup");
});
router.post("/Adduser", function(req, res, next) {
  
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

 const nexmo = new Nexmo({
  apiKey: '84be2aca',
  apiSecret: 'J1eKE7Nrj9kDKwwa',
});

const from = 'Nexmo';
const to = '919974989295';
const text = 'Hello ' + req.body.fname +" "+req.body.mname+" "+req.body.lname+" Welcome to DIGIDITY. You are Signed up! Your DIGIDITY number is "+ dgdtn+" use it to login";
nexmo.message.sendSms(from, to, text);

/*setTimeout(function(){
      var data = {
        firstname: req.body.fname,
        middlename:req.body.mname,
        lastname:req.body.lname,
      
      }
      res.render("profile",{Data : data});
    },1000);*/
    res.render("login",{title : ' '});
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
  console.log(firstname + middlename + lastname);
  console.log("out");
})
router.all("/addblock",function(req,res){
  console.log("in addblock");
  
  var json = JSON.parse(JSON.stringify(req.body));
  var obj = {
    dgdtnumber : dgdtn
  }
  var result = mergeJSON.merge(json, obj) ;
  console.log(result);
  blockchain.addBlock(new Block(result));
  console.log(JSON.stringify(blockchain,null,4));
  
  console.log("out addblock");  
})
router.all("/logout",function(req,res){
  res.render("signup");
})
router.all("/Profile",function(req,res){
  // console.log("inprofile");
  // var json = JSON.parse(JSON.stringify(req.body));
  // console.log(json);
  // res.render("user",{title : 'no'});
  console.log("in profile" + dgdtn);
  var length = blockchain.getLength();
  for  (i=1;i<length;i++){
             const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i),null,4));
                 if(obj.data.dgdtnumber == dgdtn){
                   console.log("in for");
                  hash = obj.hash;
                  var data = JSON.parse(JSON.stringify(blockchain.getMainBlock(hash),null,4));
                  console.log(data);
                  res.render("user",{Data : data});
    }
  }
  console.log("out profile");
})

module.exports = router;
