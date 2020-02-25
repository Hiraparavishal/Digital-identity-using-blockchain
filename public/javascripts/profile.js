var submit_btn = document.getElementById("submit");
var submit_flag = true;
var documentJson = [];
class Document {
  constructor(status, value, name, length) {
    this.status = status;
    this.value = value;
    this.name = name;
    this.length = length;
  }
}
function verifyCredential(dname, value, callback) {
  var result;
  var firstname = sessionStorage.getItem("firstname");
  var middlename = sessionStorage.getItem("middlename");
  var lastname = sessionStorage.getItem("lastname");
  //var dname = documentName;

  var request = new XMLHttpRequest();
  console.log(
    "http://localhost:5000/" +
      dname +
      "/" +
      firstname +
      "/" +
      middlename +
      "/" +
      lastname +
      "/" +
      value
  );
  request.open(
    "GET",
    "http://localhost:5000/" +
      dname +
      "/" +
      firstname +
      "/" +
      middlename +
      "/" +
      lastname +
      "/" +
      value,
    true
  );

  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    if (data == true) {
      result = true;
      callback(result);
    } else {
      console.log("false");
      result = false;
      callback(result);
    }
  };
  request.send();
  return result;
}

function verifyDocument(id) {
  var row = document.getElementById(id);
  var td = row.getElementsByTagName("td")[2];
  var td_status = row.getElementsByTagName("td")[4];
  var td_button = row.getElementsByTagName("td")[3];
  var button = td_button.getElementsByTagName("button").item(0);
  var input = td.getElementsByTagName("input").item(0);
  var documentName = td.getElementsByTagName("input").item(0).name;
  var values = input.value;
  var length = values.length;
  var status = false;
  if (values === "" || values === null) {
    nullCredential();
  } else {
    var isValid = validCredential(length);

    if (isValid) {
      var dname = documentName;
      verifyCredential(dname, values, function(result) {
        console.log(result);
        if (result == true) {
          status = true;
          submit_flag = true;
        } else {
          status = false;
        }
        //console.log(submit_btn);
        td_status.innerHTML = "";
        if (status) {
          td_status.innerHTML +=
            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#57b846"><path d="M134.16,13.76h-96.32c-13.27625,0 -24.08,10.80375 -24.08,24.08v96.32c0,13.27625 10.80375,24.08 24.08,24.08h96.32c13.27625,0 24.08,-10.80375 24.08,-24.08v-96.32c0,-13.27625 -10.80375,-24.08 -24.08,-24.08zM79.41563,118.49188l-33.25781,-31.00031l4.68969,-5.03906l27.97688,26.09563l45.83531,-54.08594l5.24063,4.44781z"></path></g></g></svg>';
          //button.disabled = true;
          disableBtn(submit_flag);
          input.readOnly = true;
          documentName = new Document(status, values, documentName, length);
          documentJson.push(documentName);
          //console.log(documentName);
        } else {
          td_status.innerHTML +=
            '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#e74c3c"><path d="M136.16667,21.5h-100.33333c-7.91917,0 -14.33333,6.41417 -14.33333,14.33333v100.33333c0,7.91917 6.41417,14.33333 14.33333,14.33333h100.33333c7.91917,0 14.33333,-6.41417 14.33333,-14.33333v-100.33333c0,-7.91917 -6.41417,-14.33333 -14.33333,-14.33333zM121.83333,111.72833l-10.105,10.105l-25.72833,-25.72833l-25.72833,25.72833l-10.105,-10.105l25.72833,-25.72833l-25.72833,-25.72833l10.105,-10.105l25.72833,25.72833l25.72833,-25.72833l10.105,10.105l-25.72833,25.72833z"></path></g></g></svg>';
        }
        // console.log(myDocuments);
       // documentJson.push(JSON.stringify(documentName));
        //console.log(documentJson);
      });
    } else {
      inValidCredential();
    }
  }
}

function nullCredential() {
  console.log("Enter Credential");
  alert("Enter Credential");
}

function inValidCredential() {
  console.log("Invalid Credentials!!!!");
}
function validCredential(length) {
  if (!(length == 12)) {
    return false;
  } else {
    return true;
  }
}

function disableBtn(submit_flag) {
  if (submit_flag) {
    console.log("Submitted");
    submit_btn.disabled = false;
  } else {
    console.log("Not Active");
    submit_btn.disabled = true;
  }
}

function createBlock() {
  disableBtn(submit_flag);
}
function saveData() {
  var firstname = document.getElementById("fname").value;
  var middlename = document.getElementById("mname").value;
  var lastname = document.getElementById("lname").value;
  sessionStorage.setItem("firstname", firstname);
  sessionStorage.setItem("middlename", middlename);
  sessionStorage.setItem("lastname", lastname);
 
}
function loginData() {
  alert("in login");
  var dgdt = document.getElementById("digidity").value;
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:5000/dgdt/" + dgdt, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    sessionStorage.setItem("firstname", data.firstname);
    sessionStorage.setItem("middlename", data.middlename);
    sessionStorage.setItem("lastname", data.lastname);
  };
  request.send();
}

// //////////////////////////////////////////////////////////////////////////////////////////////////

function addData() {
  var firstname = sessionStorage.getItem("firstname");
  var middlename = sessionStorage.getItem("middlename");
  var lastname = sessionStorage.getItem("lastname");
  documentName = new Document("true",firstname, "firstname", 12);
  documentJson.push(documentName);
  documentName = new Document("true",middlename, "middlename", 12);
  documentJson.push(documentName);
  documentName = new Document("true",lastname, "lastname", 12);
  documentJson.push(documentName);
   $.ajax({
     type : "POST",
     url:"/addblock",
     datatype:"Array",
     data:documentJson,
     success : function(msg){
       $('.answer').html(msg);
     }

  })
}