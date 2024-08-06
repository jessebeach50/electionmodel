var pollingAverage = .7;
var pollingErrorInMonth = 4;
var pollingError = 4;
var maxDemocraticResult = pollingAverage + pollingErrorInMonth + pollingError;
var maxRepublicanResult = pollingAverage - pollingErrorInMonth - pollingError;

//Array for 2024 District Data
const districtsArray = [];

//DATA
const csvUrl = 'https://raw.githubusercontent.com/jessebeach50/electionmodel/main/HouseDataCSV.csv';


// Use Papa Parse to fetch and parse the CSV file
Papa.parse(csvUrl, {
    download: true,
    header: true, // Set to false if the CSV doesn't have headers
    dynamicTyping: true, // Convert types automatically
    skipEmptyLines: true, // Skip empty lines
    complete: function(results) {
        console.log("Success");
        process2024Districts(results.data, "2024");
        setColorBasedOnChance();
        
    },
    error: function(error) {
        console.error("Error parsing CSV:", error);
    }
});



// Hover box displays info about state when hovered over
var tooltipSpan = document.getElementById('details-box');

document.addEventListener('mouseover', function (e) {
    if (e.target.tagName == 'path') {
        var districtName = e.target.dataset.id;      
        var hoveredDistrict = null;
        var found = false;       
        for(var i = 0; i < districtsArray.length; i++) {
            if (districtsArray[i].District == districtName) {
                hoveredDistrict = districtsArray[i];
                found = true;
                console.log(districtsArray[i]);
                break;
            }
        }
        document.getElementById("details-box").innerHTML = hoveredDistrict.InfoBoxString;
        document.getElementById("details-box").style.opacity = "100%"; 
            
    }else {
        document.getElementById("details-box").style.opacity = "0%";
    }
});

window.onmousemove = function (e) {
    var x = e.clientX,
        y = e.clientY;
    tooltipSpan.style.top = (y + 20) + 'px';
    tooltipSpan.style.left = (x) + 'px';
};



// Adding an event listener to the buttons
document.addEventListener('DOMContentLoaded', (event) => {
    const buttonInc = document.getElementById('Incumbents');
    buttonInc.addEventListener('click', handleClickIncumbent);

});
//Incumbent Model Click--------------------------------------------------------------------------------------------------------------------------
// This function will be executed when the Incumbency Button is clicked
function handleClickIncumbent() {
    districtsArray.length = 0;
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
            process2024Districts(results.data);
            setColorBasedOnParty();
        },
        error: function (error) {
            console.error("Error parsing CSV:", error);
        }
    });
}




//Run the model on the csv imported for 2024
function process2024Districts(districts, year){

    //cycle through every district and parse the data as needed--------------------------------------------
    districts.forEach(d => {
        //Basic Info

        districtName = d.District;
        var incumbent = d.Inc2024;

        if(d.Redistricted != "Y"){
            var e2022Result = d.e2022Results;
        }else{
            var e2022Result = "N/A";
        }



        incumbentParty = d.Party2024;

        var incumbentBonus = 0;
        if(incumbentParty == ""){
            incumbentParty = "OPEN";
            incumbentBonus = 0;
        }else if(incumbentParty == "D"){
            incumbentBonus = 3;
        }else{
            incumbentBonus = -3;
        }

        var p2020Result = d.P2020;
        var p2016Result = d.P2016;
        var p2012Result = d.P2012;

        var p2020Neutral = p2020Result - 4.5;
        var p2016Neutral = p2016Result - 2.1;
        var p2012Neutral = p2012Result - 3.9;

        var e2022Neutral = d.P2020old - 4.5 - 2.7;

        var projected2024Neutral = p2020Neutral + (((p2020Neutral - p2016Neutral) + (p2016Neutral - p2012Neutral)) / 2)
        var projected2024Env = projected2024Neutral;
        var projected2024Env2 = (p2020Neutral + (p2020Neutral - p2016Neutral));

        var IncumbentOverperformance = 0;


        if(d.Candidate2022 != null && d.e2022Results != null){
            
            if(districtName == "MI8"){
                console.log(d.Candidate2022);
                console.log(d.e2022Results);
                console.log(e2022Neutral);
            }

            IncumbentOverperformance = d.e2022Results - e2022Neutral;
        }

        //Model Time ---------------------------------------------------------------------------------
        var outcomesArray = [];

        //Just Fundamentals of District 1
        var maxD = projected2024Env + maxDemocraticResult;
        var maxR = projected2024Env + maxRepublicanResult;

        while (maxR < (maxD + .1)){
            var outcome = maxR;
            outcomesArray.push(outcome);
            maxR = maxR + .5;
        }

        //Just Fundamentals of District 2
        var maxD = projected2024Env2 + maxDemocraticResult;
        var maxR = projected2024Env2 + maxRepublicanResult;

        while (maxR < (maxD + .1)){
            var outcome = maxR;
            outcomesArray.push(outcome);
            maxR = maxR + .5;
        }

         //Just Fundamentals of District 1 plus incumbent over
         var maxD = projected2024Env + maxDemocraticResult + IncumbentOverperformance;
         var maxR = projected2024Env + maxRepublicanResult + IncumbentOverperformance;
 
         while (maxR < (maxD + .1)){
             var outcome = maxR;
             outcomesArray.push(outcome);
             outcomesArray.push(outcome);
             maxR = maxR + .5;
         }

         //Just Fundamentals of District 2 plus incumbent Over
         var maxD = projected2024Env2 + maxDemocraticResult + IncumbentOverperformance;
         var maxR = projected2024Env2 + maxRepublicanResult + IncumbentOverperformance;
 
         while (maxR < (maxD + .1)){
             var outcome = maxR;
             outcomesArray.push(outcome);
             outcomesArray.push(outcome);
             maxR = maxR + .5;
         }

         //2020 Results plus incumbent Over
         var maxD = p2020Neutral + maxDemocraticResult + IncumbentOverperformance;
         var maxR = p2020Neutral + maxRepublicanResult + IncumbentOverperformance;
 
         while (maxR < (maxD + .1)){
             var outcome = maxR;
             outcomesArray.push(outcome);
             outcomesArray.push(outcome);
             maxR = maxR + .5;
         }


         if(d.e2022Results != null){
            //2022 Results 
            var maxD = d.e2022Results + 4;
            var maxR = d.e2022Results - 4;
    
            while (maxR < (maxD + .1)){
                var outcome = maxR;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxR = maxR + .5;
            }
        }

         //Just Fundamentals of District 1 plus bonus 
         var maxD = projected2024Env + maxDemocraticResult + incumbentBonus;
         var maxR = projected2024Env + maxRepublicanResult + incumbentBonus;
 
         while (maxR < (maxD + .1)){
             var outcome = maxR;
             outcomesArray.push(outcome);
             outcomesArray.push(outcome);
             maxR = maxR + .5;
         }

         //Just Fundamentals of District 2 plus incumbent bonus
         var maxD = projected2024Env2 + maxDemocraticResult + incumbentBonus;
         var maxR = projected2024Env2 + maxRepublicanResult + incumbentBonus;
 
         while (maxR < (maxD + .1)){
             var outcome = maxR;
             outcomesArray.push(outcome);
             outcomesArray.push(outcome);
             maxR = maxR + .5;
         }



         //EVERYTHING TOGETHER NOW
         var maxR = projected2024Env - 2 + maxRepublicanResult;
         var maxD = projected2024Env + 2 + maxDemocraticResult;

         if(incumbentBonus > 0){
            maxD = maxD + incumbentBonus;
         }else{
            maxR = maxR + incumbentBonus;
         }

         if(IncumbentOverperformance > 0){
            maxD = maxD + IncumbentOverperformance;
         }else{
            maxR = maxR + IncumbentOverperformance
         }

         while (maxR < (maxD + .1)){
            var outcome = maxR;
            outcomesArray.push(outcome);
            outcomesArray.push(outcome);
            maxR = maxR + .5;
        }

        //EVERYTHING TOGETHER NOW
        var maxR = projected2024Env2 - 2 + maxRepublicanResult;
        var maxD = projected2024Env2 + 2 + maxDemocraticResult;
        if(districtName == "OH9"){
        console.log(projected2024Env2);
        console.log(maxD + " " + maxR);
        }
        if(incumbentBonus > 0){
        maxD = maxD + incumbentBonus;
        }else{
        maxR = maxR + incumbentBonus;
        }

        if(IncumbentOverperformance > 0){
        maxD = maxD + IncumbentOverperformance;
        }else{
        maxR = maxR + IncumbentOverperformance
        }

        while (maxR < (maxD + .1)){
        var outcome = maxR;
        outcomesArray.push(outcome);
        outcomesArray.push(outcome);
        maxR = maxR + .5;
    }




        //sort array and count number of times Dem wins to get a percentage and median outcome
        var numDWins = 0;

        var i = 0;
        while (i < outcomesArray.length) {
            var result = outcomesArray[i];
            if (result > 0) {
                numDWins = numDWins + 1;
            }
            i = i + 1;
        }

        //sort array
        outcomesArray.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });

        //Get Percent chance and median outcome
        var percentDWin = numDWins / outcomesArray.length;
        var medianN = ~~(outcomesArray.length / 2);
        var median = outcomesArray[medianN];





        infoBoxString = districtName + "\nIncumbent: " + incumbent + "\n2022 Result: " + e2022Result + "\nIncumbent Over/UnderPerformance: " + IncumbentOverperformance + "\nProjected Result: " + median +  "\nChance of D Win: " + percentDWin;

   //This is the state data obbject that is put into the array-------------------------------------------------------
        let districtData ={
            District: districtName,
            Incumbent: incumbent,
            IncumbentStrength: IncumbentOverperformance,
            IncumbentParty: incumbentParty,
            InfoBoxString: infoBoxString,
        

            Election2022Result: e2022Result,
            President2020Result: p2020Result,
            President2016Result: p2016Result,
            President2012Result: p2012Result,

            President2020Neutral: p2020Neutral,
            President2016Neutral: p2016Neutral,
            President2012Neutral: p2012Neutral,

            ChanceOfDWin: percentDWin
        

        };

        districtsArray.push(districtData);
    });
}

//Set color of each district based on incumbent party if incumbent is running
function setColorBasedOnParty(){
    for(var i = 0; i < districtsArray.length; i++) {
        var party = districtsArray[i].IncumbentParty;
        var districtID = districtsArray[i].District;

        svgDistrict = document.getElementById(districtID);
        
        if (party == "R"){
            try{svgDistrict.style.fill='red';}catch{}
        }
        else if (party == "D"){
            try{svgDistrict.style.fill='blue';}catch{}
        }
        else {
            try{svgDistrict.style.fill='gray';}catch{}
        }
    }
}


//Set the colors based on 2024 result
function setColorBasedOnChance() {
    for (var i = 0; i < districtsArray.length; i++) {
        
        var districtPercent = districtsArray[i].ChanceOfDWin;
        var districtAbbr = districtsArray[i].District;
        svgDistrict = document.getElementById(districtAbbr);



        if (districtPercent > .99) {
            try { svgDistrict.style.fill = '#040275'; } catch { }
        }
        else if (districtPercent > .95) {
            try { svgDistrict.style.fill = '#0300c4'; } catch { }
        }
        else if (districtPercent > .9) {
            try { svgDistrict.style.fill = '#2b28f7'; } catch { }
        }
        else if (districtPercent > .8) {
            try { svgDistrict.style.fill = '#605df5'; } catch { }
        }
        else if (districtPercent > .7) {
            try { svgDistrict.style.fill = '#8a88fc'; } catch { }
        }
        else if (districtPercent > .6) {
            try { svgDistrict.style.fill = '#c6c5fa'; } catch { }
        }
        else if (districtPercent > .5) {
            try { svgDistrict.style.fill = '#e4e4f5'; } catch { }
        }
        else if (districtPercent > .4) {
            try { svgDistrict.style.fill = '#fce8ea'; } catch { }
        }
        else if (districtPercent > .3) {
            try { svgDistrict.style.fill = '#f0afb4'; } catch { }
        }
        else if (districtPercent > .2) {
            try { svgDistrict.style.fill = '#db7f87'; } catch { }
        }
        else if (districtPercent > .1) {
            try { svgDistrict.style.fill = '#cf515b'; } catch { }
        }
        else if (districtPercent > .05) {
            try { svgDistrict.style.fill = '#eb2334'; } catch { }
        }
        else if (districtPercent > .01) {
            try { svgDistrict.style.fill = '#de0417'; } catch { }
        }
        else {
            try { svgDistrict.style.fill = '#a80210'; } catch { }
        }

    }
}