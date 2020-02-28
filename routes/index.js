var express = require("express");
var firebase = require("firebase");
var admin = require("firebase-admin");
var bodyParser = require("body-parser");
var randomstring = require("randomstring");
var router = express.Router();
var Blockchain = require("./blockchain1.js");
var Block = require("./blockchain2.js");
var mergeJSON = require("merge-json");
var sessionstorage = require("sessionstorage");
const Nexmo = require("nexmo");
var blockchain = new Blockchain();
var otp = randomstring.generate({
  length: 6,
  charset: "numeric"
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
  var dgdtn = randomstring.generate({
    length: 12,
    charset: "numeric"
  });
  sessionstorage.setItem("digidity", dgdtn);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  var database = firebase.database();
  var ref = database.ref("Auth");
  var obj = {
    firstname: req.body.fname,
    middlename: req.body.mname,
    lastname: req.body.lname,
    password: req.body.password,
    mobilenumber: req.body.mobile,
    digiditynumber: dgdtn
  };

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
  res.render("login", { title: " " });
});
router.post("/AuthUser", function(req, res, next) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  var database = firebase.database();
  var ref = database.ref("Auth");
  sessionstorage.setItem("dg", req.body.digidity);
  ref
    .orderByChild("digiditynumber")
    .equalTo(req.body.digidity)
    .on(
      "child_added",
      function(snapshot) {
        var json = JSON.stringify(snapshot);
        var FinalJson = JSON.parse(json);
        if (FinalJson.password == req.body.password) {
          res.render("profile", {});
        } else {
          res.render("login", {
            title: "please enter valid username and password"
          });
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  setTimeout(function() {
    res.render("login", { title: "please enter valid username and password" });
  }, 5000);
});
router.all("/login", function(req, res, next) {
  res.render("login", { title: "" });
});
router.all("/l", function(req, res, next) {
  console.log("in");
  var firstname = sessionStorage.getItem("firstname");
  var middlename = sessionStorage.getItem("middlename");
  var lastname = sessionStorage.getItem("lastname");
  console.log(firstname + middlename + lastname);
  console.log("out");
});
router.all("/addblock", function(req, res) {
  console.log("in addblock");
  var dgdtn = sessionstorage.getItem("digidity");

  var json = JSON.parse(JSON.stringify(req.body));
  var obj = {
    dgdtnumber: dgdtn
  };
  var result = mergeJSON.merge(json, obj);
  var length = blockchain.getLength();
  var flag = 0;
  var hash;
  var dg = sessionstorage.getItem("dg");
  for (i = 1; i < length; i++) {
    const objj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
    if (objj.data.dgdtnumber == dg) {
      console.log("in sub block");
      hash = objj.hash;
      blockchain.addSubBlock(new Block(result), objj.hash);
      console.log(JSON.stringify(blockchain, null, 4));
      flag = 1;
    }
  }
  if (flag == 0) {
    blockchain.addBlock(new Block(result));
    console.log(JSON.stringify(blockchain, null, 4));
  }

  console.log("out addblock");
});
router.all("/logout", function(req, res) {
  res.render("home");
});
router.all("/Profile", function(req, res) {
  console.log("in profile" + dgdtn);
  var length = blockchain.getLength();
  for (i = 1; i < length; i++) {
    const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
    if (obj.data.dgdtnumber == dgdtn) {
      console.log("in for");
      hash = obj.hash;
      var data = JSON.parse(
        JSON.stringify(blockchain.getMainBlock(hash), null, 4)
      );
      console.log(data);
      res.render("user", { Data: data });
    }
  }
  console.log("out profile");
});
router.all("/vender", function(req, res) {
  res.render("vendors");
});
router.all("/admin", function(req, res) {
  res.render("admin");
});
router.all("/admin_input", function(req, res) {
  res.render("admin_input", { Data: "" });
});
router.all("/subblock", function(req, res) {
  var length = blockchain.getLength();
  var hash;
  console.log("subblock route");
  var dg1 = req.body.dg1;
  console.log(dg1);
  console.log(length);
  for (i = 1; i < length; i++) {
    const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
    if (obj.data.dgdtnumber == dg1) {
      console.log("in for");
      hash = obj.hash;
      var data = JSON.parse(
        JSON.stringify(blockchain.getMainBlock(hash), null, 4)
      );
      console.log("main block is" + data);
      console.log(
        "Sub block" + JSON.stringify(blockchain.getSubBlock(hash), null, 4)
      );
      var data1 = JSON.stringify(blockchain.getMainBlock(hash), null, 4);
      var data2 = JSON.stringify(blockchain.getSubBlock(hash), null, 4);
      data = data1 + data2;
      res.render("admin_input", { Data: data });
    }
  }
});

router.all("/venderlogin", function(req, res) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  var database = firebase.database();
  var ref = database.ref("Vendor");
  ref
    .orderByChild("email")
    .equalTo(req.body.digidity)
    .on(
      "child_added",
      function(snapshot) {
        var json = JSON.stringify(snapshot);
        var FinalJson = JSON.parse(json);
        if (FinalJson.password == req.body.password) {
          sessionstorage.setItem("organization", FinalJson.organization);
          console.log("login success");
          res.render("vendor_input");
        } else {
          console.log("login faild");
          res.render("vendors");
        }
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  setTimeout(function() {
    res.render("vendors");
  }, 5000);
});
router.all("/sendotp", function(req, res) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  var database = firebase.database();
  var ref = database.ref("Auth");
  ref
    .orderByChild("digiditynumber")
    .equalTo(req.body.dgdtn)
    .on(
      "child_added",
      function(snapshot) {
        var json = JSON.stringify(snapshot);
        var FinalJson = JSON.parse(json);
        console.log(FinalJson);
        console.log(FinalJson.mobilenumber);
        console.log(FinalJson.organization);
        const nexmo = new Nexmo({
          apiKey: '84be2aca',
          apiSecret: 'J1eKE7Nrj9kDKwwa',
        });

        const from = 'Nexmo';
        const to = '919974989295';
        const text = otp +" - is your OTP to login";
        nexmo.message.sendSms(from, to, text);
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
});
router.all("/checkotp", function(req, res) {
  var rotp = req.body.otp;
  if (true) {
    var organization = sessionstorage.getItem("organization");
    var digidity = sessionstorage.getItem("digidity");

    if (organization == "College") {
      var length = blockchain.getLength();
      for (i = 1; i < length; i++) {
        const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
        if (obj.data.dgdtnumber == digidity) {
          console.log("in for");
          hash = obj.hash;
          var Data = JSON.parse(
            JSON.stringify(blockchain.getMainBlock(hash), null, 4)
          );
          console.log(Data);
          var obj1 = {
            aadharcard: Data.data.aadharcard,
            birthcertificate: Data.data.birthcertificate,
            leavingcertificate: Data.data.leavingcertificate,
            castecertificate: Data.data.castecertificate,
            incomeproofcertificate: Data.data.incomeproofcertificate
          };
          //res.render("user",{Data : data});
          res.render("user_data", { OBJ: obj1 });
        }
      }
    }
    //  if(organization == "Others"){
    //   var length = blockchain.getLength();
    //   for  (i=1;i<length;i++){
    //              const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i),null,4));
    //                  if(obj.data.dgdtnumber == digidity){
    //                    console.log("in for");
    //                   hash = obj.hash;
    //                   var Data = JSON.parse(JSON.stringify(blockchain.getMainBlock(hash),null,4));
    //                   console.log(Data);
    //                   var obj1 = {
    //                      aadharcard:Data.data.aadharcard,
    //                      birthcertificate:Data.data.birthcertificate,
    //                      leavingcertificate:Data.data.leavingcertificate,
    //                      castecertificate:Data.data.castecertificate,
    //                      incomeproofcertificate:Data.data.incomeproofcertificate,
    //                   }
    //                   //res.render("user",{Data : data});
    //                   res.render('user_data',{OBJ : obj1});
    //     }
    //   }

    //  }
    if (organization == "School") {
      var length = blockchain.getLength();
      for (i = 1; i < length; i++) {
        const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
        if (obj.data.dgdtnumber == digidity) {
          console.log("in for");
          hash = obj.hash;
          var Data = JSON.parse(
            JSON.stringify(blockchain.getMainBlock(hash), null, 4)
          );
          console.log(Data);
          var obj1 = {
            aadharcard: Data.data.aadharcard,
            birthcertificate: Data.data.birthcertificate,
            leavingcertificate: Data.data.leavingcertificate,
            castecertificate: Data.data.castecertificate,
            incomeproofcertificate: Data.data.incomeproofcertificate
          };
          //res.render("user",{Data : data});
          res.render("user_data", { OBJ: obj1 });
        }
      }
    }
    if (organization == "Hospital") {
      var length = blockchain.getLength();
      for (i = 1; i < length; i++) {
        const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
        if (obj.data.dgdtnumber == digidity) {
          console.log("in for");
          hash = obj.hash;
          var Data = JSON.parse(
            JSON.stringify(blockchain.getMainBlock(hash), null, 4)
          );
          console.log(Data);
          var obj1 = {
            aadharcard: Data.data.aadharcard,
            birthcertificate: Data.data.birthcertificate,
            castecertificate: Data.data.castecertificate,
            incomeproofcertificate: Data.data.incomeproofcertificate
          };
          //res.render("user",{Data : data});
          res.render("user_data", { OBJ: obj1 });
        }
      }
    }
    if (organization == "RTO") {
      var length = blockchain.getLength();
      for (i = 1; i < length; i++) {
        const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
        if (obj.data.dgdtnumber == digidity) {
          console.log("in for");
          hash = obj.hash;
          var Data = JSON.parse(
            JSON.stringify(blockchain.getMainBlock(hash), null, 4)
          );
          console.log(Data);
          var obj1 = {
            aadharcard: Data.data.aadharcard,
            birthcertificate: Data.data.birthcertificate,
            leavingcertificate: Data.data.leavingcertificate,
            drivinglicense: Data.data.drivinglicense
          };
          //res.render("user",{Data : data});
          res.render("user_data", { OBJ: obj1 });
        }
      }
    }
    if (organization == "Passport Authority") {
      var length = blockchain.getLength();
      for (i = 1; i < length; i++) {
        const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
        if (obj.data.dgdtnumber == digidity) {
          console.log("in for");
          hash = obj.hash;
          var Data = JSON.parse(
            JSON.stringify(blockchain.getMainBlock(hash), null, 4)
          );
          console.log(Data);
          var obj1 = {
            aadharcard: Data.data.aadharcard,
            birthcertificate: Data.data.birthcertificate,
            leavingcertificate: Data.data.leavingcertificate,
            degreecertificate: Data.data.degreecertificate,
            incomeproofcertificate: Data.data.incomeproofcertificate,
            voterid: Data.data.voterid
          };
          //res.render("user",{Data : data});
          res.render("user_data", { OBJ: obj1 });
        }
      }
    }
    if (organization == "Bank") {
      var length = blockchain.getLength();
      for (i = 1; i < length; i++) {
        const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
        if (obj.data.dgdtnumber == digidity) {
          console.log("in for");
          hash = obj.hash;
          var Data = JSON.parse(
            JSON.stringify(blockchain.getMainBlock(hash), null, 4)
          );
          console.log(Data);
          var obj1 = {
            aadharcard: Data.data.aadharcard,
            birthcertificate: Data.data.birthcertificate,
            leavingcertificate: Data.data.leavingcertificate,
            castecertificate: Data.data.castecertificate,
            incomeproofcertificate: Data.data.incomeproofcertificate,
            pannumber: Data.data.pannumber,
            passport: Data.data.Passport,
            voterid: Data.data.voterid
          };
          //res.render("user",{Data : data});
          res.render("user_data", { OBJ: obj1 });
        }
      }
    }
    if (organization == "Police") {
      var length = blockchain.getLength();
      for (i = 1; i < length; i++) {
        const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
        if (obj.data.dgdtnumber == digidity) {
          console.log("in for");
          hash = obj.hash;
          var Data = JSON.parse(
            JSON.stringify(blockchain.getMainBlock(hash), null, 4)
          );
          console.log(Data);
          var obj1 = {
            aadharcard: Data.data.aadharcard,
            birthcertificate: Data.data.birthcertificate,
            incomeproofcertificate: Data.data.incomeproofcertificate,
            voterid: Data.data.voterid,
            pannumber: Data.data.pannumber,
            drivinglicense: Data.data.drivinglicense,
            passport: Data.data.Passport,
            degreecertificate: Data.data.degreecertificate
          };
          //res.render("user",{Data : data});
          res.render("user_data", { OBJ: obj1 });
        }
      }
    }
    if (organization == "Government") {
      var length = blockchain.getLength();
      for (i = 1; i < length; i++) {
        const obj = JSON.parse(JSON.stringify(blockchain.getBlock(i), null, 4));
        if (obj.data.dgdtnumber == digidity) {
          console.log("in for");
          hash = obj.hash;
          var Data = JSON.parse(
            JSON.stringify(blockchain.getMainBlock(hash), null, 4)
          );
          console.log(Data);
          var obj1 = {
            aadharcard: Data.data.aadharcard,
            birthcertificate: Data.data.birthcertificate,
            leavingcertificate: Data.data.leavingcertificate,
            castecertificate: Data.data.castecertificate,
            incomeproofcertificate: Data.data.incomeproofcertificate,
            passport: Data.data.Passport,
            drivinglicense: Data.data.drivinglicense,
            voterid: Data.data.voterid
          };
          //res.render("user",{Data : data});
          res.render("user_data", { OBJ: obj1 });
        }
      }
    }
    res.render("user_data");
  } else {
    res.render("vendor_input");
  }
});

module.exports = router;
