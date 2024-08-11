//Array for 2024 State Data
const statesArray = [];
const senateArray = [];
var pollingAverage = 0;
const electionyear = "2024";
setBackgroundColor();

//DATA
const csvUrl = 'https://raw.githubusercontent.com/jessebeach50/electionmodel/main/ElectionModelData.csv';
const senateCSVUrl = 'https://raw.githubusercontent.com/jessebeach50/electionmodel/main/SenateData.csv';


// Use Papa Parse to fetch and parse the CSV file; runs when file loads
Papa.parse(csvUrl, {
    download: true,
    header: true, // Set to false if the CSV doesn't have headers
    dynamicTyping: true, // Convert types automatically
    skipEmptyLines: true, // Skip empty lines
    complete: function (results) {
        processStates(results.data, '2024');
    },
    error: function (error) {
        console.error("Error parsing CSV:", error);
    }
});
Papa.parse(senateCSVUrl, {
    download: true,
    header: true, // Set to false if the CSV doesn't have headers
    dynamicTyping: true, // Convert types automatically
    skipEmptyLines: true, // Skip empty lines
    complete: function (results) {
        processStatesSenate(results.data, '2024');
        setColorBasedOnChance();
    },
    error: function (error) {
        console.error("Error parsing CSV:", error);
    }
});



// Hover box displays info about state when hovered over
var tooltipSpan = document.getElementById('details-box');

document.addEventListener('mouseover', function (e) {
    if (e.target.tagName == 'path') {

        var stateName = e.target.dataset.name;
        var stateAbbr = e.target.dataset.id;

        var hoveredState = null;
        var found = false;
        for (var i = 0; i < senateArray.length; i++) {
            if (senateArray[i].State == stateAbbr) {           
                if(senateArray[i].ElectionYear == electionyear){
                    hoveredState = senateArray[i];
                    found = true;
                    
                    var output = senateArray[i].InfoBoxString;
                    break;
                }              
            }
        }

        if(found = true){
            document.getElementById("details-box").innerHTML = output;
            document.getElementById("details-box").style.opacity = "100%";
        }
    }
    else {
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

});


function processStatesSenate(states, year) {
    //cycle through each states and parse the data as needed
    states.forEach(s => {
        //Basic Attributes
        var stateName = s.State;
        var stateFullName = s.StateFull;

        var sClass = s.Class;
        var incumbent = s.Incumbent

        var e2006Result = s.e2006;
        var e2008Result = s.e2008;
        var e2010Result = s.e2010;
        var e2012Result = s.e2012;
        var e2014Result = s.e2014;
        var e2016Result = s.e2016;
        var e2018Result = s.e2018;
        var e2020Result = s.e2020;
        

        //Get Corresponding State Data, excpetions for special elections
        var stateObject;
        try{ 
            stateObject = statesArray.find(obj => obj.State === stateFullName);
            if (stateFullName == "Nebraska Special"){
                stateObject = statesArray.find(obj => obj.State === "Nebraska");
            }
            if (stateFullName == "Oklahoma-Special"){
                stateObject = statesArray.find(obj => obj.State === "Oklahoma");
            }
            if (stateFullName == "Georgia - Special"){
                stateObject = statesArray.find(obj => obj.State === "Georgia");
            }
            if (stateFullName == "Arizona - Special"){
                stateObject = statesArray.find(obj => obj.State === "Arizona");             
            }
            if (stateFullName == "Minnesota - Special"){
                stateObject = statesArray.find(obj => obj.State === "Minnesota");
            }
            if (stateFullName == "Mississippi - Special"){
                stateObject = statesArray.find(obj => obj.State === "Mississippi");
            }
        }
        catch{

        }

        if(s.Election == "2024"){
            var polls = s.Polls2024;
        }

        var pollingErrorInMonth = 3;
        var standardPollingError = 3;

        //Incumbent Strength
        var incumbentPerformances = [];
        try{
            if(incumbent != null){
                if(e2020Result != null){
                    var e2020N = e2020Result - 4.5;
                    var e2020StateN = stateObject.Election2020ResultsNeutral;
                    var incumbentPerformance = e2020N - e2020StateN;
                    incumbentPerformances.push(incumbentPerformance);                  
                }
                if(e2018Result != null){
                    var e2018N = e2018Result - 8.6;
                    var e2018StateN = stateObject.Election2016ResultsNeutral;
                    var incumbentPerformance = e2018N - e2018StateN;
                    incumbentPerformances.push(incumbentPerformance);                  
                }
                if(e2016Result != null){
                    var e2016N = e2016Result - 2.1;
                    var e2016StateN = stateObject.Election2016ResultsNeutral;
                    var incumbentPerformance = e2016N - e2016StateN;
                    incumbentPerformances.push(incumbentPerformance);                  
                }
                if(e2014Result != null){
                    var e2014N = e2014Result - -(5.7);
                    var e2014StateN = stateObject.Election2012ResultsNeutral;
                    var incumbentPerformance = e2014N - e2014StateN;
                    incumbentPerformances.push(incumbentPerformance);                  
                }
                if(e2012Result != null){
                    var e2012N = e2012Result - 3.9;
                    var e2012StateN = stateObject.Election2012ResultsNeutral;
                    var incumbentPerformance = e2012N - e2012StateN;
                    incumbentPerformances.push(incumbentPerformance);                  
                }
                if(e2010Result != null){
                    var e2010N = e2010Result - (-6.8);
                    var e2010StateN = stateObject.Election2008ResultsNeutral;
                    var incumbentPerformance = e2010N - e2010StateN;
                    incumbentPerformances.push(incumbentPerformance);                  
                }
                if(e2008Result != null){
                    var e2008N = e2008Result - 7.9;
                    var e2008StateN = stateObject.Election2008ResultsNeutral;
                    var incumbentPerformance = e2008N - e2008StateN;
                    incumbentPerformances.push(incumbentPerformance);                  
                }
                if(e2006Result != null){
                    var e2006N = e2006Result - 8;
                    var e2006StateN = stateObject.Election2004ResultsNeutral;
                    var incumbentPerformance = e2006N - e2006StateN;
                    incumbentPerformances.push(incumbentPerformance);                  
                }
            }
        }
        catch{
            console.log("Failed to process " + stateFullName + " " + s.Election);
        }

        var incumbentStrength = 0;
        var counter = 0;
        var sum = 0;
        while (counter < incumbentPerformances.length){
            sum = sum + incumbentPerformances[counter];
            counter++;
        }
        incumbentStrength = sum / incumbentPerformances.length;
        if (incumbentPerformances.length == 0){
            incumbentStrength = 0;
        }
  


        //Standard incumbent bonus
        var incumbentBonus = 0;
        if(s.IncParty == "D"){
            incumbentBonus = 3;
        }else if (s.IncParty == "R"){
            incumbentBonus = -3;
        }else{
            incumbentBonus = 0;
        }

        //logging for debugging
        if (s.Election == "2024"){
            console.log(stateName + "============ \n" + incumbent);
            console.log(incumbentBonus);
        }

        try{ 
            var presidentMedian = stateObject.MedianOutcome;

        }catch{
            var presidentMedian = 0;
            console.log(stateFullName + s.Election)
            console.log("Failed")
        }

        //Model---------------------------------
      
        var outcomesArray = [];

        //Basic Polling Model
        var maxD = polls + 5;
        var maxR = polls - 5

        if(polls != null){
            while (maxR < (maxD + .1)) {
                var maxVariationD = 0 + pollingErrorInMonth + standardPollingError;
                var maxVariationR = 0 - pollingErrorInMonth - standardPollingError;
                
                while (maxVariationR < (maxVariationD + .1)){
                    var outcome = maxR + maxVariationR;
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    maxVariationR = maxVariationR + .5;
                }
                maxR = maxR + .5;
            }
        }

        //President Results
        
        var maxD = presidentMedian + 5;
        var maxR = presidentMedian - 5;

        if(incumbentBonus  == 3){
            maxD = maxD + incumbentBonus;
        }else{
            maxR = maxR + incumbentBonus;
        }

        while (maxR < (maxD + .1)) {
            var maxVariationD = 0 + pollingErrorInMonth + standardPollingError;
            var maxVariationR = 0 - pollingErrorInMonth - standardPollingError;
            
            while (maxVariationR < (maxVariationD + .1)){
                var outcome = maxR + maxVariationR;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxVariationR = maxVariationR + .5;
            }
            maxR = maxR + .5;
        }


        //President Results + Past incumbent Strength
        var maxD = presidentMedian + incumbentStrength + 3;
        var maxR = presidentMedian + incumbentStrength - 3;

        while (maxR < (maxD + .1)) {
            var maxVariationD = 0 + pollingErrorInMonth + standardPollingError;
            var maxVariationR = 0 - pollingErrorInMonth - standardPollingError;
            
            while (maxVariationR < (maxVariationD + .1)){
                var outcome = maxR + maxVariationR;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxVariationR = maxVariationR + .5;
            }
            maxR = maxR + .5;
        }

        //President 2020Result
        if(year == "2024"){
            var maxD = stateObject.Election2020Results + 3;
            var maxR = stateObject.Election2020Results - 3;
            while (maxR < (maxD + .1)) {
                var maxVariationD = 0 + pollingErrorInMonth + standardPollingError;
                var maxVariationR = 0 - pollingErrorInMonth - standardPollingError;
                
                while (maxVariationR < (maxVariationD + .1)){
                    var outcome = maxR + maxVariationR;
                    outcomesArray.push(outcome);
                    maxVariationR = maxVariationR + .5;
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

        var infoBoxString = stateFullName + "\nIncumbent: " + incumbent + "\nChance of D Win: " + percentDWin + "\nProjected Result: " + median + "\nPollingAverage: " + polls;

        //Data for array -----------------------------------------------------
        let seatData = {
            State: stateName,
            ElectionYear: s.Election,

            Election2006Result: e2006Result,
            Election2008Result: e2008Result,
            Election2010Result: e2010Result,
            Election2012Result: e2012Result,
            Election2014Result: e2014Result,
            Election2016Result: e2016Result,
            Election2018Result: e2018Result,
            Election2020Result: e2020Result,

            ChanceOfDWin: percentDWin,
            InfoBoxString: infoBoxString
        };
        senateArray.push(seatData);

    });

}


//Process states and model for the presidential elections, this data will then be used for the senate model

function processStates(states, year) {
    //cycle through every state and parse the data as needed
    states.forEach(s => {
        var stateName = s.State

        if (stateName == 'National' && year == '2024') {
            pollingAverage = s.Polls;

        }
        else if (stateName == 'National' && year == '2020') {
            pollingAverage = 8.4;
        }
        else if (stateName == 'National' && year == '2016') {
            pollingAverage = 3.9;
        }
        else if (stateName == 'National' && year == '2012') {
            pollingAverage = .7;
        }

        if (year == '2024') {
            var pollingErrorInMonth = 3;
        }
        else {
            var pollingErrorInMonth = 0;
        }

        var standardPollingError = 3;

        var maxDPopularVote = pollingAverage + pollingErrorInMonth + standardPollingError;
        var maxRPopularVote = pollingAverage - pollingErrorInMonth - standardPollingError;

        //get all state results by year
        var e2000Results = Number(s.zeroresults);
        var e2004Results = Number(s.fourresults);
        var e2008Results = Number(s.eightresults);
        var e2012Results = Number(s.twelveresults);
        var e2016Results = Number(s.sixteenresults);
        var e2020Results = Number(s.twentyresults);

        //adjust states for popular vote to get what they would be in a neutral year
        var neutral2000 = e2000Results - 0.5;
        var neutral2004 = e2004Results + 2.4;
        var neutral2008 = e2008Results - 7.2;
        var neutral2012 = e2012Results - 3.9;
        var neutral2016 = e2016Results - 2.1;
        var neutral2020 = e2020Results - 4.5;

        var polls = null;

        if (year == '2024') {
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2020 - neutral2016
            var shift2 = neutral2016 - neutral2012

            var neutralProjectedOnShift = neutral2020 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            polls = s.Polls;
            var neutralProjectedOnPolls = polls - pollingAverage;

            //Average the above
            //console.log(polls);
            if (polls != null){
                var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
            }
            else{
                var neutralProjected = neutralProjectedOnShift;
            }
        }

        if (year == '2020') {
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2016 - neutral2012
            var shift2 = neutral2012 - neutral2008

            var neutralProjectedOnShift = neutral2016 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            polls = s.Polls2020;
            var neutralProjectedOnPolls = polls - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
        }
        if (year == '2016') {
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2012 - neutral2008
            var shift2 = neutral2008 - neutral2004

            var neutralProjectedOnShift = neutral2012 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            polls = s.Polls2016
            var neutralProjectedOnPolls = polls - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
        }
        if (year == '2012') {
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2008 - neutral2004
            var shift2 = neutral2004 - neutral2000

            var neutralProjectedOnShift = neutral2008 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            var polls = s.Polls2012;
            var neutralProjectedOnPolls = polls - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
            var polls2012 = s.Polls2012;
        }
        //---------------------------------------Election Model Portion-------------------------------------------------------------
        var outcomesArray = [];

        //Basic Model using the polling average, account for state poll inaccuracyy by +- 4
        //We'll need to account for polling error in states and nationally to get result so we do a nested for loop
        var maxD = neutralProjectedOnPolls + pollingErrorInMonth + 6;
        var maxR = neutralProjectedOnPolls - pollingErrorInMonth - 6;

        if (polls == null) {

        } else {
            while (maxR < (maxD + .1)) {
                var maxDNat = maxDPopularVote;
                var maxRNat = maxRPopularVote;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        //Basic Model using the expected shift
        var maxD = neutralProjectedOnShift + 6;
        var maxR = neutralProjectedOnShift - 6;

        while (maxR < (maxD + .1)) {
            var maxDNat = maxDPopularVote;
            var maxRNat = maxRPopularVote;
            while (maxRNat < (maxDNat + .1)) {
                var outcome = maxR + maxRNat;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxRNat = maxRNat + .5;
            }
            maxR = maxR + .5;
        }

        //Basic Model using the last election 
        if (year == "2024") {
            var maxD = e2020Results + 4;
            var maxR = e2020Results - 4;

            while (maxR < (maxD + .1)) {
                var maxDNat = 3;
                var maxRNat = -3;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        if (year == "2020") {
            var maxD = e2016Results + 4;
            var maxR = e2016Results - 4;

            while (maxR < (maxD + .1)) {
                var maxDNat = 3;
                var maxRNat = -3;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        if (year == "2016") {
            var maxD = e2012Results + 4;
            var maxR = e2012Results - 4;

            while (maxR < (maxD + .1)) {
                var maxDNat = 3;
                var maxRNat = -3;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        if (year == "2012") {
            var maxD = e2008Results + 4;
            var maxR = e2008Results - 4;

            while (maxR < (maxD + .1)) {
                var maxDNat = 3;
                var maxRNat = -3;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        //Basic Model using the expected shift
        var maxD = neutralProjected + 12;
        var maxR = neutralProjected - 12;

        while (maxR < (maxD + .1)) {
            var maxDNat = maxDPopularVote + 4;
            var maxRNat = maxRPopularVote - 4;
            while (maxRNat < (maxDNat + .1)) {
                var outcome = maxR + maxRNat;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxRNat = maxRNat + .5;
            }
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

        //String that will show when state is hovered over
        if (year == '2024') {
            infoBoxString = s.State + "\nElection 2020 Results: " + e2020Results + "\nProjected2024Result: " + median + "\nDemocrat Win %: " + percentDWin + "\n2024 Polling Average: " + s.Polls;
        }
        if (year == '2020') {
            infoBoxString = s.State + "\nActual 2020 Results: " + e2020Results + "\nProjected2020Result: " + median + "\nDemocrat Win %: " + percentDWin + "\n2020 Polling Average: " + s.Polls2020;
        }
        if (year == '2016') {
            infoBoxString = s.State + "\nActual 2016 Results: " + e2016Results + "\nProjected2016Result: " + median + "\nDemocrat Win %: " + percentDWin + "\n2016 Polling Average: " + s.Polls2016;
        }
        if (year == '2012') {
            infoBoxString = s.State + "\nActual 2012 Results: " + e2012Results + "\nProjected2012Result: " + median + "\nDemocrat Win %: " + percentDWin + "\n2012 Polling Average: " + s.Polls2012;
        }
        //This is the state data obbject that is put into the array-------------------------------------------------------
        let stateData = {
            State: stateName,
            StateAbbreviation: s.Abbr,
            Election2000Results: e2000Results,
            Election2004Results: e2004Results,
            Election2008Results: e2008Results,
            Election2012Results: e2012Results,
            Election2016Results: e2016Results,
            Election2020Results: e2020Results,

            Election2000ResultsNeutral: neutral2000,
            Election2004ResultsNeutral: neutral2004,
            Election2008ResultsNeutral: neutral2008,
            Election2012ResultsNeutral: neutral2012,
            Election2016ResultsNeutral: neutral2016,
            Election2020ResultsNeutral: neutral2020,

            ElectionNeutralProjectedShift: neutralProjectedOnShift,
            ElectionNeutralProjectedPolls: neutralProjectedOnPolls,
            ElectionNeutralProjected: neutralProjected,

            ChanceOfDWin: percentDWin,
            MedianOutcome: median,

            InfoBoxString: infoBoxString
        };
        statesArray.push(stateData);
    });
}



//Set the colors to results
function setColorsBasedOnResults(year) {
    for (var i = 0; i < statesArray.length; i++) {
        if (year == '2020') {
            var stater = statesArray[i].Election2020Results;
        }
        if (year == '2016') {
            var stater = statesArray[i].Election2016Results;
        }
        if (year == '2012') {
            var stater = statesArray[i].Election2012Results;
        }
        var stateAbbr = statesArray[i].StateAbbreviation;
        svgState = document.getElementById(stateAbbr);
        if (stater > 25) {
            try { svgState.style.fill = '#040275'; } catch { }
        }
        else if (stater > 20) {
            try { svgState.style.fill = '#0300c4'; } catch { }
        }
        else if (stater > 15) {
            try { svgState.style.fill = '#2b28f7'; } catch { }
        }
        else if (stater > 10) {
            try { svgState.style.fill = '#605df5'; } catch { }
        }
        else if (stater > 5) {
            try { svgState.style.fill = '#8a88fc'; } catch { }
        }
        else if (stater > 1) {
            try { svgState.style.fill = '#c6c5fa'; } catch { }
        }
        else if (stater > 0) {
            try { svgState.style.fill = '#e4e4f5'; } catch { }
        }
        else if (stater > -1) {
            try { svgState.style.fill = '#fce8ea'; } catch { }
        }
        else if (stater > -5) {
            try { svgState.style.fill = '#f0afb4'; } catch { }
        }
        else if (stater > -10) {
            try { svgState.style.fill = '#db7f87'; } catch { }
        }
        else if (stater > -15) {
            try { svgState.style.fill = '#cf515b'; } catch { }
        }
        else if (stater > -20) {
            try { svgState.style.fill = '#eb2334'; } catch { }
        }
        else if (stater > -25) {
            try { svgState.style.fill = '#de0417'; } catch { }
        }
        else {
            try { svgState.style.fill = '#a80210'; } catch { }
        }

    }
}


//Set the colors based on 2024 result
function setColorBasedOnChance() {
    for (var i = 0; i < senateArray.length; i++) {
        var statePercent = senateArray[i].ChanceOfDWin;
        var stateName = senateArray[i].State;
        var stateYear = senateArray[i].ElectionYear;

        if (stateYear == electionyear){
        
            svgState = document.getElementById(stateName);

            if (statePercent > .99) {
                try { svgState.style.fill = '#040275'; } catch { }
            }
            else if (statePercent > .95) {
                try { svgState.style.fill = '#0300c4'; } catch { }
            }
            else if (statePercent > .9) {
                try { svgState.style.fill = '#2b28f7'; } catch { }
            }
            else if (statePercent > .8) {
                try { svgState.style.fill = '#605df5'; } catch { }
            }
            else if (statePercent > .7) {
                try { svgState.style.fill = '#8a88fc'; } catch { }
            }
            else if (statePercent > .6) {
                try { svgState.style.fill = '#c6c5fa'; } catch { }
            }
            else if (statePercent > .5) {
                try { svgState.style.fill = '#e4e4f5'; } catch { }
            }
            else if (statePercent > .4) {
                try { svgState.style.fill = '#fce8ea'; } catch { }
            }
            else if (statePercent > .3) {
                try { svgState.style.fill = '#f0afb4'; } catch { }
            }
            else if (statePercent > .2) {
                try { svgState.style.fill = '#db7f87'; } catch { }
            }
            else if (statePercent > .1) {
                try { svgState.style.fill = '#cf515b'; } catch { }
            }
            else if (statePercent > .05) {
                try { svgState.style.fill = '#eb2334'; } catch { }
            }
            else if (statePercent > .01) {
                try { svgState.style.fill = '#de0417'; } catch { }
            }
            else if (statePercent == 0) {
                try { svgState.style.fill = '#a80210'; } catch { }
            }else{
                try { svgState.style.fill = '#000000'; } catch { }
            }
        }
    }
}

//Set the colors based on 2024 result
function setBackgroundColor() {
    if (pollingAverage > 15) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(50, 50, 150)"; } catch { }
    }
    else if (pollingAverage > 10) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(50, 50, 100)"; } catch { }
    }
    else if (pollingAverage > 8) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(55, 50, 95)"; } catch { }
    }
    else if (pollingAverage > 6) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(60, 50, 90)"; } catch { }
    }
    else if (pollingAverage > 4) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(65, 50, 85)"; } catch { }
    }
    else if (pollingAverage > 2) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(70, 50, 80)"; } catch { }
    }
    else if (pollingAverage > 0) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(75, 50, 75)"; } catch { }
    }
    else if (pollingAverage > -2) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(80, 50, 70)"; } catch { }
    }
    else if (pollingAverage > -4) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(85, 50, 65)"; } catch { }
    }
    else if (pollingAverage > -6) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(90, 50, 60)"; } catch { }
    }
    else if (pollingAverage > -8) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(95, 50, 55)"; } catch { }
    }
    else if (pollingAverage > -10) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(100, 50, 50)"; } catch { }
    }
    else {
        try { document.documentElement.style.cssText = "--maincolor: rgb(150, 50, 50)"; } catch { }
    }

}