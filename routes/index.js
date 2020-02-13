var express = require('express');
var firebase = require('firebase');
var admin=require('firebase-admin');
var router = express.Router();
const serviceAccount = require('./gsrsc-81bca-firebase-adminsdk-nnvi8-e64cec9310.json');
var firebaseConfig = {
  apiKey: "AIzaSyBEJYuv52g-zY91cf-C8SJZ39A-fskXJok",
  authDomain: "gsrsc-81bca.firebaseapp.com",
  databaseURL: "https://gsrsc-81bca.firebaseio.com",
  projectId: "gsrsc-81bca",
  storageBucket: "gsrsc-81bca.appspot.com",
  messagingSenderId: "38256088417",
  appId: "1:38256088417:web:885c9f7c5e6198e2706120"
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/auth', function(req, res, next) {
  if (!firebase.apps.length){
    firebase.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://gsrsc-81bca.firebaseio.com"
      
    });

  }
    firebase.initializeApp(firebaseConfig);
      var email = 'vishuhirapara@gmail.com';
      var password = '123hhfc45';
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode == 'auth/weak-password') {
            console.log('The password is too weak.');
          } else {
            console.log(errorMessage);
          }
        console.log(error);
      });
    });
  

module.exports = router;
