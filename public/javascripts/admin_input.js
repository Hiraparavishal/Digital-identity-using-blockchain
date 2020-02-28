var btn = document.getElementById("dgdt");
var data = [
    {
        aadharcard : "123456789",
        voterid : "123456789",
        pannumber : "123456789"

    },
    {
        castecertificate : "123456789",
        birthcertificate : "123456789"
    },
    {
        incomeproofcertificate : "123456789",
        Passport : "123456789",
    }
]

function printData() {
    for(var i=0; i<data.length;i++){
       console.log(JSON.stringify(data[i]));
    }
}