var pollingAverage = 1.95;
var pollingErrorInMonth = 4;
var pollingError = 4;
var maxDemocraticResult = pollingAverage + pollingErrorInMonth + pollingError;
var maxRepublicanResult = pollingAverage - pollingErrorInMonth - pollingError;

//Array for 2024 District Data
const districtsArray = [];

//DATA
const csvUrl = 'https://raw.githubusercontent.com/jessebeach50/electionmodel/main/ModelData/HouseDataCSV.csv';


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
        populateDropDown();
        getPercentDWin();
        
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

    const button2020p = document.getElementById('2020 President Actual Results');
    button2020p.addEventListener('click', handleClick2020p);

    const button2016p = document.getElementById('2016 President Actual Results');
    button2016p.addEventListener('click', handleClick2016p);

    const button2012p = document.getElementById('2012 President Actual Results');
    button2012p.addEventListener('click', handleClick2012p);

    const button2022 = document.getElementById('2022 Actual Results');
    button2022.addEventListener('click', handleClick2022);

    const button2024 = document.getElementById('2024 Model');
    button2024.addEventListener('click', handleClick2024);

    const callButtonD = document.getElementById('callButtonD');
    callButtonD.addEventListener('click', handleClickCallButtonD);

    const callButtonR = document.getElementById('callButtonR');
    callButtonR.addEventListener('click', handleClickCallButtonR);

    const enterButton = document.getElementById('enterButton');
    enterButton.addEventListener('click', handleClickEnterButton);

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

function handleClick2020p(){
    setColorBasedOnResult("2020");
}

function handleClick2022(){
    setColorBasedOnResult("2022");
}

function handleClick2016p(){
    setColorBasedOnResult("2016");    
}

function handleClick2012p(){
    setColorBasedOnResult("2012");
}

function handleClick2024(){
    process2024Districts;
    setColorBasedOnChance("2024");
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
        var maxD = projected2024Env + 6
        var maxR = projected2024Env - 6;

        while (maxR < (maxD + .1)){
            var maxNatD = maxDemocraticResult;
            var maxNatR = maxRepublicanResult;
            while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                outcomesArray.push(outcome);
                maxNatR = maxNatR + .5;
            }
            maxR = maxR + .5;
        }

         //Just Fundamentals of District 2
         var maxD = projected2024Env2 + 6
         var maxR = projected2024Env2 - 6;
 
         while (maxR < (maxD + .1)){
             var maxNatD = maxDemocraticResult;
             var maxNatR = maxRepublicanResult;
             while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                 outcomesArray.push(outcome);
                 maxNatR = maxNatR + .5;
             }
             maxR = maxR + .5;
         }
         
        //Just Fundamentals of District 2020 Numbers
        var maxD = p2020Neutral + 6
        var maxR = p2020Neutral - 6;

        while (maxR < (maxD + .1)){
            var maxNatD = maxDemocraticResult;
            var maxNatR = maxRepublicanResult;
            while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxNatR = maxNatR + .5;
            }
            maxR = maxR + .5;
        }

        //Just Fundamentals of District 1 + Inc Over
        var maxD = projected2024Env + 6 + IncumbentOverperformance
        var maxR = projected2024Env - 6 + IncumbentOverperformance;

        while (maxR < (maxD + .1)){
            var maxNatD = maxDemocraticResult;
            var maxNatR = maxRepublicanResult;
            while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                outcomesArray.push(outcome);
                maxNatR = maxNatR + .5;
            }
            maxR = maxR + .5;
        }
        
         //Just Fundamentals of District 2 + Inc Over
         var maxD = projected2024Env2 + 6 + IncumbentOverperformance
         var maxR = projected2024Env2 - 6 + IncumbentOverperformance;
 
         while (maxR < (maxD + .1)){
             var maxNatD = maxDemocraticResult;
             var maxNatR = maxRepublicanResult;
             while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                 outcomesArray.push(outcome);
                 maxNatR = maxNatR + .5;
             }
             maxR = maxR + .5;
         }
        
         //Just Fundamentals of District 2 + Inc Over
         var maxD = p2020Neutral + 6 + IncumbentOverperformance
         var maxR = p2020Neutral - 6 + IncumbentOverperformance;
 
         while (maxR < (maxD + .1)){
             var maxNatD = maxDemocraticResult;
             var maxNatR = maxRepublicanResult;
             while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                 outcomesArray.push(outcome);
                 outcomesArray.push(outcome);
                 maxNatR = maxNatR + .5;
             }
             maxR = maxR + .5;
         }
        
        //Just Fundamentals of District 1 + Inc Over
        var maxD = projected2024Env + 6 + incumbentBonus
        var maxR = projected2024Env - 6 + incumbentBonus;

        while (maxR < (maxD + .1)){
            var maxNatD = maxDemocraticResult;
            var maxNatR = maxRepublicanResult;
            while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                outcomesArray.push(outcome);
                maxNatR = maxNatR + .5;
            }
            maxR = maxR + .5;
        }
        
         //Just Fundamentals of District 2 + Inc Over
         var maxD = projected2024Env2 + 6 + incumbentBonus
         var maxR = projected2024Env2 - 6 + incumbentBonus;
 
         while (maxR < (maxD + .1)){
             var maxNatD = maxDemocraticResult;
             var maxNatR = maxRepublicanResult;
             while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                 outcomesArray.push(outcome);
                 maxNatR = maxNatR + .5;
             }
             maxR = maxR + .5;
         }
        
         //Just Fundamentals of District 2 + Inc Bonus
         var maxD = p2020Neutral + 6 + incumbentBonus
         var maxR = p2020Neutral - 6 + incumbentBonus;
 
         while (maxR < (maxD + .1)){
             var maxNatD = maxDemocraticResult;
             var maxNatR = maxRepublicanResult;
             while (maxNatR < (maxNatD + .1)){
                var outcome = maxR + maxNatR;
                 outcomesArray.push(outcome);
                 outcomesArray.push(outcome);
                 maxNatR = maxNatR + .5;
             }
             maxR = maxR + .5;
         }

         if(d.e2022Results != null){
            
            //2022 Results 
            var maxD = d.e2022Results + 4;
            var maxR = d.e2022Results - 4;
            
            if(districtName == "AK-AL"){
                console.log("hi" + maxR + " " + d.e2022Results)
            }

            while (maxR < (maxD + .1)){
                var maxNatD = maxDemocraticResult;
                var maxNatR = maxRepublicanResult;
                while (maxNatR < (maxNatD + .1)){
                    var outcome = maxR + maxNatR;

                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);             
                    maxNatR = maxNatR + .5;
                }
                maxR = maxR + .5;

            }
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
            try{svgDistrict.style.fill='rgb(121, 24, 24)';}catch{}
        }
        else if (party == "D"){
            try{svgDistrict.style.fill='rgb(24, 31, 121)';}catch{}
        }
        else {
            try{svgDistrict.style.fill='rgba(255, 255, 255, 0.05)';}catch{}
        }
    }
}


//Set the colors based on 2024 result
function setColorBasedOnChance() {
    for (var i = 0; i < districtsArray.length; i++) {
        
        var districtPercent = districtsArray[i].ChanceOfDWin;
        var districtAbbr = districtsArray[i].District;
        svgDistrict = document.getElementById(districtAbbr);

        if (districtPercent == 1000) {

            try { svgDistrict.style.fill = 'rgb(0, 9, 59)'; } catch {  }
        }
        else if (districtPercent == -1000) {
            try { svgDistrict.style.fill = 'rgb(65, 12, 0)'; } catch { }
        }
        else if (districtPercent > .99) {
            try { svgDistrict.style.fill = 'rgb(19, 25, 109)'; } catch { }
        }
        else if (districtPercent > .95) {
            try { svgDistrict.style.fill = 'rgb(24, 31, 121)'; } catch { }
        }
        else if (districtPercent > .9) {
            try { svgDistrict.style.fill = 'rgb(41, 48, 141)'; } catch { }
        }
        else if (districtPercent > .8) {
            try { svgDistrict.style.fill = 'rgb(63, 71, 167)'; } catch { }
        }
        else if (districtPercent > .7) {
            try { svgDistrict.style.fill = 'rgb(95, 102, 197)'; } catch { }
        }
        else if (districtPercent > .6) {
            try { svgDistrict.style.fill = 'rgb(129, 135, 216)'; } catch { }
        }
        else if (districtPercent > .5) {
            try { svgDistrict.style.fill = 'rgb(173, 178, 242)'; } catch { }
        }
        else if (districtPercent > .4) {
            try { svgDistrict.style.fill = 'rgb(242, 173, 173)'; } catch { }
        }
        else if (districtPercent > .3) {
            try { svgDistrict.style.fill = 'rgb(215, 128, 128)'; } catch { }
        }
        else if (districtPercent > .2) {
            try { svgDistrict.style.fill = 'rgb(195, 93, 93)'; } catch { }
        }
        else if (districtPercent > .1) {
            try { svgDistrict.style.fill = 'rgb(163, 59, 59)'; } catch { }
        }
        else if (districtPercent > .05) {
            try { svgDistrict.style.fill = 'rgb(137, 37, 37)'; } catch { }
        }
        else if (districtPercent > .01) {
            try { svgDistrict.style.fill = 'rgb(121, 24, 24)'; } catch { }
        }
        else {
            try { svgDistrict.style.fill = 'rgb(105, 15, 15)'; } catch { }
        }

    }
}

//Set the colors based on past result
function setColorBasedOnResult(year) {
    for (var i = 0; i < districtsArray.length; i++) {
        if(year == "2020"){
            var districtPercent = districtsArray[i].President2020Result;
        }
        if(year == "2016"){
            var districtPercent = districtsArray[i].President2016Result;
        }
        if(year == "2012"){
            var districtPercent = districtsArray[i].President2012Result;
        }

        if(year == "2022"){
            var districtPercent = districtsArray[i].Election2022Result;
        }

        var districtAbbr = districtsArray[i].District;
        svgDistrict = document.getElementById(districtAbbr);


        if(districtAbbr == "MT2"){
            console.log(districtPercent)
        }

        if (districtPercent > 25) {
            try { svgDistrict.style.fill = 'rgb(19, 25, 109)'; } catch { }
        }else if (districtPercent == null){
            try { svgDistrict.style.fill = 'rgba(0, 0, 0, 0.15)'; } catch { }
        }
        else if (districtPercent > 20) {
            try { svgDistrict.style.fill = 'rgb(24, 31, 121)'; } catch { }
        }
        else if (districtPercent > 15) {
            try { svgDistrict.style.fill = 'rgb(41, 48, 141)'; } catch { }
        }
        else if (districtPercent > 10) {
            try { svgDistrict.style.fill = 'rgb(63, 71, 167)'; } catch { }
        }
        else if (districtPercent > 5) {
            try { svgDistrict.style.fill = 'rgb(95, 102, 197)'; } catch { }
        }
        else if (districtPercent > 1) {
            try { svgDistrict.style.fill = 'rgb(129, 135, 216)'; } catch { }
        }
        else if (districtPercent > 0) {
            try { svgDistrict.style.fill = 'rgb(173, 178, 242)'; } catch { }
        }
        else if (districtPercent > -1) {
            try { svgDistrict.style.fill = 'rgb(242, 173, 173)'; } catch { }
        }
        else if (districtPercent > -5) {
            try { svgDistrict.style.fill = 'rgb(215, 128, 128)'; } catch { }
        }
        else if (districtPercent > -10) {
            try { svgDistrict.style.fill = 'rgb(195, 93, 93)'; } catch { }
        }
        else if (districtPercent > -15) {
            try { svgDistrict.style.fill = 'rgb(163, 59, 59)'; } catch { }
        }
        else if (districtPercent > -20) {
            try { svgDistrict.style.fill = 'rgb(137, 37, 37)'; } catch { }
        }
        else if (districtPercent > -25) {
            try { svgDistrict.style.fill = 'rgb(121, 24, 24)'; } catch { }
        }
        else if(districtPercent > -100) {
            try { svgDistrict.style.fill = 'rgb(105, 15, 15)'; } catch { }
        }else{
            try { svgDistrict.style.fill = 'rgba(0, 0, 0, 0.15)'; } catch { }
        }
    }
}


//Drop Down Menu

// Get the select element
const dropdown = document.getElementById('stateDropDown');

function populateDropDown(){
    // Array of options
    const optionsArray = [];
    districtsArray.forEach(element => {
        //console.log("I am here")
        optionsArray.push(element.District);
    });

    // Populate the drop-down menu
    optionsArray.forEach(option => {
        // Create a new option element
        const optionElement = document.createElement('option');
        optionElement.textContent = option; // Set the text of the option
        optionElement.value = option; // Set the value of the option

        // Append the option element to the select element
        dropdown.appendChild(optionElement);
    });


}


function handleClickEnterButton(){
    const numberInput = document.getElementById('numberInput');
    var percent = numberInput.value || 'None';
    var selectedDistrict = dropdown.value;
    // Get references to the input field and display area

    //console.log("I am here" + percent + " " + selectedState);


    for (var i = 0; i < districtsArray.length; i++) {
        if (districtsArray[i].District == selectedDistrict) {
            changeDistrict = districtsArray[i];
            found = true;
            console.log(districtsArray[i]);
            break;
        }  
    }

    if(percent <= 1 && percent >= 0){
        console.log(districtsArray[i].ChanceOfDWin)
        districtsArray[i].ChanceOfDWin = percent
        districtsArray[i].InfoBoxString = districtsArray[i].District+ "\nIncumbent: " + districtsArray[i].Incumbent + "\n2022 Result: " + districtsArray[i].Election2020Results + "\nIncumbent Over/UnderPerformance: " + districtsArray[i].IncumbentStrength + "\nProjected Result: " + districtsArray[i].MedianOutcome +  "\nChance of D Win: " + districtsArray[i].ChanceOfDWin;
        console.log(districtsArray[i].ChanceOfDWin)
    }

    setColorBasedOnChance()
    getPercentDWin();
}


function handleClickCallButtonD(){
    const numberInput = document.getElementById('numberInput');
    var percent = numberInput.value || 'None';
    var selectedDistrict = dropdown.value;
    // Get references to the input field and display area

    //console.log("I am here" + percent + " " + selectedState);


    for (var i = 0; i < districtsArray.length; i++) {
        if (districtsArray[i].District == selectedDistrict) {
            changeDistrict = districtsArray[i];
            found = true;
            break;
        }
  
    }

    districtsArray[i].ChanceOfDWin = 1000
    districtsArray[i].InfoBoxString = districtsArray[i].District+ "\nIncumbent: " + districtsArray[i].Incumbent + "\n2022 Result: " + districtsArray[i].Election2020Results + "\nIncumbent Over/UnderPerformance: " + districtsArray[i].IncumbentStrength + "\nProjected Result: " + districtsArray[i].MedianOutcome +  "\nChance of D Win: " + districtsArray[i].ChanceOfDWin;
  
    setColorBasedOnChance();
    getPercentDWin();
}
function handleClickCallButtonR(){
    const numberInput = document.getElementById('numberInput');
    var percent = numberInput.value || 'None';
    var selectedDistrict = dropdown.value;
    // Get references to the input field and display area

    //console.log("I am here" + percent + " " + selectedState);


    for (var i = 0; i < districtsArray.length; i++) {
        if (districtsArray[i].District == selectedDistrict) {
            changeDistrict = districtsArray[i];
            found = true;
            break;
        }
  
    }
    districtsArray[i].ChanceOfDWin = -1000
    districtsArray[i].InfoBoxString = districtsArray[i].District+ "\nIncumbent: " + districtsArray[i].Incumbent + "\n2022 Result: " + districtsArray[i].Election2020Results + "\nIncumbent Over/UnderPerformance: " + districtsArray[i].IncumbentStrength + "\nProjected Result: " + districtsArray[i].MedianOutcome +  "\nChance of D Win: " + districtsArray[i].ChanceOfDWin;
  
    setColorBasedOnChance()
    getPercentDWin();
}

function getPercentDWin(){
    var DSeats = 0;
    var DWins = 0;
    var count = 0;
    
    var DemVotesArray = [];

    while (count < 1000){
        DSeats = 0;
        for (var i = 0; i < districtsArray.length; i++) {
            currentDistrict = districtsArray[i];  

            var roll = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
            
            if(roll < (currentDistrict.ChanceOfDWin * 100)){
                DSeats = DSeats + 1;
            }
        }
        if(DSeats >= 218){
            DWins++;
        }
        DemVotesArray.push(DSeats);
        count++;
    }

    count = 0;
    sum = 0;
    while (count < DemVotesArray.length){
        sum = sum + DemVotesArray[count];
        count++;
    }
    var average = sum / DemVotesArray.length

    console.log ("Democrats win " + DWins + "/1000 Times \nAverage of " + average + "Seats")

    let numberElement = document.getElementById('chanceOfDWinState')
    numberElement.innerText = (DWins / 1000) * 100;

    let SeatsElement = document.getElementById('projectedSeatsD')
    SeatsElement.innerText = average
}


//Set Drop Down Menu to clicked state

document.addEventListener('DOMContentLoaded', function() {
    // Get all paths in the SVG
    const paths = document.querySelectorAll('svg path');
    const stateDropDown = document.getElementById('stateDropDown');

    paths.forEach(path => {
        path.addEventListener('click', function() {
            // Set the dropdown value to the clicked path's ID
            console.log(this.id)
            stateDropDown.value = this.id;
        });
    });
});
