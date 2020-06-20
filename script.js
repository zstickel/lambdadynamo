

var RAC;
var name;
var probability;
var severity;
var racdescription;
var moreentries;
var hazards = [];
var flightnumber;
var flight;
var numhazards=0;
var newflight=true;
var xhr = new XMLHttpRequest();
const url='https://ewbm9oanwk.execute-api.us-east-1.amazonaws.com/Testing/RiskappNewrisk';



function Risk(name, descrip, probability, time, cost, quality){
    this.name=name;
    this.descrip=descrip;
    this.probability=probability;
    this.time=time;
    this.cost=cost;
    this.quality=quality;
}



function inputForm(){
    var lambdaresponse;
 
    hazards[numhazards]=new Risk(
        document.getElementById("frisk").value, document.getElementById("friskdescription").value, document.getElementById("fprobability").value, document.getElementById("ftimeimpact").value,
        document.getElementById("fcostimpact").value, document.getElementById("fqualityimpact").value);

    moreentries = document.getElementById("fadditionalentry").value;
    if(moreentries=="Y"){
        numhazards++;
        document.getElementById("frisk").value = '';
        document.getElementById("friskdescription").value='';
        return;
    }
    else{            
        
        xhr.open("POST",url);
        var data = JSON.stringify(hazards);
        xhr.send(data);
        xhr.onreadystatechange=(e)=>{ console.log(xhr.responseText); }        
        document.getElementById("maincontent").innerHTML= "<br><br><h1> Thanks for your input!</h1>";
    }
}



