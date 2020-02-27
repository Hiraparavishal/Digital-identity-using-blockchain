var input_dgdt = document.getElementsByTagName("input").item(0);
var dgdt_btn = document.getElementById("dgdt_submit");
var otp_btn = document.getElementById("otp_submit");
var value_dgdt = input_dgdt.value;
var input_otp = document.getElementsByTagName("input").item(1);

var otp = "12345";

function sendOTP() {
    console.log(value_dgdt);
    console.log("Otp sent");
    dgdt_btn.style.display="none";
    otp_btn.style.display="block";
    input_dgdt.style.display="none";
    input_otp.style.display="block";
}

function verifyOTP(){
    var value_otp = input_otp.value;
    //console.log(value_otp);
    if(value_otp=="12345"){
        console.log("permission granted");
    }    
}